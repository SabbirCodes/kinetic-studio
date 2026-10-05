# Kinetic Studio

A bold, dark, editorial landing page template for digital agencies and design studios. Built with Next.js, TypeScript, Tailwind CSS and GSAP.

## Features

- Home page: hero, clients marquee, services, work, results, process, testimonials, CTA, FAQ, footer
- Case study page for every project (`/work/project-name`)
- GSAP animations, drag-to-swipe testimonials, animated mobile menu
- Responsive, and respects `prefers-reduced-motion`
- All content lives in `src/data`, so you can rebrand without touching components

## Getting started

You need Node.js 18.18 or newer.

```bash
git clone https://github.com/SabbirCodes/kinetic-studio.git
cd kinetic-studio
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Check the code |

## Make it yours

| What to change | Where |
| --- | --- |
| Name, contact info, menu, social links | `src/data/site.ts` |
| Services | `src/data/services.ts` |
| Projects, clients, stats, process, testimonials | `src/data/content.ts` |
| Case study text | `src/data/case-studies.ts` |
| FAQ | `src/data/faq.ts` |
| Colors and fonts | `src/app/globals.css` (the `@theme` block) |
| Page title and description (SEO) | `src/app/layout.tsx` |
| Order of sections | `src/app/page.tsx` |

**Colors:** change `--color-accent` in `globals.css` to restyle the whole site.

**Case studies:** each key in `case-studies.ts` must match a project title in lowercase with dashes ("Fieldnote Coffee" becomes `fieldnote-coffee`). Rename a project and you must rename its key too.

**Images:** the demo uses generated SVG art (`src/components/ui/ProjectArt.tsx`). To use real images, put them in `public/images/` and swap `<ProjectArt />` for `next/image` in `Work.tsx` and `src/app/work/[slug]/page.tsx`.

**Animations:** each section's animation is in its own file in `src/components/sections/`. Change `duration` (seconds) or `ease` to speed up or slow down. To fade any element in on scroll, add `data-reveal` to it inside a component that calls `useReveal` from `src/lib/animations.ts`.

## Project structure

```
src/
├── app/          Pages, layout, global styles
├── components/   layout, sections, ui
├── data/         All editable content
└── lib/          Animation helpers and utilities
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No settings needed.

## Troubleshooting

- **Build fails on fonts:** `next/font/google` needs internet during the build.
- **A case study shows 404:** its key in `case-studies.ts` doesn't match the project title.
- **No animations:** your system may have "reduce motion" turned on. This is intentional.
- **Mouse pointer is hidden:** the custom cursor replaces it. Remove `<Cursor />` from `layout.tsx` and the `cursor: none` rule from `globals.css` to turn it off.

## Contributing

Issues and pull requests are welcome. For big changes, please open an issue first.