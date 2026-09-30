import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const name of ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'SPOTIFY_REFRESH_TOKEN']) {
    if (!process.env[name] && env[name]) process.env[name] = env[name]
  }

  return {
    plugins: [
      react(),
      {
        name: 'spotify-api',
        configureServer(server) {
          server.middlewares.use('/api/spotify', async (req, res, next) => {
            const apiResponse = {
              setHeader(name, value) {
                res.setHeader(name, value)
                return this
              },
              status(statusCode) {
                res.statusCode = statusCode
                return this
              },
              json(body) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(body))
                return this
              },
            }

            try {
              const { default: spotifyHandler } = await import('./api/spotify.js')
              await spotifyHandler(req, apiResponse)
            } catch (error) {
              next(error)
            }
          })
        },
      },
    ],
  }
})
