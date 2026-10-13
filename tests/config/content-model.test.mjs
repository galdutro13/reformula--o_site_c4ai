import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  blockSchema,
  editorialSchema,
  researchLineSchema,
  challengeSchema,
} from '../../src/content/model.ts';

// Entradas sintéticas independentes das coleções: verificam o contrato, inclusive
// os casos negativos que um build com os arquivos atuais não exercitaria.
const page = {
  id: 'fixture-pt',
  kind: 'home',
  locale: 'pt',
  source: 'https://usp.br/',
  retrievedAt: '2026-10-06T12:00:00Z',
  path: '/pt/',
  title: 'Título de teste',
  description: 'Descrição de teste',
  translationId: 'home',
  blocks: [],
};

test('somente Home pode ter blocks vazio; campo obrigatório continua exigido', () => {
  assert.equal(editorialSchema.safeParse(page).success, true);
  for (const kind of ['about', 'research', 'news', 'article']) {
    assert.equal(
      editorialSchema.safeParse({ ...page, kind }).success,
      false,
      kind,
    );
    assert.equal(
      editorialSchema.safeParse({
        ...page,
        kind,
        blocks: [{ type: 'html', html: '<p>Conteúdo obrigatório.</p>' }],
      }).success,
      true,
      kind,
    );
  }
  for (const field of [
    'id',
    'kind',
    'locale',
    'source',
    'retrievedAt',
    'path',
    'title',
    'description',
    'translationId',
    'blocks',
  ]) {
    const incomplete = Object.fromEntries(
      Object.entries(page).filter(([key]) => key !== field),
    );
    assert.equal(editorialSchema.safeParse(incomplete).success, false, field);
  }
});

test('a exceção de Home não aceita grupos ou painéis vazios nem HTML inseguro', () => {
  const invalidBlocks = [
    { type: 'group', layout: 'section', children: [] },
    { type: 'details', id: 'painel', label: 'Painel', children: [] },
    { type: 'html', html: '' },
    { type: 'html', html: '<script>alert(1)</script>' },
  ];
  for (const block of invalidBlocks) {
    assert.equal(blockSchema.safeParse(block).success, false);
    assert.equal(
      editorialSchema.safeParse({ ...page, blocks: [block] }).success,
      false,
    );
    assert.equal(
      editorialSchema.safeParse({
        ...page,
        blocks: [{ type: 'group', layout: 'column', children: [block] }],
      }).success,
      false,
    );
  }
});

/** @param {'pt' | 'en'} locale */
function governance(locale) {
  return {
    id: `governance-${locale}`,
    translationId: 'governance',
    locale,
    anchor: 'governance',
    title: 'Governança',
    summary: 'Macro e Micro',
    groups: [`obia-${locale}`, `harpia-${locale}`],
    revision: { date: '2026-10-06', basis: 'Plano editorial autorizado' },
    subareas: [
      {
        anchor: 'governance-macro',
        title: 'Macro',
        summary: 'IA e políticas públicas',
        group: `obia-${locale}`,
      },
      {
        anchor: 'governance-micro',
        title: 'Micro',
        summary: 'Implantação e avaliação',
        group: `harpia-${locale}`,
      },
    ],
  };
}

for (const locale of /** @type {const} */ (['pt', 'en'])) {
  test(`${locale}: governança exige Macro/OBIA e Micro/HarpIA na ordem e no idioma corretos`, () => {
    const valid = governance(locale);
    assert.equal(researchLineSchema.safeParse(valid).success, true);
    const invalid = [
      { ...valid, subareas: undefined },
      { ...valid, subareas: [] },
      { ...valid, subareas: valid.subareas.slice(0, 1) },
      { ...valid, subareas: [...valid.subareas, valid.subareas[0]] },
      { ...valid, subareas: [...valid.subareas].reverse() },
      { ...valid, subareas: [valid.subareas[0], valid.subareas[0]] },
      {
        ...valid,
        subareas: [
          { ...valid.subareas[0], group: `harpia-${locale}` },
          { ...valid.subareas[1], group: `obia-${locale}` },
        ],
      },
      {
        ...valid,
        subareas: governance(locale === 'pt' ? 'en' : 'pt').subareas,
      },
      { ...valid, groups: [`obia-${locale}`, `keml-${locale}`] },
      { ...valid, groups: [...valid.groups].reverse() },
      { ...valid, groups: valid.groups.slice(0, 1) },
      {
        ...valid,
        subareas: [{ ...valid.subareas[0], title: '' }, valid.subareas[1]],
      },
      {
        ...valid,
        subareas: [{ ...valid.subareas[0], summary: '' }, valid.subareas[1]],
      },
    ];
    for (const entry of invalid)
      assert.equal(
        researchLineSchema.safeParse(entry).success,
        false,
        JSON.stringify(entry),
      );
  });
}

test('eixo de línguas preserva dois registros e não admite as subdivisões de governança', () => {
  const valid = {
    ...governance('pt'),
    id: 'languages-pt',
    translationId: 'languages',
    anchor: 'languages',
    groups: ['nlp2-pt', 'proindl-pt'],
    subareas: [],
  };
  assert.equal(researchLineSchema.safeParse(valid).success, true);
  assert.equal(
    researchLineSchema.safeParse({
      ...valid,
      subareas: governance('pt').subareas,
    }).success,
    false,
  );
  assert.equal(
    researchLineSchema.safeParse({
      ...valid,
      groups: [...valid.groups, 'harpia-pt'],
    }).success,
    false,
  );
  assert.equal(
    researchLineSchema.safeParse({ ...valid, translationId: 'third-area' })
      .success,
    false,
  );
});

test('registros de pesquisa exigem conteúdo e procedência mesmo quando há revisão', () => {
  const valid = {
    id: 'harpia-pt',
    translationId: 'harpia',
    locale: 'pt',
    source: 'https://sites.usp.br/keml/harpia/',
    retrievedAt: '2026-10-06T12:00:00Z',
    anchor: 'harpia',
    blocks: [{ type: 'heading', level: 2, text: 'HarpIA' }],
    revision: { date: '2026-10-06', basis: 'Síntese aprovada' },
  };
  assert.equal(challengeSchema.safeParse(valid).success, true);
  assert.equal(
    challengeSchema.safeParse({ ...valid, revision: undefined }).success,
    true,
  );
  assert.equal(
    challengeSchema.safeParse({ ...valid, blocks: [] }).success,
    false,
  );
  for (const field of ['source', 'retrievedAt', 'blocks']) {
    const incomplete = Object.fromEntries(
      Object.entries(valid).filter(([key]) => key !== field),
    );
    assert.equal(challengeSchema.safeParse(incomplete).success, false, field);
  }
  assert.equal(
    challengeSchema.safeParse({
      ...valid,
      revision: { date: 'ontem', basis: '' },
    }).success,
    false,
  );
});
