# Muluken Bekele — Portfolio

React 19 + TypeScript + Tailwind CSS v4, built with Vite. No animation library, no images: every visual is CSS or inline SVG.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview
```

## Before publishing

1. **Résumé** — put your PDF at `public/Muluken-Bekele-Resume.pdf` (or change `resumeUrl` in `src/data/profile.ts`).
2. **Email** — set `email` in `src/data/profile.ts`. When it is filled in, the contact section shows an email row with a copy button. While it is empty, that row is hidden.
3. **Dates** — the experience section shows roles in order without dates. Add them in `src/data/experience.ts` if you want them on the page.

## Where things live

| Path | What |
| --- | --- |
| `src/data/*` | All content: profile, projects, experience, skills. Edit text here, not in components. |
| `src/components/Hero.tsx` | Variable-font name that reacts to the pointer, plus the system schematic |
| `src/components/Projects.tsx` | Project index with a preview that follows the pointer, one chapter per project, case-file overlay |
| `src/components/visuals/*` | The live mini-interfaces for each project, built from HTML and CSS |
| `src/hooks/index.ts` | Shared IntersectionObserver reveal, active section, media queries |
| `src/index.css` | Design tokens, reveal and motion utilities, reduced-motion overrides |

## Performance notes

- All scroll reveals go through a single IntersectionObserver. There are no scroll listeners.
- The paragraph word reveal and the dock's progress bar use CSS scroll-driven animations. Browsers without support show the content statically.
- The pointer effects in the hero and the project index run one `requestAnimationFrame` per pointer move. They write styles directly, so React doesn't re-render, and they only run on devices with a fine pointer.
- The live demos (bid feed, log tail, extraction steps) only tick while they are on screen.
- `prefers-reduced-motion` turns off the loops, the reveals and the pointer effects.
- Fonts are self-hosted through Fontsource, so there are no third-party requests.
