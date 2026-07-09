import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/-1/',
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'motion', test: /node_modules[\\/]framer-motion|node_modules[\\/]motion/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
