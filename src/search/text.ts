import type { SearchSegment } from './segments';

export const fold = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const boundaries = new Set([
  'ADDRESS',
  'ARTICLE',
  'ASIDE',
  'BLOCKQUOTE',
  'BR',
  'DD',
  'DETAILS',
  'DIV',
  'DL',
  'DT',
  'FIGCAPTION',
  'FIGURE',
  'FOOTER',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HEADER',
  'HR',
  'LI',
  'MAIN',
  'NAV',
  'OL',
  'P',
  'PRE',
  'SECTION',
  'SUMMARY',
  'TABLE',
  'TBODY',
  'TD',
  'TFOOT',
  'TH',
  'THEAD',
  'TR',
  'UL',
]);

function nodeText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
  const element = node as Element;
  if (['SCRIPT', 'STYLE', 'TEMPLATE'].includes(element.tagName)) return '';
  if (element.tagName === 'IMG') return element.getAttribute('alt') ?? '';
  const text = Array.from(node.childNodes, nodeText).join('');
  return boundaries.has(element.tagName) ? ` ${text} ` : text;
}

export function segmentText(segment: SearchSegment): string {
  if (segment.format === 'text') return segment.value;
  // A detached template decodes HTML entities without loading resources or
  // executing markup. Inline elements do not add artificial word boundaries.
  const template = document.createElement('template');
  template.innerHTML = segment.value;
  return nodeText(template.content);
}
