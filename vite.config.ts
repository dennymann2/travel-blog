import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'three': ['three'],
          'leaflet': ['leaflet', 'react-leaflet'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  // Optimize dev server
  server: {
    middlewareMode: false,
    hmr: true,
  },
})
