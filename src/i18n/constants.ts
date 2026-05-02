export const LOCALES = ['da', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'da';

/** Shared with privacy page — keep in sync with `privacy.astro` script if touched. */
export const LOCALE_STORAGE_KEY = 'tyndfed-lang';

export function isLocale(value: string | undefined): value is Locale {
  return value === 'da' || value === 'en';
}
