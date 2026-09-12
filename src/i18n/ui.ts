export type Locale = 'pt' | 'en';
export const locales: Locale[] = ['pt', 'en'];
export const ui = {
  pt: {
    lang: 'pt-BR',
    home: 'Início',
    skip: 'Pular para o conteúdo',
    navigation: 'Navegação principal',
    languages: 'Idioma',
    demonstration: 'Conteúdo demonstrativo',
    footer: 'C4AI · Site em reformulação',
    note: 'Esta é uma estrutura demonstrativa. O conteúdo institucional será incluído posteriormente.',
    explore: 'Explorar esta demonstração',
  },
  en: {
    lang: 'en',
    home: 'Home',
    skip: 'Skip to content',
    navigation: 'Main navigation',
    languages: 'Language',
    demonstration: 'Demonstration content',
    footer: 'C4AI · Website redesign',
    note: 'This is a demonstration structure. Institutional content will be added later.',
    explore: 'Explore this demonstration',
  },
} satisfies Record<Locale, Record<string, string>>;
