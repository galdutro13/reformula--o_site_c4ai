import { test, expect, type Locator } from '@playwright/test';
import { languageProjectIllustrations, languageProjects } from './requirements';
const misplacedNlp2Text =
  'syntactically annotated texts for building robust tagging and parsing models;';

async function assertProjectLayout(cards: Locator, columns: number) {
  const boxes = await cards.evaluateAll((els) =>
    els.map((el) => {
      const { x, y, width, right, bottom } = el.getBoundingClientRect();
      return { x, y, width, right, bottom };
    }),
  );
  expect(boxes).toHaveLength(2);
  expect(Math.abs(boxes[0].width - boxes[1].width)).toBeLessThan(2);
  if (columns === 2) {
    expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
    expect(Math.abs(boxes[0].bottom - boxes[1].bottom)).toBeLessThan(2);
    expect(boxes[1].x).toBeGreaterThan(boxes[0].right);
    for (const section of [
      '.project-card-focus',
      '.project-card-leadership',
      '.project-card-panels',
      '.project-card-contact',
    ]) {
      const first = await cards.nth(0).locator(section).boundingBox();
      const second = await cards.nth(1).locator(section).boundingBox();
      expect(first).not.toBeNull();
      expect(second).not.toBeNull();
      expect(Math.abs(first!.y - second!.y), section).toBeLessThan(2);
    }
  } else {
    expect(Math.abs(boxes[0].x - boxes[1].x)).toBeLessThan(2);
    expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].bottom);
  }
}

async function assertKeyboardPanel(panel: Locator) {
  const summary = panel.locator(':scope > summary');
  await summary.focus();
  await expect(summary).toBeFocused();
  await expect(summary).toHaveCSS('outline-style', 'solid');
  await expect(summary).not.toHaveCSS('outline-width', '0px');
  await expect(panel.locator(':scope > .panel-body')).toBeHidden();
  await summary.press('Enter');
  await expect(panel).toHaveAttribute('open', '');
  await expect(panel.locator(':scope > .panel-body')).toBeVisible();
  await summary.press('Space');
  await expect(panel).not.toHaveAttribute('open');
  await expect(panel.locator(':scope > .panel-body')).toBeHidden();
}

