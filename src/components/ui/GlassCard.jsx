import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn.js'

// Precomputed once at module scope (not per-render) — motion() creates a
// new component type each time it's called, and calling it inside render
// would remount the card on every re-render.
const MOTION_TAGS = { div: motion.div, a: motion.a, article: motion.article, li: motion.li }

// Shared card surface with a soft glass effect, used throughout the site
// wherever content sits in a bordered container (about, skills, projects...).
//
// Two optional, opt-in interactions layer on top without changing markup
// for cards that don't need them:
//   - glow: a soft radial highlight that follows the cursor along the edge
//   - tilt: a subtle 3D tilt toward the cursor (desktop + motion allowed only)
function GlassCard({ children, className = '', as: Tag = 'div', glow = false, tilt = false, ...props }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 250, damping: 22 })
  const springRotateY = useSpring(rotateY, { stiffness: 250, damping: 22 })

  const tiltEnabled = tilt && !shouldReduceMotion

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    if (glow) {
      ref.current.style.setProperty('--mx', `${px}px`)
      ref.current.style.setProperty('--my', `${py}px`)
    }

    if (tiltEnabled) {
      const midX = rect.width / 2
      const midY = rect.height / 2
      rotateY.set(((px - midX) / midX) * 4)
      rotateX.set(-((py - midY) / midY) * 4)
    }
  }

  const handleMouseLeave = () => {
    if (tiltEnabled) {
      rotateX.set(0)
      rotateY.set(0)
    }
  }

  const MotionTag = MOTION_TAGS[Tag] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      onMouseMove={glow || tiltEnabled ? handleMouseMove : undefined}
      onMouseLeave={glow || tiltEnabled ? handleMouseLeave : undefined}
      style={tiltEnabled ? { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 } : undefined}
      className={cn(
        'glass rounded-2xl border border-border shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]',
        glow && 'glow-border',
        className
      )}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default GlassCard
