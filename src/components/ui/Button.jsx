import { forwardRef, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn.js'

const VARIANTS = {
  primary:
    'bg-accent text-bg hover:bg-accent-dim shadow-[0_0_0_1px_rgb(var(--accent)/0.4)]',
  outline:
    'bg-transparent text-ink border border-border hover:border-accent hover:text-accent',
  ghost: 'bg-transparent text-muted hover:text-ink',
}

const MotionA = motion.a
const MotionButton = motion.button

// Shared button used for every CTA on the site. Renders as <a> when `href`
// is provided, otherwise as a native <button>. Adds a subtle "magnetic"
// pull toward the cursor on hover (desktop + motion allowed only) — the
// button nudges a few pixels toward the pointer instead of sitting static.
const Button = forwardRef(function Button(
  { children, variant = 'primary', href, className = '', icon: Icon, magnetic = true, ...props },
  ref
) {
  const shouldReduceMotion = useReducedMotion()
  const localRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 })

  const isMagnetic = magnetic && !shouldReduceMotion

  const handleMouseMove = (e) => {
    if (!isMagnetic || !localRef.current) return
    const rect = localRef.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.25)
    y.set(relY * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const setRefs = (node) => {
    localRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold font-mono',
    'transition-colors duration-200 ease-out',
    'focus-visible:outline-2 focus-visible:outline-accent',
    VARIANTS[variant],
    className
  )

  const motionProps = isMagnetic
    ? { style: { x: springX, y: springY }, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
    : {}

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <MotionA
        ref={setRefs}
        href={href}
        className={classes}
        {...motionProps}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...props}
      >
        {Icon && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
        {children}
      </MotionA>
    )
  }

  return (
    <MotionButton ref={setRefs} className={classes} {...motionProps} {...props}>
      {Icon && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
      {children}
    </MotionButton>
  )
})

export default Button
