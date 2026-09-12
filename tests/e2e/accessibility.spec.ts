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
