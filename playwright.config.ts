import { defineConfig } from '@playwright/test';
import process from 'node:process';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    serviceWorkers: 'block',
  },
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1440, height: 900 }, javaScriptEnabled: true },
    },
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 }, javaScriptEnabled: true },
    },
    {
      name: 'desktop-no-js',
      testMatch: '**/site.spec.ts',
      use: { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false },
    },
    {
      name: 'mobile-no-js',
      testMatch: '**/site.spec.ts',
      use: { viewport: { width: 390, height: 844 }, javaScriptEnabled: false },
    },
  ],
  webServer: {
    command: 'npm run preview:local -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
    timeout: 30000,
    // Astro 7 detecta agentes e destaca o processo. Esta variável mantém o
    // processo servidor sob controle do Playwright (mesmo modo do filho da CLI).
    env: { BASE_PATH: '/', ASTRO_PREVIEW_BACKGROUND: '1' },
  },
});
