import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdf-lib', 'pdfjs-dist'],
  },
  build: {
    // pdfjs-dist is ~1.4 MB minified — expected for a PDF engine, not a bug
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split pdfjs into its own chunk so the main bundle stays lean
          'pdfjs': ['pdfjs-dist'],
        },
      },
    },
  },
})
