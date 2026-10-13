// Contrato independente do mapa de rotas e das coleções. Textos e URLs congelados
// das fontes inventariadas; alterações exigem justificativa editorial na revisão.
import articleRequirements from './article-requirements.json' with { type: 'json' };
export const principalPages = [
  {
    path: '/pt/',
    lang: 'pt-BR',
    title: 'C4AI | Início',
    heading:
      'Um centro de pesquisa em inteligência artificial avançada no Brasil.',
    pair: '/en/',
  },
  {
    path: '/en/',
    lang: 'en',
    title: 'C4AI | Home',
    heading:
      'A research center for advanced artificial intelligence in Brazil.',
    pair: '/pt/',
  },
  {
    path: '/pt/sobre/',
    lang: 'pt-BR',
    title: 'C4AI | Sobre',
    heading:
      'Um centro de pesquisa em inteligência artificial avançada no Brasil.',
    pair: '/en/about/',
  },
  {
    path: '/en/about/',
    lang: 'en',
    title: 'C4AI | About',
    heading:
      'A research center for advanced artificial intelligence in Brazil.',
    pair: '/pt/sobre/',
  },
  {
    path: '/pt/pesquisas/',
    lang: 'pt-BR',
    title: 'C4AI | Pesquisas',
    heading: 'Pesquisas no C4AI',
    pair: '/en/research/',
  },
  {
    path: '/en/research/',
    lang: 'en',
    title: 'C4AI | Research',
    heading: 'Research in the C4AI',
    pair: '/pt/pesquisas/',
  },
  {
    path: '/pt/noticias/',
    lang: 'pt-BR',
    title: 'C4AI | Notícias',
    heading: 'C4AI notícias e eventos',
    pair: '/en/news/',
  },
  {
    path: '/en/news/',
    lang: 'en',
    title: 'C4AI | News',
    heading: 'C4AI news and events',
    pair: '/pt/noticias/',
  },
] as const;
export interface RequiredPage {
  path: string;
  lang: string;
  title: string;
  heading: string;
  description?: string;
  pair?: string;
}
export const requiredPages: RequiredPage[] = [
  {
    path: '/',
    lang: 'pt-BR',
    title: 'C4AI | Português / English',
    heading: 'Escolha seu idioma',
    description:
      'Escolha o idioma do site do C4AI. Choose the language of the C4AI website.',
    pair: '/en/',
  },
  ...principalPages.map((p) => ({
    ...p,
    description: ['/pt/', '/pt/pesquisas/'].includes(p.path)
      ? 'O C4AI concentra suas pesquisas em duas linhas: processamento de linguagem natural para as línguas do Brasil, incluindo português e línguas indígenas, e governança de IA, com governança macro (IA e políticas públicas) e micro (implantação e avaliação de IA).'
      : ['/en/', '/en/research/'].includes(p.path)
        ? 'C4AI focuses its research on two areas: natural language processing for the languages of Brazil, including Portuguese and Indigenous languages, and AI governance, with macro governance (AI and public policy) and micro governance (AI deployment and evaluation).'
        : p.heading,
  })),
  {
    path: '/pt/noticias/page/2/',
    lang: 'pt-BR',
    title: 'C4AI | Notícias — Página 2',
    heading: 'C4AI notícias e eventos',
    description: 'C4AI notícias e eventos',
    pair: '/en/news/page/2/',
  },
  {
    path: '/en/news/page/2/',
    lang: 'en',
    title: 'C4AI | News — Page 2',
    heading: 'C4AI news and events',
    description: 'C4AI news and events',
    pair: '/pt/noticias/page/2/',
  },
  ...articleRequirements.map((a) => ({
    path: a.path,
    lang: a.locale === 'pt' ? 'pt-BR' : 'en',
    title: `${a.title} | C4AI`,
    heading: a.title,
    description: a.description,
    pair: a.path.includes('luis-lamb')
      ? articleRequirements.find(
          (other) =>
            other.locale !== a.locale && other.path.includes('luis-lamb'),
        )!.path
      : undefined,
  })),
  {
    path: '/404.html',
    lang: 'pt-BR',
    title: 'C4AI | Página não encontrada / Page not found',
    heading: 'Página não encontrada',
    description:
      'Página não encontrada. Volte ao início. Page not found. Return to the home page.',
  },
];
export const challenges = [
  'NLP2',
  'ProIndL',
  'HarpIA',
  'KEML',
  'OceanML',
  'MClimate',
  'OBIA@C4AI',
  'AI Health',
  'AgriBio',
];
export const aboutAnchors = {
  pt: ['lideranca', 'difusao', 'contato'],
  en: ['leadership', 'outreach', 'contact'],
};
export const newsAnchors = {
  pt: [
    'chat_port',
    'seminar_port',
    'mesaRedonda',
    'techLaw_port',
    '05_port',
    'press',
  ],
  en: ['chat', 'seminar', 'roundTable', 'techLaw', '05', 'others'],
};

