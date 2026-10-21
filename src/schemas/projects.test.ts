import { describe, expect, it } from 'vitest';
import { parseProjects } from '~/schemas/projects';

const base = {
  name: 'N',
  description: { da: 'D', en: 'D' },
  url: 'https://a.dk',
  kind: 'product',
  discipline: { da: 'D', en: 'D' },
};

describe('parseProjects', () => {
  it('accepts valid seed shape', () => {
    expect(parseProjects([base])).toHaveLength(1);
  });

  it('rejects non-http project url', () => {
    expect(() => parseProjects([{ ...base, url: 'a.dk' }])).toThrow();
  });

  it('rejects an unknown project kind', () => {
    expect(() => parseProjects([{ ...base, kind: 'partner' }])).toThrow();
  });

  it('requires previews to use local assets', () => {
    expect(() =>
      parseProjects([
        {
          ...base,
          preview: {
            src: 'https://example.com/logo.png',
            width: 10,
            height: 10,
            alt: { da: 'A', en: 'A' },
          },
        },
      ]),
    ).toThrow();
  });
});
