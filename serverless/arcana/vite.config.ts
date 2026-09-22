/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Preload op precies één font: Cormorant 500 (basis), het woordmerk in de hero
 * en daarmee de LCP van de landingspagina. De fonts krijgen bij het bouwen een
 * hash in hun naam, dus de link kan niet in index.html staan; deze plugin
 * zoekt het gebouwde bestand op en zet de link in de <head>.
 */
function preloadWordmarkFont(): Plugin {
  return {
    name: 'arcana-preload-wordmark-font',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const asset = Object.keys(ctx.bundle ?? {}).find((name) => /cormorant-500-basis-[\w-]+\.woff2$/.test(name))
        if (!asset) return []
        return [
          {
            tag: 'link',
            injectTo: 'head',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `/${asset}` },
          },
        ]
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadWordmarkFont()],
  build: {
    target: 'es2020',
    // Eén CSS-bestand: de app is te klein voor CSS per route, en het thema
    // (tokens.css) moet er hoe dan ook bij de eerste verf zijn.
    cssCodeSplit: false,
    // We meten zelf, met brotli, in scripts/meet-bundel.mjs.
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // React apart, zodat een wijziging in de app de vendor-chunk niet uit
        // de browsercache gooit. De andere chunks volgen vanzelf uit de
        // dynamische imports in App.tsx (test, engine, rapport).
        manualChunks(id) {
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor';
          return undefined;
        },
      },
    },
    // vendor is ~228 KB raw; alles daarboven is een echte waarschuwing.
    chunkSizeWarningLimit: 240,
  },
  test: {
    // Het voorbeeldrapport is een hulpmiddel, geen test: het schrijft een bestand weg
    // en hoort niet mee te draaien in `npm run test`. Draai het met `npm run sample`.
    exclude: ['**/node_modules/**', '**/dist/**', 'src/dev/**'],
  },
})
