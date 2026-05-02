import { describe, expect, it } from 'vitest';
import { parseProjects } from '~/schemas/projects';

describe('parseProjects', () => {
  it('accepts valid seed shape', () => {
    const data = [
      {
        name: 'N',
        description: { da: 'D', en: 'D' },
        icon: '/i.png',
        links: [{ label: { da: 'L', en: 'L' }, url: 'https://a.dk' }],
      },
    ];
    expect(parseProjects(data)).toHaveLength(1);
  });

  it('rejects external icon', () => {
    expect(() =>
      parseProjects([
        {
          name: 'N',
          description: { da: 'D', en: 'D' },
          icon: 'https://evil.com/i.png',
          links: [{ label: { da: 'L', en: 'L' }, url: '/p' }],
        },
      ]),
    ).toThrow();
  });
});
