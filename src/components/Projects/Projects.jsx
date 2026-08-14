import { useMemo, useState } from 'react'
import SectionTitle from '../ui/SectionTitle.jsx'
import ProjectShowcase from './ProjectShowcase.jsx'
import { projects, projectTechFilters } from '../../data/projects.js'
import { cn } from '../../utils/cn.js'

const ALL = 'All'

function Projects() {
  const [filter, setFilter] = useState(ALL)

  const filtered = useMemo(() => {
    if (filter === ALL) return projects
    return projects.filter((project) => project.tech.includes(filter))
  }, [filter])

  const filters = [ALL, ...projectTechFilters]

  return (
    <section id="projects" className="py-28 md:py-40 scroll-mt-28">
      <div className="max-w-wide mx-auto px-6">
        <SectionTitle
          eyebrow="// projects"
          index="03"
          title="Things I've built"
          description="A few full-stack projects from my time learning and practicing the MERN stack. Replace these with your own as you ship real work."
        />

        <div className="flex flex-wrap gap-2 mb-16" role="group" aria-label="Filter projects by technology">
          {filters.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(tech)}
              aria-pressed={filter === tech}
              data-cursor-hover
              className={cn(
                'font-mono text-xs px-3.5 py-2 rounded-lg border transition-colors duration-200',
                filter === tech
                  ? 'bg-accent text-bg border-accent'
                  : 'border-border text-muted hover:text-ink hover:border-ink/30'
              )}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {filtered.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} index={index} reversed={index % 2 === 1} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted text-sm font-mono">No projects match this filter yet.</p>
        )}
      </div>
    </section>
  )
}

export default Projects
