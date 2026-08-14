import { motion, useReducedMotion } from 'framer-motion'

// Small "scroll" cue anchored to the bottom of the hero — a short vertical
// line with a slowly traveling dot, not an animated mouse illustration.
// Appears last in the hero's entrance sequence.
function ScrollIndicator({ delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.a
      href="#about"
      data-cursor-hover
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className="hidden sm:flex flex-col items-center gap-3 absolute bottom-10 right-6 md:right-10 text-muted hover:text-accent transition-colors duration-300"
      aria-label="Scroll to About section"
    >
      <span className="font-mono text-[11px] tracking-[0.2em] [writing-mode:vertical-rl]">SCROLL</span>
      <span className="relative h-14 w-px bg-border overflow-hidden">
        {!shouldReduceMotion && (
          <motion.span
            className="absolute left-0 top-0 h-3 w-px bg-accent"
            animate={{ y: ['0%', '350%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </span>
    </motion.a>
  )
}

export default ScrollIndicator
