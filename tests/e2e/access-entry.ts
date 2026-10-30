import { test, expect } from '@playwright/test';
import { homeHero } from './requirements';
import { openMobileHeader } from './header';

test.describe('acesso direto ao site', () => {
  test.use({ locale: 'en-US' });

  test('raiz abre em português com navegador inglês e permite trocar pelo topo', async ({
    page,
  }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    expect(response?.request().redirectedFrom()).toBeNull();
    await expect(page).toHaveURL('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      homeHero.pt.title,
    );
    await expect(page.locator('meta[http-equiv="refresh" i]')).toHaveCount(0);
    await expect(page.getByRole('main')).not.toContainText(
      /Escolha seu idioma|Choose your language|Continuar em português|Continue in English/,
    );
    await expect(page.locator('main .language-choices')).toHaveCount(0);

    await openMobileHeader(page);
    const languages = page.getByRole('navigation', {
      name: 'Idioma',
      exact: true,
    });
    await expect(
      languages.getByRole('link', { name: 'Português', exact: true }),
    ).toHaveAttribute('aria-current', 'page');
    const english = languages.getByRole('link', {
      name: 'English',
      exact: true,
    });
    await expect(english).toHaveAttribute('href', '/en/');
    await english.focus();
    await expect(english).toBeFocused();
    await english.press('Enter');
    await expect(page).toHaveURL('/en/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      homeHero.en.title,
    );

    await openMobileHeader(page);
    const portuguese = page
      .getByRole('navigation', { name: 'Language', exact: true })
      .getByRole('link', { name: 'Português', exact: true });
    await expect(portuguese).toHaveAttribute('href', '/');
    await portuguese.focus();
    await portuguese.press('Enter');
    await expect(page).toHaveURL('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  });

  test('alias português permanece acessível e logo e Início levam à raiz', async ({
    page,
  }) => {
    const response = await page.goto('/pt/');
    expect(response?.status()).toBe(200);
    expect(response?.request().redirectedFrom()).toBeNull();
    await expect(page).toHaveURL('/pt/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      homeHero.pt.title,
    );
    await expect(page.locator('meta[http-equiv="refresh" i]')).toHaveCount(0);
    const brand = page.getByRole('link', {
      name: 'C4AI — Início',
      exact: true,
    });
    await expect(brand).toHaveAttribute('href', '/');
    await brand.click();
    await expect(page).toHaveURL('/');

    await page.goto('/pt/');
    const mobile = await openMobileHeader(page);
    const home = page
      .getByRole('navigation', {
        name: mobile ? 'Principal móvel' : 'Principal',
        exact: true,
      })
      .getByRole('link', { name: 'Início', exact: true });
    await expect(home).toHaveAttribute('href', '/');
    await expect(home).toHaveAttribute('aria-current', 'page');
    await home.focus();
    await home.press('Enter');
    await expect(page).toHaveURL('/');
  });

  test('recuperação da 404 preserva as duas Homes', async ({ page }) => {
    for (const [label, path] of [
      ['Voltar ao início', '/'],
      ['Return to home', '/en/'],
    ] as const) {
      expect((await page.goto('/pagina-que-nao-existe/'))?.status()).toBe(404);
      const home = page.getByRole('link', { name: label, exact: true });
      await expect(home).toHaveAttribute('href', path);
      await home.click();
      await expect(page).toHaveURL(path);
    }
  });
});
