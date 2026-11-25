# Kele's Design Portfolio

Public portfolio site for **kele design** (Bagus Hari Wijaya) — branding, graphic design, and web development services, built as a Vue 3 single-page app.

## Stack

- Vue 3.5 + TypeScript 6 + Vite 8
- @vueuse/motion for scroll/entrance animations
- Vitest + Vue Test Utils for the smoke tests

## Develop

```bash
npm install
npm run dev       # vite dev server
```

## Checks

```bash
npm run lint      # eslint (flat config) — 0 errors required
npm run test      # vitest smoke tests: hero + case-study modal render
npm run build     # vue-tsc typecheck + vite production build
npm run check     # lint + test + build in one go
```

CI (`.github/workflows/check.yml`) runs all of these plus `npm audit` on every push and pull request.

## Editing content

- Case studies, skills, and headlines: `src/content/index.ts`
- Case-study images: `public/assets/` (WebP, with `-480` variants for the responsive `srcset`)
- Contact form composes a `mailto:` link — no backend involved

## Structure

- `src/App.vue` — layout shell: header, nav, mobile menu, footer
- `src/components/HeroSection.vue` — animated rotating headline
- `src/components/PortfolioGrid.vue` — filterable project grid
- `src/components/CaseStudyModal.vue` — deep-linkable case-study viewer (`#/case/<slug>`)
- `src/components/AboutSection.vue`, `ContactSection.vue`, `UmkmImpact.vue`
- `docs/` — design specs and PRD history

## Deploy

Static SPA: build with `npm run build` and serve `dist/` from any static host (GitHub Pages, Netlify, Vercel). Update `public/sitemap.xml` and the Open Graph tags in `index.html` when a production domain is set.
