import type { Locale } from './constants';

export type PageSegment = '' | 'privacy';

/**
 * `trailingSlash: 'never'` — no trailing slash on index.
 */
export function pathForLocale(locale: Locale, segment: PageSegment): string {
  if (segment === '') {
    return `/${locale}`;
  }
  return `/${locale}/${segment}`;
}

export function canonicalUrl(
  origin: string,
  locale: Locale,
  segment: PageSegment,
): string {
  const base = origin.replace(/\/$/, '');
  return `${base}${pathForLocale(locale, segment)}`;
}
