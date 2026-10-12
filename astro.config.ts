import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { SITE_ORIGIN } from './src/config/site';
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/constants';

const siteBase = SITE_ORIGIN.replace(/\/$/, '');

export default defineConfig({
  site: SITE_ORIGIN,
  trailingSlash: 'never',
  // First-class locale routing. Unprefixed paths are redirected by the worker
  // (`worker/redirects.ts`), with `LocaleRedirect.astro` as the static fallback.
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: { da: 'da', en: 'en' },
      },
      filter: (page) => {
        const normalized = page.replace(/\/$/, '');
        // Unprefixed redirect stubs are not real pages.
        return normalized !== siteBase && normalized !== `${siteBase}/privacy`;
      },
    }),
  ],
  output: 'static',

  compressHTML: true,

  vite: {
    resolve: {
      alias: {
        '~': '/src',
      },
    },
    /** Avoid dev HMR / transform runs when deploy artifacts change under `dist/`. */
    server: {
      watch: {
        ignored: ['**/dist/**'],
      },
    },
  },

  devToolbar: {
    enabled: false,
  },
});
