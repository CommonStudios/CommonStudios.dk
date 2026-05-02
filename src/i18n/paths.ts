import type { Locale } from './constants';

/**
 * `trailingSlash: 'never'` — no trailing slash on index.
 */
export function pathForLocale(
  locale: Locale,
  segment: '' | 'projects' | 'privacy',
): string {
  if (segment === '') {
    return `/${locale}`;
  }
  return `/${locale}/${segment}`;
}

export function canonicalUrl(
  origin: string,
  locale: Locale,
  segment: '' | 'projects' | 'privacy',
): string {
  const base = origin.replace(/\/$/, '');
  return `${base}${pathForLocale(locale, segment)}`;
}
