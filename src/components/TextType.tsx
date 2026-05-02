import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';

export interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  style: styleProp,
  ...restDomProps
}: TextTypeProps & Omit<HTMLAttributes<HTMLElement>, 'children'>) => {
  const respectReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [reservedMinHeightPx, setReservedMinHeightPx] = useState<number | null>(
    null,
  );

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit';
    return textColors[currentTextIndex % textColors.length];
  };

  useLayoutEffect(() => {
    if (respectReducedMotion) {
      setReservedMinHeightPx(null);
      return;
    }

    const el = containerRef.current;
    if (!el) {
      return;
    }

    const parent = el.parentElement;
    if (!parent) {
      return;
    }

    const cursorSuffix =
      showCursor && typeof cursorCharacter === 'string' ? cursorCharacter : '';

    const measure = () => {
      const width = parent.clientWidth;
      if (width <= 0) {
        return;
      }

      const cs = getComputedStyle(parent);
      const probe = document.createElement('div');
      probe.setAttribute('aria-hidden', 'true');
      Object.assign(probe.style, {
        position: 'absolute',
        left: '-99999px',
        top: '0',
        width: `${width}px`,
        visibility: 'hidden',
        pointerEvents: 'none',
        whiteSpace: 'pre-wrap',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        overflowWrap: 'anywhere',
        font: cs.font,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        fontFeatureSettings: cs.fontFeatureSettings,
        hyphens: cs.hyphens,
      });

      document.body.appendChild(probe);
      let maxH = 0;
      try {
        for (const line of textArray) {
          probe.replaceChildren();
          const textSpan = document.createElement('span');
          textSpan.style.display = 'inline';
          textSpan.textContent = line;
          probe.appendChild(textSpan);
          if (cursorSuffix) {
            const cur = document.createElement('span');
            cur.style.display = 'inline-block';
            cur.textContent = cursorSuffix;
            probe.appendChild(cur);
          }
          maxH = Math.max(maxH, probe.offsetHeight);
        }
      } finally {
        document.body.removeChild(probe);
      }

      setReservedMinHeightPx(maxH);
    };

    measure();
    void document.fonts?.ready?.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => {
      ro.disconnect();
    };
  }, [cursorCharacter, respectReducedMotion, showCursor, textArray]);

  useLayoutEffect(() => {
    if (!startOnVisible) {
      return;
    }

    const el = containerRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnVisible, textArray]);

  useEffect(() => {
    if (!showCursor || !cursorRef.current || respectReducedMotion) {
      return;
    }

    const el = cursorRef.current;
    gsap.set(el, { opacity: 1 });
    const tween = gsap.to(el, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    return () => {
      tween.kill();
    };
  }, [showCursor, cursorBlinkDuration, respectReducedMotion]);

  useEffect(() => {
    if (!isVisible || respectReducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split('').reverse().join('')
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex);

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText((prev) => prev + processedText[currentCharIndex]);
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed,
          );
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    getRandomSpeed,
    onSentenceComplete,
    respectReducedMotion,
  ]);

  const rootStyle = useMemo((): CSSProperties | undefined => {
    const base: CSSProperties = { ...(styleProp as CSSProperties | undefined) };
    if (reservedMinHeightPx != null && reservedMinHeightPx > 0) {
      base.minHeight = `${reservedMinHeightPx}px`;
    }
    return Object.keys(base).length > 0 ? base : undefined;
  }, [reservedMinHeightPx, styleProp]);

  if (respectReducedMotion) {
    return createElement(
      Component,
      {
        ref: containerRef,
        className: `whitespace-pre-wrap ${className}`.trim(),
        ...restDomProps,
        ...(styleProp ? { style: styleProp } : {}),
      },
      <span className="inline" style={{ color: getCurrentTextColor() }}>
        {textArray[0]}
      </span>,
    );
  }

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `whitespace-pre-wrap ${className}`.trim(),
      ...restDomProps,
      style: rootStyle,
    },
    <span className="inline" style={{ color: getCurrentTextColor() }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    ),
  );
};

export default TextType;
