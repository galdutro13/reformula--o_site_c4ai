import { z } from 'astro/zod';

export type Block =
  | { type: 'challenge'; ref: string }
  | { type: 'html'; html: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | {
      type: 'image';
      src: string;
      alt: string;
      width: number | null;
      height: number | null;
    }
  | { type: 'embed'; url: string; label: string }
  | { type: 'details'; id: string; label: string; children: Block[] }
  | {
      type: 'group';
      id?: string;
      layout: 'row' | 'column' | 'section';
      children: Block[];
    };

const localImage = z.string().regex(/^\/media\/[a-z0-9.-]+$/);
export const blockSchema: z.ZodType<Block> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({ type: z.literal('challenge'), ref: z.string().min(1) }),
    z.object({
      type: z.literal('html'),
      html: z
        .string()
        .min(1)
        .refine(
          (value) =>
            !/<(?:script|iframe|style)\b|\bon\w+\s*=|javascript:/i.test(value),
          'HTML editorial deve conter somente marcação segura e estática',
        ),
    }),
    z.object({
      type: z.literal('heading'),
      level: z.union([z.literal(2), z.literal(3)]),
      text: z.string().min(1),
    }),
    z.object({
      type: z.literal('image'),
      src: localImage,
      alt: z.string(),
      width: z.number().positive().nullable(),
      height: z.number().positive().nullable(),
    }),
    z.object({
      type: z.literal('embed'),
      url: z.url(),
      label: z.string().min(1),
    }),
    z.object({
      type: z.literal('details'),
      id: z.string(),
      label: z.string().min(1),
      children: z.array(blockSchema).min(1),
    }),
    z.object({
      type: z.literal('group'),
      id: z.string().optional(),
      layout: z.enum(['row', 'column', 'section']),
      children: z.array(blockSchema).min(1),
    }),
  ]),
);
const link = z.object({ label: z.string().min(1), href: z.string().min(1) });
const revisionSchema = z.object({
  date: z.iso.date(),
  basis: z.string().min(1),
});

const researchSubareaSchema = z.object({
  anchor: z.enum(['governance-macro', 'governance-micro']),
  title: z.string().min(1),
  summary: z.string().min(1),
  group: z.string().min(1),
});

export const researchLineSchema = z
  .object({
    id: z.string().min(1),
    translationId: z.enum(['languages', 'governance']),
    locale: z.enum(['pt', 'en']),
    anchor: z.enum(['languages', 'governance']),
    title: z.string().min(1),
    summary: z.string().min(1),
    groups: z.array(z.string().min(1)).length(2),
    subareas: z.array(researchSubareaSchema).default([]),
    revision: revisionSchema,
  })
  .refine((line) => {
    if (line.translationId === 'languages') return line.subareas.length === 0;
    const expected = [
      ['governance-macro', `obia-${line.locale}`],
      ['governance-micro', `harpia-${line.locale}`],
    ];
    return (
      line.subareas.length === expected.length &&
      expected.every(
        ([anchor, group], index) =>
          line.subareas[index].anchor === anchor &&
          line.subareas[index].group === group &&
          line.groups[index] === group,
      )
    );
  }, 'Governança exige as subdivisões Macro → OBIA e Micro → HarpIA, nessa ordem');

