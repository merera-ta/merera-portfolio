import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import TerminalWindow from "./TerminalWindow.jsx";
import PhotoFrame from "./PhotoFrame.jsx";
import ScrollIndicator from "./ScrollIndicator.jsx";
import GradientMesh from "../Background/GradientMesh.jsx";
import { siteConfig } from "../../data/siteConfig.js";

/* ----------------------------------------
   Animation configuration
----------------------------------------- */

const STAGE = {
  meta: 0.15,
  nameLine1: 0.3,
  nameLine2: 0.42,
  portrait: 0.55,
  support: 0.85,
  actions: 1.05,
  terminal: 1.15,
  scroll: 1.5,
};

const EASE = [0.22, 1, 0.36, 1];

/* ----------------------------------------
   Reusable fade-up animation
----------------------------------------- */

function FadeUp({ children, delay = 0, className = "", as = "div" }) {
  const shouldReduceMotion = useReducedMotion();

  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* ----------------------------------------
   Animated text reveal
----------------------------------------- */

function RevealLine({ children, delay = 0, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={
          shouldReduceMotion
            ? false
            : {
                y: "110%",
              }
        }
        animate={{
          y: "0%",
        }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.65, 0, 0.35, 1],
        }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ----------------------------------------
   Hero action link
----------------------------------------- */

function HeroLink({ href, children, primary = false, icon = false }) {
  return (
    <a
      href={href}
      data-cursor-hover
      className={
        primary
          ? "group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 font-mono text-sm font-semibold text-bg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          : "font-mono text-sm text-muted transition-colors duration-200 hover:text-ink focus:outline-none focus:text-ink"
      }
    >
      {children}

      {icon && (
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </a>
  );
}

/* ----------------------------------------
   Hero component
----------------------------------------- */

function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="
        relative
        flex
        min-h-[90vh]
        flex-col
        justify-center
        overflow-hidden
        pt-28
        pb-16
        md:pt-32
      "
    >
      {/* Background */}
      <GradientMesh />

      <div className="relative mx-auto w-full max-w-wide px-6">
        <div
          className="
            grid
            items-center
            gap-12
            md:grid-cols-[1fr_1.35fr]
            lg:gap-16
          "
        >
          {/* --------------------------------
              Portrait
          --------------------------------- */}

          <div className="relative order-2 md:order-1">
            <PhotoFrame revealDelay={STAGE.portrait} />
          </div>

          {/* --------------------------------
              Hero content
          --------------------------------- */}

          <div className="order-1 md:order-2">
            {/* Meta information */}


            {/* Name */}

            <h1
              id="hero-title"
              className="
                font-display
                font-semibold
                leading-[0.95]
                tracking-tight
                text-ink
              "
            >
              <RevealLine
                delay={STAGE.nameLine1}
                className="text-[15vw] sm:text-7xl lg:text-8xl"
              >
                Hi I'm Merera
              </RevealLine>

              <RevealLine
                delay={STAGE.nameLine2}
                className="
                  text-[15vw]
                  text-gradient
                  sm:text-7xl
                  lg:text-8xl
                "
              >
                Taddesa
              </RevealLine>
            </h1>

            {/* Description */}

            <FadeUp
              delay={STAGE.support}
              className="
                mt-8
                max-w-md
                text-base
                leading-relaxed
                text-muted
                sm:text-lg
              "
            >
              Building modern, scalable web experiences with the MERN stack —
              MongoDB, Express, React, and Node.js — one real project at a time.
            </FadeUp>

            {/* Actions */}

            <FadeUp
              delay={STAGE.actions}
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-5
              "
            >
              {/* Primary CTA */}

              <HeroLink href="#projects" primary icon>
                View the work
              </HeroLink>

              {/* Secondary actions */}

              <div className="flex items-center gap-5">
                <HeroLink href="#contact">Get in touch</HeroLink>

                <span className="h-3 w-px bg-muted/30" aria-hidden="true" />

                <HeroLink href={siteConfig.resumeUrl}>Download CV</HeroLink>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* --------------------------------
            Desktop terminal
        --------------------------------- */}

        <FadeUp
          delay={STAGE.terminal}
          className="mt-10 hidden max-w-xs lg:block"
        >
          <TerminalWindow />
        </FadeUp>
      </div>

      {/* --------------------------------
          Mobile terminal
      --------------------------------- */}

      <div
        className="
          mx-auto
          mt-14
          w-full
          max-w-content
          px-6
          lg:hidden
        "
      >
        <TerminalWindow />
      </div>

      {/* --------------------------------
          Desktop scroll indicator
      --------------------------------- */}

      <ScrollIndicator delay={STAGE.scroll} />

      {/* --------------------------------
          Mobile scroll indicator
      --------------------------------- */}

      <motion.a
        href="#about"
        data-cursor-hover
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: STAGE.scroll,
        }}
        className="
          mx-auto
          mt-10
          flex
          items-center
          gap-2
          font-mono
          text-xs
          text-muted
          transition-colors
          hover:text-ink
          sm:hidden
        "
      >
        <span>Scroll</span>

        <ArrowDown size={13} aria-hidden="true" className="animate-bounce" />
      </motion.a>
    </section>
  );
}

export default Hero;
