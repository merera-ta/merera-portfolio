import { Moon, Sun } from 'lucide-react'

// Dark/light switch. Theme state and persistence live in useTheme(); this
// component is purely presentational.
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:text-accent hover:border-accent transition-colors duration-200"
      data-cursor-hover
    >
      {isDark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
    </button>
  )
}

export default ThemeToggle
