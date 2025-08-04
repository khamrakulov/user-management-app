import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import tailwindcss plugin

export default defineConfig({
  plugins: [react(), tailwindcss()], // Add tailwindcss plugin here
  server: {
    host: '0.0.0.0', // Ensures Vite binds to all network interfaces inside the container
    port: 5173,     // Internal port the Vite dev server runs on
    proxy: {
      '/api': {
        // IMPORTANT: Target the backend service by its Docker Compose service name ('server')
        // and its internal container port (5062).
        target: 'http://server:5062',
        changeOrigin: true,
        secure: false, // Set to false if your backend is not using HTTPS in dev
      },
    },
    watch: {
      usePolling: true, // Often needed for hot reloading to work reliably in Docker setups (e.g., WSL2)
    },
    // Allow specific hosts for your development server to respond to.
    // 'uma.codearch.uz' is your Nginx-proxied subdomain.
    // 'localhost' is needed if you access the app directly via localhost:3001 during development.
    allowedHosts: true,
  },
});
