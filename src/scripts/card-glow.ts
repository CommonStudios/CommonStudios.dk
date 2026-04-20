const MAGIC_GLOW_COLOR = '132, 0, 255';
const PARTICLE_COUNT = 12;

type CardState = {
  particles: HTMLElement[];
  templates: HTMLElement[];
  timeouts: number[];
  hovered: boolean;
};

function resetCardGlow(card: HTMLElement, spotlightRadius: number) {
  card.style.setProperty('--glow-x', '50%');
  card.style.setProperty('--glow-y', '50%');
  card.style.setProperty('--glow-intensity', '0');
  card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
}

function createParticleElement(x: number, y: number, color = MAGIC_GLOW_COLOR) {
  const particle = document.createElement('div');
  particle.className = 'project-particle';
  particle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return particle;
}

function calculateSpotlightValues(radius: number) {
  return {
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75,
  };
}

function getGlowIntensity(
  card: HTMLElement,
  clientX: number,
  clientY: number,
  spotlightRadius: number,
): number {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distance =
    Math.hypot(clientX - centerX, clientY - centerY) -
    Math.max(rect.width, rect.height) / 2;
  const effectiveDistance = Math.max(0, distance);
  const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);

  if (effectiveDistance <= proximity) {
    return 1;
  }

  if (effectiveDistance >= fadeDistance) {
    return 0;
  }

  return (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
}

function updateCardGlowProperties(
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  spotlightRadius: number,
) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toFixed(3));
  card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
}

export async function initCardGlow(gridSelector: string): Promise<void> {
  const { gsap } = await import('gsap');

  const projectsGrid = document.querySelector(gridSelector);
  if (!projectsGrid) return;

  const glowCards =
    projectsGrid.querySelectorAll<HTMLElement>('[data-magic-card]');
  const usesCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  if (usesCoarsePointer) return;

  const spotlightRadius = 300;
  const cardState = new WeakMap<HTMLElement, CardState>();

  const lifecycle = new AbortController();
  const { signal } = lifecycle;

  document.addEventListener('astro:before-swap', () => lifecycle.abort(), {
    once: true,
  });

  glowCards.forEach((card) => {
    resetCardGlow(card, spotlightRadius);

    cardState.set(card, {
      particles: [],
      templates: [],
      timeouts: [],
      hovered: false,
    });

    const initializeParticles = () => {
      const state = cardState.get(card);
      if (!state || state.templates.length > 0) {
        return;
      }

      const { width, height } = card.getBoundingClientRect();
      state.templates = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticleElement(Math.random() * width, Math.random() * height),
      );
    };

    const clearParticles = () => {
      const state = cardState.get(card);
      if (!state) {
        return;
      }

      for (const timeoutId of state.timeouts) {
        window.clearTimeout(timeoutId);
      }
      state.timeouts = [];

      state.particles.forEach((particle) => {
        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
          onComplete: () => {
            particle.parentNode?.removeChild(particle);
          },
        });
      });
      state.particles = [];
    };

    const animateParticles = () => {
      const state = cardState.get(card);
      if (!state) {
        return;
      }

      initializeParticles();

      state.templates.forEach((particle, index) => {
        const timeoutId = window.setTimeout(() => {
          const current = cardState.get(card);
          if (!current?.hovered) {
            return;
          }

          const clone = particle.cloneNode(true);
          if (!(clone instanceof HTMLElement)) {
            return;
          }

          card.appendChild(clone);
          current.particles.push(clone);

          gsap.fromTo(
            clone,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'back.out(1.7)',
            },
          );

          gsap.to(clone, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: 'none',
            repeat: -1,
            yoyo: true,
          });

          gsap.to(clone, {
            opacity: 0.3,
            duration: 1.5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
          });
        }, index * 100);

        state.timeouts.push(timeoutId);
      });
    };

    card.addEventListener(
      'pointerenter',
      () => {
        const state = cardState.get(card);
        if (!state) {
          return;
        }

        state.hovered = true;
        animateParticles();

        gsap.to(card, {
          rotateX: 2,
          rotateY: 2,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      },
      { signal },
    );

    card.addEventListener(
      'pointermove',
      (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        updateCardGlowProperties(
          card,
          event.clientX,
          event.clientY,
          getGlowIntensity(card, event.clientX, event.clientY, spotlightRadius),
          spotlightRadius,
        );

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      },
      { signal, passive: true },
    );

    card.addEventListener(
      'pointerleave',
      () => {
        const state = cardState.get(card);
        if (state) {
          state.hovered = false;
        }

        clearParticles();
        resetCardGlow(card, spotlightRadius);

        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
      { signal },
    );

    card.addEventListener(
      'click',
      (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const maxDistance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height),
        );

        const ripple = document.createElement('div');
        ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${MAGIC_GLOW_COLOR}, 0.4) 0%, rgba(${MAGIC_GLOW_COLOR}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

        card.appendChild(ripple);

        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
          },
        );
      },
      { signal },
    );
  });

  const spotlight = document.createElement('div');
  spotlight.className = 'projects-spotlight';
  document.body.append(spotlight);

  signal.addEventListener('abort', () => spotlight.remove(), { once: true });

  let lastPointerX = 0;
  let lastPointerY = 0;
  let frameRequested = false;

  const updateSpotlight = () => {
    frameRequested = false;

    const rect = projectsGrid.getBoundingClientRect();
    const isInside =
      lastPointerX >= rect.left &&
      lastPointerX <= rect.right &&
      lastPointerY >= rect.top &&
      lastPointerY <= rect.bottom;

    if (!isInside) {
      spotlight.style.opacity = '0';
      for (const card of glowCards) {
        resetCardGlow(card, spotlightRadius);
      }
      return;
    }

    const { proximity, fadeDistance } =
      calculateSpotlightValues(spotlightRadius);
    let minDistance = Infinity;

    glowCards.forEach((card) => {
      if (!(card instanceof HTMLElement)) {
        return;
      }

      const cardRect = card.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const distance =
        Math.hypot(lastPointerX - centerX, lastPointerY - centerY) -
        Math.max(cardRect.width, cardRect.height) / 2;
      const effectiveDistance = Math.max(0, distance);

      minDistance = Math.min(minDistance, effectiveDistance);

      let intensity = 0;
      if (effectiveDistance <= proximity) {
        intensity = 1;
      } else if (effectiveDistance <= fadeDistance) {
        intensity =
          (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
      }

      updateCardGlowProperties(
        card,
        lastPointerX,
        lastPointerY,
        intensity,
        spotlightRadius,
      );
    });

    gsap.to(spotlight, {
      left: lastPointerX,
      top: lastPointerY,
      duration: 0.1,
      ease: 'power2.out',
    });

    const targetOpacity =
      minDistance <= proximity
        ? 0.8
        : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

    gsap.to(spotlight, {
      opacity: targetOpacity,
      duration: targetOpacity > 0 ? 0.2 : 0.5,
      ease: 'power2.out',
    });
  };

  const queueSpotlightUpdate = () => {
    if (frameRequested) {
      return;
    }

    frameRequested = true;
    window.requestAnimationFrame(updateSpotlight);
  };

  document.addEventListener(
    'pointermove',
    (event) => {
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      queueSpotlightUpdate();
    },
    { signal, passive: true },
  );

  document.addEventListener(
    'pointerleave',
    () => {
      spotlight.style.opacity = '0';
      for (const card of glowCards) {
        resetCardGlow(card, spotlightRadius);
      }
    },
    { signal },
  );

  window.addEventListener('scroll', queueSpotlightUpdate, {
    signal,
    passive: true,
  });
}
