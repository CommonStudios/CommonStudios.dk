import { z } from 'zod';

const projectHrefSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      value.startsWith('/') ||
      value.startsWith('https://') ||
      value.startsWith('http://'),
    'Expected root-relative path or http(s) URL',
  );

export const projectLinkSchema = z.object({
  label: z.string().min(1),
  url: projectHrefSchema,
});

export const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().startsWith('/'),
  links: z.array(projectLinkSchema).min(1),
});

export const projectsSchema = z.array(projectSchema).min(1);

export type ProjectLink = z.infer<typeof projectLinkSchema>;
export type Project = z.infer<typeof projectSchema>;

export function parseProjects(input: unknown): Project[] {
  return projectsSchema.parse(input);
}
