import { test, expect, type Locator } from '@playwright/test';
import { homeHero } from './requirements';

async function assertHeroLayout(hero: Locator, desktop: boolean) {
  const geometry = await hero.evaluate((el) => {
    const inner = el.querySelector('.hero-inner')!;
    const text = inner.querySelector(':scope > div')!;
    const heading = inner.querySelector('h1')!;
    const action = text.querySelector('a')!;
    const image = inner.querySelector('img.home-illustration')!;
    const box = (element: Element) => {
      const { x, y, width, height, right, bottom } =
        element.getBoundingClientRect();
      return { x, y, width, height, right, bottom };
    };
    const headingStyle = getComputedStyle(heading);
    const heroStyle = getComputedStyle(el);
    return {
      hero: box(el),
      inner: box(inner),
      text: box(text),
      heading: box(heading),
      action: box(action),
      image: box(image),
      fontSize: Number.parseFloat(headingStyle.fontSize),
      lineHeight: Number.parseFloat(headingStyle.lineHeight),
      columnGap: Number.parseFloat(getComputedStyle(inner).columnGap),
      paddingTop: Number.parseFloat(heroStyle.paddingTop),
      paddingBottom: Number.parseFloat(heroStyle.paddingBottom),
    };
  });
  expect(geometry.action.height).toBeGreaterThanOrEqual(48);
  expect(geometry.action.y - geometry.heading.bottom).toBeGreaterThanOrEqual(
    24,
  );
  expect(geometry.action.y - geometry.heading.bottom).toBeLessThanOrEqual(32);
  expect(
    Math.abs(
      geometry.hero.height -
        geometry.inner.height -
        geometry.paddingTop -
        geometry.paddingBottom,
    ),
  ).toBeLessThan(2);
  expect(
    Math.abs(geometry.image.width / geometry.image.height - 856 / 580),
  ).toBeLessThan(0.01);
  if (desktop) {
    expect(geometry.image.x).toBeGreaterThanOrEqual(geometry.text.right);
    expect(
      Math.abs(
        geometry.text.y +
          geometry.text.height / 2 -
          geometry.image.y -
          geometry.image.height / 2,
      ),
    ).toBeLessThan(2);
    expect(geometry.fontSize).toBeGreaterThanOrEqual(40);
    expect(geometry.fontSize).toBeLessThanOrEqual(44);
    expect(geometry.lineHeight / geometry.fontSize).toBeGreaterThanOrEqual(
      1.15,
    );
    expect(geometry.lineHeight / geometry.fontSize).toBeLessThanOrEqual(1.2);
    expect(geometry.columnGap).toBeGreaterThanOrEqual(48);
    expect(geometry.columnGap).toBeLessThanOrEqual(64);
    for (const padding of [geometry.paddingTop, geometry.paddingBottom]) {
      expect(padding).toBeGreaterThanOrEqual(48);
      expect(padding).toBeLessThanOrEqual(64);
    }
    expect(geometry.image.height).toBeLessThanOrEqual(400);
  } else {
    expect(geometry.image.y).toBeGreaterThanOrEqual(geometry.action.bottom);
    expect(geometry.image.height).toBeLessThanOrEqual(288);
    expect(geometry.heading.width).toBeLessThanOrEqual(geometry.inner.width);
    expect(geometry.fontSize).toBeGreaterThanOrEqual(24);
    expect(geometry.fontSize).toBeLessThanOrEqual(44);
  }
}

for (const locale of ['pt', 'en'] as const) {
  const required = homeHero[locale];

  test(`${locale}: destaque inicial mantém título e ilustração e apresenta CTA descritivo`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const hero = page.locator('.home-hero');
    await expect(hero).toHaveCount(1);
    const heading = hero.getByRole('heading', {
      name: required.title,
      level: 1,
      exact: true,
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveAttribute('lang', required.lang);
    const action = hero.getByRole('link', {
      name: required.action,
      exact: true,
    });
    await expect(action).toBeVisible();
    await expect(action).toHaveAttribute('href', required.destination);
    await expect(action.locator('[aria-hidden="true"]')).toHaveCount(1);
    await expect(hero.getByRole('link')).toHaveCount(1);
    await expect(
      hero.getByRole('link', { name: required.previousAction, exact: true }),
    ).toHaveCount(0);
    const image = hero.locator('img.home-illustration');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', required.image);
    await expect(image).toHaveAttribute('alt', '');
    await expect(image).toHaveAttribute('width', String(required.imageWidth));
    await expect(image).toHaveAttribute('height', String(required.imageHeight));
    await expect(hero.getByRole('img')).toHaveCount(0);
    await expect
      .poll(() =>
        image.evaluate((el: HTMLImageElement) => ({
          complete: el.complete,
          width: el.naturalWidth,
          height: el.naturalHeight,
        })),
      )
      .toEqual({
        complete: true,
        width: required.imageWidth,
        height: required.imageHeight,
      });
  });

  test(`${locale}: CTA inicial responde a foco e hover e abre Sobre por teclado`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const action = page.locator('.home-hero').getByRole('link', {
      name: required.action,
      exact: true,
    });
    const background = await action.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    await action.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(action).toBeFocused();
    await expect(action).toHaveCSS('outline-style', 'solid');
    await expect(action).not.toHaveCSS('outline-width', '0px');
    await page.keyboard.press('Tab');
    await page.mouse.move(0, 0);
    await action.hover();
    await expect(action).not.toHaveCSS('background-color', background);
    await action.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(required.destination);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test(`${locale}: destaque inicial equilibra texto e imagem e empilha em telas menores`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const hero = page.locator('.home-hero');
    for (const width of [1440, 1024, 800, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await assertHeroLayout(hero, width >= 1024);
      await expect(
        hero.getByRole('link', { name: required.action, exact: true }),
      ).toBeVisible();
      await expect(hero.locator('img.home-illustration')).toBeVisible();
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
    }
  });
}
