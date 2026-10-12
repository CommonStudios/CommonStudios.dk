import { describe, expect, it } from 'vitest';
import { pickLocale, resolveRedirect } from './redirects';

const req = (headers: Record<string, string> = {}) =>
  new Request('https://commonstudios.dk/', { headers });

describe('pickLocale', () => {
  it('defaults to Danish without hints', () => {
    expect(pickLocale(req())).toBe('da');
  });

  it('prefers a saved choice over the browser language', () => {
    expect(pickLocale(req({ cookie: 'a=1; lang=en', 'accept-language': 'da' }))).toBe('en');
  });

  it('follows Accept-Language quality order', () => {
    expect(pickLocale(req({ 'accept-language': 'de-DE, en;q=0.8, da;q=0.9' }))).toBe('da');
    expect(pickLocale(req({ 'accept-language': 'en-GB,en;q=0.9' }))).toBe('en');
  });
});

describe('resolveRedirect', () => {
  it('sends merged pages to their home-page section permanently', () => {
    expect(resolveRedirect('/en/projects', req())).toEqual({
      location: '/en#work',
      permanent: true,
    });
    expect(resolveRedirect('/contact', req({ 'accept-language': 'en' }))).toEqual({
      location: '/en#contact',
      permanent: true,
    });
  });

  it('negotiates the root temporarily', () => {
    expect(resolveRedirect('/', req())).toEqual({ location: '/da', permanent: false });
    expect(resolveRedirect('/privacy', req({ cookie: 'lang=en' }))).toEqual({
      location: '/en/privacy',
      permanent: false,
    });
  });

  it('leaves real pages and assets alone', () => {
    expect(resolveRedirect('/da', req())).toBeNull();
    expect(resolveRedirect('/en/privacy', req())).toBeNull();
    expect(resolveRedirect('/images/og-image.png', req())).toBeNull();
  });
});
