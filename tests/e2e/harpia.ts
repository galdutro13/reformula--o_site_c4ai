import { test, expect } from '@playwright/test';
import { harpiaContent } from './requirements';

for (const locale of ['pt', 'en'] as const) {
  test(`${locale}: HarpIA apresenta equipe e recursos sem o painel de módulos`, async ({
    page,
  }) => {
    const required = harpiaContent[locale];
    await page.goto(required.path);
    const harpia = page.locator('#governance-micro #harpia');
    await expect(harpia).toContainText(required.leadership);
    await expect(harpia).toContainText('Sarajane Marques Peres');
    await expect(harpia).toContainText('Fabio Gagliardi Cozman');
    await expect(harpia).toContainText(required.ownInfrastructure);
    const panels = harpia.locator('details');
    await expect(panels.locator('summary')).toHaveText([...required.panels]);
    await expect(harpia.locator('details[open]')).toHaveCount(0);
    for (const panel of await panels.all()) {
      const summary = panel.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(panel).toHaveAttribute('open', '');
      await expect(panel.locator('.panel-body')).toBeVisible();
      await expect(summary).toHaveCSS('outline-style', 'solid');
    }
    await expect(harpia.locator('#harpia-modules')).toHaveCount(0);
    const team = harpia.locator('#harpia-team');
    for (const name of [
      'Anarosa Alvez Franco Brandão',
      'Bernardo Nunes Gonçalves',
      'Fabio José Muneratti Ortega',
      'Marcos Lopes',
      'Paulo Pirozelli',
      'Vinícius Bitencourt Matos',
      'André Paulino de Lima',
    ])
      await expect(team).toContainText(name);
    await expect(team.getByRole('link')).toHaveAttribute(
      'href',
      required.credits,
    );
    expect(
      await harpia
        .locator('#harpia-resources a')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
    ).toEqual([...required.resources]);
    await expect(harpia.locator(`a[href="${required.contact}"]`)).toBeVisible();
    await expect(harpia.locator('a[href^="mailto:"], iframe')).toHaveCount(0);
    await expect(harpia).not.toContainText(
      /c4ai-(keml|graphml)@usp\.br|contact@site\.com/,
    );
    for (const panel of await panels.all()) {
      await panel.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(panel).not.toHaveAttribute('open', '');
    }
  });
}
