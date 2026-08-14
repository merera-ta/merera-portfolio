import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import TerminalWindow from "./TerminalWindow.jsx";
import PhotoFrame from "./PhotoFrame.jsx";
import ScrollIndicator from "./ScrollIndicator.jsx";
import GradientMesh from "../Background/GradientMesh.jsx";
import { siteConfig } from "../../data/siteConfig.js";

// Timing for the choreographed entrance. Each stage waits for the previous
// one to be underway rather than firing all at once — background, then
// metadata, then the two name lines (staggered), then the portrait
// (clip-path reveal, timed in PhotoFrame via revealDelay), then the
// supporting line and actions, then the scroll cue last.
const STAGE = {
  meta: 0.15,
  nameLine1: 0.32,
  nameLine2: 0.44,
  portrait: 0.55,
  support: 0.95,
  actions: 1.1,
  scroll: 1.5,
};

function FadeUp({ children, delay, className, as = "div" }) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

// A masked line reveal — the text clips in from below rather than simply
// fading, which reads as more deliberate for the two oversized name lines.
function RevealLine({ children, delay, className }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={shouldReduceMotion ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-24 md:pt-36 overflow-hidden"
    >
      <GradientMesh />

      <div className="relative max-w-wide mx-auto px-6 w-full">
        <div className="grid md:grid-cols-[1fr_1.35fr] gap-12 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <PhotoFrame revealDelay={STAGE.portrait} />
          </div>

          <div className="order-1 md:order-2">
            <FadeUp
              delay={STAGE.meta}
              className="section-eyebrow mb-6 uppercase tracking-[0.18em]"
            >
              {siteConfig.department} / MERN Stack Developer &middot;{" "}
              {siteConfig.university}
            </FadeUp>

            <h1 className="font-display font-semibold tracking-tight text-ink leading-[0.95]">
              <RevealLine
                delay={STAGE.nameLine1}
                className="text-[15vw] sm:text-7xl lg:text-8xl"
              >
                Merera
              </RevealLine>
              <RevealLine
                delay={STAGE.nameLine2}
                className="text-[15vw] sm:text-7xl lg:text-8xl text-gradient"
              >
                Taddesa
              </RevealLine>
            </h1>

            <FadeUp
              delay={STAGE.support}
              className="mt-8 max-w-md text-muted text-base sm:text-lg leading-relaxed"
            >
              Building modern, scalable web experiences with the MERN stack —
              MongoDB, Express, React, and Node.js — one real project at a time.
            </FadeUp>

            <FadeUp
              delay={STAGE.actions}
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <a
                href="#projects"
                data-cursor-hover
                className="group inline-flex items-center gap-2.5 font-mono text-sm font-semibold text-ink hover:text-accent transition-colors duration-200"
              >
                View the work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                data-cursor-hover
                className="font-mono text-sm text-muted hover:text-ink transition-colors duration-200"
              >
                Get in touch
              </a>
              <a
                href={siteConfig.resumeUrl}
                data-cursor-hover
                className="font-mono text-sm text-muted hover:text-ink transition-colors duration-200"
              >
                Download CV
              </a>
            </FadeUp>
          </div>
        </div>

        <FadeUp
          delay={STAGE.support + 0.1}
          className="hidden lg:block mt-16 max-w-xs"
        >
          <TerminalWindow />
        </FadeUp>
      </div>

      <div className="lg:hidden max-w-content mx-auto px-6 mt-14 w-full">
        <TerminalWindow />
      </div>

      <ScrollIndicator delay={STAGE.scroll} />

      <motion.a
        href="#about"
        data-cursor-hover
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: STAGE.scroll }}
        className="sm:hidden mx-auto mt-10 flex items-center gap-2 font-mono text-xs text-muted"
      >
        Scroll <ArrowDown size={13} aria-hidden="true" />
      </motion.a>
    </section>
  );
}

export default Hero;
