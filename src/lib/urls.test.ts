import { describe, expect, it } from 'vitest';
import { SITE_ORIGIN } from '~/config/site';
import { absoluteUrl } from '~/lib/urls';

describe('absoluteUrl', () => {
  it('joins origin and path', () => {
    expect(absoluteUrl('/privacy')).toBe(`${SITE_ORIGIN}/privacy`);
  });

  it('normalizes missing leading slash', () => {
    expect(absoluteUrl('projects', SITE_ORIGIN)).toBe(
      `${SITE_ORIGIN}/projects`,
    );
  });

  it('strips trailing slash on origin', () => {
    expect(absoluteUrl('/x', 'https://example.com/')).toBe(
      'https://example.com/x',
    );
  });
});
