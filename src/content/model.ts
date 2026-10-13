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

export const challengeSchema = z.object({
  revision: revisionSchema.optional(),
  id: z.string(),
  translationId: z.string(),
  locale: z.enum(['pt', 'en']),
  source: z.url(),
  retrievedAt: z.iso.datetime({ offset: true }),
  anchor: z.string(),
  blocks: z.array(blockSchema).min(1),
});
