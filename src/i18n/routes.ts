import type { Locale } from './ui';

export const routes = {
  home: { pt: '/', en: '/en/' },
  about: { pt: '/pt/sobre/', en: '/en/about/' },
  research: { pt: '/pt/pesquisas/', en: '/en/research/' },
  news: { pt: '/pt/noticias/', en: '/en/news/' },
} as const;
export type PageId = keyof typeof routes;
export type Translations = Partial<Record<Locale, string>>;
export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
export function pagePath(id: PageId, locale: Locale): string {
  return withBase(routes[id][locale]);
}
export function contentUrl(url: string): string {
  return url.startsWith('/') ? withBase(url) : url;
}
// Only local, reviewed editorial HTML is rendered. The schema rejects active markup.
export function contentHtml(value: string): string {
  return value.replace(
    /(href|src)="(\/[^"\s]*)"/g,
    (_, attr: string, path: string) => `${attr}="${withBase(path)}"`,
  );
}
