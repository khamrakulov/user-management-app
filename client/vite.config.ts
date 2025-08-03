import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Important: Ensures Vite binds to all network interfaces inside the container
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5062',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})