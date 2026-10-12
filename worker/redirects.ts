type Locale = 'da' | 'en';

const DEFAULT_LOCALE: Locale = 'da';
/** Keep in sync with `LOCALE_COOKIE` in `src/i18n/constants.ts`. */
const LOCALE_COOKIE = 'lang';

/** Pages that were merged into the home page. Old URLs keep their ranking via 301. */
const MERGED_SECTIONS: Record<string, string> = {
  projects: '#work',
  contact: '#contact',
};

/** Unprefixed paths answered with the visitor's language. */
const NEGOTIATED_PATHS = new Set(['', 'privacy']);

export function pickLocale(request: Request): Locale {
  const cookie = request.headers.get('cookie') ?? '';
  const saved = cookie.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=(da|en)`));
  if (saved) {
    return saved[1] as Locale;
  }

  const header = request.headers.get('accept-language');
  if (!header) {
    return DEFAULT_LOCALE;
  }
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { lang: tag.split('-')[0], q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => entry.lang === 'da' || entry.lang === 'en');
  return (match?.lang as Locale | undefined) ?? DEFAULT_LOCALE;
}

/** Returns a redirect target for `pathname`, or `null` to serve the asset. */
export function resolveRedirect(
  pathname: string,
  request: Request,
): { location: string; permanent: boolean } | null {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/');

  if (parts.length === 1 && parts[0] === 'sitemap.xml') {
    return { location: '/sitemap-index.xml', permanent: true };
  }

  const [first, second] = parts;
  const isLocalePrefixed = first === 'da' || first === 'en';

  if (isLocalePrefixed && parts.length === 2 && Object.hasOwn(MERGED_SECTIONS, second)) {
    return { location: `/${first}${MERGED_SECTIONS[second]}`, permanent: true };
  }

  if (parts.length === 1 && Object.hasOwn(MERGED_SECTIONS, first)) {
    return { location: `/${pickLocale(request)}${MERGED_SECTIONS[first]}`, permanent: true };
  }

  if (parts.length === 1 && NEGOTIATED_PATHS.has(first)) {
    const suffix = first === '' ? '' : `/${first}`;
    return { location: `/${pickLocale(request)}${suffix}`, permanent: false };
  }

  return null;
}
