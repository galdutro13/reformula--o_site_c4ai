import type { Locale } from './ui';

// Somente rotas implementadas. O inventário futuro está em docs/requirements.md.
export const routes = { home: { pt: '/pt/', en: '/en/' } } as const;
export type PageId = keyof typeof routes;

export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export function pagePath(id: PageId, locale: Locale): string {
  return withBase(routes[id][locale]);
}
