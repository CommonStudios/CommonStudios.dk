import type { Project } from '~/schemas/projects';

/** EXS Nordic logo asset links open the lightbox instead of navigating. */
export const LOGO_PREVIEW_PROJECT_NAME = 'EXS Nordic' as const;

const LOGO_PREVIEW_LABELS = new Set(['Logo (hvid)', 'Logo (sort)']);

export const isLogoPreviewLink = (
  projectName: Project['name'],
  linkLabel: string,
): boolean =>
  projectName === LOGO_PREVIEW_PROJECT_NAME &&
  LOGO_PREVIEW_LABELS.has(linkLabel);
