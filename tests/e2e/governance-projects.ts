import { test, expect, type Locator } from '@playwright/test';
import {
  governanceProjectIllustrations,
  governanceProjects,
  languageProjects,
  researchSubareas,
} from './requirements';

async function assertNativePanel(panel: Locator) {
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
}

for (const locale of ['pt', 'en'] as const) {
  const required = governanceProjects[locale];

  test(`${locale}: governança usa as ilustrações locais do Figma em tamanho nativo e como decoração`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(required.path);
    for (const expected of governanceProjectIllustrations) {
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
      expect(Math.abs(imageBox!.width - expected.width)).toBeLessThan(1);
      expect(Math.abs(imageBox!.height - expected.height)).toBeLessThan(1);
      expect(imageBox!.x).toBeGreaterThanOrEqual(textBox!.x + textBox!.width);
      expect(imageBox!.x + imageBox!.width).toBeLessThanOrEqual(
        introductionBox!.x + introductionBox!.width + 1,
      );
      expect(imageBox!.y).toBeGreaterThanOrEqual(introductionBox!.y);
      expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(
        introductionBox!.y + introductionBox!.height + 1,
      );
    }
    await page.setViewportSize({ width: 320, height: 900 });
    for (const expected of governanceProjectIllustrations)
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

  test(`${locale}: governança mantém Macro/Micro fora dos cards e usa a hierarquia dos projetos de línguas`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const governance = page.locator('#governance');
    await expect(
      governance.getByRole('heading', {
        name: required.sectionTitle,
        level: 2,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      governance.locator('article.research-project-card'),
    ).toHaveCount(2);
    const languageTitle = page.getByRole('heading', {
      name: languageProjects[locale].cards[0].title,
      level: 3,
      exact: true,
    });
    for (const [index, expected] of required.cards.entries()) {
      const subarea = governance.locator(`#${expected.subarea}`);
      const subareaTitle = subarea.getByRole('heading', {
        name: researchSubareas[locale][index].title,
        level: 3,
        exact: true,
      });
      const card = subarea.locator(`article#${expected.anchor}`);
      await expect(card).toHaveCount(1);
      await expect(card).toHaveAttribute(
        'aria-labelledby',
        `${expected.anchor}-title`,
      );
      await expect(card.getByRole('heading', { level: 3 })).toHaveCount(0);
      await expect(subareaTitle).toBeVisible();
      const title = card.getByRole('heading', {
        name: expected.title,
        level: 4,
        exact: true,
      });
      await expect(title).toBeVisible();
      await expect(title).toHaveAttribute('id', `${expected.anchor}-title`);
      await expect(card.locator('.project-card-badge')).toHaveText(
        expected.acronym,
      );
      await expect(
        card.getByRole('heading', { name: expected.acronym, exact: true }),
      ).toHaveCount(0);
      for (const property of ['font-size', 'font-weight', 'line-height'])
        await expect(title).toHaveCSS(
          property,
          await languageTitle.evaluate(
            (el, css) => getComputedStyle(el).getPropertyValue(css),
            property,
          ),
        );
      await expect(
        card.getByText(expected.summary, { exact: true }),
      ).toBeVisible();
      const focus = card.getByRole('heading', {
        name: required.focus,
        level: 5,
        exact: true,
      });
      await expect(focus).toBeVisible();
      const areas = focus.locator('..').getByRole('listitem');
      await expect(areas).toHaveCount(3);
      for (const [areaIndex, area] of expected.focusAreas.entries()) {
        await expect(
          areas.nth(areaIndex).getByText(area.title, { exact: true }),
        ).toBeVisible();
        await expect(
          areas.nth(areaIndex).getByText(area.description, { exact: true }),
        ).toBeVisible();
      }
      const leadership = card.getByRole('heading', {
        name: required.leadership,
        level: 5,
        exact: true,
      });
      await expect(leadership).toBeVisible();
      await expect(
        leadership.locator('..').getByText(expected.leaders, { exact: true }),
      ).toBeVisible();
      await expect(title).not.toContainText(expected.leaders);
      const contact = card.locator('.project-card-contact');
      await expect(contact).toContainText(required.contact);
      await expect(
        contact.getByRole('link', { name: expected.contact, exact: true }),
      ).toHaveAttribute('href', expected.contactHref);
      if (expected.anchor === 'OBIA_B_eng')
        await expect(card.locator('a[href^="mailto:"]')).toHaveCount(1);
      else await expect(card.locator('a[href^="mailto:"]')).toHaveCount(0);
    }
  });

  test(`${locale}: os painéis de governança preservam descrições, restrições e recursos e funcionam com teclado`, async ({
    page,
  }) => {
    await page.goto(required.path);
    for (const expected of required.cards) {
      const card = page.locator(`#${expected.anchor}`);
      const panels = card.locator('details');
      await expect(panels.locator(':scope > summary')).toHaveText([
        ...expected.panels,
      ]);
      await expect(card.locator('details[open]')).toHaveCount(0);
      await expect(panels.first()).toHaveAttribute('id', expected.aboutId);
      for (const panel of await panels.all()) await assertNativePanel(panel);
      const about = panels.first();
      await about.locator('summary').press('Enter');
      if ('history' in expected) {
        await expect(about).toContainText(expected.history);
        await expect(about).toContainText('NIC.br');
        await expect(about.locator('.panel-body')).toBeVisible();
        await expect(card.locator('details')).toHaveCount(2);
      } else {
        await expect(
          about.getByText(expected.restrictions, { exact: true }),
        ).toBeVisible();
        await expect(card.locator('#harpia-team')).toHaveCount(1);
        await expect(card.locator('#harpia-modules')).toHaveCount(0);
      }
      const resources = card.locator(`[id="${expected.resourcesId}"]`);
      await expect(resources).toHaveCount(1);
      await resources.locator(':scope > summary').focus();
      await resources.locator(':scope > summary').press('Enter');
      await expect(resources.getByRole('link').first()).toBeVisible();
      if (expected.anchor === 'OBIA_B_eng') {
        await expect(resources.getByRole('link')).toHaveCount(1);
        await expect(resources.getByRole('link')).toHaveAttribute(
          'href',
          'https://obia.nic.br/',
        );
      }
    }
  });

  test(`${locale}: a chamada OBIA abre o conteúdo e as âncoras legadas de recursos continuam funcionais`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const obia = required.cards[0];
    const about = page.locator(`#${obia.aboutId}`);
    const cta = page.locator(`#${obia.anchor}`).getByRole('link', {
      name: obia.cta.label,
      exact: true,
    });
    await expect(cta).toHaveAttribute('href', obia.cta.href);
    await cta.focus();
    await expect(cta).toHaveCSS('outline-style', 'solid');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`${obia.cta.href}$`));
    await expect(about).toHaveAttribute('open', '');
    await expect(about.locator('.panel-body')).toBeVisible();
    const harpia = required.cards[1];
    await expect(
      page.locator('#harpia').getByRole('link', {
        name: harpia.cta.label,
        exact: true,
      }),
    ).toHaveAttribute('href', harpia.cta.href);
    for (const anchor of locale === 'pt'
      ? ['16252-c190']
      : ['5-c147', '5-c151']) {
      await page.goto(`${required.path}#${anchor}`);
      const resources = page.locator(`[id="${obia.resourcesId}"]`);
      await expect(page.locator(`[id="${anchor}"]`)).toHaveCount(1);
      if (anchor === obia.resourcesId) {
        await expect(resources.locator(':scope > summary')).toBeInViewport();
        await resources.locator(':scope > summary').focus();
        await resources.locator(':scope > summary').press('Enter');
      }
      await expect(resources).toHaveAttribute('open', '');
      await expect(resources.getByRole('link')).toBeVisible();
      await expect(resources.getByRole('link')).toHaveCount(1);
    }
  });

  test(`${locale}: governança alinha cards no desktop e mantém cada frente junto ao projeto em telas pequenas`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const cards = page.locator('#governance article.research-project-card');
    for (const width of [1440, 800, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const boxes = await cards.evaluateAll((els) =>
        els.map((el) => {
          const { x, y, width, right, bottom } = el.getBoundingClientRect();
          return { x, y, width, right, bottom };
        }),
      );
      expect(boxes).toHaveLength(2);
      expect(Math.abs(boxes[0].width - boxes[1].width)).toBeLessThan(2);
      if (width === 1440) {
        expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
        expect(Math.abs(boxes[0].bottom - boxes[1].bottom)).toBeLessThan(2);
        expect(boxes[1].x).toBeGreaterThan(boxes[0].right);
        for (const band of [
          '.project-card-focus',
          '.project-card-leadership',
          '.project-card-panels',
          '.project-card-contact',
        ]) {
          const first = await cards.nth(0).locator(band).boundingBox();
          const second = await cards.nth(1).locator(band).boundingBox();
          expect(first).not.toBeNull();
          expect(second).not.toBeNull();
          expect(Math.abs(first!.y - second!.y), band).toBeLessThan(2);
        }
      } else {
        expect(Math.abs(boxes[0].x - boxes[1].x)).toBeLessThan(2);
        expect(boxes[1].y).toBeGreaterThan(boxes[0].bottom);
      }
      for (const [index] of required.cards.entries()) {
        const subareaTitle = page.getByRole('heading', {
          name: researchSubareas[locale][index].title,
          level: 3,
          exact: true,
        });
        const headingBox = await subareaTitle.boundingBox();
        expect(headingBox).not.toBeNull();
        expect(headingBox!.y + headingBox!.height).toBeLessThan(boxes[index].y);
        expect(Math.abs(headingBox!.x - boxes[index].x)).toBeLessThan(2);
        if (width !== 1440 && index === 1)
          expect(headingBox!.y).toBeGreaterThan(boxes[0].bottom);
      }
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
