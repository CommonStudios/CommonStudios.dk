export const LOCALES = ['da', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'da';

/** Remembers the visitor's language. Read by `worker/index.ts` and `LocaleRedirect.astro`. */
export const LOCALE_COOKIE = 'lang';

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Locale, string> = { da: 'da_DK', en: 'en_GB' };

export function isLocale(value: string | undefined): value is Locale {
  return value === 'da' || value === 'en';
}
