import { motion, useReducedMotion } from 'framer-motion'
import SkillRow from './SkillRow.jsx'
import { skillCategories } from '../../data/skills.js'

// Technology, made visual through typography and rhythm rather than a grid
// of identical cards: each category is a row, each skill a piece of large
// display type in a flowing chain.
function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="skills" className="py-28 md:py-40 scroll-mt-28">
      <div className="max-w-wide mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-6 mb-14 md:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs text-muted/70">02</span>
              <span className="section-eyebrow uppercase tracking-[0.18em]">// skills</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-ink">
              What I build with
            </h2>
          </div>
          <p className="hidden md:block text-muted text-sm max-w-[16rem] text-right leading-relaxed">
            The stack I use to take an idea from a database schema to a deployed interface.
          </p>
        </motion.div>

        <div>
          {skillCategories.map((category, index) => (
            <SkillRow key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
