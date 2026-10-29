import { test, expect, type Page } from '@playwright/test';
import { aboutOverview } from './requirements';

async function assertOverviewLayout(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 });
  const geometry = await page.locator('#about-2').evaluate((el) => {
    const box = (element: Element) => {
      const { x, y, width, height, right, bottom } =
        element.getBoundingClientRect();
      return { x, y, width, height, right, bottom };
    };
    const presentation = el.querySelector('.about-presentation')!;
    const principles = el.querySelector('.about-principles')!;
    const location = el.querySelector('.about-location')!;
    return {
      overview: box(el),
      presentation: box(presentation),
      presentationCopy: box(
        presentation.querySelector('.about-presentation-copy')!,
      ),
      presentationImage: box(presentation.querySelector('img')!),
      principles: box(principles),
      cards: [...principles.querySelectorAll('.about-principle')].map(
        (card) => ({
          ...box(card),
          heading: box(card.querySelector('h3')!),
          paragraph: box(card.querySelector('p')!),
          headingSize: getComputedStyle(card.querySelector('h3')!).fontSize,
          headingWeight: getComputedStyle(card.querySelector('h3')!).fontWeight,
        }),
      ),
      location: box(location),
      locationCopy: box(location.querySelector('.about-location-copy')!),
      locationImage: box(location.querySelector('img')!),
      imageFits: [
        presentation.querySelector('img')!,
        location.querySelector('img')!,
      ].map((image) => getComputedStyle(image).objectFit),
    };
  });
  for (const block of [
    geometry.presentation,
    geometry.principles,
    geometry.location,
  ]) {
    expect(block.x).toBeGreaterThanOrEqual(geometry.overview.x - 1);
    expect(block.right).toBeLessThanOrEqual(geometry.overview.right + 1);
  }
  const gaps = [
    geometry.principles.y - geometry.presentation.bottom,
    geometry.location.y - geometry.principles.bottom,
  ];
  for (const gap of gaps) {
    expect(gap).toBeGreaterThanOrEqual(width > 900 ? 40 : 24);
    expect(gap).toBeLessThanOrEqual(80);
  }
  const [mission, vision] = geometry.cards;
  expect(Math.abs(mission.width - vision.width)).toBeLessThan(2);
  expect(mission.headingSize).toBe(vision.headingSize);
  expect(mission.headingWeight).toBe(vision.headingWeight);
  for (const card of geometry.cards) {
    expect(card.heading.y).toBeGreaterThanOrEqual(card.y);
    expect(card.paragraph.y).toBeGreaterThanOrEqual(card.heading.bottom);
    expect(card.paragraph.bottom).toBeLessThanOrEqual(card.bottom + 1);
  }
  expect(geometry.imageFits).toEqual(['cover', 'cover']);
  if (width > 900) {
    expect(geometry.presentationImage.x).toBeGreaterThan(
      geometry.presentationCopy.right + 24,
    );
    expect(
      Math.abs(geometry.presentationCopy.y - geometry.presentationImage.y),
    ).toBeLessThan(24);
    expect(geometry.locationCopy.x).toBeGreaterThan(
      geometry.locationImage.right + 24,
    );
    expect(
      Math.abs(geometry.locationCopy.y - geometry.locationImage.y),
    ).toBeLessThan(24);
    expect(Math.abs(mission.y - vision.y)).toBeLessThan(2);
    expect(Math.abs(mission.height - vision.height)).toBeLessThan(2);
    expect(vision.x).toBeGreaterThan(mission.right);
    expect(geometry.presentationImage.height).toBeGreaterThanOrEqual(260);
    expect(geometry.presentationImage.height).toBeLessThanOrEqual(360);
    expect(geometry.locationImage.height).toBeGreaterThanOrEqual(200);
    expect(geometry.locationImage.height).toBeLessThanOrEqual(300);
  } else {
    expect(geometry.presentationImage.y).toBeGreaterThanOrEqual(
      geometry.presentationCopy.bottom,
    );
    expect(vision.y).toBeGreaterThan(mission.bottom);
    expect(geometry.locationImage.y).toBeGreaterThanOrEqual(
      geometry.locationCopy.bottom,
    );
    expect(Math.abs(mission.x - vision.x)).toBeLessThan(2);
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
  const required = aboutOverview[locale];

  test(`${locale}: apresentação, missão e visão e localização formam grupos próprios`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const overview = page.getByRole('region', {
      name: required.title,
      exact: true,
    });
    await expect(overview).toHaveAttribute('id', 'about-2');
    await expect(overview).toHaveAttribute(
      'aria-labelledby',
      'about-overview-title',
    );
    const copy = overview.locator('.about-presentation-copy');
    await expect(copy.getByRole('heading', { level: 2 })).toHaveText(
      required.title,
    );
    await expect(copy.locator('p')).toHaveText([
      ...required.presentation,
      required.details,
    ]);
    for (const index of [0, 1])
      await expect(copy.locator('p').nth(index)).toBeVisible();
    const details = overview.locator(
      'details#about-details.about-institution-details',
    );
    await expect(details.locator('summary')).toHaveAccessibleName(
      required.detailsAction,
    );
    await expect(details).not.toHaveAttribute('open');
    await expect(details.locator('p')).toHaveText(required.details);
    await expect(details.locator('p')).toBeHidden();
    const principles = overview.getByRole('region', {
      name: required.principles,
      exact: true,
    });
    const cards = principles.locator('article.about-principle');
    await expect(cards).toHaveCount(2);
    for (const [index, expected] of [
      required.mission,
      required.vision,
    ].entries()) {
      await expect(
        cards.nth(index).getByRole('heading', { level: 3 }),
      ).toHaveText(expected.title);
      await expect(cards.nth(index).locator('p')).toHaveText(
        expected.description,
      );
    }
    const location = overview.getByRole('region', {
      name: required.locationTitle,
      exact: true,
    });
    await expect(location).toHaveAttribute(
      'aria-labelledby',
      'about-location-title',
    );
    await expect(location.getByRole('heading', { level: 2 })).toHaveText(
      required.locationTitle,
    );
    const locationCopy = location.locator('.about-location-copy');
    await expect(locationCopy).toContainText(required.locationLabel);
    await expect(locationCopy).toContainText(required.location);
    await expect(locationCopy.locator('address')).toContainText(
      required.address,
    );
    await expect(locationCopy.locator('address')).toContainText(
      required.postalCode,
    );
    const locationLink = location.getByRole('link', {
      name: required.locationAction,
      exact: true,
    });
    await expect(locationLink).toHaveAttribute(
      'href',
      required.locationDestination,
    );
    await expect(locationLink.locator('[aria-hidden="true"]')).toHaveCount(1);
    await expect(overview.getByRole('link')).toHaveCount(1);
    for (const [block, src] of [
      ['.about-presentation', required.presentationImage],
      ['.about-location', required.locationImage],
    ]) {
      const image = overview.locator(`${block} img`);
      await expect(image).toHaveCount(1);
      await expect(image).toHaveAttribute('src', src);
      expect((await image.getAttribute('alt'))!.length).toBeGreaterThan(20);
      await expect(page.locator(`main img[src="${src}"]`)).toHaveCount(1);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth))
        .toBeGreaterThan(0);
    }
    expect(
      await overview.evaluate((el) => {
        const follows = (first: Element, second: Element) =>
          Boolean(
            first.compareDocumentPosition(second) &
            Node.DOCUMENT_POSITION_FOLLOWING,
          );
        const presentation = el.querySelector('.about-presentation')!;
        const principles = el.querySelector('.about-principles')!;
        const location = el.querySelector('.about-location')!;
        return (
          follows(presentation, principles) &&
          follows(principles, location) &&
          follows(
            location.querySelector('.about-location-copy')!,
            location.querySelector('img')!,
          )
        );
      }),
    ).toBe(true);
    await expect(overview.locator('script, astro-island')).toHaveCount(0);
  });

  test(`${locale}: detalhamento nativo e acesso ao contato funcionam pelo teclado`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const details = page.locator('#about-details');
    const summary = details.locator('summary');
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open', '');
    await expect(details.locator('p')).toBeVisible();
    await expect(details.locator('p')).toHaveText(required.details);
    await page.keyboard.press('Space');
    await expect(details).not.toHaveAttribute('open');
    await expect(details.locator('p')).toBeHidden();
    await page.keyboard.press('Enter');
    await expect(details.locator('p')).toBeVisible();
    const locationLink = page.locator('.about-location').getByRole('link', {
      name: required.locationAction,
      exact: true,
    });
    await locationLink.focus();
    await expect(locationLink).toBeFocused();
    await expect(locationLink).toHaveCSS('outline-style', 'solid');
    await expect(locationLink).not.toHaveCSS('outline-width', '0px');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(required.locationDestination);
    await expect(page.locator(`#${required.contact}`)).toBeInViewport();
  });

  test(`${locale}: blocos institucionais equilibram colunas e preservam leitura nas larguras menores`, async ({
    page,
  }) => {
    await page.goto(required.path);
    await page.evaluate(() => document.fonts.ready);
    const details = page.locator('#about-details');
    for (const width of [1440, 1280, 1024, 900, 768, 390, 320]) {
      await assertOverviewLayout(page, width);
      await details.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(details.locator('p')).toBeVisible();
      expect(
        await details.evaluate((el) => {
          const bounds = el.getBoundingClientRect();
          const paragraph = el.querySelector('p')!.getBoundingClientRect();
          const principles = document
            .querySelector('.about-principles')!
            .getBoundingClientRect();
          return (
            paragraph.x >= bounds.x - 1 &&
            paragraph.right <= bounds.right + 1 &&
            paragraph.bottom <= bounds.bottom + 1 &&
            bounds.bottom <= principles.y &&
            document.documentElement.scrollWidth <=
              document.documentElement.clientWidth
          );
        }),
      ).toBe(true);
      await page.keyboard.press('Enter');
      await expect(details).not.toHaveAttribute('open');
    }
  });
}
