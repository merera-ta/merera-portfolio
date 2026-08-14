import SocialLink from '../ui/SocialLink.jsx'
import { socialLinks } from '../../data/socialLinks.js'
import { siteConfig } from '../../data/siteConfig.js'

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]"
        aria-hidden="true"
      />
      <div className="relative max-w-content mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <a href="#home" className="font-display font-semibold text-ink text-base">
              <span className="text-accent font-mono">&gt;_</span> {siteConfig.name}
            </a>
            <p className="text-sm text-muted mt-3 leading-relaxed">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs text-muted mb-3">// navigate</p>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-muted hover:text-accent transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs text-muted mb-3">// connect</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <SocialLink key={link.id} link={link} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted font-mono">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted font-mono">Built with React &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