for (const locale of ['pt', 'en'] as const) {
  const required = languageProjects[locale];

  test(`${locale}: cards usam as ilustrações locais do Figma com proporção e decoração preservadas`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(required.path);
    for (const expected of languageProjectIllustrations) {
      const card = page.locator(`#${expected.anchor}`);
      const illustration = card.locator(
        '.project-card-introduction img.project-card-illustration',
      );
      await expect(illustration).toHaveCount(1);
      await expect(illustration).toBeVisible();
      await expect(illustration).toHaveAttribute('src', expected.src);
      await expect(illustration).toHaveAttribute('alt', '');
      await expect(illustration).toHaveAttribute('aria-hidden', 'true');
      await expect(illustration).toHaveAttribute(
        'width',
        String(expected.width),
      );
      await expect(illustration).toHaveAttribute(
        'height',
        String(expected.height),
      );
      await expect(card.getByRole('img')).toHaveCount(0);
      await expect
        .poll(() =>
          illustration.evaluate((el: HTMLImageElement) => ({
            complete: el.complete,
            width: el.naturalWidth,
            height: el.naturalHeight,
          })),
        )
        .toEqual({
          complete: true,
          width: expected.width,
          height: expected.height,
        });
      const imageBox = await illustration.boundingBox();
      const introductionBox = await card
        .locator('.project-card-introduction')
        .boundingBox();
      const textBox = await card
        .locator('.project-card-introduction > div')
        .boundingBox();
      expect(imageBox).not.toBeNull();
      expect(introductionBox).not.toBeNull();
      expect(textBox).not.toBeNull();
      expect(Math.abs(imageBox!.width - imageBox!.height)).toBeLessThan(1);
      expect(imageBox!.x).toBeGreaterThanOrEqual(textBox!.x + textBox!.width);
      expect(imageBox!.x + imageBox!.width).toBeLessThanOrEqual(
        introductionBox!.x + introductionBox!.width + 1,
      );
    }
    await page.setViewportSize({ width: 320, height: 900 });
    for (const expected of languageProjectIllustrations)
      await expect(
        page.locator(`#${expected.anchor} .project-card-illustration`),
      ).toBeHidden();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });

  test(`${locale}: projetos de línguas têm título dominante, resumo, frentes e liderança separados`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const cards = page.locator('#languages article.research-project-card');
    await expect(cards).toHaveCount(2);
    for (const [index, expected] of required.cards.entries()) {
      const card = cards.nth(index);
      await expect(card).toHaveAttribute('id', expected.anchor);
      await expect(card).toHaveAttribute(
        'aria-labelledby',
        `${expected.anchor}-title`,
      );
      const title = card.getByRole('heading', {
        name: expected.title,
        level: 3,
        exact: true,
      });
      await expect(title).toBeVisible();
      await expect(title).toHaveAttribute('id', `${expected.anchor}-title`);
      await expect(
        card.getByRole('heading', { name: expected.acronym, exact: true }),
      ).toHaveCount(0);
      const badge = card.locator('.project-card-badge');
      await expect(badge).toHaveText(expected.acronym);
      expect(
        Number.parseFloat(
          await title.evaluate((el) => getComputedStyle(el).fontSize),
        ),
      ).toBeGreaterThan(
        Number.parseFloat(
          await badge.evaluate((el) => getComputedStyle(el).fontSize),
        ),
      );
      await expect(
        card.getByText(expected.summary, { exact: true }),
      ).toBeVisible();
      const focus = card.getByRole('heading', {
        name: required.focus,
        level: 4,
        exact: true,
      });
      await expect(focus).toBeVisible();
      await expect(focus.locator('..').getByRole('listitem')).toHaveText([
        ...expected.focusAreas,
      ]);
      const leadership = card.getByRole('heading', {
        name: required.leadership,
        level: 4,
        exact: true,
      });
      await expect(leadership).toBeVisible();
      await expect(
        leadership.locator('..').getByText(expected.leaders, { exact: true }),
      ).toBeVisible();
      await expect(title).not.toContainText(expected.leaders);
      const mail = card.getByRole('link', {
        name: expected.contact,
        exact: true,
      });
      await expect(mail).toBeVisible();
      await expect(mail).toHaveAttribute('href', `mailto:${expected.contact}`);
      await expect(card.locator('a[href^="mailto:"]')).toHaveCount(1);
      expect((await card.textContent())!.split(expected.contact)).toHaveLength(
        2,
      );
      await expect(
        card.getByText(expected.detailedText, { exact: true }),
      ).toBeHidden();
    }
    await expect(page.locator('#ProIndL_B_eng')).not.toContainText(
      misplacedNlp2Text,
    );
  });

  test(`${locale}: descrição completa, equipe e recursos permanecem em painéis nativos com teclado`, async ({
    page,
  }) => {
    await page.goto(required.path);
    for (const expected of required.cards) {
      const card = page.locator(`#${expected.anchor}`);
      const panels = card.locator('details');
      await expect(panels).toHaveCount(3);
      await expect(card.locator('details[open]')).toHaveCount(0);
      for (const [index, label] of required.panels.entries()) {
        const summary = panels.nth(index).locator(':scope > summary');
        await expect(summary).toContainText(label);
        await assertKeyboardPanel(panels.nth(index));
      }
      const description = panels.first();
      await expect(description.locator('summary')).toHaveAttribute(
        'aria-label',
        `${required.panels[0]} ${expected.acronym}`,
      );
      await description.locator('summary').press('Enter');
      await expect(
        description.getByText(expected.detailedText, { exact: true }),
      ).toBeVisible();
      if (expected.acronym === 'ProIndL')
        await expect(description).not.toContainText(misplacedNlp2Text);
      await expect(description.getByRole('listitem')).toHaveCount(3);
      await expect(description.getByRole('heading')).toHaveCount(0);
      await expect(
        description.locator('details,a[href^="mailto:"]'),
      ).toHaveCount(0);
      await description.locator('summary').press('Enter');
      const team = panels.nth(1);
      const resources = panels.nth(2);
      await expect(team).toHaveAttribute('id', expected.teamId);
      await expect(resources).toHaveAttribute('id', expected.resourceId);
      expect(
        await team
          .locator('a')
          .evaluateAll((els) => els.map((el) => el.getAttribute('href'))),
      ).toEqual([...expected.teamUrls]);
      expect(
        await resources
          .locator('a')
          .evaluateAll((els) => els.map((el) => el.getAttribute('href'))),
      ).toEqual([...expected.resourceUrls]);
      await team.locator('summary').focus();
      await page.keyboard.press('Tab');
      await expect(resources.locator('summary')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(
        card.getByRole('link', { name: expected.contact, exact: true }),
      ).toBeFocused();
    }
  });

  test(`${locale}: cards de línguas alinham componentes e empilham quando falta espaço`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const cards = page.locator('#languages article.research-project-card');
    for (const width of [1440, 800, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await assertProjectLayout(cards, width === 1440 ? 2 : 1);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
    }
    for (const summary of await cards.locator('details > summary').all())
      await summary.click();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
}
