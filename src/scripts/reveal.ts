import { animate, splitText, stagger } from 'animejs';

const REVEAL_SELECTOR = '[data-reveal]';
const REVEAL_TEXT_SELECTOR = '[data-reveal-text]';

const REVEAL_DURATION = 780;
/** Opacity finishes early so blur clears on already-opaque pixels (avoids white flash). */
const REVEAL_OPACITY_DURATION = 380;

/** Strip compositor hints and any leftover filter after the entrance finishes. */
function clearMotionHints(targets: HTMLElement[]): void {
  for (const el of targets) {
    el.style.filter = '';
    el.style.willChange = '';
  }
}

/**
 * Soft focus: blur + fade + drift. Opacity leads blur so transparent edges never
 * composite against white while the element is still faint.
 */
function softFocusIn(
  targets: HTMLElement[],
  fromOffset: number,
  staggerMs: number,
): void {
  if (targets.length === 0) {
    return;
  }

  for (const el of targets) {
    el.style.willChange = 'filter, transform, opacity';
  }

  animate(targets, {
    opacity: {
      from: 0,
      to: 1,
      duration: REVEAL_OPACITY_DURATION,
      ease: 'outQuad',
    },
    translateY: {
      from: fromOffset,
      to: 0,
      duration: REVEAL_DURATION,
      ease: 'outExpo',
    },
    filter: {
      from: 'blur(5px)',
      to: 'blur(0px)',
      duration: REVEAL_DURATION,
      ease: 'outExpo',
    },
    delay: stagger(staggerMs),
    onComplete: () => clearMotionHints(targets),
  });
}

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

      softFocusIn(
        entering.filter((el) => el.dataset.revealFrom === 'top'),
        -10,
        80,
      );
      softFocusIn(
        entering.filter((el) => el.dataset.revealFrom !== 'top'),
        10,
        80,
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
 * Heading entrance for `[data-reveal-text]`: split into words that soft-focus in
 * with a staggered cascade. `accessible` keeps the original text exposed to assistive tech.
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

    const fromOffset = heading.dataset.revealFrom === 'top' ? -12 : 12;
    softFocusIn(words as HTMLElement[], fromOffset, 55);
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
