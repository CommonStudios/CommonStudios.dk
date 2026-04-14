import { describe, expect, it } from 'vitest';
import { parseProjects } from '~/schemas/projects';

describe('parseProjects', () => {
  it('accepts valid seed shape', () => {
    const data = [
      {
        name: 'N',
        description: 'D',
        icon: '/i.png',
        links: [{ label: 'L', url: 'https://a.dk' }],
      },
    ];
    expect(parseProjects(data)).toHaveLength(1);
  });

  it('rejects external icon', () => {
    expect(() =>
      parseProjects([
        {
          name: 'N',
          description: 'D',
          icon: 'https://evil.com/i.png',
          links: [{ label: 'L', url: '/p' }],
        },
      ]),
    ).toThrow();
  });
});
