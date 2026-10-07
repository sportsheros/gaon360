import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Set BASE_PATH=/gaon360/ when hosting under a sub-path (e.g. GitHub Pages project site).
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion') || id.includes('motion-dom')) return 'motion'
          if (id.includes('i18next')) return 'i18n'
        },
      },
    },
  },
})
