import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { igdbProxyPlugin } from './scripts/igdbProxyPlugin.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), igdbProxyPlugin(env)],
    base: './', // Necessary for Electron to load local files
    server: {
      port: 5173,
      strictPort: true
    },
    preview: {
      proxy: {}
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react-window')) return 'virtual-list';
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
            return 'vendor';
          }
        }
      }
    }
  }
})
