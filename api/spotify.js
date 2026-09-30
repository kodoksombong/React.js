// api/spotify.js (Runs securely on the server / Vercel Serverless Function)

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error('Spotify authentication failed');
  }

  return data;
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

  if (!client_id || !client_secret || !refresh_token) {
    return res.status(500).json({ error: 'Spotify API credentials are not configured' });
  }

  try {
    const { access_token } = await getAccessToken();

    // 1. Try to fetch currently playing song
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      if (song && song.item) {
        return res.status(200).json({
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((artist) => artist.name).join(', '),
          album: song.item.album.name,
          albumImageUrl: song.item.album.images[0]?.url,
          songUrl: song.item.external_urls.spotify,
        });
      }
    } else if (nowPlayingRes.status !== 204) {
      throw new Error('Spotify currently-playing request failed');
    }

    // 2. If nothing is currently playing, fetch the most recently played track
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (recentlyPlayedRes.status === 200) {
      const data = await recentlyPlayedRes.json();
      const track = data.items && data.items[0]?.track;
      if (track) {
        return res.status(200).json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(', '),
          album: track.album.name,
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
        });
      }
    } else if (recentlyPlayedRes.status !== 204) {
      throw new Error('Spotify recently-played request failed');
    }

    return res.status(200).json({ isPlaying: false, message: 'No track found' });
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}

