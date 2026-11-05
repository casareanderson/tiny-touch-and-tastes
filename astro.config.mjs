// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  devToolbar: { enabled: false },
  adapter: cloudflare()
});