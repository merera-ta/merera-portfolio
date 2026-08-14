import { motion, useReducedMotion } from 'framer-motion'

// Consistent section heading: a monospace "// comment" eyebrow, a large
// Space Grotesk heading (the site's display face), and an optional index
// number set beside it — echoing the numbered sections of the old design
// but rendered as typography rather than a decorative badge.
function SectionTitle({ eyebrow, title, description, align = 'left', index }) {
  const shouldReduceMotion = useReducedMotion()
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 mb-12 md:mb-16 max-w-2xl ${alignment}`}
    >
      <div className="flex items-center gap-3">
        {typeof index === 'string' && (
          <span className="font-mono text-xs text-muted/70">{index}</span>
        )}
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      </div>
      <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-ink leading-[1.08]">
        {title}
      </h2>
      {description && <p className="text-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}

export default SectionTitle
