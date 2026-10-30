import { test, expect, type Page } from '@playwright/test';
import { aboutIntro } from './requirements';

async function assertIntroLayout(page: Page, width: number, height: number) {
  await page.setViewportSize({ width, height });
  const geometry = await page.locator('.page-about').evaluate((el) => {
    const box = (element: Element) => {
      const { x, y, width, height, right, bottom } =
        element.getBoundingClientRect();
      return { x, y, width, height, right, bottom };
    };
    const hero = el.querySelector('.page-hero')!;
    const copy = hero.querySelector('.about-hero-copy')!;
    const heading = copy.querySelector('h1')!;
    const description = copy.querySelector('.rich-text p')!;
    const action = copy.querySelector('.about-hero-action')!;
    const image = hero.querySelector('.hero-background')!;
    const activities = el.querySelector('.about-activities')!;
    const institution = el.querySelector('#about-2')!;
    return {
      hero: box(hero),
      copy: box(copy),
      heading: box(heading),
      description: box(description),
      action: box(action),
      image: box(image),
      activities: box(activities),
      institution: box(institution),
      institutionColumn: box(
        institution.querySelector('.about-presentation-copy')!,
      ),
      titleSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      descriptionSize: Number.parseFloat(
        getComputedStyle(description).fontSize,
      ),
      textAlign: getComputedStyle(copy).textAlign,
      imageFit: getComputedStyle(image).objectFit,
      cards: [...activities.querySelectorAll('.about-activity-card')].map(
        (card) => ({
          ...box(card),
          copy: box(card.querySelector('.about-activity-copy')!),
          title: box(card.querySelector('h3')!),
          description: box(card.querySelector('p')!),
          link: box(card.querySelector('a')!),
        }),
      ),
    };
  });
  expect(geometry.textAlign).toBe('left');
  for (const item of [
    geometry.heading,
    geometry.description,
    geometry.action,
  ]) {
    expect(Math.abs(item.x - geometry.copy.x)).toBeLessThan(2);
    expect(item.right).toBeLessThanOrEqual(geometry.hero.right + 1);
    expect(item.y).toBeGreaterThanOrEqual(geometry.hero.y);
    expect(item.bottom).toBeLessThanOrEqual(geometry.hero.bottom);
  }
  expect(geometry.description.y).toBeGreaterThanOrEqual(
    geometry.heading.bottom,
  );
  expect(geometry.action.y).toBeGreaterThanOrEqual(geometry.description.bottom);
  expect(geometry.action.height).toBeGreaterThanOrEqual(48);
  expect(geometry.titleSize).toBeGreaterThan(geometry.descriptionSize);
  expect(geometry.imageFit).toBe('cover');
  expect(Math.abs(geometry.image.width - geometry.hero.width)).toBeLessThan(2);
  expect(Math.abs(geometry.image.height - geometry.hero.height)).toBeLessThan(
    2,
  );
  expect(geometry.activities.y).toBeGreaterThanOrEqual(geometry.hero.bottom);
  expect(geometry.institution.y).toBeGreaterThanOrEqual(
    geometry.activities.bottom,
  );
  expect(Math.abs(geometry.copy.x - geometry.activities.x)).toBeLessThan(2);
  expect(Math.abs(geometry.copy.x - geometry.institutionColumn.x)).toBeLessThan(
    2,
  );
  expect(geometry.cards).toHaveLength(2);
  for (const card of geometry.cards) {
    expect(card.right).toBeLessThanOrEqual(geometry.activities.right + 1);
    expect(card.x).toBeGreaterThanOrEqual(geometry.activities.x);
    expect(card.title.y).toBeGreaterThanOrEqual(card.y);
    expect(card.description.y).toBeGreaterThanOrEqual(card.title.bottom);
    expect(card.link.bottom).toBeLessThanOrEqual(card.bottom);
    expect(card.link.height).toBeGreaterThanOrEqual(44);
    expect(Math.abs(card.title.x - card.description.x)).toBeLessThan(2);
    if (width >= 1100) {
      expect(card.link.x).toBeGreaterThanOrEqual(card.copy.right);
      expect(card.height).toBeLessThanOrEqual(176);
    } else {
      expect(card.link.y).toBeGreaterThanOrEqual(card.description.bottom);
    }
  }
  const [first, second] = geometry.cards;
  if (width > 700) {
    expect(Math.abs(first.y - second.y)).toBeLessThan(2);
    expect(Math.abs(first.width - second.width)).toBeLessThan(2);
    expect(second.x).toBeGreaterThan(first.right);
  } else {
    expect(Math.abs(first.x - second.x)).toBeLessThan(2);
    expect(second.y).toBeGreaterThan(first.bottom);
  }
  if (width >= 1280) {
    expect(geometry.hero.height).toBeGreaterThanOrEqual(400);
    expect(geometry.hero.height).toBeLessThanOrEqual(520);
    expect(geometry.titleSize).toBeGreaterThanOrEqual(44);
    expect(geometry.titleSize).toBeLessThanOrEqual(52);
    expect(geometry.descriptionSize).toBeGreaterThanOrEqual(18);
    expect(geometry.descriptionSize).toBeLessThanOrEqual(22);
    expect(geometry.institution.y).toBeLessThan(900);
  }
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
}

