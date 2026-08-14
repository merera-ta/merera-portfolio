// Tiny classnames helper — joins truthy class strings, skips falsy ones.
// Keeps conditional Tailwind classes readable without adding a dependency.
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
