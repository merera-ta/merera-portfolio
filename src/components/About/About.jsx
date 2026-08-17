import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../../data/siteConfig.js";

const METADATA = [
  { label: "Focus", value: "Full-stack web development" },
  { label: "Stack", value: "MongoDB · Express · React · Node" },
  { label: "Learning", value: "Modern web technologies" },
  { label: "Status", value: "Building real projects" },
];

function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-28 md:py-40 scroll-mt-28">
      <div className="max-w-wide mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-xs text-muted/70">01</span>

          <span className="section-eyebrow uppercase tracking-[0.18em]">
            // about
          </span>
        </motion.div>

        {/* Main About Content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left Side */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[1.05]"
          >
            I’m Merera Taddesa — a{" "}
            <span className="text-gradient">Software Engineering student</span>{" "}
            building toward full-stack development.
          </motion.h2>

          {/* Right Side */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-muted leading-relaxed"
          >
            {siteConfig.about}
          </motion.p>
        </div>

        {/* Metadata */}
        <motion.dl
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="mt-16 md:mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 border-t border-border pt-8"
        >
          {METADATA.map(({ label, value }) => (
            <div key={label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
                {label}
              </dt>

              <dd className="mt-2 font-display text-lg text-ink">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

export default About;
