import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { SITE_ORIGIN } from './src/config/site';

const siteBase = SITE_ORIGIN.replace(/\/$/, '');

export default defineConfig({
  site: SITE_ORIGIN,
  trailingSlash: 'never',
  integrations: [
    // @vitejs/plugin-react drops its `transform` hook when Babel is unnecessary (perf). Vite can
    // still iterate a stale transform list after that, causing intermittent
    // "Cannot read properties of undefined (reading 'call')" (vitejs/vite#21162, withastro/astro#14868).
    // A no-op Babel plugin keeps `canSkipBabel` false so the hook is never removed.
    react({
      babel: {
        plugins: [() => ({ visitor: {} })],
      },
    }),
    sitemap({
      filter: (page) => {
        const normalized = page.replace(/\/$/, '');
        if (
          normalized === siteBase ||
          normalized === `${siteBase}/privacy` ||
          normalized === `${siteBase}/projects`
        ) {
          return false;
        }
        return true;
      },
    }),
  ],
  adapter: vercel(),
  output: 'static',

  compressHTML: true,

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': '/src',
      },
    },
    /** Avoid dev HMR / transform runs when deploy artifacts change under `.vercel/` or `dist/`. */
    server: {
      watch: {
        ignored: ['**/.vercel/**', '**/dist/**'],
      },
    },
  },

  devToolbar: {
    enabled: false,
  },
});
