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

test('raiz é reservada à Home portuguesa; caminhos localizados continuam válidos', () => {
  const root = { ...page, path: '/' };
  assert.equal(editorialSchema.safeParse(root).success, true);
  assert.equal(editorialSchema.safeParse(page).success, true);
  assert.equal(
    editorialSchema.safeParse({ ...page, locale: 'en', path: '/en/' }).success,
    true,
  );
  for (const invalid of [
    { ...root, locale: 'en' },
    { ...root, translationId: 'about' },
    { ...root, translationId: null },
    ...['about', 'research', 'news', 'article'].map((kind) => ({
      ...root,
      kind,
      blocks: [{ type: 'html', html: '<p>Conteúdo presente.</p>' }],
    })),
    { ...page, path: '/outro/' },
    { ...page, path: 'pt/' },
  ]) {
    assert.equal(editorialSchema.safeParse(invalid).success, false);
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
    overview: governanceProject('harpia', 'pt').overview,
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

/**
 * @param {'nlp2' | 'proindl'} project
 * @param {'pt' | 'en'} locale
 */
function languageProject(project, locale) {
  return {
    id: `${project}-${locale}`,
    translationId: project,
    locale,
    source: 'https://usp.br/',
    retrievedAt: '2026-10-13T12:00:00Z',
    anchor: `${project}-fixture`,
    blocks: [{ type: 'html', html: '<p>Descrição completa preservada.</p>' }],
    overview: {
      acronym: project === 'nlp2' ? 'NLP2' : 'ProIndL',
      title: 'Nome completo do projeto',
      summary: 'Resumo independente para descoberta do projeto.',
      focusAreas: ['Frente de pesquisa.'],
      leadership: 'Nome da liderança.',
      team: {
        id: 'equipe-fixture',
        children: [{ type: 'html', html: '<p>Equipe preservada.</p>' }],
      },
      resources: {
        id: 'recursos-fixture',
        children: [{ type: 'html', html: '<p>Recursos preservados.</p>' }],
      },
      contact: `c4ai-${project}@usp.br`,
    },
  };
}

for (const locale of /** @type {const} */ (['pt', 'en'])) {
  for (const project of /** @type {const} */ (['nlp2', 'proindl'])) {
    test(`${locale}/${project}: card exige visão geral completa, conteúdo e painéis preservados`, () => {
      const valid = languageProject(project, locale);
      assert.equal(challengeSchema.safeParse(valid).success, true);
      assert.equal(
        challengeSchema.safeParse({ ...valid, overview: undefined }).success,
        false,
      );
      assert.equal(
        challengeSchema.safeParse({ ...valid, blocks: [] }).success,
        false,
      );
      for (const field of Object.keys(valid.overview)) {
        const incomplete = Object.fromEntries(
          Object.entries(valid.overview).filter(([key]) => key !== field),
        );
        assert.equal(
          challengeSchema.safeParse({ ...valid, overview: incomplete }).success,
          false,
          field,
        );
      }
      for (const field of [
        'acronym',
        'title',
        'summary',
        'leadership',
        'contact',
      ])
        assert.equal(
          challengeSchema.safeParse({
            ...valid,
            overview: { ...valid.overview, [field]: '' },
          }).success,
          false,
          field,
        );
      for (const focusAreas of [[], ['']])
        assert.equal(
          challengeSchema.safeParse({
            ...valid,
            overview: { ...valid.overview, focusAreas },
          }).success,
          false,
        );
      assert.equal(
        challengeSchema.safeParse({
          ...valid,
          overview: { ...valid.overview, contact: 'email-sem-dominio' },
        }).success,
        false,
      );
      assert.equal(
        challengeSchema.safeParse({
          ...valid,
          overview: {
            ...valid.overview,
            contact: { label: 'Contato externo', href: 'https://usp.br/' },
          },
        }).success,
        false,
        'projetos de línguas mantêm email obrigatório',
      );
      for (const panel of ['team', 'resources']) {
        for (const incomplete of [
          { children: [{ type: 'html', html: '<p>Conteúdo.</p>' }] },
          { id: `${panel}-fixture` },
          { id: '', children: [{ type: 'html', html: '<p>Conteúdo.</p>' }] },
        ])
          assert.equal(
            challengeSchema.safeParse({
              ...valid,
              overview: { ...valid.overview, [panel]: incomplete },
            }).success,
            false,
            panel,
          );
        for (const children of [
          [],
          [{ type: 'html', html: '' }],
          [{ type: 'html', html: '<script>alert(1)</script>' }],
        ])
          assert.equal(
            challengeSchema.safeParse({
              ...valid,
              overview: {
                ...valid.overview,
                [panel]: { id: `${panel}-fixture`, children },
              },
            }).success,
            false,
            panel,
          );
      }
    });
  }
}

/**
 * @param {'obia' | 'harpia'} project
 * @param {'pt' | 'en'} locale
 */
function governanceProject(project, locale) {
  return {
    id: `${project}-${locale}`,
    translationId: project,
    locale,
    source: 'https://usp.br/',
    retrievedAt: '2026-10-13T12:00:00Z',
    anchor: `${project}-fixture`,
    blocks: [{ type: 'html', html: '<p>Descrição integral preservada.</p>' }],
    overview: {
      acronym: project,
      title: 'Nome completo do projeto',
      summary: 'Resumo independente para descoberta do projeto.',
      focusAreas: [
        {
          title: 'Frente de pesquisa',
          description: 'Descrição da frente de pesquisa.',
          icon: 'observation',
        },
      ],
      leadership: 'Nome da liderança.',
      about: { id: `${project}-about`, label: 'Sobre o projeto' },
      cta: { label: 'Conhecer o projeto', href: `#${project}-description` },
      ...(project === 'harpia'
        ? {
            team: {
              id: 'equipe-fixture',
              children: [{ type: 'html', html: '<p>Equipe preservada.</p>' }],
            },
          }
        : {}),
      resources: {
        id: 'recursos-fixture',
        children: [{ type: 'html', html: '<p>Recursos preservados.</p>' }],
      },
      contact:
        project === 'obia'
          ? 'c4ai-humanities@usp.br'
          : {
              label: 'Contato com a equipe',
              href: 'https://sites.usp.br/keml/contato/',
            },
    },
  };
}

for (const locale of /** @type {const} */ (['pt', 'en'])) {
  for (const project of /** @type {const} */ (['obia', 'harpia'])) {
    test(`${locale}/${project}: card aceita painéis distintos e exige frentes descritivas, apresentação, chamada e contato válidos`, () => {
      const valid = governanceProject(project, locale);
      assert.equal(challengeSchema.safeParse(valid).success, true);
      assert.equal(
        challengeSchema.safeParse({ ...valid, overview: undefined }).success,
        false,
      );
      assert.equal(
        challengeSchema.safeParse({ ...valid, blocks: [] }).success,
        false,
      );
      assert.equal(
        challengeSchema.safeParse({
          ...valid,
          overview: {
            ...valid.overview,
            cta: { label: 'Página oficial', href: 'https://usp.br/' },
            team: {
              id: 'equipe-fixture',
              children: [{ type: 'html', html: '<p>Equipe.</p>' }],
            },
          },
        }).success,
        true,
      );
      for (const field of Object.keys(valid.overview)) {
        const incomplete = Object.fromEntries(
          Object.entries(valid.overview).filter(([key]) => key !== field),
        );
        assert.equal(
          challengeSchema.safeParse({ ...valid, overview: incomplete }).success,
          false,
          field,
        );
      }
      for (const focusAreas of [
        [],
        ['Frente sem descrição'],
        [{ title: '', description: 'Descrição', icon: 'observation' }],
        [{ title: 'Título', description: '', icon: 'observation' }],
        [
          {
            title: 'Título',
            description: 'Descrição',
            icon: 'ícone-desconhecido',
          },
        ],
        [{ title: 'Título', description: 'Descrição' }],
      ])
        assert.equal(
          challengeSchema.safeParse({
            ...valid,
            overview: { ...valid.overview, focusAreas },
          }).success,
          false,
          JSON.stringify(focusAreas),
        );
      for (const about of [
        { id: '', label: 'Sobre' },
        { id: 'sobre', label: '' },
        { label: 'Sobre' },
        { id: 'sobre' },
      ])
        assert.equal(
          challengeSchema.safeParse({
            ...valid,
            overview: { ...valid.overview, about },
          }).success,
          false,
          JSON.stringify(about),
        );
      for (const href of [
        '',
        '#',
        'javascript:alert(1)',
        'data:text/html,test',
        'mailto:c4ai@usp.br',
      ])
        assert.equal(
          challengeSchema.safeParse({
            ...valid,
            overview: { ...valid.overview, cta: { label: 'Conhecer', href } },
          }).success,
          false,
          href,
        );
      for (const contact of [
        '',
        'endereco-sem-dominio',
        { label: '', href: 'https://usp.br/' },
        { label: 'Contato', href: '#contato' },
        { label: 'Contato', href: 'javascript:alert(1)' },
        { label: 'Contato' },
      ])
        assert.equal(
          challengeSchema.safeParse({
            ...valid,
            overview: { ...valid.overview, contact },
          }).success,
          false,
          JSON.stringify(contact),
        );
      assert.equal(
        challengeSchema.safeParse({
          ...valid,
          overview: {
            ...valid.overview,
            contact:
              project === 'obia'
                ? { label: 'Contato externo', href: 'https://usp.br/' }
                : 'c4ai@usp.br',
          },
        }).success,
        false,
        'OBIA mantém email e HarpIA mantém o contato externo original',
      );
      if (project === 'harpia')
        assert.equal(
          challengeSchema.safeParse({
            ...valid,
            overview: { ...valid.overview, team: undefined },
          }).success,
          false,
          'equipe preservada de HarpIA é obrigatória',
        );
      for (const panel of ['team', 'resources'])
        for (const children of [
          [],
          [{ type: 'html', html: '' }],
          [{ type: 'html', html: '<script>alert(1)</script>' }],
        ])
          assert.equal(
            challengeSchema.safeParse({
              ...valid,
              overview: {
                ...valid.overview,
                [panel]: { id: `${panel}-fixture`, children },
              },
            }).success,
            false,
            panel,
          );
    });
  }
}
