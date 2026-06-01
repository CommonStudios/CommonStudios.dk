import { animate, splitText, stagger } from 'animejs';

const REVEAL_SELECTOR = '[data-reveal]';
const REVEAL_TEXT_SELECTOR = '[data-reveal-text]';

/**
 * Block entrance for `[data-reveal]` elements: fade + lift, triggered on scroll.
 * Items entering together are staggered as a group, so the initial above-the-fold
 * batch cascades while later items reveal on their own.
 */
function initBlockReveals(): void {
  const items = Array.from(
    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
  );
  if (items.length === 0) {
    return;
  }

  // Soft focus: blur + fade + a small drift. `data-reveal-from="top"` drifts down
  // from above; default drifts up from below.
  const revealGroup = (targets: HTMLElement[], fromOffset: number) => {
    if (targets.length === 0) {
      return;
    }
    animate(targets, {
      opacity: [0, 1],
      translateY: [fromOffset, 0],
      filter: ['blur(8px)', 'blur(0px)'],
      duration: 820,
      delay: stagger(80),
      ease: 'outExpo',
    });
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement);

      if (entering.length === 0) {
        return;
      }

      for (const target of entering) {
        obs.unobserve(target);
      }

      revealGroup(
        entering.filter((el) => el.dataset.revealFrom === 'top'),
        -10,
      );
      revealGroup(
        entering.filter((el) => el.dataset.revealFrom !== 'top'),
        10,
      );
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  for (const item of items) {
    observer.observe(item);
  }

  document.addEventListener('astro:before-swap', () => observer.disconnect(), {
    once: true,
  });
}

/**
 * Heading entrance for `[data-reveal-text]`: split into words, each rising up from
 * behind a clip mask with a staggered cascade. `accessible` keeps the original text
 * exposed to assistive tech; the splitter re-flows on resize on its own.
 */
function initTextReveals(): void {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(REVEAL_TEXT_SELECTOR),
  );

  for (const heading of headings) {
    const { words } = splitText(heading, {
      words: true,
      chars: false,
      accessible: true,
    });

    heading.style.opacity = '1';

    // Soft focus per word. `data-reveal-from="top"` drifts down from above; default up from below.
    const fromOffset = heading.dataset.revealFrom === 'top' ? -12 : 12;
    animate(words, {
      opacity: [0, 1],
      translateY: [fromOffset, 0],
      filter: ['blur(8px)', 'blur(0px)'],
      duration: 900,
      delay: stagger(55),
      ease: 'outExpo',
    });
  }
}

export function initReveals(): void {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (prefersReducedMotion) {
    for (const el of document.querySelectorAll<HTMLElement>(
      `${REVEAL_SELECTOR}, ${REVEAL_TEXT_SELECTOR}`,
    )) {
      el.style.opacity = '1';
    }
    return;
  }

  initBlockReveals();
  initTextReveals();
}
