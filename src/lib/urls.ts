import { SITE_ORIGIN } from '~/config/site';

/**
 * Joins a pathname to an origin with stable slash semantics (no double slashes).
 */
export function absoluteUrl(
  pathname: string,
  origin: string = SITE_ORIGIN,
): string {
  const base = origin.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
