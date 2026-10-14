import { test } from 'node:test';
import { URL } from 'node:url';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  readdirSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import { basePath, productionOrigin } from '../../scripts/publication.mjs';

/** @param {string} html @param {string} output */
function assertHomeHeaderScript(html, output) {
  // Exceção autorizada em 14/10/2026: somente fechamento progressivo do
  // cabeçalho. Não liberar scripts arbitrários, hidratação ou outras seções.
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  assert.equal(
    scripts.length,
    1,
    'Home deve conter apenas o módulo do cabeçalho',
  );
  const [, attributes, body] = scripts[0];
  assert.match(attributes, /\btype="module"/);
  assert.equal(
    attributes.replace(/\b(?:type|src)="[^"]*"/g, '').trim(),
    '',
    'O módulo do cabeçalho não admite outros atributos executáveis',
  );
  const src = attributes.match(/\bsrc="([^"]*)"/)?.[1];
  let code = body;
  if (src !== undefined) {
    assert.match(src, /^\/centro\/_astro\/[^/"?#]+\.js$/);
    assert.equal(body.trim(), '');
    code = readFileSync(join(output, src.slice('/centro/'.length)), 'utf8');
  }
  assert.match(code, /\.desktop-navigation/);
  assert.match(code, /Escape/);
  assert.doesNotMatch(
    code,
    /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|localStorage|sessionStorage|eval|Function)\b|\bimport\s*(?:\(|[^.\s])/,
  );
  assert.doesNotMatch(
    code,
    /astro-island|client:|\b(?:React|Vue|Svelte|hydrate|createRoot)\b|data-news-search|data-embed|load-embed|news-search|search-results|HomeResearchOverview|research-overview|home-hero/,
  );
  const header = readFileSync('src/components/Header.astro', 'utf8');
  const entries = [
    ...header.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g),
  ];
  assert.equal(entries.length, 1);
  assert.equal(entries[0][1].trim(), '');
  assert.match(
    entries[0][2].trim(),
    /^import ['"]\.\.\/navigation\/header['"];$/,
  );
  const source = readFileSync('src/navigation/header.ts', 'utf8');
  assert.doesNotMatch(source, /(?:^|\n)\s*import\b|\bimport\s*\(/);
  assert.doesNotMatch(
    source,
    /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|localStorage|sessionStorage|eval|Function)\b|astro-island|client:|\b(?:React|Vue|Svelte|hydrate|createRoot)\b/,
  );
  assert.match(source, /\.desktop-navigation/);
  assert.match(source, /Escape/);
}

test('rejeita origem ausente, local, demonstrativa ou com partes indevidas', () => {
  for (const value of [
    undefined,
    '',
    'http://usp.br',
    'https://localhost',
    'https://127.0.0.1',
    'https://[::1]',
    'https://demo.local',
    'https://demo.internal',
    'https://example.com',
    'https://sub.example.org',
    'https://demo.test',
    'https://demo.invalid',
    'https://demo.example',
    'https://usuario:senha@usp.br',
    'https://usp.br/path/',
    'https://usp.br/?a=1',
    'https://usp.br/#hash',
    'https://usp.br:444',
  ]) {
    assert.throws(() => productionOrigin(value), String(value));
  }
  assert.equal(productionOrigin('https://usp.br/'), 'https://usp.br');
});

test('valida BASE_PATH sem normalização silenciosa', () => {
  assert.equal(basePath(), '/');
  assert.equal(basePath('/centro/site/'), '/centro/site/');
  for (const value of [
    'centro/',
    '/centro',
    '//',
    '/../',
    '/a/../',
    '/a?b/',
    '/a#b/',
    '/%2e%2e/',
  ]) {
    assert.throws(() => basePath(value));
  }
});

test('comando publicável falha sem SITE_URL e com domínio demonstrativo', () => {
  for (const value of ['', 'https://example.com']) {
    const result = spawnSync(
      process.execPath,
      ['scripts/astro.mjs', 'build', 'production'],
      {
        encoding: 'utf8',
        env: { ...process.env, SITE_URL: value, BASE_PATH: '/' },
      },
    );
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /SITE_URL/);
  }
});

test('build de publicação em subdiretório: HTML, metadados e assets', () => {
  const output = mkdtempSync(join(tmpdir(), 'c4ai-publication-test-'));
  try {
    // Origem apenas para verificar HTML, sem acesso ao domínio nem publicação.
    const result = spawnSync(
      process.execPath,
      ['scripts/astro.mjs', 'build', 'production', '--outDir', output],
      {
        encoding: 'utf8',
        env: {
          ...process.env,
          SITE_URL: 'https://usp.br',
          BASE_PATH: '/centro/',
        },
      },
    );
    assert.equal(result.status, 0, result.stdout + result.stderr);
    for (const locale of ['pt', 'en']) {
      const html = readFileSync(join(output, locale, 'index.html'), 'utf8');
      assert.match(
        html,
        new RegExp(`rel="canonical" href="https://usp.br/centro/${locale}/"`),
      );
      assert.match(
        html,
        /hreflang="pt-BR" href="https:\/\/usp.br\/centro\/pt\/"/,
      );
      assert.match(html, /hreflang="en" href="https:\/\/usp.br\/centro\/en\/"/);
      assert.match(
        html,
        /hreflang="x-default" href="https:\/\/usp.br\/centro\/"/,
      );
      assert.match(html, /href="\/centro\/favicon.svg"/);
      assert.match(html, /href="\/centro\/_astro\//);
      assert.match(html, /href="\/centro\/pt\/"/);
      assert.match(html, /href="\/centro\/en\/"/);
      assert.doesNotMatch(html, /name="robots"/);
      assertHomeHeaderScript(html, output);
    }
    const files = readdirSync(output, { recursive: true, encoding: 'utf8' });
    for (const file of files.filter((f) => f.endsWith('.html'))) {
      const html = readFileSync(join(output, file), 'utf8');
      for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
        const raw = match[1];
        assert.ok(
          raw.startsWith('/centro/'),
          `${file}: caminho ignora BASE_PATH: ${raw}`,
        );
        const local = new URL(raw, 'https://usp.br').pathname.slice(
          '/centro/'.length,
        );
        assert.ok(
          existsSync(join(output, local)),
          `${file}: arquivo local ausente ${local}`,
        );
      }
    }
    const news = readFileSync(join(output, 'pt/noticias/index.html'), 'utf8');
    assert.match(news, /"path":"\/centro\/pt\/noticias\//);
    for (const css of files.filter((f) => f.endsWith('.css'))) {
      const text = readFileSync(join(output, css), 'utf8');
      for (const match of text.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g))
        assert.ok(
          match[1].startsWith('/centro/'),
          `Asset CSS ignora BASE_PATH: ${match[1]}`,
        );
    }
    const notFound = readFileSync(join(output, '404.html'), 'utf8');
    assert.match(notFound, /noindex, nofollow/);
    assert.doesNotMatch(notFound, /rel="canonical"/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
