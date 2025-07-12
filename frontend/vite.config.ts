// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Ensures dev server works with client-side routing
    fs: {
      allow: ['.'],
    },
    historyApiFallback: true,
  },
})
