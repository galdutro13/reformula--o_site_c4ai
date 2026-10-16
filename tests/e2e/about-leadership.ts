import { test, expect, type Page } from '@playwright/test';
import { aboutLeadership } from './requirements';

async function leadershipGeometry(page: Page) {
  return page.locator('.about-leadership').evaluate((section) => {
    const box = (element: Element) => {
      const { x, y, width, height, right, bottom } =
        element.getBoundingClientRect();
      return { x, y, width, height, right, bottom };
    };
    const text = (element: Element) => ({
      ...box(element),
      size: Number.parseFloat(getComputedStyle(element).fontSize),
      align: getComputedStyle(element).textAlign,
    });
    return {
      section: box(section),
      introduction: box(section.querySelector('.leadership-intro')!),
      groups: [...section.querySelectorAll('.leadership-group')].map(
        (group) => ({
          ...box(group),
          title: box(group.querySelector('h3')!),
          grid: box(group.querySelector('.leadership-grid')!),
          cards: [...group.querySelectorAll('.leadership-card')].map((card) => {
            const photo = card.querySelector('img')!;
            const link = card.querySelector('a');
            return {
              ...box(card),
              photo: {
                ...box(photo),
                radius: getComputedStyle(photo).borderRadius,
                fit: getComputedStyle(photo).objectFit,
              },
              name: text(card.querySelector('h4')!),
              role: text(card.querySelector('.leadership-role')!),
              affiliation: text(card.querySelector('.leadership-affiliation')!),
              biography: text(card.querySelector('.leadership-biography')!),
              link: link
                ? { ...box(link), text: box(link.querySelector('span')!) }
                : null,
            };
          }),
        }),
      ),
    };
  });
}

type CardGeometry = Awaited<
  ReturnType<typeof leadershipGeometry>
>['groups'][number]['cards'][number];

function assertCardHierarchy(card: CardGeometry) {
  expect(card.photo.width).toBeGreaterThanOrEqual(120);
  expect(card.photo.width).toBeLessThanOrEqual(140);
  expect(Math.abs(card.photo.height - card.photo.width)).toBeLessThan(1);
  expect(card.photo.radius).toBe('50%');
  expect(card.photo.fit).toBe('cover');
  expect(card.photo.x - card.x).toBeGreaterThanOrEqual(20);
  expect(card.photo.x - card.x).toBeLessThanOrEqual(32);
  expect(card.photo.y - card.y).toBeGreaterThanOrEqual(20);
  expect(card.photo.y - card.y).toBeLessThanOrEqual(32);
  expect(card.name.y - card.photo.bottom).toBeGreaterThanOrEqual(16);
  expect(card.name.y - card.photo.bottom).toBeLessThanOrEqual(24);
  expect(card.role.y - card.name.bottom).toBeGreaterThanOrEqual(4);
  expect(card.role.y - card.name.bottom).toBeLessThanOrEqual(8);
  expect(card.affiliation.y).toBeGreaterThanOrEqual(card.role.bottom);
  expect(card.biography.y - card.affiliation.bottom).toBeGreaterThanOrEqual(16);
  expect(card.biography.y - card.affiliation.bottom).toBeLessThanOrEqual(24);
  for (const element of [
    card.name,
    card.role,
    card.affiliation,
    card.biography,
  ]) {
    expect(Math.abs(element.x - card.photo.x)).toBeLessThan(1);
    expect(['left', 'start']).toContain(element.align);
    expect(element.right).toBeLessThanOrEqual(card.right - 20);
    expect(element.bottom).toBeLessThanOrEqual(card.bottom - 20);
  }
  expect(card.name.size).toBeGreaterThanOrEqual(20);
  expect(card.name.size).toBeLessThanOrEqual(22);
  expect(card.role.size).toBeGreaterThanOrEqual(15);
  expect(card.role.size).toBeLessThanOrEqual(16);
  expect(card.affiliation.size).toBeGreaterThanOrEqual(13);
  expect(card.affiliation.size).toBeLessThanOrEqual(14);
  expect(card.biography.size).toBeGreaterThanOrEqual(14);
  expect(card.biography.size).toBeLessThanOrEqual(16);
  if (card.link) {
    expect(Math.abs(card.link.x - card.photo.x)).toBeLessThan(1);
    expect(card.link.text.y - card.biography.bottom).toBeGreaterThanOrEqual(20);
    expect(card.bottom - card.link.bottom).toBeGreaterThanOrEqual(20);
    expect(card.bottom - card.link.bottom).toBeLessThanOrEqual(32);
  }
}

function assertGroupGrid(cards: CardGeometry[], columns: number) {
  for (let index = 0; index < cards.length; index += columns) {
    const row = cards.slice(index, index + columns);
    for (const [position, card] of row.entries()) {
      expect(Math.abs(card.y - row[0].y)).toBeLessThan(1);
      expect(Math.abs(card.height - row[0].height)).toBeLessThan(1);
      expect(Math.abs(card.width - cards[0].width)).toBeLessThan(1);
      assertCardHierarchy(card);
      if (position > 0) {
        expect(card.x - row[position - 1].right).toBeGreaterThanOrEqual(20);
        expect(card.x - row[position - 1].right).toBeLessThanOrEqual(24);
      }
    }
    const links = row.map((card) => card.link).filter((link) => link !== null);
    for (const link of links)
      expect(Math.abs(link.bottom - links[0].bottom)).toBeLessThan(1);
    if (index >= columns) {
      const previous = cards[index - columns];
      expect(row[0].y - previous.bottom).toBeGreaterThanOrEqual(20);
      expect(row[0].y - previous.bottom).toBeLessThanOrEqual(24);
      expect(Math.abs(row[0].x - cards[0].x)).toBeLessThan(1);
    }
  }
}

