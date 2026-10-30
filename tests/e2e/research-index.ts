import { test, expect, type Locator } from '@playwright/test';
import { researchIndex, researchHero } from './requirements';

async function assertIndexLayout(
  cards: Locator,
  history: Locator,
  desktop: boolean,
) {
  const boxes = await cards.evaluateAll((els) =>
    els.map((el) => {
      const { x, y, width, bottom, right } = el.getBoundingClientRect();
      return { x, y, width, bottom, right };
    }),
  );
  expect(boxes).toHaveLength(2);
  expect(Math.abs(boxes[0].width - boxes[1].width)).toBeLessThan(2);
  if (desktop) {
    expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
    expect(boxes[1].x).toBeGreaterThan(boxes[0].right);
  } else {
    expect(Math.abs(boxes[0].x - boxes[1].x)).toBeLessThan(2);
    expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].bottom);
  }
  const historyBox = await history.boundingBox();
  expect(historyBox).not.toBeNull();
  expect(historyBox!.y).toBeGreaterThan(
    Math.max(boxes[0].bottom, boxes[1].bottom),
  );
}

for (const locale of ['pt', 'en'] as const) {
  const required = researchIndex[locale];
  test(`${locale}: destaque de pesquisas carrega uma fotografia decorativa local`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const hero = page.locator('.page-research .page-hero');
    const image = hero.locator('img.hero-background');
    await expect(image).toHaveCount(1);
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', researchHero.image);
    await expect(image).toHaveAttribute('alt', '');
    await expect(image).toHaveAttribute('width', String(researchHero.width));
    await expect(image).toHaveAttribute('height', String(researchHero.height));
    await expect(image).toHaveAttribute('loading', 'eager');
    await expect(image).toHaveAttribute('fetchpriority', 'high');
    await expect(image).toHaveCSS('object-fit', 'cover');
    await expect(image).toHaveCSS('opacity', researchHero.opacity);
    await expect(hero).toHaveCSS('background-color', researchHero.background);
    await expect(hero).toHaveCSS('background-image', 'none');
    await expect
      .poll(() =>
        image.evaluate((el: HTMLImageElement) => [
          el.naturalWidth,
          el.naturalHeight,
        ]),
      )
      .toEqual([researchHero.width, researchHero.height]);
    const imageBox = (await image.boundingBox())!;
    const heroBox = (await hero.boundingBox())!;
    for (const dimension of ['x', 'y', 'width', 'height'] as const)
      expect(Math.abs(imageBox[dimension] - heroBox[dimension])).toBeLessThan(
        1,
      );
    await expect(page.locator('.source-gallery')).toHaveCount(0);
    await expect(hero.locator('script, astro-island')).toHaveCount(0);
  });

  test(`${locale}: índice de pesquisas com duas áreas e histórico complementar`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const nav = page.getByRole('navigation', {
      name: required.title,
      exact: true,
    });
    const title = nav.getByRole('heading', {
      name: required.title,
      level: 2,
      exact: true,
    });
    await expect(title).toBeVisible();
    await expect(nav).toHaveAttribute(
      'aria-labelledby',
      (await title.getAttribute('id')) as string,
    );
    await expect(
      nav.getByText(required.introduction, { exact: true }),
    ).toBeVisible();
    const lists = nav.locator(':scope > ul');
    await expect(lists).toHaveCount(2);
    const cards = lists.first().locator(':scope > li');
    await expect(cards).toHaveCount(2);
    for (const [index, area] of required.areas.entries()) {
      const heading = cards.nth(index).getByRole('heading', {
        name: area.title,
        level: 3,
        exact: true,
      });
      await expect(heading).toBeVisible();
      await expect(heading.locator('a')).toHaveCount(0);
      await expect(
        cards.nth(index).getByText(area.description, { exact: true }),
      ).toBeVisible();
    }
    const history = lists.last().locator(':scope > li');
    await expect(history).toHaveCount(1);
    await expect(
      history.getByRole('heading', {
        name: required.history,
        level: 3,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      history.getByText(required.historyDescription, { exact: true }),
    ).toBeVisible();
    const viewport = page.viewportSize()!;
    await assertIndexLayout(cards, history, viewport.width >= 1050);
    await page.setViewportSize({ width: 320, height: 800 });
    await assertIndexLayout(cards, history, false);
    await page.setViewportSize(viewport);

    const links = nav.getByRole('link');
    await expect(links).toHaveCount(4);
    expect(
      await links.evaluateAll((els) =>
        els.map((el) => el.getAttribute('href')),
      ),
    ).toEqual(required.links.map((link) => `#${link.anchor}`));
    await links.first().focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    for (const [index, link] of required.links.entries()) {
      const target = nav.getByRole('link', { name: link.label, exact: true });
      await expect(target).toBeFocused();
      await expect(target).toHaveCSS('outline-style', 'solid');
      await expect(target).not.toHaveCSS('outline-width', '0px');
      if (index < required.links.length - 1) await page.keyboard.press('Tab');
    }
    for (const link of required.links) {
      await nav.getByRole('link', { name: link.label, exact: true }).focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(required.path + '#' + link.anchor);
      await expect(page.locator(`[id="${link.anchor}"]`)).toHaveCount(1);
    }
  });
}
