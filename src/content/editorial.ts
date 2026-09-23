import { getCollection, type CollectionEntry } from 'astro:content';
import { routes, type PageId, type Translations } from '../i18n/routes';
import { locales, type Locale } from '../i18n/ui';
export type Editorial = CollectionEntry<'pages'>['data'];
export async function getPage(id: PageId, locale: Locale): Promise<Editorial> {
  const entries = await getCollection('pages');
  const challenges = await getCollection('challenges');
  for (const challenge of [
    'nlp2',
    'proindl',
    'keml',
    'oceanml',
    'mclimate',
    'obia',
    'ai-health',
    'agribio',
  ])
    for (const lang of locales) {
      if (
        challenges.filter(
          (e) => e.data.translationId === challenge && e.data.locale === lang,
        ).length !== 1
      )
        throw new Error(
          `Desafio obrigatório ausente ou duplicado: ${challenge}/${lang}`,
        );
    }
  for (const pageId of Object.keys(routes) as PageId[]) {
    for (const lang of locales) {
      const matches = entries.filter(
        (e) => e.data.translationId === pageId && e.data.locale === lang,
      );
      if (matches.length !== 1)
        throw new Error(
          `Página obrigatória ausente ou duplicada: ${pageId}/${lang}`,
        );
    }
  }
  const entry = entries.find(
    (e) => e.data.translationId === id && e.data.locale === locale,
  )!.data;
  if (id === 'research') {
    const expected = ['oceanml', 'mclimate', 'ai-health', 'agribio'].map(
      (group) => `${group}-${locale}`,
    );
    const actual = entry.blocks.map((block) =>
      block.type === 'challenge' ? block.ref : '',
    );
    if (actual.join(',') !== expected.join(','))
      throw new Error(`Histórico de pesquisas inválido: ${locale}`);
  }
  return entry;
}
export async function articles(locale?: Locale): Promise<Editorial[]> {
  const entries = (await getCollection('articles')).map((e) => e.data);
  const paths = new Set<string>();
  for (const entry of entries) {
    if (paths.has(entry.path))
      throw new Error(`Artigo duplicado: ${entry.path}`);
    paths.add(entry.path);
    const prefix = entry.locale === 'pt' ? '/pt/noticias/' : '/en/news/';
    if (entry.path !== `${prefix}${entry.id}/`)
      throw new Error(`Caminho incompatível com o slug: ${entry.id}`);
    if (
      entry.translationId &&
      entries.filter(
        (other) =>
          other.translationId === entry.translationId &&
          other.locale === entry.locale,
      ).length !== 1
    )
      throw new Error(
        `Tradução duplicada: ${entry.translationId}/${entry.locale}`,
      );
  }
  return entries
    .filter((e) => !locale || e.locale === locale)
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        a.sourceOrder - b.sourceOrder ||
        a.id.localeCompare(b.id),
    );
}
export function articleTranslations(
  entry: Editorial,
  all: Editorial[],
): Translations {
  const translated: Translations = { [entry.locale]: entry.path };
  if (entry.translationId)
    for (const other of all.filter(
      (e) => e.translationId === entry.translationId,
    ))
      translated[other.locale] = other.path;
  return translated;
}