for (const locale of ['pt', 'en'] as const) {
  const required = aboutLeadership[locale];

  test(`${locale}: liderança distingue grupos, nomes, cargos e biografias nos seis cartões`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const section = page.getByRole('region', {
      name: required.title,
      exact: true,
    });
    await expect(section).toHaveAttribute('id', required.anchor);
    await expect(section).toHaveAttribute(
      'aria-labelledby',
      'about-leadership-title',
    );
    await expect(section.getByRole('heading', { level: 2 })).toHaveText(
      required.title,
    );
    await expect(section.locator('.leadership-intro > p')).toHaveText(
      required.introduction,
    );
    await expect(section.getByRole('heading', { level: 3 })).toHaveText(
      required.groups.map((group) => group.title),
    );
    await expect(section.getByRole('heading', { level: 4 })).toHaveText(
      required.profiles.map((profile) => profile.name),
    );
    await expect(section.locator('article.leadership-card')).toHaveCount(6);
    await expect(section.locator('.leadership-group')).toHaveCount(2);
    for (const group of required.groups) {
      const region = section.locator(`section#${group.id}`);
      await expect(region.getByRole('heading', { level: 3 })).toHaveText(
        group.title,
      );
      await expect(region.getByRole('heading', { level: 4 })).toHaveText([
        ...group.people,
      ]);
    }
    for (const expected of required.profiles) {
      const card = section.getByRole('article', {
        name: expected.name,
        exact: true,
      });
      await expect(card.getByRole('heading')).toHaveText(expected.name);
      await expect(card.locator('.leadership-role')).toHaveText(expected.role);
      await expect(card.locator('.leadership-affiliation')).toHaveText(
        expected.affiliation,
      );
      const biography = card.locator('.leadership-biography');
      await expect(biography).toHaveText(expected.biography);
      await expect(biography).toBeVisible();
      expect(
        (await biography.innerText()).trim().split(/\s+/).length,
      ).toBeLessThanOrEqual(45);
      const photo = card.getByRole('img', { name: expected.alt, exact: true });
      await expect(photo).toHaveAttribute('src', expected.image);
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo.evaluate((image: HTMLImageElement) => image.naturalWidth),
        )
        .toBeGreaterThan(0);
      if ('link' in expected) {
        const link = card.getByRole('link', {
          name: expected.link.label,
          exact: true,
        });
        await expect(link).toHaveAttribute('href', expected.link.href);
        await expect(link.locator('[aria-hidden="true"]')).toHaveText('↗');
      } else {
        await expect(card.getByRole('link')).toHaveCount(0);
      }
    }
    await expect(section.getByRole('link')).toHaveCount(3);
    await expect(section.locator('details, script, astro-island')).toHaveCount(
      0,
    );
    await expect(section).not.toContainText(
      /Comitê Executivo|Executive Committee|professor assistente|assistant professor|Business Administration \(FGV|Administração \(FGV/,
    );
  });

  test(`${locale}: links institucionais da liderança mantêm ordem e foco pelo teclado`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const links = page.locator('.about-leadership .leadership-card-link');
    await expect(links).toHaveCount(3);
    await links.first().focus();
    for (let index = 0; index < 3; index++) {
      const link = links.nth(index);
      await expect(link).toBeFocused();
      await expect(link).toHaveCSS('outline-style', 'solid');
      await expect(link).not.toHaveCSS('outline-width', '0px');
      if (index < 2) await page.keyboard.press('Tab');
    }
    await page.keyboard.press('Shift+Tab');
    await expect(links.nth(1)).toBeFocused();
  });

  test(`${locale}: cartões da liderança alinham retratos e texto em três, duas e uma colunas`, async ({
    page,
  }) => {
    await page.goto(required.path);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [1440, 1100, 1099, 701, 700, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const geometry = await leadershipGeometry(page);
      const columns = width >= 1100 ? 3 : width > 700 ? 2 : 1;
      for (const group of geometry.groups) {
        expect(group.x).toBeGreaterThanOrEqual(geometry.section.x);
        expect(group.right).toBeLessThanOrEqual(geometry.section.right + 1);
        expect(group.title.bottom).toBeLessThanOrEqual(group.grid.y);
        expect(group.cards).toHaveLength(3);
        assertGroupGrid(group.cards, columns);
      }
      expect(geometry.groups[0].y).toBeGreaterThan(
        geometry.introduction.bottom,
      );
      expect(
        geometry.groups[1].y - geometry.groups[0].bottom,
      ).toBeGreaterThanOrEqual(40);
      expect(
        geometry.groups[1].y - geometry.groups[0].bottom,
      ).toBeLessThanOrEqual(48);
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
