import { motion, useReducedMotion } from 'framer-motion'

// A single technology in the flowing chain — large display text that lifts
// and shifts color on hover/focus. No card, no border, no icon box: the
// typography itself is the interactive surface.
function SkillWord({ skill, index }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      tabIndex={0}
      data-cursor-hover
      className="group inline-flex items-center font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-ink/60 hover:text-ink focus-visible:text-ink transition-colors duration-300 cursor-default outline-none"
    >
      {skill}
    </motion.span>
  )
}

// One category rendered as a row: a small uppercase label on the left (or
// above, on mobile), and its technologies flowing as large text separated
// by a thin mono connector — a chain, not a grid of boxes.
function SkillRow({ category, index }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="grid sm:grid-cols-[10rem_1fr] gap-3 sm:gap-8 py-8 border-t border-border first:border-t-0 sm:first:border-t"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{category.title}</p>
        <p className="font-mono text-[11px] text-muted/60 mt-1">{category.comment}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {category.skills.map((skill, skillIndex) => (
          <span key={skill} className="inline-flex items-center gap-x-4">
            <SkillWord skill={skill} index={skillIndex} />
            {skillIndex < category.skills.length - 1 && (
              <span className="font-mono text-base text-border select-none" aria-hidden="true">
                /
              </span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default SkillRow
