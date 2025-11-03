import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    allowedHosts: [
      '53a8e6d81c1a.ngrok-free.app' // your ngrok domain
    ]
  }
})
