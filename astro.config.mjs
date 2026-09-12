import process from 'node:process';
import { defineConfig } from 'astro/config';
import { basePath, productionOrigin } from './scripts/publication.mjs';

const production = process.env.C4AI_BUILD_KIND === 'production';
export default defineConfig({
  output: 'static',
  site: production
    ? productionOrigin(process.env.SITE_URL)
    : 'http://127.0.0.1:4321',
  base: basePath(process.env.BASE_PATH),
  outDir: production ? './dist' : './.test-dist',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  vite: {
    define: { 'import.meta.env.PUBLIC_INDEXABLE': JSON.stringify(production) },
  },
});
