import { test, expect } from '@playwright/test';
for (const locale of ['pt', 'en']) {
  test(`${locale}: busca local e incorporação sob ação explícita`, async ({
    page,
  }) => {
    const external: string[] = [];
    await page.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (url.origin === 'http://127.0.0.1:4321') return route.continue();
      external.push(url.href);
      return route.abort();
    });
    await page.goto(locale === 'pt' ? '/pt/noticias/' : '/en/news/');
    expect(external).toEqual([]);
    const input = page.getByRole('searchbox');
    await input.fill(locale === 'pt' ? 'Carolina' : 'Lamb');
    await expect(page.locator('.search-results')).toBeVisible();
    await expect(page.locator('.search-results li')).toHaveCount(1);
    await expect(page.getByRole('status')).toContainText('1');
    await page.locator('.search-results a').click();
    await expect(page).toHaveURL(
      new RegExp(locale === 'pt' ? 'corpus-carolina' : 'luis-lamb'),
    );
    await page.getByRole('searchbox').fill('zzzzinexistentezzzz');
    await expect(page.getByRole('status')).toContainText('0');
    await expect(page.locator('iframe')).toHaveCount(0);
    expect(external).toEqual([]);
    const embed = page.locator('.external-embed[data-embed]').last();
    await expect(embed.locator('a')).toHaveAttribute('href', /^https:\/\//);
    await embed.getByRole('button').click();
    await expect(embed.locator('iframe')).toHaveCount(1);
    await expect(embed.locator('iframe')).toHaveAttribute(
      'title',
      locale === 'pt' ? 'Agenda C4AI' : 'C4AI calendar',
    );
    await expect(embed.locator('iframe')).toHaveAttribute(
      'referrerpolicy',
      'no-referrer',
    );
    await expect.poll(() => external.length).toBeGreaterThan(0);
  });
}

for (const locale of ['pt', 'en']) {
  test(`${locale}: workshop envia somente a origem como Referer`, async ({
    page,
  }) => {
    const external: { url: string; referer: string | undefined }[] = [];
    await page.route('**/*', (route) => {
      const request = route.request();
      if (new URL(request.url()).origin === 'http://127.0.0.1:4321')
        return route.continue();
      external.push({
        url: request.url(),
        referer: request.headers()['referer'],
      });
      return route.abort();
    });
    await page.goto(
      (locale === 'pt' ? '/pt/sobre/' : '/en/about/') + '?origem=teste#main',
    );
    const embed = page.locator(
      '.external-embed[data-embed*="youtube-nocookie.com"]',
    );
    await expect(embed.getByRole('button')).toBeVisible();
    await expect(page.locator('iframe')).toHaveCount(0);
    expect(external).toEqual([]);
    await embed.getByRole('button').click();
    await expect(page.locator('iframe')).toHaveCount(1);
    await expect.poll(() => external.length).toBe(1);
    expect(external).toEqual([
      {
        url: 'https://www.youtube-nocookie.com/embed/F5WwcP-bYEA',
        referer: 'http://127.0.0.1:4321/',
      },
    ]);
    await expect(embed.locator('iframe')).toHaveAttribute(
      'title',
      locale === 'pt' ? 'Vídeo do workshop' : 'Workshop video',
    );
    await expect(embed.locator('iframe')).toHaveAttribute(
      'allowfullscreen',
      '',
    );
    await expect(embed.getByRole('link')).toHaveAttribute(
      'href',
      'https://youtu.be/F5WwcP-bYEA',
    );
    const map = page.locator(
      '.external-embed[data-embed*="www.google.com/maps"]',
    );
    await map.getByRole('button').click();
    await expect(map.locator('iframe')).toHaveAttribute(
      'referrerpolicy',
      'no-referrer',
    );
    await expect.poll(() => external.length).toBe(2);
    expect(external[1].referer).toBeUndefined();
  });
}

const searchCases = [
  { query: 'o Laboratório Virtual', title: 'Corpus Carolina – NLP/C4AI' },
  {
    query: '  O   LABORATORIO\u00a0VIRTUAL  ',
    title: 'Corpus Carolina – NLP/C4AI',
  },
  {
    query: 'CEO & Founder',
    title:
      'C4AI – Mesa Redonda C4AI – AI em Foco: “Discriminação Algorítmica: o Papel da Diversidade e Inclusão em IA”',
  },
  { query: 'html', title: null },
];
for (const { query, title } of searchCases) {
  test(`busca textual: ${query}`, async ({ page }) => {
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === 'http://127.0.0.1:4321'
        ? route.continue()
        : route.abort(),
    );
    await page.goto('/pt/noticias/');
    await page.getByRole('searchbox').fill(query);
    await expect(page.locator('.search-results a')).toHaveText(
      title ? [title] : [],
    );
    await expect(page.getByRole('status')).toHaveText(
      title ? '1 resultados' : '0 resultados',
    );
    await page.getByRole('searchbox').fill('   ');
    await expect(page.locator('.search-results')).toBeHidden();
    await expect(page.locator('.search-results a')).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveText('');
  });
}

test('busca interpreta HTML inerte e preserva limites textuais', async ({
  page,
}) => {
  // Fixture isolada no transporte: não altera coleções ou o contrato editorial.
  const fixture = [
    {
      title: 'Documento de teste',
      path: '/pt/noticias/corpus-carolina-nlp-c4ai/',
      segments: [
        {
          format: 'html',
          value:
            '<p>micro<strong>organismos</strong> &amp; pesquisa&nbsp;&#233;tica</p><p>Segundo<br>parágrafo</p><ul><li>Primeiro</li><li>Último</li></ul><p><a href="https://example.org/atributo-oculto">Endereço visível https://example.org/publico</a></p><img src="https://example.org/recurso-oculto" alt="Retrato da equipe">',
        },
        { format: 'text', value: 'Texto literal &amp; preservado' },
      ],
    },
  ];
  const external: string[] = [];
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== 'http://127.0.0.1:4321') {
      external.push(url.href);
      return route.abort();
    }
    if (url.pathname !== '/pt/noticias/') return route.continue();
    const response = await route.fetch();
    const html = await response.text();
    const json = JSON.stringify(fixture).replace(/</g, '\\u003c');
    const body = html.replace(
      /(<script\b[^>]*type="application\/json"[^>]*>)[\s\S]*?(<\/script>)/,
      (_, start, end) => start + json + end,
    );
    expect(body).not.toBe(html);
    await route.fulfill({ response, body });
  });
  await page.goto('/pt/noticias/');
  const input = page.getByRole('searchbox');
  await expect(input).toBeEnabled();
  for (const query of [
    'microorganismos & pesquisa etica',
    'ética Segundo parágrafo Primeiro Último',
    'https://example.org/publico',
    'Retrato da equipe',
    'literal &amp; preservado',
  ]) {
    await input.fill(query);
    await expect(page.locator('.search-results a')).toHaveText([
      'Documento de teste',
    ]);
  }
  for (const query of ['atributo-oculto', 'recurso-oculto', 'html']) {
    await input.fill(query);
    await expect(page.locator('.search-results a')).toHaveCount(0);
  }
  expect(external).toEqual([]);
});
