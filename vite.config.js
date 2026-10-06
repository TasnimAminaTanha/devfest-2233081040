import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // pdfjs-dist ships a legacy worker; tell Vite to treat it as an external asset
  optimizeDeps: {
    include: ['pdf-lib', 'pdfjs-dist'],
  },
})
