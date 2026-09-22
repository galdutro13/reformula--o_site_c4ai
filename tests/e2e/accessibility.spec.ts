import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { requiredPages } from './requirements';

// A instrumentação axe requer JS; os cenários funcionais sem JS estão em site.spec.ts.
for (const required of requiredPages) {
  test(`${required.path}: acessibilidade WCAG A/AA`, async ({ page }) => {
    await page.route('**/*', (route) => {
      const url = new URL(route.request().url());
      return url.origin === 'http://127.0.0.1:4321'
        ? route.continue()
        : route.abort();
    });
    await page.goto(required.path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const path of [
  '/pt/sobre/',
  '/en/about/',
  '/pt/pesquisas/',
  '/en/research/',
  '/pt/noticias/',
  '/en/news/',
]) {
  test(`${path}: WCAG com painéis e navegação expandidos`, async ({ page }) => {
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === 'http://127.0.0.1:4321'
        ? route.continue()
        : route.abort(),
    );
    await page.goto(path);
    for (const summary of await page.locator('main details>summary').all())
      await summary.click();
    if (await page.locator('.mobile-navigation>summary').isVisible())
      await page.locator('.mobile-navigation>summary').click();
    const menu = page.locator('header details.submenu>summary:visible').first();
    await menu.click();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
