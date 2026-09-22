export type Locale = 'pt' | 'en';
export const locales: Locale[] = ['pt', 'en'];
export const ui = {
  pt: {
    lang: 'pt-BR',
    skip: 'Pular para o conteúdo',
    languages: 'Idioma',
  },
  en: {
    lang: 'en',
    skip: 'Skip to content',
    languages: 'Language',
  },
} satisfies Record<Locale, Record<string, string>>;
