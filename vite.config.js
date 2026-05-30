import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Necessary for Electron to load local files
  server: {
    port: 5173,
    strictPort: true
  }
})
