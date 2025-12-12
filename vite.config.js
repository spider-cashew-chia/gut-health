import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Sanity API requests to avoid CORS issues in development
      '/api/sanity': {
        target: 'https://4aoe166b.api.sanity.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sanity/, ''),
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
          });
        },
      },
    },
  },
})