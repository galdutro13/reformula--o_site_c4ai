import { getCollection } from 'astro:content';
import { locales, type Locale } from '../i18n/ui';

export async function getDemonstration(translationId: string, locale: Locale) {
  const entries = await getCollection('demonstrations');
  const identifiers = new Set(entries.map((entry) => entry.data.translationId));
  identifiers.add(translationId);
  for (const id of identifiers) {
    for (const language of locales) {
      const matches = entries.filter(
        (entry) =>
          entry.data.translationId === id && entry.data.locale === language,
      );
      if (matches.length !== 1)
        throw new Error(
          `Conteúdo ${id}: esperado exatamente um registro em ${language}.`,
        );
    }
  }
  const entry = entries.find(
    (item) =>
      item.data.translationId === translationId && item.data.locale === locale,
  );
  if (!entry)
    throw new Error(`Conteúdo obrigatório ausente: ${translationId}/${locale}`);
  return entry;
}
