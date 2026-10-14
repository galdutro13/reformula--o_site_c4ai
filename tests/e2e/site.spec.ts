import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
import {
  requiredPages,
  principalPages,
  challenges,
  aboutAnchors,
  newsAnchors,
  researchIndex,
  globalHeader,
} from './requirements';
import editorial from './editorial-requirements.json' with { type: 'json' };
import articleRequirements from './article-requirements.json' with { type: 'json' };
import newsOrder from './news-order.json' with { type: 'json' };
import { assertSharedEditorial } from './editorial-update';
import './research-index';
import './harpia';
import './language-projects';
import './governance-projects';
import './home-research';
import './home-hero';
import { openMobileHeader } from './header';
const origin = 'http://127.0.0.1:4321';
const compact = (value: string) => value.replace(/\s/g, '');
test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) =>
    new URL(route.request().url()).origin === origin
      ? route.continue()
      : route.abort(),
  );
});
for (const required of requiredPages) {
  test(`${required.path}: conteúdo, metadados e estrutura`, async ({
    page,
  }) => {
    expect((await page.goto(required.path))?.status()).toBe(200);
    await expect(page).toHaveTitle(required.title);
    await expect(page.locator('html')).toHaveAttribute('lang', required.lang);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      required.heading,
    );
    const description = page.locator('meta[name="description"]');
    if (required.description)
      await expect(description).toHaveAttribute(
        'content',
        required.description,
      );
    else
      expect(
        (await description.getAttribute('content'))?.length,
      ).toBeGreaterThan(20);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    if (required.path === '/404.html') {
      await expect(
        page.locator('link[rel="canonical"],link[rel="alternate"]'),
      ).toHaveCount(0);
      await expect(page.locator('main [lang="en"]').first()).toBeVisible();
    } else {
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        origin + required.path,
      );
      await expect(page.locator('link[rel="alternate"]')).toHaveCount(
        required.pair ? 3 : 0,
      );
      if (required.pair) {
        const pt =
          required.path === '/'
            ? '/pt/'
            : required.lang === 'pt-BR'
              ? required.path
              : required.pair;
        const en = required.lang === 'en' ? required.path : required.pair;
        for (const [lang, path] of Object.entries({
          'pt-BR': pt,
          en,
          'x-default': '/',
        }))
          await expect(
            page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
          ).toHaveAttribute('href', origin + path);
      }
    }
    await assertSharedEditorial(page, required.lang);
    const article = articleRequirements.find((a) => a.path === required.path);
    if (article) {
      await expect(page.locator('.article-heading')).toContainText(
        article.author,
      );
      await expect(page.locator('.article-heading time')).toHaveText(
        article.dateLabel,
      );
    }
    const expected = editorial.find((e) => e.path === required.path);
    if (expected) {
      const text = compact((await page.locator('main').textContent()) ?? '');
      for (const fragment of expected.texts)
        expect(
          text,
          `Trecho obrigatório da fonte ${expected.source}: ${fragment}`,
        ).toContain(compact(fragment));
    }
  });
  test(`${required.path}: sem transbordamento`, async ({ page }) => {
    await page.goto(required.path);
    for (const width of [page.viewportSize()!.width, 320]) {
      await page.setViewportSize({ width, height: 800 });
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
for (const required of principalPages) {
  test(`${required.path}: idioma correspondente e retorno`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const english = required.lang === 'pt-BR';
    await openMobileHeader(page);
    await page
      .getByRole('navigation', {
        name: english ? 'Idioma' : 'Language',
        exact: true,
      })
      .getByRole('link', {
        name: english ? 'English' : 'Português',
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(required.pair);
    await openMobileHeader(page);
    await page
      .getByRole('navigation', {
        name: english ? 'Language' : 'Idioma',
        exact: true,
      })
      .getByRole('link', {
        name: english ? 'Português' : 'English',
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(required.path);
  });
}
for (const locale of ['pt', 'en'] as const) {
  const pt = locale === 'pt';
  test(`${locale}: submenus, âncoras e teclado`, async ({ page }) => {
    await page.goto(pt ? '/pt/sobre/' : '/en/about/');
    const mobile = await openMobileHeader(page);
    const nav = page.getByRole('navigation', {
      name: pt
        ? mobile
          ? 'Principal móvel'
          : 'Principal'
        : mobile
          ? 'Mobile main'
          : 'Main',
      exact: true,
    });
    const summary = nav.locator('.submenu > summary').first();
    await expect(summary).toHaveAccessibleName(
      globalHeader[locale].menus[0].name,
    );
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(summary).toHaveCSS('outline-style', 'solid');
    await page.keyboard.press('Tab');
    await expect(
      nav.getByRole('link', {
        name: pt ? 'Visão geral' : 'Overview',
        exact: true,
      }),
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      nav.locator(`a[href$="#${aboutAnchors[locale][0]}"]`),
    ).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(
      nav.getByRole('link', {
        name: pt ? 'Visão geral' : 'Overview',
        exact: true,
      }),
    ).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(summary).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`#${aboutAnchors[locale][0]}$`));
    for (const id of aboutAnchors[locale])
      await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
    await page.goto(pt ? '/pt/noticias/' : '/en/news/');
    for (const id of newsAnchors[locale])
      await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  });
  test(`${locale}: nove registros de pesquisa e painéis nativos`, async ({
    page,
  }) => {
    await page.goto(pt ? '/pt/pesquisas/' : '/en/research/');
    for (const name of challenges[locale])
      await expect(
        page.getByRole('heading', { name, exact: true }),
      ).toBeVisible();
    const panels = page.locator('main details');
    expect(await panels.count()).toBeGreaterThanOrEqual(10);
    for (const panel of await panels.all()) {
      const summary = panel.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(panel).toHaveAttribute('open', '');
      await expect(panel.locator('.panel-body')).toBeVisible();
      await page.keyboard.press('Enter');
      await expect(panel).not.toHaveAttribute('open');
    }
  });
  test(`${locale}: paginação e ausência de tradução`, async ({
    page,
    javaScriptEnabled,
  }) => {
    const path = pt ? '/pt/noticias/' : '/en/news/';
    await page.goto(path);
    await expect(page.locator('.news-card')).toHaveCount(8);
    expect(
      await page
        .locator('.news-card h2 a')
        .evaluateAll((es) => es.map((e) => e.getAttribute('href'))),
    ).toEqual(newsOrder[locale]);
    const input = page.getByRole('searchbox');
    if (javaScriptEnabled) await expect(input).toBeEnabled();
    else await expect(input).toBeDisabled();
    await page
      .getByRole('navigation', {
        name: pt ? 'Paginação de notícias' : 'News pagination',
      })
      .getByRole('link', { name: pt ? 'Página 2' : 'Page 2' })
      .click();
    await expect(page).toHaveURL(path + 'page/2/');
    await expect(page.locator('.news-card')).toHaveCount(pt ? 3 : 4);
    const unpaired = articleRequirements.find(
      (a) => a.locale === locale && !a.path.includes('luis-lamb'),
    )!;
    await page.goto(unpaired.path);
    await openMobileHeader(page);
    const languages = page.getByRole('navigation', {
      name: pt ? 'Idioma' : 'Language',
      exact: true,
    });
    await expect(languages.locator('.translation-missing')).toContainText(
      pt
        ? 'Este artigo não possui tradução disponível.'
        : 'No translation is available for this article.',
    );
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(0);
    await languages.locator('.translation-missing a').click();
    await expect(page).toHaveURL(pt ? '/en/news/' : '/pt/noticias/');
  });
}
test('escolha de idioma, recuperação da 404 e salto por teclado', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Continue in English', exact: true })
    .click();
  await expect(page).toHaveURL('/en/');
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Continuar em português', exact: true })
    .click();
  await expect(page).toHaveURL('/pt/');
  await page.goto('/pt/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Conheça o C4AI', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/pt/sobre/');
  expect((await page.goto('/pagina-que-nao-existe/'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Página não encontrada',
  );
  await page.getByRole('link', { name: 'Return to home', exact: true }).click();
  await expect(page).toHaveURL('/en/');
});
test('links, âncoras, imagens e arquivos locais de todos os HTML compilados', async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  const files = readdirSync('.test-dist', {
    recursive: true,
    encoding: 'utf8',
  }).filter((f) => f.endsWith('.html'));
  for (const required of requiredPages)
    expect(files).toContain(
      required.path.endsWith('.html')
        ? required.path.slice(1)
        : required.path.slice(1) + 'index.html',
    );
  const destinations = new Map<string, string>();
  const idsByPath = new Map<string, string[]>();
  for (const file of files) {
    const path = `/${file.replace(/(^|\/)index\.html$/, '$1')}`;
    await page.goto(path);
    const ids = await page
      .locator('[id]')
      .evaluateAll((es) => es.map((e) => e.id));
    expect(new Set(ids).size, `IDs duplicados em ${path}`).toBe(ids.length);
    idsByPath.set(path, ids);
    const urls = await page
      .locator('a[href],img[src],script[src],link[href]')
      .evaluateAll((es) =>
        es.map((e) => e.getAttribute('href') ?? e.getAttribute('src') ?? ''),
      );
    for (const value of urls) {
      const url = new URL(value, origin + path);
      if (url.origin === origin) destinations.set(url.href, path);
    }
    const images = page.locator('img');
    for (const img of await images.all()) {
      expect(await img.getAttribute('alt')).not.toBeNull();
    }
  }
  for (const [href, from] of destinations) {
    const url = new URL(href);
    const response = await request.get(url.href);
    expect(response.status(), `${from} → ${href}`).toBe(200);
    if (url.hash)
      expect(idsByPath.get(url.pathname), `${from} → ${href}`).toContain(
        decodeURIComponent(url.hash.slice(1)),
      );
    if (/\.(png|jpe?g|gif|webp|svg)$/.test(url.pathname)) {
      expect(response.headers()['content-type']).toMatch(/^image\//);
      expect((await response.body()).length, href).toBeGreaterThan(100);
    }
  }
});

test('par real de artigos: seletor explícito e retorno', async ({ page }) => {
  const pt = articleRequirements.find(
    (a) => a.locale === 'pt' && a.path.includes('luis-lamb'),
  )!;
  const en = articleRequirements.find(
    (a) => a.locale === 'en' && a.path.includes('luis-lamb'),
  )!;
  await page.goto(pt.path);
  await openMobileHeader(page);
  await page
    .getByRole('navigation', { name: 'Idioma', exact: true })
    .getByRole('link', { name: 'English', exact: true })
    .click();
  await expect(page).toHaveURL(en.path);
  await openMobileHeader(page);
  await page
    .getByRole('navigation', { name: 'Language', exact: true })
    .getByRole('link', { name: 'Português', exact: true })
    .click();
  await expect(page).toHaveURL(pt.path);
});

for (const scenario of [
  {
    locale: 'pt',
    home: '/pt/',
    research: '/pt/pesquisas/',
    titles: [
      'Processamento de linguagem natural para as línguas do Brasil',
      'Governança de IA',
    ],
    history: 'Trabalhos anteriores',
    notice: 'Registro da fase anterior:',
    terms: ['português', 'línguas indígenas', 'Governança'],
  },
  {
    locale: 'en',
    home: '/en/',
    research: '/en/research/',
    titles: [
      'Natural language processing for the languages of Brazil',
      'AI governance',
    ],
    history: 'Previous research',
    notice: 'Record of the previous phase:',
    terms: ['Portuguese', 'Indigenous languages', 'governance'],
  },
]) {
  test(`${scenario.locale}: duas linhas atuais e histórico preservado`, async ({
    page,
  }) => {
    await page.goto(scenario.home);
    await expect(page.locator('.home-hero h1')).toHaveAttribute(
      'lang',
      scenario.locale === 'pt' ? 'pt-BR' : 'en',
    );
    await expect(page.locator('.home-hero .rich-text')).toHaveCount(0);
    const cards = page.locator('.focus-card');
    await expect(cards).toHaveCount(2);
    for (const term of scenario.terms)
      await expect(page.locator('main')).toContainText(term);
    for (const [i, anchor] of ['languages', 'governance'].entries()) {
      const link = cards
        .nth(i)
        .getByRole('link', { name: scenario.titles[i], exact: true });
      await expect(link).toHaveAttribute(
        'href',
        `${scenario.research}#${anchor}`,
      );
      await link.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(origin + scenario.research + '#' + anchor);
      await page.goto(scenario.home);
    }
    await page.goto(scenario.research);
    await expect(page.locator('.current-research')).toHaveCount(2);
    for (const [i, anchor] of ['languages', 'governance'].entries()) {
      const section = page.locator(`#${anchor}`);
      await expect(
        section.getByRole('heading', { name: scenario.titles[i], exact: true }),
      ).toBeVisible();
      await expect(section).not.toContainText(scenario.notice);
    }
    expect(
      await page
        .locator('#languages .group-records > [id]')
        .evaluateAll((els) => els.map((el) => el.id)),
    ).toEqual(['NLP2_B_eng', 'ProIndL_B_eng']);
    expect(
      await page
        .locator(
          '#governance-macro .group-records > [id], #governance-micro .group-records > [id]',
        )
        .evaluateAll((els) => els.map((el) => el.id)),
    ).toEqual(['OBIA_B_eng', 'harpia']);
    const history = page.locator('#previous-research');
    await expect(
      history.getByRole('heading', { name: scenario.history, exact: true }),
    ).toBeVisible();
    await expect(history).not.toContainText(scenario.notice);
    expect(
      await history
        .locator('.group-records > [id]')
        .evaluateAll((els) => els.map((el) => el.id)),
    ).toEqual([
      'OceanML_B_eng',
      'Climate_B_eng',
      'AlHealth_B_eng',
      'AgriBio_B_eng',
      'KEML_B_eng',
    ]);
    expect(
      await page
        .locator('.current-research, .previous-research')
        .evaluateAll((els) => els.map((el) => el.id)),
    ).toEqual(['languages', 'governance', 'previous-research']);
    await expect(page.locator('.page-hero')).not.toContainText('250');
    await page
      .getByRole('navigation', {
        name: researchIndex[scenario.locale as 'pt' | 'en'].title,
        exact: true,
      })
      .getByRole('link', {
        name: researchIndex[scenario.locale as 'pt' | 'en'].links[3].label,
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      origin + scenario.research + '#previous-research',
    );
  });
}