for (const locale of ['pt', 'en'] as const) {
  const required = aboutIntro[locale];

  test(`${locale}: Sobre apresenta identidade, descrição, pesquisas e dois canais complementares`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const hero = page.locator('.page-about .page-hero');
    await expect(hero.locator('.about-hero-eyebrow')).toHaveText(
      required.eyebrow,
    );
    const heading = hero.getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(required.title);
    expect(
      await heading.evaluate((el) =>
        el.closest('[lang]')?.getAttribute('lang'),
      ),
    ).toBe(required.lang);
    await expect(hero.locator('.rich-text p')).toHaveText(required.description);
    const action = hero.getByRole('link', {
      name: required.action,
      exact: true,
    });
    await expect(action).toHaveAttribute('href', required.destination);
    await expect(action.locator('[aria-hidden="true"]')).toHaveCount(1);
    await expect(hero.getByRole('link')).toHaveCount(1);
    const image = hero.locator('img.hero-background');
    await expect(image).toHaveAttribute('src', required.image);
    await expect(image).toHaveAttribute('alt', '');
    await expect(image).toHaveAttribute('loading', 'eager');
    expect(
      await image.evaluate((el: HTMLImageElement) => el.naturalWidth),
    ).toBeGreaterThan(0);
    const activities = page.locator('section#Overlappable.about-activities');
    await expect(activities.getByRole('heading', { level: 2 })).toHaveText(
      required.activities,
    );
    const cards = activities.locator('article.about-activity-card');
    await expect(cards).toHaveCount(2);
    for (const [index, expected] of required.cards.entries()) {
      const card = cards.nth(index);
      await expect(card.getByRole('heading', { level: 3 })).toHaveText(
        expected.title,
      );
      await expect(card.locator('.about-activity-copy p')).toHaveText(
        expected.description,
      );
      const link = card.getByRole('link', {
        name: expected.action,
        exact: true,
      });
      await expect(link.locator('span').first()).toHaveText(expected.action);
      await expect(link).toHaveAttribute('href', expected.href);
      await expect(card.getByRole('link')).toHaveCount(1);
      const icon = card.locator('svg');
      await expect(icon).toHaveCount(1);
      expect(
        await icon.evaluate((el) =>
          Boolean(el.closest('[aria-hidden="true"]')),
        ),
      ).toBe(true);
      await expect(icon).toHaveAttribute('focusable', 'false');
      await expect(link.locator('[aria-hidden="true"]')).toHaveCount(1);
    }
    expect(
      await page.locator('.page-about').evaluate((el) => {
        const hero = el.querySelector('.page-hero')!;
        const activities = el.querySelector('#Overlappable')!;
        const institution = el.querySelector('#about-2')!;
        return (
          Boolean(
            hero.compareDocumentPosition(activities) &
            Node.DOCUMENT_POSITION_FOLLOWING,
          ) &&
          Boolean(
            activities.compareDocumentPosition(institution) &
            Node.DOCUMENT_POSITION_FOLLOWING,
          )
        );
      }),
    ).toBe(true);
    await expect(
      page.locator('.page-about .page-hero script, .about-activities script'),
    ).toHaveCount(0);
    await expect(page.locator('.page-about astro-island')).toHaveCount(0);
  });

  test(`${locale}: Sobre mantém sequência de teclado, foco e acesso nativo a pesquisas`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const heroAction = page.locator('.about-hero-action');
    await heroAction.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    for (const link of [
      heroAction,
      ...required.cards.map((card) =>
        page.locator('.about-activities').getByRole('link', {
          name: card.action,
          exact: true,
        }),
      ),
    ]) {
      await expect(link).toBeFocused();
      await expect(link).toHaveCSS('outline-style', 'solid');
      await expect(link).not.toHaveCSS('outline-width', '0px');
      await page.keyboard.press('Tab');
    }
    await heroAction.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(required.destination);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test(`${locale}: introdução de Sobre alinha conteúdo, compacta canais e adapta a largura`, async ({
    page,
  }) => {
    await page.goto(required.path);
    await page.evaluate(() => document.fonts.ready);
    for (const [width, height] of [
      [1440, 900],
      [1280, 800],
      [1024, 900],
      [768, 900],
      [390, 844],
      [320, 800],
    ]) {
      await assertIntroLayout(page, width, height);
    }
  });
}
