import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tyndfed.dk',
  integrations: [react()],
  adapter: vercel(),
  output: 'static',

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});