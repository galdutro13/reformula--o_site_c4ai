import type { Locale } from '../i18n/ui';

interface HomeResearchContent {
  languages: {
    summary: string;
    label: string;
    projects: {
      project: 'nlp2' | 'proindl';
      title: string;
      description: string;
    }[];
  };
  governance: {
    summary: string;
    label: string;
    descriptions: Record<'governance-macro' | 'governance-micro', string>;
  };
}

export const homeResearchContent = {
  pt: {
    languages: {
      summary:
        'Desenvolvimento de recursos linguísticos, modelos computacionais e tecnologias de processamento de linguagem natural para o português e as línguas indígenas brasileiras.',
      label: 'Projetos de pesquisa',
      projects: [
        {
          project: 'nlp2',
          title: 'NLP2 — Português brasileiro',
          description:
            'Desenvolvimento de recursos e ferramentas para o processamento do português.',
        },
        {
          project: 'proindl',
          title: 'ProIndL — Línguas indígenas brasileiras',
          description:
            'Desenvolvimento de tecnologias linguísticas para línguas indígenas.',
        },
      ],
    },
    governance: {
      summary:
        'Investigação dos impactos sociais e políticos da inteligência artificial, com foco em políticas públicas, regulamentação, implantação e avaliação de sistemas de IA.',
      label: 'Áreas de pesquisa',
      descriptions: {
        'governance-macro':
          'Estudos sobre os impactos da IA na sociedade, regulamentação e políticas públicas.',
        'governance-micro':
          'Pesquisa sobre a implementação, gestão e avaliação de sistemas de inteligência artificial.',
      },
    },
  },
  en: {
    languages: {
      summary:
        'Development of linguistic resources, computational models and natural language processing technologies for Portuguese and Brazilian Indigenous languages.',
      label: 'Research projects',
      projects: [
        {
          project: 'nlp2',
          title: 'NLP2 — Brazilian Portuguese',
          description:
            'Development of resources and tools for processing Portuguese.',
        },
        {
          project: 'proindl',
          title: 'ProIndL — Brazilian Indigenous languages',
          description:
            'Development of language technologies for Indigenous languages.',
        },
      ],
    },
    governance: {
      summary:
        'Investigation of the social and political impacts of artificial intelligence, focusing on public policy, regulation, deployment and evaluation of AI systems.',
      label: 'Research areas',
      descriptions: {
        'governance-macro':
          'Studies of the impacts of AI on society, regulation and public policy.',
        'governance-micro':
          'Research on the implementation, management and evaluation of artificial intelligence systems.',
      },
    },
  },
} satisfies Record<Locale, HomeResearchContent>;
