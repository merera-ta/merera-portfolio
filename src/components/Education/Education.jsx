import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig.js'

// A single, quiet line rather than another boxed card — Education sits as
// a coda beneath the Journey narrative, matching About's metadata treatment.
function Education() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="education" className="pb-28 md:pb-40 scroll-mt-28">
      <div className="max-w-wide mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 border-t border-border pt-8"
        >
          <GraduationCap size={20} strokeWidth={2} className="text-accent shrink-0" aria-hidden="true" />
          <p className="font-display text-lg sm:text-xl text-ink">
            {siteConfig.university} <span className="text-muted">— {siteConfig.department}, {siteConfig.year}</span>
          </p>
          <span className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
            currently enrolled
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
