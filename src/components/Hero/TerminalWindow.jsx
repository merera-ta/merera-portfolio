import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { siteConfig } from '../../data/siteConfig.js'

// Signature hero element: a terminal window that "types" a few real
// commands about the developer, one character at a time, then blinks a
// cursor. Falls back to fully-typed text instantly for reduced motion.
const LINES = [
  { prompt: '~$', command: 'whoami', output: siteConfig.name },
  { prompt: '~$', command: 'role', output: siteConfig.roleLong },
  { prompt: '~$', command: 'stack', output: 'React • Node • Express • MongoDB' },
]

function useTypewriter(lines, enabled) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | output | done

  useEffect(() => {
    if (!enabled) return undefined
    if (lineIndex >= lines.length) return undefined

    const current = lines[lineIndex]

    if (phase === 'typing') {
      if (charIndex < current.command.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 35)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('output'), 250)
      return () => clearTimeout(t)
    }

    if (phase === 'output') {
      const t = setTimeout(() => {
        if (lineIndex + 1 < lines.length) {
          setLineIndex((i) => i + 1)
          setCharIndex(0)
          setPhase('typing')
        } else {
          setPhase('done')
        }
      }, 500)
      return () => clearTimeout(t)
    }

    return undefined
  }, [enabled, lineIndex, charIndex, phase, lines])

  return { lineIndex, charIndex, phase }
}

function TerminalWindow() {
  const shouldReduceMotion = useReducedMotion()
  const { lineIndex, charIndex, phase } = useTypewriter(LINES, !shouldReduceMotion)

  const completedCount = shouldReduceMotion
    ? LINES.length
    : phase === 'done'
      ? LINES.length
      : lineIndex

  return (
    <div className="glass rounded-2xl border border-border-strong shadow-2xl shadow-black/50 overflow-hidden w-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="h-3 w-3 rounded-full bg-danger/70" />
        <span className="h-3 w-3 rounded-full bg-amber/70" />
        <span className="h-3 w-3 rounded-full bg-success/70" />
        <span className="ml-3 font-mono text-xs text-muted">merera@dev-machine</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[210px]">
        {LINES.slice(0, completedCount).map((line, i) => (
          <div key={i} className="mb-3">
            <p className="text-ink">
              <span className="text-accent">{line.prompt}</span> {line.command}
            </p>
            <p className="text-muted pl-4">{line.output}</p>
          </div>
        ))}

        {!shouldReduceMotion && phase !== 'done' && lineIndex < LINES.length && (
          <div>
            <p className="text-ink">
              <span className="text-accent">{LINES[lineIndex].prompt}</span>{' '}
              {LINES[lineIndex].command.slice(0, charIndex)}
              <span className="inline-block w-[7px] h-[14px] bg-accent align-middle ml-0.5 animate-blink" />
            </p>
            {phase === 'output' && <p className="text-muted pl-4">{LINES[lineIndex].output}</p>}
          </div>
        )}

        {(shouldReduceMotion || phase === 'done') && (
          <p className="text-ink">
            <span className="text-accent">~$</span>{' '}
            <span className="inline-block w-[7px] h-[14px] bg-accent align-middle ml-0.5 animate-blink" />
          </p>
        )}
      </div>
    </div>
  )
}

export default TerminalWindow
