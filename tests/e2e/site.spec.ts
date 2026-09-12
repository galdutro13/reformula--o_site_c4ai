import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { requiredPages, expectedAlternates } from './requirements';

test.beforeEach(async ({ page }) => {
  // Falha se conteúdo obrigatório passar a depender de rede externa.
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return url.origin === 'http://127.0.0.1:4321'
      ? route.continue()
      : route.abort();
  });
});

for (const required of requiredPages) {
  test(`${required.path}: conteúdo, metadados e estrutura`, async ({
    page,
  }) => {
    const response = await page.goto(required.path);
    expect(response?.status()).toBe(required.status);
    await expect(page).toHaveTitle(required.title);
    await expect(page.locator('html')).toHaveAttribute('lang', required.lang);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      required.heading,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      required.description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    if (required.path === '/404.html') {
      await expect(
        page.locator('link[rel="canonical"], link[rel="alternate"]'),
      ).toHaveCount(0);
      await expect(page.locator('main [lang="en"]').first()).toBeVisible();
    } else {
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `http://127.0.0.1:4321${required.path}`,
      );
      await expect(page.locator('link[rel="alternate"]')).toHaveCount(3);
      for (const [lang, href] of Object.entries(expectedAlternates)) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
        ).toHaveAttribute('href', href);
      }
    }
  });

  test(`${required.path}: sem transbordamento`, async ({ page }) => {
    await page.goto(required.path);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
    await page.setViewportSize({ width: 320, height: 800 });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
}

test('conteúdo demonstrativo renderizado nos dois idiomas', async ({
  page,
}) => {
  await page.goto('/pt/');
  await expect(page.getByRole('main')).toContainText('Conteúdo demonstrativo');
  await expect(
    page.getByRole('heading', { name: 'Feito para evoluir' }),
  ).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Idioma' })
    .getByRole('link', { name: 'English' })
    .click();
  await expect(page).toHaveURL('/en/');
  await expect(
    page.getByRole('heading', { name: 'Built to evolve' }),
  ).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Demonstration content');
  await page
    .getByRole('navigation', { name: 'Language' })
    .getByRole('link', { name: 'Português' })
    .click();
  await expect(page).toHaveURL('/pt/');
});

test('escolha de idioma e recuperação da 404', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Continue in English', exact: true })
    .click();
  await expect(page).toHaveURL('/en/');
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Continuar em português', exact: true })
    .click();
  await expect(page).toHaveURL('/pt/');
  const response = await page.goto('/pagina-que-nao-existe/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Página não encontrada',
  );
  await page.getByRole('link', { name: 'Return to home', exact: true }).click();
  await expect(page).toHaveURL('/en/');
});

test('teclado: salto, foco e seletor de idioma', async ({ page }) => {
  await page.goto('/pt/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Explorar esta demonstração' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/pt/#demonstration');
  await page.goto('/pt/');
  await page.keyboard.press('Tab'); // salto
  await page.keyboard.press('Tab'); // marca
  await page.keyboard.press('Tab'); // português
  await page.keyboard.press('Tab'); // inglês
  const english = page
    .getByRole('navigation')
    .getByRole('link', { name: 'English' });
  await expect(english).toBeFocused();
  await expect(english).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Shift+Tab');
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Português' }),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/en/');
});

test('links internos e âncoras de todos os HTML compilados', async ({
  page,
  request,
}) => {
  const files = readdirSync('.test-dist', {
    recursive: true,
    encoding: 'utf8',
  }).filter((file) => file.endsWith('.html'));
  expect(files).toEqual(
    expect.arrayContaining([
      'index.html',
      'pt/index.html',
      'en/index.html',
      '404.html',
    ]),
  );
  for (const file of files) {
    const path = `/${file.replace(/(^|\/)index\.html$/, '$1')}`;
    await page.goto(path);
    const links = await page
      .locator('a[href]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => (anchor as HTMLAnchorElement).href),
      );
    for (const href of new Set(links)) {
      const url = new URL(href);
      if (url.origin !== 'http://127.0.0.1:4321') continue;
      const response = await request.get(url.href);
      expect(response.status(), `${path} → ${href}`).toBe(200);
      if (url.hash) {
        await page.goto(url.href);
        const ids = await page
          .locator('[id]')
          .evaluateAll((elements) => elements.map((element) => element.id));
        expect(ids, `${path} → ${href}`).toContain(
          decodeURIComponent(url.hash.slice(1)),
        );
      }
    }
  }
});
