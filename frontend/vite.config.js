import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
    cors: {
      origin: '*',
      credentials: true
    },
    proxy: {
      '/api/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err.message)
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url)
            // Add headers that auth service expects
            proxyReq.setHeader('Accept', 'application/json')
            proxyReq.setHeader('Content-Type', 'application/json')
            proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest')

            let body = ''
            req.on('data', chunk => {
              body += chunk
            })
            req.on('end', () => {
              if (body) {
                try {
                  const data = JSON.parse(body)
                  console.log('Request Body:', data)
                } catch (e) {
                  console.log('Raw Request Body:', body.toString())
                }
              }
            })
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response:', proxyRes.statusCode, req.url)
            console.log('Response Headers:', proxyRes.headers)
            let body = ''
            proxyRes.on('data', chunk => {
              body += chunk
            })
            proxyRes.on('end', () => {
              try {
                const data = JSON.parse(body.toString())
                console.log('Response Body:', data)
              } catch (e) {
                console.log('Raw Response Body:', body.toString())
              }
            })
          })
        }
      },
      '^/api/(?!auth).*': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err.message)
          })
        }
      }
    }
  }
})
