// Contrato independente do mapa de rotas e das coleções. Textos e URLs congelados
// das fontes inventariadas; alterações exigem justificativa editorial na revisão.
import articleRequirements from './article-requirements.json' with { type: 'json' };
export const principalPages = [
  {
    path: '/',
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
    pair: '/',
  },
  {
    path: '/pt/sobre/',
    lang: 'pt-BR',
    title: 'C4AI | Sobre',
    heading: 'Pesquisa avançada em inteligência artificial no Brasil',
    pair: '/en/about/',
  },
  {
    path: '/en/about/',
    lang: 'en',
    title: 'C4AI | About',
    heading: 'Advanced artificial intelligence research in Brazil',
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
  canonical?: string;
  lang: string;
  title: string;
  heading: string;
  description?: string;
  pair?: string;
}
export const requiredPages: RequiredPage[] = [
  {
    path: '/pt/',
    canonical: '/',
    lang: 'pt-BR',
    title: 'C4AI | Início',
    heading:
      'Um centro de pesquisa em inteligência artificial avançada no Brasil.',
    description:
      'O C4AI concentra suas pesquisas em duas linhas: processamento de linguagem natural para as línguas do Brasil, incluindo português e línguas indígenas, e governança de IA, com governança macro (IA e políticas públicas) e micro (implantação e avaliação de IA).',
    pair: '/en/',
  },
  ...principalPages.map((p) => ({
    ...p,
    description: ['/', '/pt/pesquisas/'].includes(p.path)
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
// Redesign dos projetos autorizado em 13/10/2026: os títulos completos de
// línguas e governança substituem as siglas como headings; os nove registros permanecem.
export const challenges = {
  pt: [
    'Processamento de Linguagem Natural para o Português',
    'Fortalecimento das Línguas Indígenas Brasileiras com IA',
    'Avaliação de Grandes Modelos de Linguagem',
    'KEML',
    'OceanML',
    'MClimate',
    'Observação e Discussão do Impacto da Inteligência Artificial',
    'AI Health',
    'AgriBio',
  ],
  en: [
    'Natural Language Processing for Portuguese',
    'Strengthening Brazilian Indigenous Languages with AI',
    'Evaluation of Large Language Models',
    'KEML',
    'OceanML',
    'MClimate',
    'Observing and Discussing the Impact of Artificial Intelligence',
    'AI Health',
    'AgriBio',
  ],
} as const;
export const aboutAnchors = {
  pt: ['lideranca', 'difusao', 'contato'],
  en: ['leadership', 'outreach', 'contact'],
};
// Redesign da introdução de Sobre autorizado em 15/10/2026. Expectativas
// editoriais manuais; os textos institucionais seguintes permanecem obrigatórios.
export const aboutIntro = {
  pt: {
    path: '/pt/sobre/',
    lang: 'pt-BR',
    eyebrow: 'C4AI — USP',
    title: 'Pesquisa avançada em inteligência artificial no Brasil',
    description:
      'O C4AI desenvolve pesquisas fundamentais e aplicadas em inteligência artificial, reunindo diferentes áreas do conhecimento.',
    action: 'Conheça nossas pesquisas',
    destination: '/pt/pesquisas/',
    image: '/media/06fcd48f000b.jpg',
    activities: 'Acompanhe nossas atividades',
    cards: [
      {
        title: 'Seminários e palestras',
        description:
          'Assista às apresentações e aos encontros promovidos pelo C4AI.',
        action: 'Acessar YouTube',
        href: 'https://www.youtube.com/c/C4AIUSP',
      },
      {
        title: 'Eventos e workshops',
        description:
          'Explore os registros fotográficos das atividades do centro.',
        action: 'Acessar Flickr',
        href: 'https://www.flickr.com/photos/195298871@N06/52014132992/in/album-72177720298226753',
      },
    ],
  },
  en: {
    path: '/en/about/',
    lang: 'en',
    eyebrow: 'C4AI — USP',
    title: 'Advanced artificial intelligence research in Brazil',
    description:
      'C4AI conducts fundamental and applied research in artificial intelligence, bringing together different fields of knowledge.',
    action: 'Explore our research',
    destination: '/en/research/',
    image: '/media/06fcd48f000b.jpg',
    activities: 'Follow our activities',
    cards: [
      {
        title: 'Seminars and talks',
        description: 'Watch presentations and meetings organized by C4AI.',
        action: 'Visit YouTube',
        href: 'https://www.youtube.com/c/C4AIUSP',
      },
      {
        title: 'Events and workshops',
        description: 'Explore photographs of the center’s activities.',
        action: 'Visit Flickr',
        href: 'https://www.flickr.com/photos/195298871@N06/52014132992/in/album-72177720298226753',
      },
    ],
  },
} as const;
// Reorganização institucional de Sobre autorizada em 15/10/2026. Contrato
// manual: preserva os parágrafos originais e separa três grupos temáticos.
export const aboutOverview = {
  pt: {
    path: '/pt/sobre/',
    title: 'C4AI',
    presentation: [
      'O Centro de Inteligência Artificial (Center for Artificial Intelligence – C4AI) tem o compromisso de desenvolver pesquisas no estado da arte em Inteligência Artificial (IA), explorando tanto aspectos básicos quanto aplicados nesta área.',
      'O C4AI foi criado em 2020 com apoio da IBM e da Fundação de Amparo à Pesquisa do Estado de São Paulo (FAPESP), dentro do Programa de Centros de Pesquisa Aplicada.',
    ],
    detailsAction: 'Saiba mais sobre o C4AI',
    details:
      'O C4AI considera que o próximo nível de desempenho em IA só poderá ser alcançado enfatizando a combinação de aprendizado de máquina, tomada de decisão, representação de conhecimento e raciocínio, e incrementando a colaboração entre essas áreas e suas aplicações. O C4AI também desenvolve estudos sobre o impacto social e econômico da IA e conduz atividades de disseminação de conhecimento e transferência de tecnologia, procurando formas de melhorar a qualidade de vida humana.',
    principles: 'Missão e visão',
    mission: {
      title: 'Missão',
      description:
        'Produzir pesquisa avançada em Inteligência Artificial no Brasil, disseminando e debatendo os principais resultados, treinando estudantes e profissionais, e transferindo a tecnologia para a sociedade.',
    },
    vision: {
      title: 'Visão',
      description:
        'Ser um centro de excelência de nível mundial em Inteligência Artificial e uma organização essencial para a comunidade científica e a sociedade no Brasil.',
    },
    locationLabel: 'Localização',
    locationTitle: 'Onde estamos',
    location:
      'O C4AI é sediado no CIAAM e localizado no InovaUSP, um espaço para inovação e pesquisa multidisciplinar no coração do campus Butantã da USP.',
    address:
      'Av. Profº Lúcio Martins Rodrigues, 370 – Butantã – São Paulo – SP',
    postalCode: 'CEP: 05508-020',
    locationAction: 'Como chegar',
    locationDestination: '/pt/sobre/#contato',
    contact: 'contato',
    presentationImage: '/media/8b64dc5090e1.jpg',
    locationImage: '/media/42ddc70db70c.jpg',
  },
  en: {
    path: '/en/about/',
    title: 'C4AI',
    presentation: [
      'The Center for Artificial Intelligence (Centro de Inteligência Artificial – C4AI) is committed to developing state-of-the-art research in Artificial Intelligence (AI), exploring both basic and applied aspects of this field.',
      'C4AI was created in 2020 with support from IBM and the São Paulo Research Foundation (FAPESP), within the Applied Research Centers Program.',
    ],
    detailsAction: 'Learn more about C4AI',
    details:
      'C4AI considers that the next level of AI performance can only be achieved by emphasizing the combination of machine learning, decision-making, knowledge representation and reasoning, and increasing collaboration between these areas and their applications. C4AI also conducts studies on the social and economic impact of AI and carries out knowledge dissemination and technology transfer activities, seeking ways to improve human quality of life.',
    principles: 'Mission and vision',
    mission: {
      title: 'Mission',
      description:
        'To produce advanced research in Artificial Intelligence in Brazil, disseminate and debate its main results, train students and professionals, and transfer the technology to society.',
    },
    vision: {
      title: 'Vision',
      description:
        'To be a world-class center of excellence in Artificial Intelligence and an essential organization for the scientific community and the society in Brazil.',
    },
    locationLabel: 'Location',
    locationTitle: 'Where we are',
    location:
      'C4AI is hosted by CIAAM and located at InovaUSP, a space for innovation and multidisciplinary research in the heart of USP’s Butantã campus.',
    address:
      'Av. Profº Lúcio Martins Rodrigues, 370 – Butantã – São Paulo – SP',
    postalCode: 'CEP: 05508-020',
    locationAction: 'Getting here',
    locationDestination: '/en/about/#contact',
    contact: 'contact',
    presentationImage: '/media/8b64dc5090e1.jpg',
    locationImage: '/media/42ddc70db70c.jpg',
  },
} as const;
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
      projectTitle:
        'Observação e Discussão do Impacto da Inteligência Artificial',
    },
    {
      anchor: 'governance-micro',
      title: 'Governança Micro — Implantação e avaliação de IA',
      record: 'harpia',
      name: 'HarpIA',
      projectTitle: 'Avaliação de Grandes Modelos de Linguagem',
    },
  ],
  en: [
    {
      anchor: 'governance-macro',
      title: 'Macro governance — AI and public policy',
      record: 'OBIA_B_eng',
      name: 'OBIA@C4AI',
      projectTitle:
        'Observing and Discussing the Impact of Artificial Intelligence',
    },
    {
      anchor: 'governance-micro',
      title: 'Micro governance — AI deployment and evaluation',
      record: 'harpia',
      name: 'HarpIA',
      projectTitle: 'Evaluation of Large Language Models',
    },
  ],
} as const;
// Redesign do destaque inicial autorizado em 14/10/2026. Títulos e asset
// anteriores preservados; CTA e destinos definidos manualmente pelo requisito.
export const homeHero = {
  pt: {
    path: '/',
    title:
      'Um centro de pesquisa em inteligência artificial avançada no Brasil.',
    lang: 'pt-BR',
    action: 'Conheça o C4AI',
    destination: '/pt/sobre/',
    previousAction: 'Saiba mais',
    image: '/media/d59b07c37db0.png',
    imageWidth: 856,
    imageHeight: 580,
  },
  en: {
    path: '/en/',
    title: 'A research center for advanced artificial intelligence in Brazil.',
    lang: 'en',
    action: 'Discover C4AI',
    destination: '/en/about/',
    previousAction: 'About us',
    image: '/media/d59b07c37db0.png',
    imageWidth: 856,
    imageHeight: 580,
  },
} as const;
// Cabeçalho global e correção de interação autorizados em 14/10/2026.
// A orientação posterior preserva links diretos Sobre/Notícias, com setas
// separadas e hover desktop. Expectativas manuais, sem importar aplicação.
export const globalHeader = {
  pt: {
    path: '/',
    pair: '/en/',
    mainName: 'Principal',
    mobileMainName: 'Principal móvel',
    languageName: 'Idioma',
    home: 'Início',
    brand: 'C4AI — Início',
    menu: 'Menu',
    close: 'Fechar',
    currentLanguage: 'Português',
    otherLanguage: 'English',
    items: [
      { label: 'Início', href: '/' },
      { label: 'Sobre', href: '/pt/sobre/' },
      { label: 'Pesquisas', href: '/pt/pesquisas/' },
      { label: 'Notícias', href: '/pt/noticias/' },
    ],
    resources: 'Recursos',
    opportunities: {
      label: 'Oportunidades',
      href: 'https://c4ai.inova.usp.br/pt/oportunidades/',
    },
    menus: [
      {
        name: 'Seções de Sobre',
        className: 'submenu',
        index: 0,
        firstLink: 'Visão geral',
        firstHref: '/pt/sobre/',
        links: [
          ['Visão geral', '/pt/sobre/'],
          ['Liderança', '/pt/sobre/#lideranca'],
          ['Difusão', '/pt/sobre/#difusao'],
          ['Contato', '/pt/sobre/#contato'],
        ],
      },
      {
        name: 'Seções de Notícias',
        className: 'submenu',
        index: 1,
        firstLink: 'Todas as notícias',
        firstHref: '/pt/noticias/',
        links: [
          ['Todas as notícias', '/pt/noticias/'],
          ['ChatBot & ChatGPT', '/pt/noticias/#chat_port'],
          ['Perspectivas', '/pt/noticias/#seminar_port'],
          ['Mesa Redonda', '/pt/noticias/#mesaRedonda'],
          ['Tech Law', '/pt/noticias/#techLaw_port'],
          ['Encontros C4AI', '/pt/noticias/#05_port'],
          ['Press & Media', '/pt/noticias/#press'],
        ],
      },
      {
        name: 'Recursos',
        className: 'resource-menu',
        index: 0,
        firstLink: 'Publicações (site externo)',
        firstHref: 'https://c4ai.inova.usp.br/pt/publicacoes/',
        links: [
          [
            'Publicações (site externo)',
            'https://c4ai.inova.usp.br/pt/publicacoes/',
          ],
          [
            'NLP2 – Web Portal (site externo)',
            'https://sites.google.com/icmc.usp.br/nlp2',
          ],
        ],
      },
    ],
    activePages: [
      { path: '/', href: '/', current: 'page' },
      { path: '/pt/', href: '/', current: 'page' },
      {
        path: '/pt/sobre/',
        href: '/pt/sobre/',
        current: 'page',
      },
      { path: '/pt/pesquisas/', href: '/pt/pesquisas/', current: 'page' },
      {
        path: '/pt/noticias/',
        href: '/pt/noticias/',
        current: 'page',
      },
      {
        path: '/pt/noticias/page/2/',
        href: '/pt/noticias/',
        current: 'location',
      },
      {
        path: '/pt/noticias/centro-de-inteligencia-artificial-da-usp-completa-2-anos-com-significativas-contribuicoes/',
        href: '/pt/noticias/',
        current: 'location',
      },
    ],
  },
  en: {
    path: '/en/',
    pair: '/',
    mainName: 'Main',
    mobileMainName: 'Mobile main',
    languageName: 'Language',
    home: 'Home',
    brand: 'C4AI — Home',
    menu: 'Menu',
    close: 'Close',
    currentLanguage: 'English',
    otherLanguage: 'Português',
    items: [
      { label: 'Home', href: '/en/' },
      { label: 'About', href: '/en/about/' },
      { label: 'Research', href: '/en/research/' },
      { label: 'News', href: '/en/news/' },
    ],
    resources: 'Resources',
    opportunities: {
      label: 'Opportunities',
      href: 'https://c4ai.inova.usp.br/opportunities/',
    },
    menus: [
      {
        name: 'Sections of About',
        className: 'submenu',
        index: 0,
        firstLink: 'Overview',
        firstHref: '/en/about/',
        links: [
          ['Overview', '/en/about/'],
          ['Leadership', '/en/about/#leadership'],
          ['Outreach', '/en/about/#outreach'],
          ['Contact', '/en/about/#contact'],
        ],
      },
      {
        name: 'Sections of News',
        className: 'submenu',
        index: 1,
        firstLink: 'All news',
        firstHref: '/en/news/',
        links: [
          ['All news', '/en/news/'],
          ['ChatBot & ChatGPT', '/en/news/#chat'],
          ['Perspectives', '/en/news/#seminar'],
          ['Round Table', '/en/news/#roundTable'],
          ['Tech Law', '/en/news/#techLaw'],
          ['C4AI Meetings', '/en/news/#05'],
          ['Press & Media', '/en/news/#others'],
        ],
      },
      {
        name: 'Resources',
        className: 'resource-menu',
        index: 0,
        firstLink: 'Publications (external site)',
        firstHref: 'https://c4ai.inova.usp.br/publications/',
        links: [
          [
            'Publications (external site)',
            'https://c4ai.inova.usp.br/publications/',
          ],
          [
            'NLP2 – Web Portal (external site)',
            'https://sites.google.com/icmc.usp.br/nlp2',
          ],
        ],
      },
    ],
    activePages: [
      { path: '/en/', href: '/en/', current: 'page' },
      {
        path: '/en/about/',
        href: '/en/about/',
        current: 'page',
      },
      { path: '/en/research/', href: '/en/research/', current: 'page' },
      { path: '/en/news/', href: '/en/news/', current: 'page' },
      {
        path: '/en/news/page/2/',
        href: '/en/news/',
        current: 'location',
      },
      {
        path: '/en/news/c4ai-seminar-perspectives-in-ai-dr-luis-lamb-feb-24-18h-brazil-time-2/',
        href: '/en/news/',
        current: 'location',
      },
    ],
  },
} as const;
// Redesign da seção inicial autorizado em 14/10/2026. Conteúdo, ordem e
// destinos congelados manualmente; não derivar das coleções ou componentes.
export const homeResearch = {
  pt: {
    path: '/',
    title: 'Nossas linhas de pesquisa',
    cards: [
      {
        title: 'Processamento de linguagem natural para as línguas do Brasil',
        href: '/pt/pesquisas/#languages',
        summary:
          'Desenvolvimento de recursos linguísticos, modelos computacionais e tecnologias de processamento de linguagem natural para o português e as línguas indígenas brasileiras.',
        navigation: 'Projetos de pesquisa',
        links: [
          {
            title: 'NLP2 — Português brasileiro',
            description:
              'Desenvolvimento de recursos e ferramentas para o processamento do português.',
            href: '/pt/pesquisas/#NLP2_B_eng',
            anchor: 'NLP2_B_eng',
          },
          {
            title: 'ProIndL — Línguas indígenas brasileiras',
            description:
              'Desenvolvimento de tecnologias linguísticas para línguas indígenas.',
            href: '/pt/pesquisas/#ProIndL_B_eng',
            anchor: 'ProIndL_B_eng',
          },
        ],
      },
      {
        title: 'Governança de IA',
        href: '/pt/pesquisas/#governance',
        summary:
          'Investigação dos impactos sociais e políticos da inteligência artificial, com foco em políticas públicas, regulamentação, implantação e avaliação de sistemas de IA.',
        navigation: 'Áreas de pesquisa',
        links: [
          {
            title: 'Governança Macro — IA e políticas públicas',
            description:
              'Estudos sobre os impactos da IA na sociedade, regulamentação e políticas públicas.',
            href: '/pt/pesquisas/#governance-macro',
            anchor: 'governance-macro',
          },
          {
            title: 'Governança Micro — Implantação e avaliação de IA',
            description:
              'Pesquisa sobre a implementação, gestão e avaliação de sistemas de inteligência artificial.',
            href: '/pt/pesquisas/#governance-micro',
            anchor: 'governance-micro',
          },
        ],
      },
    ],
  },
  en: {
    path: '/en/',
    title: 'Our research areas',
    cards: [
      {
        title: 'Natural language processing for the languages of Brazil',
        href: '/en/research/#languages',
        summary:
          'Development of linguistic resources, computational models and natural language processing technologies for Portuguese and Brazilian Indigenous languages.',
        navigation: 'Research projects',
        links: [
          {
            title: 'NLP2 — Brazilian Portuguese',
            description:
              'Development of resources and tools for processing Portuguese.',
            href: '/en/research/#NLP2_B_eng',
            anchor: 'NLP2_B_eng',
          },
          {
            title: 'ProIndL — Brazilian Indigenous languages',
            description:
              'Development of language technologies for Indigenous languages.',
            href: '/en/research/#ProIndL_B_eng',
            anchor: 'ProIndL_B_eng',
          },
        ],
      },
      {
        title: 'AI governance',
        href: '/en/research/#governance',
        summary:
          'Investigation of the social and political impacts of artificial intelligence, focusing on public policy, regulation, deployment and evaluation of AI systems.',
        navigation: 'Research areas',
        links: [
          {
            title: 'Macro governance — AI and public policy',
            description:
              'Studies of the impacts of AI on society, regulation and public policy.',
            href: '/en/research/#governance-macro',
            anchor: 'governance-macro',
          },
          {
            title: 'Micro governance — AI deployment and evaluation',
            description:
              'Research on the implementation, management and evaluation of artificial intelligence systems.',
            href: '/en/research/#governance-micro',
            anchor: 'governance-micro',
          },
        ],
      },
    ],
  },
} as const;
// Redesign do índice autorizado em 13/10/2026; expectativas independentes
// do componente e das coleções, preservando os quatro destinos de navegação.
export const researchIndex = {
  pt: {
    path: '/pt/pesquisas/',
    title: 'Explore nossas pesquisas',
    introduction:
      'Conheça nossas linhas de pesquisa e acesse as áreas temáticas.',
    areas: [
      {
        title: 'Processamento de linguagem natural para as línguas do Brasil',
        description:
          'Pesquisa em processamento de linguagem natural para o português e as línguas indígenas brasileiras.',
      },
      {
        title: 'Governança de IA',
        description:
          'Estudos sobre políticas públicas, implantação e avaliação de sistemas de inteligência artificial.',
      },
    ],
    history: 'Trabalhos anteriores',
    historyDescription: 'Conheça os registros de pesquisas anteriores do C4AI.',
    links: [
      { label: 'Conhecer esta linha de pesquisa', anchor: 'languages' },
      {
        label: 'Governança Macro — IA e políticas públicas',
        anchor: 'governance-macro',
      },
      {
        label: 'Governança Micro — Implantação e avaliação de IA',
        anchor: 'governance-micro',
      },
      { label: 'Consultar trabalhos anteriores', anchor: 'previous-research' },
    ],
  },
  en: {
    path: '/en/research/',
    title: 'Explore our research',
    introduction: 'Discover our research areas and explore their themes.',
    areas: [
      {
        title: 'Natural language processing for the languages of Brazil',
        description:
          'Research in natural language processing for Portuguese and Brazilian Indigenous languages.',
      },
      {
        title: 'AI governance',
        description:
          'Studies of public policy, deployment and evaluation of artificial intelligence systems.',
      },
    ],
    history: 'Previous research',
    historyDescription: 'Explore records of previous C4AI research.',
    links: [
      { label: 'Explore this research area', anchor: 'languages' },
      {
        label: 'Macro governance — AI and public policy',
        anchor: 'governance-macro',
      },
      {
        label: 'Micro governance — AI deployment and evaluation',
        anchor: 'governance-micro',
      },
      { label: 'Browse previous research', anchor: 'previous-research' },
    ],
  },
} as const;
export const aboutUpdate = {
  pt: {
    path: '/pt/sobre/',
    leadership: 'lideranca',
    outreach: 'difusao',
    contact: 'contato',
    people: [
      'Fabio Cozman',
      'Fernando Osório',
      'João Paulo Veiga',
      'Jairo Carlos Filho',
      'Maurício Klein',
      'Eliana Futenma',
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
      'Fabio Cozman',
      'Fernando Osório',
      'João Paulo Veiga',
      'Jairo Carlos Filho',
      'Maurício Klein',
      'Eliana Futenma',
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

// Contrato manual do redesign solicitado em 16/10/2026. Os grupos descrevem
// funções; não representam novas unidades da organização. As sínteses seguem as
// fontes oficiais e as ressalvas registradas na revisão editorial desta etapa.
export const aboutLeadership = {
  pt: {
    path: '/pt/sobre/',
    anchor: 'lideranca',
    title: 'Liderança',
    introduction:
      'Conheça os profissionais responsáveis pela direção, coordenação, gestão e apoio administrativo do C4AI.',
    groups: [
      {
        id: 'leadership-executive',
        title: 'Direção e coordenação',
        people: ['Fabio Cozman', 'Fernando Osório', 'João Paulo Veiga'],
      },
      {
        id: 'leadership-management',
        title: 'Gestão e apoio administrativo',
        people: ['Jairo Carlos Filho', 'Maurício Klein', 'Eliana Futenma'],
      },
    ],
    profiles: [
      {
        name: 'Fabio Cozman',
        role: 'Diretor',
        affiliation: 'Universidade de São Paulo — USP',
        biography:
          'Engenheiro pela Escola Politécnica da USP e doutor pela Carnegie Mellon University. Professor titular da Escola Politécnica da USP.',
        image: '/media/efe3a205cbf2.jpg',
        alt: 'Retrato de Fabio Cozman.',
        link: {
          label: 'Site pessoal',
          href: 'http://sites.poli.usp.br/p/fabio.cozman/',
        },
      },
      {
        name: 'Fernando Osório',
        role: 'Coordenador de Divulgação',
        affiliation: 'Universidade de São Paulo — USP',
        biography:
          'Doutor em Ciência da Computação pelo Institut National Polytechnique de Grenoble, França. Professor e pesquisador do ICMC-USP, em São Carlos, com atuação em inteligência artificial e robótica.',
        image: '/media/f907124dd99d.jpg',
        alt: 'Retrato de Fernando Osório.',
        link: {
          label: 'Currículo Lattes',
          href: 'http://lattes.cnpq.br/7396818382676736',
        },
      },
      {
        name: 'João Paulo Veiga',
        role: 'Coordenador de Impacto (atuação)',
        affiliation: 'Universidade de São Paulo — USP',
        biography:
          'Bacharel em Ciências Sociais, mestre e doutor em Ciência Política pela USP. Professor do Departamento de Ciência Política da FFLCH-USP e do Instituto de Relações Internacionais da USP.',
        image: '/media/b6008f555305.jpg',
        alt: 'Retrato de João Paulo Veiga.',
        link: {
          label: 'Currículo Lattes',
          href: 'http://lattes.cnpq.br/1059788774957753',
        },
      },
      {
        name: 'Jairo Carlos Filho',
        role: 'Gerente Executivo',
        affiliation: 'Universidade de São Paulo — USP',
        biography:
          'Estudos em Engenharia Eletrônica na FEI, com MBA em Engenharia da Qualidade pela Escola Politécnica da USP e formação em Gestão Pública pela FEARP-USP.',
        image: '/media/c071e689c793.jpg',
        alt: 'Retrato de Jairo Carlos Filho.',
      },
      {
        name: 'Maurício Klein',
        role: 'Gerente de Difusão',
        affiliation: 'Universidade de São Paulo — USP',
        biography:
          'Bacharel em Design Arquitetônico e Urbanístico e mestre em Engenharia de Segurança do Trabalho. Atua em comunicação, design digital e mídia na USP desde 2006.',
        image: '/media/73844d6075ec.jpg',
        alt: 'Retrato de Maurício Klein.',
      },
      {
        name: 'Eliana Futenma',
        role: 'Assistente Administrativo',
        affiliation: 'Fundação de Apoio à Universidade de São Paulo — FUSP',
        biography:
          'Técnica em Secretariado pela ETEC e graduada em Administração pela ESAN/FEI.',
        image: '/media/109798fa012e.jpg',
        alt: 'Retrato de Eliana Futenma.',
      },
    ],
  },
  en: {
    path: '/en/about/',
    anchor: 'leadership',
    title: 'Leadership',
    introduction:
      'Meet the professionals responsible for C4AI’s direction, coordination, management and administrative support.',
    groups: [
      {
        id: 'leadership-executive',
        title: 'Leadership and coordination',
        people: ['Fabio Cozman', 'Fernando Osório', 'João Paulo Veiga'],
      },
      {
        id: 'leadership-management',
        title: 'Management and administrative support',
        people: ['Jairo Carlos Filho', 'Maurício Klein', 'Eliana Futenma'],
      },
    ],
    profiles: [
      {
        name: 'Fabio Cozman',
        role: 'Director',
        affiliation: 'University of São Paulo — USP',
        biography:
          'Engineer from USP’s Polytechnic School and PhD from Carnegie Mellon University. Full professor at USP’s Polytechnic School.',
        image: '/media/efe3a205cbf2.jpg',
        alt: 'Portrait of Fabio Cozman.',
        link: {
          label: 'Personal website',
          href: 'http://sites.poli.usp.br/p/fabio.cozman/',
        },
      },
      {
        name: 'Fernando Osório',
        role: 'Outreach Coordinator',
        affiliation: 'University of São Paulo — USP',
        biography:
          'PhD in Computer Science from Institut National Polytechnique de Grenoble, France. Professor and researcher at ICMC-USP in São Carlos, working in artificial intelligence and robotics.',
        image: '/media/f907124dd99d.jpg',
        alt: 'Portrait of Fernando Osório.',
        link: {
          label: 'Lattes CV',
          href: 'http://lattes.cnpq.br/7396818382676736',
        },
      },
      {
        name: 'João Paulo Veiga',
        role: 'Impact Coordinator (acting)',
        affiliation: 'University of São Paulo — USP',
        biography:
          'Bachelor’s degree in Social Sciences and a master’s degree and PhD in Political Science from USP. Professor at USP’s Department of Political Science (FFLCH) and Institute of International Relations.',
        image: '/media/b6008f555305.jpg',
        alt: 'Portrait of João Paulo Veiga.',
        link: {
          label: 'Lattes CV',
          href: 'http://lattes.cnpq.br/1059788774957753',
        },
      },
      {
        name: 'Jairo Carlos Filho',
        role: 'Executive Manager',
        affiliation: 'University of São Paulo — USP',
        biography:
          'Studies in Electronic Engineering at FEI, with an MBA in Quality Engineering from USP’s Polytechnic School and training in Public Management at FEARP-USP.',
        image: '/media/c071e689c793.jpg',
        alt: 'Portrait of Jairo Carlos Filho.',
      },
      {
        name: 'Maurício Klein',
        role: 'Diffusion Manager',
        affiliation: 'University of São Paulo — USP',
        biography:
          'Bachelor’s degree in Architectural and Urban Design and a master’s degree in Occupational Safety Engineering. Has worked in communication, digital design and media at USP since 2006.',
        image: '/media/73844d6075ec.jpg',
        alt: 'Portrait of Maurício Klein.',
      },
      {
        name: 'Eliana Futenma',
        role: 'Administrative Assistant',
        affiliation: 'Fundação de Apoio à Universidade de São Paulo — FUSP',
        biography:
          'Technical training in Secretarial Studies at ETEC and a degree in Business Administration from ESAN/FEI.',
        image: '/media/109798fa012e.jpg',
        alt: 'Portrait of Eliana Futenma.',
      },
    ],
  },
} as const;
export const footerSocialLinks = [
  'https://www.youtube.com/c/C4AIUSP',
  'https://www.instagram.com/c4aiusp/',
  'https://www.facebook.com/groups/C4AI.USP',
  'https://bit.ly/C4AI-Linkedin',
  'https://www.flickr.com/photos/195298871@N06/albums',
  'https://linktr.ee/c4aiusp',
];

// Complementação HarpIA: contrato editorial das fontes oficiais consultadas em
// 13/10/2026; independente das coleções e do HTML produzido pela aplicação.
export const harpiaContent = {
  pt: {
    path: '/pt/pesquisas/',
    panels: ['Sobre a plataforma', 'Equipe', 'Recursos'],
    leadership: 'Liderança',
    ownInfrastructure:
      'O código deve ser instalado na infraestrutura do usuário.',
    credits: 'https://sites.usp.br/keml/creditos/',
    contact: 'https://sites.usp.br/keml/contato/',
    resources: [
      'https://sites.usp.br/keml/harpia-survey/',
      'https://sites.usp.br/keml/harpia-lab/',
      'https://sites.usp.br/keml/harpia-twin/',
      'https://sites.usp.br/keml/harpia-modelos-e-conjuntos-de-dados/',
      'https://sites.usp.br/keml/harpia-arquitetura/',
      'https://sites.usp.br/keml/perguntas-frequentes/',
    ],
  },
  en: {
    path: '/en/research/',
    panels: ['About the platform', 'Team', 'Resources'],
    leadership: 'Leadership',
    ownInfrastructure:
      'The code must be installed on the user’s own infrastructure.',
    credits: 'https://sites.usp.br/keml/en/credits/',
    contact: 'https://sites.usp.br/keml/en/contact/',
    resources: [
      'https://sites.usp.br/keml/en/harpia-survey-2/',
      'https://sites.usp.br/keml/en/harpia-lab-2/',
      'https://sites.usp.br/keml/en/harpia-twin-2/',
      'https://sites.usp.br/keml/en/harpia-resources/',
      'https://sites.usp.br/keml/en/architecture/',
      'https://sites.usp.br/keml/en/faq/',
    ],
  },
} as const;

// Cards de línguas: textos da solicitação de 13/10/2026 e tradução equivalente;
// IDs e URLs são o contrato legado inventariado, não derivados da aplicação.
const nlp2ResourceUrls = [
  'https://sites.google.com/icmc.usp.br/nlp2',
  'https://sites.google.com/icmc.usp.br/poetisa',
  'https://sites.google.com/view/tarsila-c4ai',
  'https://sites.usp.br/corpuscarolina',
  'https://synestech.ai',
] as const;
// Ilustrações fornecidas pelo usuário no Figma em 13/10/2026:
// arquivo R70QFAvYNAN8NpocOdiBeA, artes 2:25 (NLP2) e 2:36 (ProIndL).
// O contrato é manual, independente do componente e dos exports da aplicação.
export const languageProjectIllustrations = [
  {
    anchor: 'NLP2_B_eng',
    src: '/media/research-nlp2-figma.svg',
    width: 240,
    height: 240,
  },
  {
    anchor: 'ProIndL_B_eng',
    src: '/media/research-proindl-figma.svg',
    width: 240,
    height: 240,
  },
] as const;
export const languageProjects = {
  pt: {
    path: '/pt/pesquisas/',
    focus: 'Principais frentes de pesquisa',
    leadership: 'Liderança',
    panels: ['Conhecer o projeto', 'Equipe', 'Recursos e publicações'],
    cards: [
      {
        anchor: 'NLP2_B_eng',
        acronym: 'NLP2',
        title: 'Processamento de Linguagem Natural para o Português',
        summary:
          'Desenvolvimento de recursos linguísticos e ferramentas abertas para aprimorar o processamento automático do português brasileiro escrito e falado.',
        focusAreas: [
          'Análise sintática e anotação linguística.',
          'Construção de corpora e modelos de linguagem.',
          'Reconhecimento, síntese e processamento da fala.',
        ],
        leaders: 'Marcelo Finger, Sandra M. Aluísio e Thiago A. S. Pardo.',
        contact: 'c4ai-nlp2@usp.br',
        teamId: '16252-c50',
        resourceId: '16252-c53',
        teamUrls: [
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/NLP2%20_Portugues_Equipes_modeloC4AI_23.pdf',
        ],
        resourceUrls: nlp2ResourceUrls,
        detailedText:
          'O objetivo deste desafio de pesquisa é reunir dados abertos e ferramentas para habilitar o PLN (Processamento de Linguagem Natural) de alto nível para o português (escrito e falado). O grupo de pesquisa concentrou-se em:',
      },
      {
        anchor: 'ProIndL_B_eng',
        acronym: 'ProIndL',
        title: 'Fortalecimento das Línguas Indígenas Brasileiras com IA',
        summary:
          'Pesquisa colaborativa sobre o desenvolvimento de tecnologias de inteligência artificial para apoiar a documentação e o fortalecimento das línguas indígenas brasileiras.',
        focusAreas: [
          'Documentação e preservação linguística.',
          'Ferramentas de IA para línguas com poucos recursos digitais.',
          'Desenvolvimento ético de tecnologias em colaboração com comunidades indígenas.',
        ],
        leaders: 'Luciana Storto e Claudio Pinhanez.',
        contact: 'c4ai-proindl@usp.br',
        teamId: '16252-c69',
        resourceId: '16252-c72',
        teamUrls: [
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/PROINDL%20_port.pdf',
        ],
        resourceUrls: ['https://conexoesoriginarias.github.io/'],
        detailedText: 'Este desafio de pesquisa explora três questões-chave:',
      },
    ],
  },
  en: {
    path: '/en/research/',
    focus: 'Main research areas',
    leadership: 'Leadership',
    panels: ['Explore the project', 'Team', 'Resources and publications'],
    cards: [
      {
        anchor: 'NLP2_B_eng',
        acronym: 'NLP2',
        title: 'Natural Language Processing for Portuguese',
        summary:
          'Development of linguistic resources and open tools to improve the automatic processing of written and spoken Brazilian Portuguese.',
        focusAreas: [
          'Syntactic analysis and linguistic annotation.',
          'Building corpora and language models.',
          'Speech recognition, synthesis and processing.',
        ],
        leaders: 'Marcelo Finger, Sandra M. Aluísio and Thiago A. S. Pardo.',
        contact: 'c4ai-nlp2@usp.br',
        teamId: '5-c53',
        resourceId: '5-c56',
        teamUrls: [
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/NLP2 _Ingles_Equipes_modeloC4AI_23.pdf',
        ],
        resourceUrls: nlp2ResourceUrls,
        detailedText:
          'The goal of this research challenge is to put together open data and tools to enable high-level NLP for Portuguese (written and spoken). The research group has focused on:',
      },
      {
        anchor: 'ProIndL_B_eng',
        acronym: 'ProIndL',
        title: 'Strengthening Brazilian Indigenous Languages with AI',
        summary:
          'Collaborative research into the development of artificial intelligence technologies to support the documentation and strengthening of Brazilian Indigenous languages.',
        focusAreas: [
          'Language documentation and preservation.',
          'AI tools for languages with few digital resources.',
          'Ethical development of technologies in collaboration with Indigenous communities.',
        ],
        leaders: 'Luciana Storto and Claudio Pinhanez.',
        contact: 'c4ai-proindl@usp.br',
        teamId: '5-c76',
        resourceId: '5-c79',
        teamUrls: [
          'https://c4ai.inova.usp.br/C4AIrepositorios/Equipes/PROINDL _eng.pdf',
        ],
        resourceUrls: ['https://conexoesoriginarias.github.io/'],
        detailedText: 'This research challenge explores three key questions:',
      },
    ],
  },
} as const;

// Cards de governança: proposta editorial de 13/10/2026 e tradução fiel.
// IDs, recursos e restrições são o contrato anterior preservado. A consolidação
// dos dois Resources ingleses de OBIA foi autorizada, com ambas as âncoras.
// Ilustrações de governança fornecidas pelo usuário no Figma:
// arquivo oRyXiLWMBUDsiVWzDeSs4k, artes 2:19 (OBIA) e 7:63 (HarpIA).
// Associação manual independente do componente e dos exports da aplicação.
export const governanceProjectIllustrations = [
  {
    anchor: 'OBIA_B_eng',
    src: '/media/research-obia-figma.svg',
    width: 240,
    height: 240,
  },
  {
    anchor: 'harpia',
    src: '/media/research-harpia-figma.svg',
    width: 240,
    height: 240,
  },
] as const;
export const governanceProjects = {
  pt: {
    path: '/pt/pesquisas/',
    sectionTitle: 'Governança de IA',
    focus: 'Principais frentes de pesquisa',
    leadership: 'Liderança',
    contact: 'Contato',
    cards: [
      {
        subarea: 'governance-macro',
        anchor: 'OBIA_B_eng',
        acronym: 'OBIA@C4AI',
        title: 'Observação e Discussão do Impacto da Inteligência Artificial',
        summary:
          'Pesquisa multidisciplinar dedicada a mapear, compreender e debater os impactos da inteligência artificial no Brasil e em outros países emergentes.',
        focusAreas: [
          {
            title: 'Impactos sociais e políticos da IA',
            description:
              'Investigação dos efeitos da inteligência artificial sobre a sociedade brasileira e outros países emergentes.',
          },
          {
            title: 'Desinformação, regulamentação e ética',
            description:
              'Estudos sobre desinformação, regulamentação da inteligência artificial e comportamento ético.',
          },
          {
            title: 'Pesquisa multidisciplinar e observação da IA',
            description:
              'Articulação de diferentes perspectivas acadêmicas e participação em iniciativas relacionadas ao Observatório Brasileiro de Inteligência Artificial.',
          },
        ],
        leaders: 'Cristina Oliveira e João Veiga.',
        cta: {
          label: 'Conhecer o projeto',
          href: '#OBIA_B_eng-description',
        },
        aboutId: 'obia-about',
        panels: ['Sobre o projeto', 'Recursos'],
        resourcesId: '16252-c190',
        contact: 'c4ai-humanities@usp.br',
        contactHref: 'mailto:c4ai-humanities@usp.br',
        history: 'Desde junho de 2022, a equipe tem participado',
      },
      {
        subarea: 'governance-micro',
        anchor: 'harpia',
        acronym: 'HarpIA',
        title: 'Avaliação de Grandes Modelos de Linguagem',
        summary:
          'Plataforma de código aberto dedicada à avaliação de grandes modelos de linguagem (LLMs), com ferramentas para tornar esse processo mais padronizado, reprodutível e transparente.',
        focusAreas: [
          {
            title: 'Avaliação humana e automatizada de LLMs',
            description:
              'Ferramentas para conduzir avaliações com participantes humanos e procedimentos automatizados.',
          },
          {
            title: 'Arquitetura modular de avaliação',
            description:
              'Integração de módulos independentes por meio de interfaces compartilhadas, permitindo configurar diferentes fluxos de avaliação.',
          },
          {
            title: 'Reprodutibilidade e transparência',
            description:
              'Registro estruturado de dados, procedimentos e resultados para permitir auditoria e reprodução dos estudos.',
          },
        ],
        leaders: 'Sarajane Marques Peres e Fabio Gagliardi Cozman.',
        cta: {
          label: 'Conhecer a plataforma HarpIA',
          href: 'https://sites.usp.br/keml/harpia/',
        },
        aboutId: 'harpia-about',
        panels: ['Sobre a plataforma', 'Equipe', 'Recursos'],
        resourcesId: 'harpia-resources',
        contact: 'Contato com a equipe do projeto',
        contactHref: 'https://sites.usp.br/keml/contato/',
        restrictions:
          'O código deve ser instalado na infraestrutura do usuário. O foco é avaliar modelos; a plataforma não oferece treinamento ou otimização de LLMs nem um serviço online hospedado pela equipe.',
      },
    ],
  },
  en: {
    path: '/en/research/',
    sectionTitle: 'AI governance',
    focus: 'Main research areas',
    leadership: 'Leadership',
    contact: 'Contact',
    cards: [
      {
        subarea: 'governance-macro',
        anchor: 'OBIA_B_eng',
        acronym: 'OBIA@C4AI',
        title: 'Observing and Discussing the Impact of Artificial Intelligence',
        summary:
          'Multidisciplinary research dedicated to mapping, understanding and debating the impacts of artificial intelligence in Brazil and other emerging countries.',
        focusAreas: [
          {
            title: 'Social and political impacts of AI',
            description:
              'Investigation of the effects of artificial intelligence on Brazilian society and other emerging countries.',
          },
          {
            title: 'Disinformation, regulation and ethics',
            description:
              'Studies on disinformation, artificial intelligence regulation and ethical behavior.',
          },
          {
            title: 'Multidisciplinary research and AI observation',
            description:
              'Bringing together different academic perspectives and participating in initiatives related to the Brazilian Artificial Intelligence Observatory.',
          },
        ],
        leaders: 'Cristina Oliveira and João Veiga.',
        cta: {
          label: 'Explore the project',
          href: '#OBIA_B_eng-description',
        },
        aboutId: 'obia-about',
        panels: ['About the project', 'Resources'],
        resourcesId: '5-c147',
        contact: 'c4ai-humanities@usp.br',
        contactHref: 'mailto:c4ai-humanities@usp.br',
        history: 'Since June 2022 the team has participated',
      },
      {
        subarea: 'governance-micro',
        anchor: 'harpia',
        acronym: 'HarpIA',
        title: 'Evaluation of Large Language Models',
        summary:
          'An open-source platform dedicated to evaluating large language models (LLMs), with tools to make this process more standardized, reproducible and transparent.',
        focusAreas: [
          {
            title: 'Human and automated LLM evaluation',
            description:
              'Tools for conducting evaluations with human participants and automated procedures.',
          },
          {
            title: 'Modular evaluation architecture',
            description:
              'Integration of independent modules through shared interfaces, allowing different evaluation workflows to be configured.',
          },
          {
            title: 'Reproducibility and transparency',
            description:
              'Structured recording of data, procedures and results to enable auditing and reproduction of studies.',
          },
        ],
        leaders: 'Sarajane Marques Peres and Fabio Gagliardi Cozman.',
        cta: {
          label: 'Explore the HarpIA platform',
          href: 'https://sites.usp.br/keml/en/harpia-2/',
        },
        aboutId: 'harpia-about',
        panels: ['About the platform', 'Team', 'Resources'],
        resourcesId: 'harpia-resources',
        contact: 'Contact the project team',
        contactHref: 'https://sites.usp.br/keml/en/contact/',
        restrictions:
          'The code must be installed on the user’s own infrastructure. The focus is model evaluation; the platform does not provide LLM training or optimization, or an online service hosted by the team.',
      },
    ],
  },
} as const;
