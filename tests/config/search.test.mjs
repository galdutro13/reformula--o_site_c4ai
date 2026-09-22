import { test } from 'node:test';
import assert from 'node:assert/strict';
import { searchSegments } from '../../src/search/segments.ts';

test('índice inclui conteúdo recursivo sem IDs, URLs e campos estruturais', async () => {
  /** @type {import('../../src/content/model').Block[]} */
  const blocks = [
    {
      type: 'group',
      layout: 'section',
      id: 'ignorar-id',
      children: [
        { type: 'heading', level: 2, text: 'Título editorial' },
        {
          type: 'details',
          id: 'ignorar-painel',
          label: 'Equipe',
          children: [
            { type: 'html', html: '<p>Pesquisa &amp; ensino</p>' },
            {
              type: 'image',
              src: '/media/ignorar.png',
              alt: 'Descrição da imagem',
              width: 10,
              height: 10,
            },
            {
              type: 'image',
              src: '/media/decorativa.png',
              alt: '',
              width: 10,
              height: 10,
            },
            {
              type: 'embed',
              url: 'https://example.org/ignorar',
              label: 'Workshop',
            },
            { type: 'challenge', ref: 'desafio-pt' },
          ],
        },
      ],
    },
  ];
  /** @type {string[]} */
  const references = [];
  const result = await searchSegments(blocks, async (ref) => {
    references.push(ref);
    return [{ type: 'heading', level: 3, text: 'Conteúdo do desafio' }];
  });
  assert.deepEqual(references, ['desafio-pt']);
  assert.deepEqual(result, [
    { format: 'text', value: 'Título editorial' },
    { format: 'text', value: 'Equipe' },
    { format: 'html', value: '<p>Pesquisa &amp; ensino</p>' },
    { format: 'text', value: 'Descrição da imagem' },
    { format: 'text', value: 'Workshop' },
    { format: 'text', value: 'Conteúdo do desafio' },
  ]);
});
