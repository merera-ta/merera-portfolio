// Single social/contact link with an icon, used in the contact section and
// footer. Pulls its shape from src/data/socialLinks.js.
function SocialLink({ link, className = '' }) {
  const Icon = link.icon
  const isExternal = link.href.startsWith('http')

  return (
    <a
      href={link.href}
      aria-label={link.label}
      className={`inline-flex items-center justify-center h-11 w-11 rounded-lg border border-border text-muted hover:text-accent hover:border-accent transition-colors duration-200 ${className}`}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      <Icon size={18} strokeWidth={2} aria-hidden="true" />
    </a>
  )
}

export default SocialLink
