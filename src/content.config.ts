import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  editorialSchema,
  challengeSchema,
  researchLineSchema,
} from './content/model';

export const collections = {
  researchLines: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/research-lines' }),
    schema: researchLineSchema,
  }),
  challenges: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/challenges' }),
    schema: challengeSchema,
  }),
  pages: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/pages' }),
    schema: editorialSchema,
  }),
  articles: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/articles' }),
    schema: editorialSchema,
  }),
};
