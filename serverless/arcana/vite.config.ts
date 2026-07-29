/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Het voorbeeldrapport is een hulpmiddel, geen test: het schrijft een bestand weg
    // en hoort niet mee te draaien in `npm run test`. Draai het met `npm run sample`.
    exclude: ['**/node_modules/**', '**/dist/**', 'src/dev/**'],
  },
})
