import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import { basePath, productionOrigin } from '../../scripts/publication.mjs';

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
      assert.doesNotMatch(html, /<script\b/);
    }
    const notFound = readFileSync(join(output, '404.html'), 'utf8');
    assert.match(notFound, /noindex, nofollow/);
    assert.doesNotMatch(notFound, /rel="canonical"/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
