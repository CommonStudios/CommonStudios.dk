import { z } from 'zod';

const externalHrefSchema = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith('https://') || value.startsWith('http://'),
    'Expected http(s) URL',
  );

const localizedString = z.object({
  da: z.string().min(1),
  en: z.string().min(1),
});

/** Inline image shown in the work list (e.g. a logo). Local assets only. */
const previewSchema = z.object({
  src: z.string().startsWith('/'),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: localizedString,
});

const projectSchema = z.object({
  name: z.string().min(1),
  description: localizedString,
  url: externalHrefSchema,
  /** Our own product, or work made for a client. */
  kind: z.enum(['product', 'client']),
  /** Short label for the kind of work, e.g. "Web app" or "Logo". */
  discipline: localizedString,
  preview: previewSchema.optional(),
});

const projectsSchema = z.array(projectSchema).min(1);

export type Project = z.infer<typeof projectSchema>;

export function parseProjects(input: unknown): Project[] {
  return projectsSchema.parse(input);
}
