import { useEffect, useRef } from 'react';

const HOVER_SELECTORS =
  'a, button, [role="button"], [data-magnetic], [data-cursor-hover]';

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    let hovered: Element | null = null;
    let raf = 0;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      const target = event.target instanceof Element
        ? event.target.closest(HOVER_SELECTORS)
        : null;

      if (target !== hovered) {
        hovered = target;
        ring.dataset.hover = target ? 'true' : 'false';
      }
    };

    const tick = () => {
      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const handleEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };
    const handleLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerenter', handleEnter);
    document.documentElement.addEventListener('pointerleave', handleLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerenter', handleEnter);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <style>{`
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1200;
          opacity: 0;
          transition: opacity 200ms ease, width 280ms cubic-bezier(0.16, 1, 0.3, 1),
            height 280ms cubic-bezier(0.16, 1, 0.3, 1),
            background-color 200ms ease, border-color 200ms ease;
          will-change: transform;
          mix-blend-mode: difference;
        }

        .cursor-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f4ede0;
        }

        .cursor-ring {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(244, 237, 224, 0.55);
        }

        .cursor-ring[data-hover='true'] {
          width: 64px;
          height: 64px;
          border-color: rgba(212, 184, 122, 0.95);
          background: rgba(212, 184, 122, 0.08);
        }

        @media (hover: none), (pointer: coarse) {
          .cursor-dot,
          .cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
};

export default Cursor;
