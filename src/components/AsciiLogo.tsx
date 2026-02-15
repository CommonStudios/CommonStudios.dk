import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import styles from './AsciiLogo.module.css'

const LOGO = `    ███     ▄██   ▄   ███▄▄▄▄   ████████▄     ▄████████  ▄████████ ████████▄
▀█████████▄ ███   ██▄ ███▀▀▀██▄ ███   ▀███   ███    ███ ███    ███ ███   ▀███
   ▀███▀▀██ ███▄▄▄███ ███   ███ ███    ███   ███    █▀  ███    █▀  ███    ███
    ███   ▀ ▀▀▀▀▀▀███ ███   ███ ███    ███  ▄███▄▄▄    ▄███▄▄▄     ███    ███
    ███     ▄██   ███ ███   ███ ███    ███ ▀▀███▀▀▀   ▀▀███▀▀▀     ███    ███
    ███     ███   ███ ███   ███ ███    ███   ███        ███    █▄  ███    ███
    ███     ███   ███ ███   ███ ███   ▄███   ███        ███    ███ ███   ▄███
   ▄████▀    ▀█████▀   ▀█   █▀  ████████▀    ███        ██████████ ████████▀`

const GLITCH_CHARS = '░▒▓█▀▄╔╗╚╝║═╬├┤┬┴┼'

type GlitchType = 'none' | 'corrupt' | 'shift' | 'wave' | 'flicker'

const FRAME_INTERVAL = 50

export function AsciiLogo() {
  const [displayText, setDisplayText] = useState(LOGO)
  const [glitchType, setGlitchType] = useState<GlitchType>('none')
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  const refs = useRef({
    frameId: 0,
    timeoutId: null as ReturnType<typeof setTimeout> | null,
    isRunning: false
  })

  const lines = useMemo(() => LOGO.split('\n'), [])

  const applyCorruptGlitch = useCallback((progress: number) => {
    const intensity = Math.sin(progress * Math.PI) * 0.15
    const glitched = LOGO.split('').map((char) => {
      if (char === ' ' || char === '\n') return char
      if (Math.random() < intensity) {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      }
      return char
    }).join('')
    setDisplayText(glitched)
    setOffset({
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 2
    })
  }, [])

  const applyShiftGlitch = useCallback(() => {
    const glitchedLines = lines.map((line) => {
      if (Math.random() < 0.3) {
        const shift = Math.floor(Math.random() * 6) - 3
        if (shift > 0) {
          return ' '.repeat(shift) + line.slice(0, -shift)
        } else if (shift < 0) {
          return line.slice(-shift) + ' '.repeat(-shift)
        }
      }
      return line
    })
    setDisplayText(glitchedLines.join('\n'))
    setOffset({ x: (Math.random() - 0.5) * 6, y: 0 })
  }, [lines])

  const applyWaveGlitch = useCallback((frame: number) => {
    const glitched = lines.map((line, lineIdx) => {
      return line.split('').map((char, charIdx) => {
        if (char === ' ') return char
        const wave = Math.sin((charIdx + frame * 2) * 0.3 + lineIdx * 0.5)
        if (wave > 0.7) {
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        }
        return char
      }).join('')
    }).join('\n')
    setDisplayText(glitched)
  }, [lines])

  const applyFlickerGlitch = useCallback((frame: number) => {
    if (frame % 2 === 0) {
      setDisplayText(LOGO)
    } else {
      const glitched = lines.map((line) => {
        if (Math.random() < 0.2) {
          return line.split('').map(c => c === ' ' ? ' ' : '█').join('')
        }
        return line
      }).join('\n')
      setDisplayText(glitched)
    }
    setOffset({ x: (Math.random() - 0.5) * 3, y: 0 })
  }, [lines])

  const endGlitch = useCallback(() => {
    setDisplayText(LOGO)
    setGlitchType('none')
    setOffset({ x: 0, y: 0 })
  }, [])

  const triggerGlitch = useCallback(() => {
    if (refs.current.isRunning) return
    refs.current.isRunning = true

    const types: GlitchType[] = ['corrupt', 'shift', 'wave', 'flicker']
    const type = types[Math.floor(Math.random() * types.length)]
    setGlitchType(type)

    const maxFrames = type === 'wave' ? 12 : 8
    let frame = 0
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < FRAME_INTERVAL) {
        refs.current.frameId = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      if (frame >= maxFrames) {
        endGlitch()
        refs.current.isRunning = false
        refs.current.timeoutId = setTimeout(triggerGlitch, 4000 + Math.random() * 4000)
        return
      }

      switch (type) {
        case 'corrupt':
          applyCorruptGlitch(frame / maxFrames)
          break
        case 'shift':
          applyShiftGlitch()
          break
        case 'wave':
          applyWaveGlitch(frame)
          break
        case 'flicker':
          applyFlickerGlitch(frame)
          break
      }

      frame++
      refs.current.frameId = requestAnimationFrame(animate)
    }

    refs.current.frameId = requestAnimationFrame(animate)
  }, [applyCorruptGlitch, applyShiftGlitch, applyWaveGlitch, applyFlickerGlitch, endGlitch])

  const triggerGlitchManual = useCallback(() => {
    if (refs.current.timeoutId) {
      clearTimeout(refs.current.timeoutId)
      refs.current.timeoutId = null
    }
    if (refs.current.frameId) {
      cancelAnimationFrame(refs.current.frameId)
    }
    refs.current.isRunning = false
    endGlitch()
    
    setTimeout(triggerGlitch, 100)
  }, [triggerGlitch, endGlitch])

  useEffect(() => {
    refs.current.timeoutId = setTimeout(triggerGlitch, 3000)

    return () => {
      if (refs.current.timeoutId) clearTimeout(refs.current.timeoutId)
      if (refs.current.frameId) cancelAnimationFrame(refs.current.frameId)
    }
  }, [triggerGlitch])

  useEffect(() => {
    const onGlitch = () => triggerGlitchManual()
    window.addEventListener('tyndfed:glitch', onGlitch as EventListener)
    return () => window.removeEventListener('tyndfed:glitch', onGlitch as EventListener)
  }, [triggerGlitchManual])

  const isGlitching = glitchType !== 'none'

  return (
    <section 
      className={styles.container} 
      aria-label="Tyndfed logo"
      role="img"
    >
      <span className={styles.visuallyHidden}>Tyndfed</span>
      <div className={styles.wrapper}>
        <div className={styles.scanlines} aria-hidden="true" />
        <pre
          className={`${styles.art} ${isGlitching ? styles.glitching : ''} ${glitchType === 'shift' ? styles.shifting : ''}`}
          style={{
            transform: isGlitching ? `translate(${offset.x}px, ${offset.y}px)` : undefined
          }}
          aria-hidden="true"
        >
          {displayText}
        </pre>
        {isGlitching && (
          <>
            <pre className={`${styles.art} ${styles.chromaR}`} aria-hidden="true">{displayText}</pre>
            <pre className={`${styles.art} ${styles.chromaB}`} aria-hidden="true">{displayText}</pre>
          </>
        )}
        <div className={styles.glow} aria-hidden="true" />
      </div>
    </section>
  )
}
