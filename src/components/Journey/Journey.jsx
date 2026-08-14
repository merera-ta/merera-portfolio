import { motion, useReducedMotion } from 'framer-motion'
import { journey } from '../../data/journey.js'

// The developer journey as a vertical editorial narrative: large numbered
// steps connected by a single rule, each title set in display type, with
// an arrow marking the step currently in progress rather than a badge.
function Journey() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="journey" className="py-28 md:py-40 scroll-mt-28">
      <div className="max-w-wide mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-muted/70">04</span>
            <span className="section-eyebrow uppercase tracking-[0.18em]">// journey</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-ink max-w-xl">
            Still early — here&rsquo;s the path so far.
          </h2>
        </motion.div>

        <ol className="relative max-w-2xl">
          <div
            className="absolute left-[2.75rem] sm:left-[3.5rem] top-2 bottom-2 w-px bg-border [mask-image:linear-gradient(to_bottom,black_90%,transparent)]"
            aria-hidden="true"
          />
          {journey.map((step, index) => (
            <motion.li
              key={step.id}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-6 sm:gap-8 pb-12 last:pb-0"
            >
              <span
                className={`shrink-0 w-11 sm:w-14 font-display text-2xl sm:text-3xl font-semibold ${
                  step.current ? 'text-accent' : 'text-ink/25'
                }`}
              >
                {String(step.id).padStart(2, '0')}
              </span>

              <div className="pt-1">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink flex items-center gap-2 flex-wrap">
                  {step.title}
                  {step.current && (
                    <span className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                      in progress
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted mt-1.5 max-w-lg leading-relaxed">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Journey
