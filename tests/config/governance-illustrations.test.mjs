import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { URL } from 'node:url';

// Valores da exportação original fornecida no Figma oRyXiLWMBUDsiVWzDeSs4k.
// Não são regenerados a partir dos assets nem dos componentes da aplicação.
const exports = [
  {
    project: 'OBIA',
    file: 'research-obia-figma.svg',
    bytes: 5660,
    sha256: 'd5d99454a5eae33cf57d4825e5284fda71206bb8fa523f8c7ce07f8efd7a8004',
  },
  {
    project: 'HarpIA',
    file: 'research-harpia-figma.svg',
    bytes: 70836,
    sha256: '44f4562bed1838497892c7ef0e0dbde51ea24ed72c60ec843118236cdbba169b',
  },
];

for (const expected of exports) {
  test(`${expected.project}: preserva integralmente o SVG original do Figma de 240×240`, async () => {
    const content = await readFile(
      new URL(`../../public/media/${expected.file}`, import.meta.url),
    );
    assert.equal(content.length, expected.bytes);
    assert.equal(
      createHash('sha256').update(content).digest('hex'),
      expected.sha256,
    );
    const root = content.toString('utf8').match(/<svg\b([^>]*)>/)?.[1];
    assert.ok(root, 'asset deve ser SVG');
    assert.match(root, /\bwidth="240"/);
    assert.match(root, /\bheight="240"/);
    assert.match(root, /\bviewBox="0 0 240 240"/);
  });
}
