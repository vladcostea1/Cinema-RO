import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    allowedHosts: ["cinema-ro-production.up.railway.app"]
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
