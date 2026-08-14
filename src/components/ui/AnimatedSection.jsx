import { motion, useReducedMotion } from 'framer-motion'

// Wraps a section so its content fades/slides into view on scroll.
// Respects prefers-reduced-motion by skipping the transform entirely.
function AnimatedSection({ children, className = '', delay = 0, as = 'div' }) {
  const shouldReduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

export default AnimatedSection
