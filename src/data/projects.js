// Project data for the Projects section. Replace these with your real
// projects — keep the same shape (title, description, tech, links) and
// everything (showcase layout, filtering) keeps working automatically.
// `visual` picks which abstract UI mockup ProjectVisual.jsx renders for
// that card — one of 'dashboard', 'ecommerce', 'form'. Omit it (or use an
// unrecognised value) to fall back to a generic code-window mockup.
export const projects = [
  {
    id: 'schoolguardian',
    title: 'SchoolGuardian',
    description:
      'A full-stack school management and guardian platform for tracking student records, attendance, and communication between school staff and guardians.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/merera-taddesa/schoolguardian',
    demo: '',
    featured: true,
    visual: 'dashboard',
  },
  {
    id: 'registration-form',
    title: 'Registration Form',
    description:
      'A full-stack registration system with client-side validation, a REST API backend, and persistent storage for submitted records.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/merera-taddesa/registration-form',
    demo: '',
    featured: false,
    visual: 'form',
  },
  {
    id: 'ecommerce-app',
    title: 'E-Commerce Application',
    description:
      'A product browsing storefront with API-driven data, cart interactions, and an authentication-ready architecture for future checkout and account features.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/merera-taddesa/ecommerce-app',
    demo: '',
    featured: false,
    visual: 'ecommerce',
  },
]

// Unique technology tags, derived from the project list, used to drive the
// filter buttons in the Projects section.
export const projectTechFilters = Array.from(
  new Set(projects.flatMap((project) => project.tech))
).sort()
