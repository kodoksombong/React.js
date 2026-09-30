import { randomBytes, timingSafeEqual } from 'node:crypto'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const redirectUri = 'https://react-js-sigma-lac.vercel.app/api/spotify-auth'
const authorizeEndpoint = 'https://accounts.spotify.com/authorize'
const tokenEndpoint = 'https://accounts.spotify.com/api/token'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Spotify client credentials are not configured' })
  }

  const requestUrl = new URL(req.url, redirectUri)
  const code = requestUrl.searchParams.get('code')
  const returnedState = requestUrl.searchParams.get('state')
  const cookieState = req.headers.cookie
    ?.split('; ')
    .find((cookie) => cookie.startsWith('spotify_oauth_state='))
    ?.split('=')[1]

  if (!code && !requestUrl.searchParams.has('error')) {
    const state = randomBytes(32).toString('hex')
    const authorizeUrl = new URL(authorizeEndpoint)
    authorizeUrl.search = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: 'user-read-currently-playing user-read-recently-played',
      state,
      show_dialog: 'true',
    }).toString()

    res.setHeader(
      'Set-Cookie',
      `spotify_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/spotify-auth; Max-Age=600`,
    )
    res.setHeader('Location', authorizeUrl.toString())
    return res.status(302).end()
  }

  res.setHeader(
    'Set-Cookie',
    'spotify_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/spotify-auth; Max-Age=0',
  )

  const spotifyError = requestUrl.searchParams.get('error')
  if (spotifyError) {
    return res.status(400).json({ error: spotifyError })
  }

  if (!code || !returnedState || !cookieState) {
    return res.status(400).json({ error: 'OAuth state is missing or expired. Start again.' })
  }

  const expected = Buffer.from(cookieState)
  const received = Buffer.from(returnedState)
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return res.status(400).json({ error: 'OAuth state did not match. Start again.' })
  }

  try {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    })
    const data = await response.json()

    if (!response.ok || !data.refresh_token) {
      return res.status(502).json({
        error: 'Spotify token exchange failed',
        details: data.error_description || data.error || 'No refresh token was returned',
      })
    }

    return res.status(200).json({ refresh_token: data.refresh_token })
  } catch {
    return res.status(502).json({ error: 'Could not reach Spotify token service' })
  }
}