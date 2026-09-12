import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const demonstrations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/demonstrations' }),
  schema: z.object({
    translationId: z.string().min(1),
    locale: z.enum(['pt', 'en']),
    title: z.string().min(1),
    description: z.string().min(1),
    demonstration: z.literal(true),
  }),
});
export const collections = { demonstrations };
