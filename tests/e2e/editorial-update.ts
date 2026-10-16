import { test, expect, type Page, type Locator } from '@playwright/test';
import {
  researchSubareas,
  aboutUpdate,
  leadershipPhotos,
  footerSocialLinks,
} from './requirements';
const origin = 'http://127.0.0.1:4321';

export async function assertSharedEditorial(page: Page, lang: string) {
  const footer = page.getByRole('contentinfo');
  await expect(footer).toContainText(
    lang === 'en' ? 'C4AI is hosted by CIAAM' : 'C4AI é sediado no CIAAM',
  );
  await expect(footer.locator('img')).toHaveCount(2);
  expect(
    await footer
      .locator('img')
      .evaluateAll((els) => els.map((el) => el.getAttribute('alt'))),
  ).toEqual(['CIAAM', 'USP']);
  for (const image of await footer.locator('img').all())
    await expect(image).toHaveAttribute('src', /^\/media\//);
  await expect(footer).not.toContainText(/IBM|FAPESP|InovaUSP/);
  expect(
    await footer
      .locator('nav a')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href'))),
  ).toEqual(footerSocialLinks);
  await expect(
    page.locator(
      'header a[href*="#diversidade"], header a[href*="#diversity"], header a[href*="#impacto"], header a[href*="#impact"], header a[href*="/cid/"], header a[href*="/partners/"], header a[href*="/parceiros/"]',
    ),
  ).toHaveCount(0);
}

async function assertGridColumns(items: Locator, columns: number) {
  const boxes = await items.evaluateAll((els) =>
    els.map((el) => {
      const { x, y } = el.getBoundingClientRect();
      return { x, y };
    }),
  );
  for (let index = 1; index < boxes.length; index++) {
    const previous = boxes[index - 1];
    const current = boxes[index];
    if (index % columns === 0) expect(current.y).toBeGreaterThan(previous.y);
    else {
      expect(Math.abs(current.y - previous.y)).toBeLessThan(2);
      expect(current.x).toBeGreaterThan(previous.x);
    }
  }
}

for (const locale of ['pt', 'en'] as const) {
  const pt = locale === 'pt';
  test(`${locale}: Macro/OBIA e Micro/HarpIA, grid e links`, async ({
    page,
  }) => {
    const researchPath = pt ? '/pt/pesquisas/' : '/en/research/';
    await page.goto(`/${locale}/`);
    await expect(page.locator('main')).not.toContainText(
      /Nós nos preocupamos com diversidade e inclusão!|We care about diversity and inclusion!/,
    );
    await expect(
      page.locator('main a[href*="#diversidade"], main a[href*="#diversity"]'),
    ).toHaveCount(0);
    const cards = page.locator('.focus-card');
    const boxes = await cards.evaluateAll((els) =>
      els.map((el) => {
        const { x, y } = el.getBoundingClientRect();
        return { x, y };
      }),
    );
    if (page.viewportSize()!.width >= 1050) {
      expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
      expect(boxes[1].x).toBeGreaterThan(boxes[0].x);
    } else {
      expect(boxes[1].y).toBeGreaterThan(boxes[0].y);
    }
    for (const subarea of researchSubareas[locale]) {
      const link = cards
        .nth(1)
        .getByRole('link', { name: subarea.title, exact: true });
      await expect(link).toHaveAttribute(
        'href',
        `${researchPath}#${subarea.anchor}`,
      );
      await link.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(
        `${origin}${researchPath}#${subarea.anchor}`,
      );
      const section = page.locator(`#${subarea.anchor}`);
      await expect(
        section.getByRole('heading', {
          name: subarea.title,
          exact: true,
          level: 3,
        }),
      ).toBeVisible();
      await expect(
        section.getByRole('heading', {
          name: subarea.projectTitle,
          exact: true,
          level: 4,
        }),
      ).toBeVisible();
      await expect(section.locator('.group-records > [id]')).toHaveCount(1);
      await expect(section.locator(`#${subarea.record}`)).toHaveCount(1);
      await page.goto(`/${locale}/`);
    }
    await page.goto(researchPath);
    expect(
      await page
        .locator('#governance [id^="governance-"]:not([id$="-title"])')
        .evaluateAll((els) => els.map((el) => el.id)),
    ).toEqual(['governance-macro', 'governance-micro']);
    await expect(page.locator('#governance-macro')).toContainText(
      pt ? 'regulação de IA' : 'AI regulation',
    );
    await expect(page.locator('#governance-micro')).toContainText(
      pt ? 'empresas' : 'companies',
    );
    const harpia = page.locator('#governance-micro #harpia');
    await expect(
      harpia.getByRole('link', {
        name: pt
          ? 'Conhecer a plataforma HarpIA'
          : 'Explore the HarpIA platform',
        exact: true,
      }),
    ).toHaveAttribute(
      'href',
      pt
        ? 'https://sites.usp.br/keml/harpia/'
        : 'https://sites.usp.br/keml/en/harpia-2/',
    );
    await expect(harpia.locator('details > summary')).toHaveText(
      pt
        ? ['Sobre a plataforma', 'Equipe', 'Recursos']
        : ['About the platform', 'Team', 'Resources'],
    );
    await expect(harpia.locator('a[href^="mailto:"]')).toHaveCount(0);
  });

  test(`${locale}: KEML preserva equipe, recursos, contatos e painéis no histórico`, async ({
    page,
  }) => {
    await page.goto(pt ? '/pt/pesquisas/' : '/en/research/');
    await expect(page.locator('.current-research #KEML_B_eng')).toHaveCount(0);
    const keml = page.locator('#previous-research #KEML_B_eng');
    await expect(keml).toHaveCount(1);
    await expect(
      keml.getByRole('heading', { name: 'KEML', exact: true, level: 3 }),
    ).toBeVisible();
    await expect(keml.locator('details > summary')).toHaveText(
      pt ? ['Equipe', 'Recursos'] : ['Team', 'Resources'],
    );
    await expect(keml).toContainText('Sarajane Peres');
    await expect(keml).toContainText('Fabio Cozman');
    await expect(keml).toContainText(
      pt ? 'c4ai-keml@usp.br' : 'c4ai-graphml@usp.br',
    );
    const teamLinks = pt
      ? [
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/KEML%20_Portugues_Equipes_modeloC4AI_23.pdf',
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/KEML_Port_Equipes_C4AI_16_04_24_ex_membros.pdf',
        ]
      : [
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/GOML_Ingles_Equipes_modeloC4AI.pdf',
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/KEML_Eng_Equipes_C4AI_16_04_24_ex_members.pdf',
        ];
    expect(
      await keml
        .locator('details')
        .first()
        .locator('a')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href'))),
    ).toEqual(teamLinks);
    await expect(
      keml.locator('details').last().locator('a').first(),
    ).toHaveAttribute(
      'href',
      pt ? 'https://sites.usp.br/keml' : 'https://sites.usp.br/keml/en/keml-en',
    );
    if (!pt)
      await expect(keml).toContainText(
        'Contact to be confirmed: the source shows an address associated with another group.',
      );
  });

  test(`${locale}: destaques e liderança respeitam colunas e ordem visual`, async ({
    page,
  }) => {
    const required = aboutUpdate[locale];
    await page.goto(required.path);
    const width = page.viewportSize()!.width;
    const columns = width >= 1100 ? 3 : width > 700 ? 2 : 1;
    const photos = page.locator(`#${required.leadership} img`);
    await expect(photos).toHaveCount(6);
    for (const id of ['leadership-executive', 'leadership-management']) {
      const groupPhotos = page.locator(`#${required.leadership} #${id} img`);
      await expect(groupPhotos).toHaveCount(3);
      await assertGridColumns(groupPhotos, columns);
    }
    const promos = page.locator('#Overlappable h3');
    await expect(promos).toHaveCount(2);
    await expect(page.locator('#Overlappable h2')).toHaveCount(1);
    await assertGridColumns(promos, page.viewportSize()!.width > 700 ? 2 : 1);
  });

  test(`${locale}: Sobre preserva seis lideranças, fotografias, Difusão e contato`, async ({
    page,
    javaScriptEnabled,
  }) => {
    const required = aboutUpdate[locale];
    await page.goto(required.path);
    const leadership = page.locator(`#${required.leadership}`);
    await expect(leadership.getByRole('heading', { level: 4 })).toHaveText([
      ...required.people,
    ]);
    expect(
      await leadership
        .locator('img')
        .evaluateAll((els) => els.map((el) => el.getAttribute('src'))),
    ).toEqual(leadershipPhotos);
    const links = await leadership
      .locator('a')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    expect(links).toEqual([
      'http://sites.poli.usp.br/p/fabio.cozman/',
      'http://lattes.cnpq.br/7396818382676736',
      'http://lattes.cnpq.br/1059788774957753',
    ]);
    for (const name of [
      'Claudio Pinhanez',
      'Cláudio Pinhanez',
      'Glauco Arbix',
      'Alexandre Delbem',
      'Joca',
    ])
      await expect(page.locator('main')).not.toContainText(name);
    for (const id of required.removedAnchors)
      await expect(page.locator(`[id="${id}"]`)).toHaveCount(0);
    for (const title of required.committees)
      await expect(
        page.getByRole('heading', { name: title, exact: true }),
      ).toHaveCount(0);
    await expect(page.locator('#about-gallery img')).toHaveCount(2);
    expect(
      await page
        .locator('#about-gallery img')
        .evaluateAll((els) => els.map((el) => el.getAttribute('src'))),
    ).toEqual(['/media/d353c08ee8d0.jpg', '/media/face5360cac4.jpg']);
    for (const image of await page.locator('#about-gallery img').all())
      expect((await image.getAttribute('alt'))!.length).toBeGreaterThan(20);
    for (const src of ['/media/8b64dc5090e1.jpg', '/media/42ddc70db70c.jpg'])
      await expect(page.locator(`main img[src="${src}"]`)).toHaveCount(1);
    const outreach = page.locator(`#${required.outreach}`);
    await expect(outreach).toContainText('Fernando Osório, USP');
    await expect(outreach).toContainText(
      pt ? 'Educação e Disseminação' : 'Education and Dissemination',
    );
    const mailLinks = page.locator('main a[href^="mailto:"]');
    expect(await mailLinks.count()).toBeGreaterThan(0);
    for (const link of await mailLinks.all())
      await expect(link).toHaveAttribute('href', 'mailto:c4ai@usp.br');
    await expect(page.locator('main')).not.toContainText(
      /c4ai-(ouvidoria|ombudsman|outreach|cis|cid|impact)@usp\.br/,
    );
    const contact = page.locator(`#${required.contact}`);
    await expect(contact).toContainText(
      'Av. Profº Lúcio Martins Rodrigues, 370 – Butantã – São Paulo – SP',
    );
    await expect(contact).toContainText('CEP: 05508-020');
    await expect(contact).toContainText('+55 11 2648-1695');
    const workshop = page.locator(
      '.external-embed[data-embed*="youtube-nocookie.com"]',
    );
    await expect(workshop).toContainText(required.workshop);
    await expect(workshop.getByRole('link')).toHaveAttribute(
      'href',
      'https://youtu.be/F5WwcP-bYEA',
    );
    await expect(page.locator('main')).not.toContainText(
      /Assista o vídeo do Workshop!|See the Workshop video!/,
    );
    await expect(page.locator('iframe')).toHaveCount(0);
    const map = page.locator(
      '.external-embed[data-embed*="www.google.com/maps"]',
    );
    await expect(map.getByRole('link')).toHaveAttribute(
      'href',
      /google\.com\/maps\/embed\?pb=.*Center%20for%20Artificial%20Intelligence/,
    );
    if (!javaScriptEnabled) {
      await expect(workshop.getByRole('button')).toBeHidden();
      await expect(map.getByRole('button')).toBeHidden();
    }
    const promos = page.locator('#Overlappable');
    await expect(promos.getByRole('heading', { level: 2 })).toHaveCount(1);
    await expect(promos.getByRole('heading', { level: 3 })).toHaveCount(2);
    await expect(
      promos.locator('a[href="https://www.youtube.com/c/C4AIUSP"]'),
    ).toHaveCount(1);
    await expect(
      promos.locator('a[href^="https://www.flickr.com/"]'),
    ).toHaveCount(1);
    await expect(page.locator('main')).not.toContainText(
      /C4Ai DOIS ANOS|C4Ai two years/,
    );
  });
}
