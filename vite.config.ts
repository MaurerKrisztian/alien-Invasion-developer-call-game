import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/alien-Invasion-developer-call-game/', // Replace with the correct subdirectory or base URL of your CDN
  build: {
    assetsDir: 'assets', // Customize the assets folder in the dist directory
  },
})
