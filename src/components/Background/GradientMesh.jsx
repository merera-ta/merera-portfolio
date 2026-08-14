import { useReducedMotion } from 'framer-motion'

// Ambient backdrop: a faint structural grid plus two small, dim, very
// slowly-drifting glows (teal + violet — the site's only two accents),
// with a light noise layer on top so flat glow areas don't band. Kept
// deliberately restrained — texture and depth, not a light show.
// Reduced-motion users get the same composition frozen in place.
function GradientMesh({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_55%_55%_at_50%_0%,black,transparent)]" />

      <div
        className={`absolute -top-32 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-[100px] ${
          shouldReduceMotion ? '' : 'animate-meshShift'
        }`}
      />
      <div
        className={`absolute top-10 -right-32 h-96 w-96 rounded-full bg-violet/10 blur-[100px] ${
          shouldReduceMotion ? '' : 'animate-meshShift'
        }`}
        style={{ animationDelay: '-8s' }}
      />

      <div className="absolute inset-0 bg-noise mix-blend-overlay" />
    </div>
  )
}

export default GradientMesh