// Decisões editoriais da reunião/email e plano de 06/10/2026. Este contrato
// permanece manual e independente das coleções e dos componentes renderizados.
export const researchSubareas = {
  pt: [
    {
      anchor: 'governance-macro',
      title: 'Governança Macro — IA e políticas públicas',
      record: 'OBIA_B_eng',
      name: 'OBIA@C4AI',
    },
    {
      anchor: 'governance-micro',
      title: 'Governança Micro — Implantação e avaliação de IA',
      record: 'harpia',
      name: 'HarpIA',
    },
  ],
  en: [
    {
      anchor: 'governance-macro',
      title: 'Macro governance — AI and public policy',
      record: 'OBIA_B_eng',
      name: 'OBIA@C4AI',
    },
    {
      anchor: 'governance-micro',
      title: 'Micro governance — AI deployment and evaluation',
      record: 'harpia',
      name: 'HarpIA',
    },
  ],
} as const;
export const aboutUpdate = {
  pt: {
    path: '/pt/sobre/',
    leadership: 'lideranca',
    outreach: 'difusao',
    contact: 'contato',
    people: [
      'Diretor Fabio Cozman, USP',
      'Coordenador de Divulgação Fernando Osório, USP',
      'Coordenador de Impacto João Paulo Veiga, USP (atuação)',
      'Gerente Executivo Jairo Carlos Filho, USP',
      'Gerente de Difusão Maurício Klein, USP',
      'Assistente Administrativo Eliana Futenma, FUSP',
    ],
    removedAnchors: ['diversidade', 'impacto', 'reusable-sections-6', 'cis'],
    workshop: 'Vídeo do workshop — 2022',
    committees: [
      'Comitê Executivo',
      'Comitê de Direção',
      'Comitê de Estratégia',
      'Comitê de Indústria e Sociedade',
      'Comitê Consultivo Internacional',
    ],
  },
  en: {
    path: '/en/about/',
    leadership: 'leadership',
    outreach: 'outreach',
    contact: 'contact',
    people: [
      'Director Fabio Cozman, USP',
      'Outreach Coordinator Fernando Osório, USP',
      'Impact Coordinator João Paulo Veiga, USP (acting)',
      'Executive Manager Jairo Carlos Filho, USP',
      'Diffusion Manager Maurício Klein, USP',
      'Administrative Assistant Eliana Futenma, FUSP',
    ],
    removedAnchors: ['diversity', 'impact', 'reusable-sections-6', 'features'],
    workshop: 'Workshop video — 2022',
    committees: [
      'Executive Committee',
      'Steering Committee',
      'Strategy Committee',
      'The Industry and Society Committee',
      'The International Advisory Board',
    ],
  },
} as const;
export const leadershipPhotos = [
  '/media/efe3a205cbf2.jpg',
  '/media/f907124dd99d.jpg',
  '/media/b6008f555305.jpg',
  '/media/c071e689c793.jpg',
  '/media/73844d6075ec.jpg',
  '/media/109798fa012e.jpg',
];
export const footerSocialLinks = [
  'https://www.youtube.com/c/C4AIUSP',
  'https://www.instagram.com/c4aiusp/',
  'https://www.facebook.com/groups/C4AI.USP',
  'https://bit.ly/C4AI-Linkedin',
  'https://www.flickr.com/photos/195298871@N06/albums',
  'https://linktr.ee/c4aiusp',
];
