import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/ui';

const associations = {
  languages: ['nlp2', 'proindl'],
  governance: ['obia', 'harpia'],
} as const;

export async function researchLines(locale: Locale) {
  const lines = await getCollection('researchLines');
  const groups = await getCollection('challenges');
  for (const lang of ['pt', 'en'] as const) {
    for (const [id, expected] of Object.entries(associations)) {
      const matches = lines.filter(
        (e) => e.data.translationId === id && e.data.locale === lang,
      );
      if (matches.length !== 1)
        throw new Error(
          `Linha obrigatória ausente ou duplicada: ${id}/${lang}`,
        );
      const line = matches[0].data;
      if (
        line.anchor !== id ||
        line.groups.join(',') !== expected.map((g) => `${g}-${lang}`).join(',')
      )
        throw new Error(`Associação de grupos inválida: ${id}/${lang}`);
      for (const ref of line.groups)
        if (!groups.some((g) => g.id === ref && g.data.locale === lang))
          throw new Error(`Grupo ausente: ${ref}`);
    }
  }
  return Object.keys(associations).map(
    (id) =>
      lines.find(
        (e) => e.data.translationId === id && e.data.locale === locale,
      )!.data,
  );
}
