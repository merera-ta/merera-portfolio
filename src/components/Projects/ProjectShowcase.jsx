import { motion, useReducedMotion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual.jsx";

function ProjectShowcase({ project, index, reversed }) {
  const shouldReduceMotion = useReducedMotion();
  const isSoon = Boolean(project.comingSoon);

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group grid md:grid-cols-2 gap-8 md:gap-14 items-center"
    >
      <div className={reversed ? "md:order-2" : ""}>
        <motion.a
          href={isSoon ? undefined : project.demo || project.github}
          target={isSoon ? undefined : "_blank"}
          rel={isSoon ? undefined : "noreferrer noopener"}
          data-cursor-label={isSoon ? undefined : "View Project"}
          aria-label={
            isSoon
              ? `${project.title} coming soon`
              : `Open ${project.title} ${project.demo ? "live demo" : "repository"}`
          }
          aria-disabled={isSoon || undefined}
          tabIndex={isSoon ? -1 : undefined}
          whileHover={
            shouldReduceMotion || isSoon ? undefined : { scale: 1.02 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative block rounded-xl overflow-hidden bg-surface border border-border shadow-2xl shadow-black/30 aspect-[16/11] ${
            isSoon ? "pointer-events-none opacity-80" : ""
          }`}
        >
          <ProjectVisual type={project.visual} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {project.featured && (
            <span className="absolute top-4 left-4 font-mono text-[11px] px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/30 backdrop-blur-sm">
              featured
            </span>
          )}
          {isSoon && (
            <span className="absolute top-4 left-4 font-mono text-[11px] px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/30 backdrop-blur-sm">
              coming soon
            </span>
          )}
        </motion.a>
      </div>

      <div className={reversed ? "md:order-1" : ""}>
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-display text-5xl sm:text-6xl font-semibold text-ink/15 group-hover:text-accent/25 transition-colors duration-500 leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          {!isSoon && (
            <ArrowUpRight
              size={22}
              strokeWidth={2}
              className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              aria-hidden="true"
            />
          )}
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-ink mb-4">
          {project.title}
        </h3>
        <p className="text-muted leading-relaxed mb-6 max-w-md">
          {project.description}
        </p>

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-border text-ink/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-5">
          {isSoon ? (
            <span className="inline-flex items-center font-mono text-[11px] px-3 py-1 rounded-full border border-dashed border-border text-muted/70 cursor-default">
              Coming soon
            </span>
          ) : (
            <>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor-hover
                className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-ink hover:text-accent transition-colors duration-200"
              >
                <Github size={16} strokeWidth={2} aria-hidden="true" />
                Code
              </a>
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-ink hover:text-accent transition-colors duration-200"
                >
                  <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
                  Live Demo
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 font-mono text-sm text-muted/50 cursor-not-allowed">
                  <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
                  Demo soon
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectShowcase;
