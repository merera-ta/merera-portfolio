# Merera Taddesa — Portfolio (Premium Editorial Edition)

A third-pass redesign of the portfolio for **Merera Taddesa**, MERN Stack
Developer and Software Engineering student at Jimma University. Same
project, same content, same functionality — restructured around an
editorial, typography-led art direction instead of a stacked-card layout.

## What changed in this pass

The previous version (glass cards, centered hero, card-grid skills) is now
one folder back. This pass replaced the *composition*, not the content:

- **Hero** — rebuilt as an editorial spread: a small uppercase metadata
  line, an oversized two-line display name (`Merera` / `Taddesa`, the
  second line in gradient), the portrait positioned asymmetrically beside
  it, and a choreographed entrance (`Hero.jsx`'s `STAGE` timing constants)
  where the background, metadata, each name line, portrait, supporting
  copy, and scroll cue all reveal in sequence rather than all at once.
- **About** — was three bento cards; now one oversized statement headline
  plus a bio paragraph, with a plain metadata list (`<dl>`) standing in for
  the old highlight cards.
- **Skills** — was a 2×2 grid of bordered cards; now each category is a
  row of large flowing display-type words separated by thin `/` connectors
  — technology shown through typography, not boxes.
- **Projects** — the alternating showcase layout stayed (it already fit
  the brief), but the index numbers are now oversized display type that's
  part of the composition, an arrow appears on hover, and the whole visual
  is now a real link to the demo/repo with a custom "View Project" cursor
  label.
- **Journey** — was a dot-and-line timeline; now large display-type step
  numbers next to each title, still truthfully unordered/undated (no years
  were invented).
- **Education** — was a card; now a single quiet line under Journey,
  since a lone box didn't earn its own card treatment once About and
  Skills stopped using cards.
- **Contact** — opens with a large closing statement ("Let's build
  something useful.") before the existing validated form.
- **Custom cursor** — extended to support a labelled state
  (`data-cursor-label="..."`), used on project visuals; still fine-pointer
  + motion-allowed only, exactly as before.
- **Background** — the hero's gradient mesh was dimmed and slowed further
  (smaller glows, lower opacity, 26s drift instead of 16s) to stay
  texture, not spectacle.

**Unchanged:** routing, `src/data/*.js` (all real content), the contact
form's validation/behavior, the theme system, accessibility features
(skip link, focus states, reduced-motion handling), and every real
external link. No experience, clients, statistics, or credentials were
invented at any point in this project.

## 1. Project overview

A single-page React portfolio: Hero, About, Skills, Projects, Developer
Journey, Education, and Contact — all still driven by `src/data/`.

## 2. Technologies used

React 18 + Vite 5, Tailwind CSS 3, React Router 6, Framer Motion 11,
lucide-react, ESLint 8. No new dependencies were added in this pass either
— the entrance choreography, flowing skills layout, and cursor label state
are all built on what was already there.

## 3. Installation instructions

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
cd merera-taddesa-premium-portfolio
npm install
```

> **Sandbox note:** as with the previous two deliverables, this was built
> with no network access, so `npm install` / `npm run build` could not be
> run here. See "How this was verified" below for what was checked
> instead — please run the real build yourself before deploying.

## 4. Development command

```bash
npm run dev
```

## 5. Production build command

```bash
npm run build
```

Static output goes to `dist/`. Preview with `npm run preview`.

## 6. How to replace the profile photo

Same as before — no photo has been attached yet, so the hero shows an
on-brand placeholder illustration.

1. Add your photo to `src/assets/`, e.g. `src/assets/profile-photo.jpg`.
2. In `src/components/Hero/PhotoFrame.jsx`, change:

   ```js
   import profilePhoto from '../../assets/profile-photo-placeholder.svg'
   // to:
   import profilePhoto from '../../assets/profile-photo.jpg'
   ```

A portrait-orientation photo (roughly 4:5) with even lighting fits the
frame best.

## 7. How to edit personal information

`src/data/siteConfig.js` — name, role, tagline, university, email, and the
About bio paragraph. To update your CV, replace
`public/Merera-Taddesa-CV.pdf` (currently a placeholder), keeping the
filename.

## 8. How to add projects

Edit `src/data/projects.js`. Same fields as before (`title`, `description`,
`tech`, `github`, `demo`, `featured`, `visual`). `visual` picks the abstract
mockup rendered by `ProjectVisual.jsx` (`'dashboard' | 'ecommerce' | 'form'`,
or omit for a generic code-window mockup). The technology filter is still
generated automatically from whatever `tech` values appear.

## 9. How to change social links

Unchanged — edit `src/data/socialLinks.js`.

## 10. Contact form

Still frontend-only and clearly commented in
`src/components/Contact/Contact.jsx` for wiring up EmailJS, Formspree, or
your own backend.

## 11. How to deploy

Any static host works from `npm run build`'s `dist/` output — Vercel or
Netlify with build command `npm run build`, output directory `dist`.

## New/changed files in this pass

```
src/components/Hero/ScrollIndicator.jsx     New — bottom-right scroll cue
src/components/Skills/SkillRow.jsx           New — replaces SkillCard.jsx (removed)
src/components/Hero/Hero.jsx                 Rewritten — editorial + choreographed entrance
src/components/Hero/PhotoFrame.jsx           Edited — dimmer glow, clip-path reveal, revealDelay prop
src/components/Background/GradientMesh.jsx   Edited — smaller/dimmer/slower
src/components/About/About.jsx               Rewritten — editorial statement + metadata list
src/components/Skills/Skills.jsx             Rewritten — flowing rows instead of card grid
src/components/Projects/ProjectShowcase.jsx  Edited — bigger numbers, arrow hover, visual is now a link
src/components/Journey/Journey.jsx           Rewritten — display-type step numbers
src/components/Education/Education.jsx       Rewritten — quiet coda line, no longer a card
src/components/Contact/Contact.jsx           Edited — large closing statement replaces SectionTitle
src/components/ui/CustomCursor.jsx           Edited — added data-cursor-label state
```

`src/components/Projects/ProjectCard.jsx` and `src/components/Skills/SkillCard.jsx`
from earlier versions were removed — both were superseded by the layouts
above, and nothing else in the project referenced them (verified below).

## Accessibility & performance notes

Unchanged from the prior version: semantic landmarks, skip-to-content link,
labelled form fields, visible focus states, and `prefers-reduced-motion`
support throughout (the hero's choreographed entrance, cursor, parallax
tilt, and floating badges all check it and fall back to a static, fully
visible layout). The custom cursor only activates on fine-pointer,
motion-allowed devices.

## How this was verified

No network access in this sandbox means no live `npm install`/`npm run
build` — verified statically instead:

- Every `.js`/`.jsx` file parsed individually with esbuild — clean.
- The full app bundled from `src/main.jsx` (dependencies external, SVG
  import resolved) — no broken or missing imports.
- Every relative import path cross-checked against files on disk.
- Confirmed no remaining references anywhere in the codebase to the two
  removed components (`ProjectCard.jsx`, `SkillCard.jsx`).
- Confirmed the section index numbers (01–05) run in sequence across About,
  Skills, Projects, Journey, and Contact after the Journey/Contact rewrite.

Please still run `npm install && npm run build` yourself before deploying.
