import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://guild.illatio.dev',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  output: 'static',
});