export const editorialSchema = z
  .object({
    revision: revisionSchema.optional(),
    id: z.string().min(1),
    kind: z.enum(['home', 'about', 'research', 'news', 'article']),
    locale: z.enum(['pt', 'en']),
    source: z.url(),
    retrievedAt: z.iso.datetime({ offset: true }),
    path: z.string().regex(/^\/(pt|en)\//),
    title: z.string().min(1),
    titleLang: z.enum(['pt-BR', 'en']).optional(),
    description: z.string().min(1),
    translationId: z.string().nullable(),
    blocks: z.array(blockSchema),
    heroBlocks: z.array(blockSchema).default([]),
    heroImages: z.array(localImage).default([]),
    promos: z.array(blockSchema).default([]),
    image: z.union([localImage, z.literal('')]).default(''),
    sourceOrder: z.number().int().nonnegative().default(99),
    author: z.string().default(''),
    authorUrl: z.string().default(''),
    date: z.string().default(''),
    dateLabel: z.string().default(''),
    categories: z.array(link).default([]),
    sidebarLinks: z.array(link).default([]),
    calendar: z.string().default(''),
    listedArticles: z.array(z.string()).default([]),
  })
  .refine((entry) => entry.kind === 'home' || entry.blocks.length > 0, {
    message: 'Somente Home pode ter blocos editoriais adicionais vazios',
    path: ['blocks'],
  });

const projectPanelSchema = z.object({
  id: z.string().min(1),
  children: z.array(blockSchema).min(1),
});

const projectFocusSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.enum([
    'document',
    'database',
    'sound',
    'book',
    'tools',
    'people',
    'observation',
    'chart',
    'modules',
  ]),
});

const projectExternalUrlSchema = z
  .url()
  .refine((value) => /^https?:\/\//.test(value));
const projectDestinationSchema = z.union([
  projectExternalUrlSchema,
  z.string().regex(/^#[A-Za-z0-9_-]+$/),
]);

export const projectOverviewSchema = z
  .object({
    acronym: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    focusAreas: z
      .array(z.union([z.string().min(1), projectFocusSchema]))
      .min(1),
    leadership: z.string().min(1),
    about: z
      .object({ id: z.string().min(1), label: z.string().min(1) })
      .optional(),
    cta: z
      .object({
        label: z.string().min(1),
        href: projectDestinationSchema,
      })
      .optional(),
    team: projectPanelSchema.optional(),
    resources: projectPanelSchema,
    contact: z.union([
      z.email(),
      z.object({ label: z.string().min(1), href: projectExternalUrlSchema }),
    ]),
  })
  .refine((project) => Boolean(project.about) === Boolean(project.cta), {
    message: 'Apresentação e chamada separadas devem ser definidas em conjunto',
  });

function hasLanguagePresentation(
  project: z.infer<typeof projectOverviewSchema>,
) {
  return Boolean(project.team) && typeof project.contact === 'string';
}

function hasGovernancePresentation(
  project: z.infer<typeof projectOverviewSchema>,
  projectId: string,
) {
  const hasRequiredContact =
    projectId === 'harpia'
      ? Boolean(project.team) && typeof project.contact !== 'string'
      : typeof project.contact === 'string';
  return (
    Boolean(project.about && project.cta && hasRequiredContact) &&
    project.focusAreas.every((area) => typeof area !== 'string')
  );
}

export const challengeSchema = z
  .object({
    revision: revisionSchema.optional(),
    id: z.string(),
    translationId: z.string(),
    locale: z.enum(['pt', 'en']),
    source: z.url(),
    retrievedAt: z.iso.datetime({ offset: true }),
    anchor: z.string(),
    blocks: z.array(blockSchema).min(1),
    overview: projectOverviewSchema.optional(),
  })
  .superRefine((entry, context) => {
    const languages = ['nlp2', 'proindl'].includes(entry.translationId);
    const governance = ['obia', 'harpia'].includes(entry.translationId);
    if (!languages && !governance) return;
    const project = entry.overview;
    if (!project) {
      context.addIssue({
        code: 'custom',
        message: 'Projetos atuais exigem uma apresentação estruturada',
        path: ['overview'],
      });
      return;
    }
    if (languages && !hasLanguagePresentation(project)) {
      context.addIssue({
        code: 'custom',
        message: 'NLP2 e ProIndL exigem equipe e email de contato',
        path: ['overview'],
      });
    }
    if (
      governance &&
      !hasGovernancePresentation(project, entry.translationId)
    ) {
      context.addIssue({
        code: 'custom',
        message:
          'Governança exige apresentação, chamada, contato próprio e frentes descritivas',
        path: ['overview'],
      });
    }
  });
