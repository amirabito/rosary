import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Rosary',
        short_name: 'Rosary',
        start_url: '.',
        display: 'standalone',
        background_color: '#1a0a10',
        theme_color: '#3c0b1a',
        icons: [],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
      },
    }),
  ],
  server: {
    host: true,
  },
})
