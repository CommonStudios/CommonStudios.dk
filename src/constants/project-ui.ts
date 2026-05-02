import type { Project, ProjectLink } from '~/schemas/projects';

/** EXS Nordic logo asset links open the lightbox instead of navigating. */
export const LOGO_PREVIEW_PROJECT_NAME = 'EXS Nordic' as const;

const LOGO_PREVIEW_LABELS = new Set([
  'Logo (hvid)',
  'Logo (sort)',
  'Logo (white)',
  'Logo (black)',
]);

export const isLogoPreviewLink = (
  projectName: Project['name'],
  linkLabel: ProjectLink['label'],
): boolean =>
  projectName === LOGO_PREVIEW_PROJECT_NAME &&
  (LOGO_PREVIEW_LABELS.has(linkLabel.da) ||
    LOGO_PREVIEW_LABELS.has(linkLabel.en));
