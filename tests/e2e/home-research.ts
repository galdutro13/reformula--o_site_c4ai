import { test, expect, type Locator } from '@playwright/test';
import { homeResearch } from './requirements';

async function assertHomeResearchLayout(cards: Locator, columns: number) {
  const boxes = await cards.evaluateAll((els) =>
    els.map((el) => {
      const { x, y, width, right, bottom } = el.getBoundingClientRect();
      return { x, y, width, right, bottom };
    }),
  );
  expect(boxes).toHaveLength(2);
  expect(Math.abs(boxes[0].width - boxes[1].width)).toBeLessThan(2);
  if (columns === 1) {
    expect(Math.abs(boxes[0].x - boxes[1].x)).toBeLessThan(2);
    expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].bottom);
    return;
  }
  expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
  expect(Math.abs(boxes[0].bottom - boxes[1].bottom)).toBeLessThan(2);
  expect(boxes[1].x - boxes[0].right).toBeGreaterThanOrEqual(30);
  expect(boxes[1].x - boxes[0].right).toBeLessThanOrEqual(50);
  for (const selector of [
    'nav',
    'nav li:nth-child(1)',
    'nav li:nth-child(2)',
  ]) {
    const first = await cards.nth(0).locator(selector).boundingBox();
    const second = await cards.nth(1).locator(selector).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(Math.abs(first!.y - second!.y), selector).toBeLessThan(2);
    expect(Math.abs(first!.height - second!.height), selector).toBeLessThan(2);
  }
}

for (const locale of ['pt', 'en'] as const) {
  const required = homeResearch[locale];

  test(`${locale}: início apresenta linhas, resumos e dois blocos navegáveis por card`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const section = page.getByRole('region', {
      name: required.title,
      exact: true,
    });
    await expect(
      section.getByRole('heading', {
        name: required.title,
        level: 2,
        exact: true,
      }),
    ).toBeVisible();
    const cards = section.locator('article.focus-card');
    await expect(cards).toHaveCount(2);
    for (const [index, expected] of required.cards.entries()) {
      const card = cards.nth(index);
      const title = card.getByRole('heading', {
        name: expected.title,
        level: 3,
        exact: true,
      });
      await expect(title).toBeVisible();
      await expect(title.locator('a')).toHaveAttribute('href', expected.href);
      const summary = card.getByText(expected.summary, { exact: true });
      await expect(summary).toBeVisible();
      expect(
        await title.evaluate((el) =>
          Number.parseFloat(getComputedStyle(el).fontSize),
        ),
      ).toBeGreaterThan(
        await summary.evaluate((el) =>
          Number.parseFloat(getComputedStyle(el).fontSize),
        ),
      );
      const navigation = card.getByRole('navigation');
      await expect(navigation).toHaveCount(1);
      const label = navigation.getByRole('heading', {
        name: expected.navigation,
        level: 4,
        exact: true,
      });
      await expect(label).toBeVisible();
      await expect(navigation).toHaveAttribute(
        'aria-labelledby',
        (await label.getAttribute('id')) as string,
      );
      await expect(navigation.getByRole('list')).toHaveCount(1);
      await expect(navigation.getByRole('listitem')).toHaveCount(2);
      await expect(navigation.getByRole('link')).toHaveCount(2);
      for (const item of expected.links) {
        const link = navigation.getByRole('link', {
          name: item.title,
          exact: true,
        });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', item.href);
        const description = link.getByText(item.description, { exact: true });
        await expect(description).toBeVisible();
        await expect(link).toHaveAttribute(
          'aria-describedby',
          (await description.getAttribute('id')) as string,
        );
        await expect(link.locator('[aria-hidden="true"]')).toHaveCount(1);
      }
    }
    await expect(section.getByRole('link')).toHaveCount(6);
  });

  test(`${locale}: projetos e subdivisões do início levam a âncoras existentes por teclado`, async ({
    page,
  }) => {
    for (const expected of required.cards) {
      for (const item of expected.links) {
        await page.goto(required.path);
        const card = page.locator('.focus-card').filter({
          has: page.getByRole('heading', {
            name: expected.title,
            level: 3,
            exact: true,
          }),
        });
        const link = card.getByRole('link', { name: item.title, exact: true });
        await link.focus();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(item.href);
        const target = page.locator(`[id="${item.anchor}"]`);
        await expect(target).toHaveCount(1);
        await expect(target).toBeVisible();
      }
    }
  });

  test(`${locale}: navegação dos cards tem ordem lógica, foco visível e resposta ao mouse`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const section = page.getByRole('region', {
      name: required.title,
      exact: true,
    });
    const expectedLinks = required.cards.flatMap((card) => [
      { title: card.title, href: card.href },
      ...card.links,
    ]);
    await section.getByRole('link').first().focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    for (const [index, expected] of expectedLinks.entries()) {
      const link = section.getByRole('link', {
        name: expected.title,
        exact: true,
      });
      await expect(link).toBeFocused();
      await expect(link).toHaveCSS('outline-style', 'solid');
      await expect(link).not.toHaveCSS('outline-width', '0px');
      if (index < expectedLinks.length - 1) await page.keyboard.press('Tab');
    }
    await page.keyboard.press('Tab');
    await page.mouse.move(0, 0);
    for (const expected of required.cards) {
      for (const item of expected.links) {
        const link = section.getByRole('link', {
          name: item.title,
          exact: true,
        });
        const before = await link.evaluate(
          (el) => getComputedStyle(el).backgroundColor,
        );
        await link.hover();
        await expect(link).not.toHaveCSS('background-color', before);
        await page.mouse.move(0, 0);
      }
    }
  });

  test(`${locale}: cards iniciais alinham regiões e empilham sem transbordar`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const section = page.getByRole('region', {
      name: required.title,
      exact: true,
    });
    const cards = section.locator('article.focus-card');
    for (const width of [1440, 800, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await assertHomeResearchLayout(cards, width === 1440 ? 2 : 1);
      for (const link of await section.getByRole('link').all()) {
        await expect(link).toBeVisible();
        const box = await link.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      }
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
