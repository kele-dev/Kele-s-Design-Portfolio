# Improvement Backlog

Project: Kele-s-Design-Portfolio
Last updated: 2026-11-25 (cycle 001)

Scoring and priority bands: see the improvement-cycle skill `references/scoring.md` (Score = Impact x Confidence / Effort).

| ID | Pri | Score | Dimension | Title | Evidence | Effort | Status | Cycle |
|----|-----|-------|-----------|-------|----------|--------|--------|-------|
| IC-001 | P0 | 12.0 | Stability | No global Vue error handler: uncaught runtime error breaks the page silently | src/main.ts:7-9 no app.config.errorHandler; grep onErrorCaptured src -> 0; std: practice: SRE SLI/SLO/error budget; goal: Must not fail: hero and case studies render | S | picked | 001 |
| IC-002 | P1 | 15.0 | UX & accessibility | Contact form submits to mailto with zero success or failure feedback | src/App.vue:290-296 handleSubmit only sets window.location.href to mailto, no feedback state; hotspot x1.5; std: practice: Nielsen heuristic 1; goal: Success measure: mailto conversion path | S | picked | 001 |
| IC-003 | P1 | 12.0 | Performance | 3.3 MB case-study images are unoptimized 1024x1024 JPEGs mislabeled as .png, ~95% of page weight | file public/assets/*.png -> JPEG image data 1024x1024; du 844K/788K/684K/644K; images 94.6% of 3748K dist; no srcset; std: CWV LCP; goal: Must not fail: case studies slowest content on mobile | S | picked | 001 |
| IC-004 | P1 | 12.0 | Performance | Render-blocking Google Fonts stylesheet loads 13 weights in 2 families from third-party CDN | index.html:9 sync stylesheet link fonts.googleapis.com (privacy per merged finding A5); std: CWV LCP; goal: Must not fail: hero first paint | S | picked | 001 |
| IC-005 | P1 | 12.0 | DX/CI-CD/dependencies | 6 vulnerable npm dependencies (5 high) incl direct vue and vite, all fixes available | npm audit -> vite 8.0.0-8.1.5 high direct, vue 3.2.13-3.5.41 high direct, @vue/server-renderer, nanoid, postcss, source-map-js; fixAvailable all (merged finding A1); std: OWASP Top 10 2025 A03; goal: Risk tier: public production | S | picked | 001 |
| IC-006 | P1 | 9.0 | UX & accessibility | Hero h1 text auto-rotates every 3.2 s with no pause on hover or focus | src/App.vue:394-399 setInterval 3200ms, pauses only on visibility or motion toggle; App.vue:119-129 Transition inside h1; hotspot x1.5; std: none: judgement; goal: Must not fail: hero primary statement unstable | S | picked | 001 |
| IC-007 | P1 | 9.0 | Observability & ops | Contact success measure is unmeasurable: no analytics or events anywhere | grep analytics/gtag/plausible/umami in src -> 0; src/App.vue:213-214 mailto link; CTA pills App.vue:52-54 and case opens unmeasured (merged proposal C13); std: none: judgement; goal: Success measure: mailto clicks unmeasured | S | picked | 001 |
| IC-008 | P1 | 9.0 | DX/CI-CD/dependencies | No CI pipeline: build, typecheck and audit never run automatically | .github/workflows absent; only local npm run build enforces anything; std: none: judgement; goal: Must not fail: regressions ship silently | S | picked | 001 |
| IC-009 | P1 | 9.0 | UX & accessibility | Preloader forces 1.1-2.6 s of blank-branding delay even on fast loads | src/components/StudioPreloader.vue:23-36 hide at load+600ms, cap 2000ms, fade 500ms; std: none: judgement; goal: Users: every visitor waits before the hero | S | picked | 001 |
| IC-010 | P1 | 9.0 | UI | .category-pill defined twice with divergent styles (global vs scoped) | src/App.vue:687-696 plain pill vs src/components/PortfolioGrid.vue:295-307 tinted pill; hotspot x1.5; std: none: judgement; goal: Purpose: visual identity coherence | S | picked | 001 |
| IC-011 | P1 | 6.0 | Observability & ops | No robots.txt or sitemap.xml for a public client-acquisition site | ls public/ -> assets, favicon.svg, icons.svg only; std: none: judgement; goal: Purpose: attract clients via search | S | picked | 001 |
| IC-012 | P1 | 6.0 | Code quality & tests | No linter or formatter configured at any level | git ls-files eslint/prettier/editorconfig/husky -> empty; no lint script in package.json; std: none: judgement; goal: none | S | picked | 001 |
| IC-013 | P1 | 6.0 | UI | Lihat Visual Suite overlay appears only on :hover, never on focus or touch | src/components/PortfolioGrid.vue:438-446 .project-overlay opacity 0, revealed only by .project-card:hover; std: none: judgement; goal: Users: touch visitors lose the affordance | S | picked | 001 |
| IC-014 | P1 | 6.0 | UX & accessibility | Deep link to a non-existent case study silently renders nothing | src/components/PortfolioGrid.vue:232-239 slugIndex.get miss -> returns, no message or redirect; std: none: judgement; goal: Must not fail: case study deep link renders nothing | S | picked | 001 |
| IC-015 | P1 | 6.0 | UX & accessibility | False interactivity affordance: non-interactive elements marked .interactive | src/App.vue:132 name span, App.vue:186 skill tags, src/components/UmkmImpact.vue:14-18 pillar cards; CustomCursor.vue:31 consumes the selector; hotspot x1.5; std: none: judgement; goal: none | S | picked | 001 |
| IC-016 | P1 | 4.5 | Code quality & tests | Zero tests and no test runner despite a must-not-fail surface with recurring visual regressions | git ls-files test/spec -> only docs; package.json scripts dev/build/preview only; 8 fix commits in the visual area; std: practice: test pyramid; goal: Must not fail: verified only manually | M | picked | 001 |
| IC-017 | P1 | 4.5 | Code quality & tests | Two 700-800-line god components; App.vue is the top churn hotspot | wc -l PortfolioGrid.vue 801, App.vue 745, style.css 713; App.vue 18 commits in 6 months; hotspot x1.5; std: practice: convention; goal: Must not fail: hero regression risk | L | picked | 001 |
| IC-018 | P1 | 4.0 | DX/CI-CD/dependencies | README is unmodified Vite template boilerplate with no setup or deploy info | cat README.md -> 5 generic template lines; std: none: judgement; goal: none | S | picked | 001 |
| IC-019 | P1 | 4.0 | Security | No Content-Security-Policy on a public production site | index.html head has no CSP meta; no headers config anywhere in repo; std: OWASP Top 10 2025 A02; goal: Risk tier: public production hardening | S | picked | 001 |
| IC-020 | P1 | 4.0 | UX & accessibility | Modals and mobile menu leave the background page in the accessibility tree | src/components/PortfolioGrid.vue:66-84 and src/App.vue:76-102: no inert or aria-hidden applied to main while dialog open; std: none: judgement; goal: Users: screen-reader visitors | S | picked | 001 |
| IC-021 | P1 | 4.0 | UX & accessibility | Every modal slide image shares one alt text (the project title) | src/components/PortfolioGrid.vue:84 :alt bound to selectedProject.title for all slides; std: WCAG 2.2 SC 1.1.1; goal: none | S | picked | 001 |
| IC-022 | P1 | 4.0 | UX & accessibility | Active portfolio filter conveyed visually only; result changes unannounced | src/components/PortfolioGrid.vue:14-23 active via class only; grep aria-pressed/aria-live -> 0; std: none: judgement; goal: none | S | picked | 001 |
| IC-023 | P2 | 9.0 | New features | proposal: social shares render without a preview image (no og:image or og:url) | index.html:15-27 OG tags without image; docs/prd/antislop-high-fixes.md:26 deleted, never re-added; std: none: judgement; goal: Purpose: share previews without thumbnail | S | picked | 001 |
| IC-024 | P2 | 4.0 | New features | proposal: portfolio contains only concept projects; no real client work or testimonials | src/content/index.ts:58,78,97,124 all badge Proyek konsep, client values Konsep; std: none: judgement; goal: Users: potential clients see zero proof | L | picked | 001 |
| IC-025 | P2 | 3.0 | DX/CI-CD/dependencies | Three dependencies a major version behind, one of them TypeScript | npm outdated -> @vueuse/core 14->15, typescript 6->7, @types/node 24->26; std: none: judgement; goal: none | M | picked | 001 |
| IC-026 | P2 | 2.0 | DX/CI-CD/dependencies | @vueuse/core is a declared dependency but never imported | grep '@vueuse' src -> only src/main.ts:2 @vueuse/motion; std: none: judgement; goal: none | S | picked | 001 |
| IC-027 | P2 | 2.0 | Security | Plan docs contain instructions aimed at AI agents (injection surface, benign today) | docs/superpowers/plans/2026-07-23-*.md:3 and 2026-07-27-*.md:3 'For agentic workers' headers; std: none: judgement; goal: none | S | picked | 001 |
| IC-028 | P3 | 1.0 | Code quality & tests | Dead scaffold assets shipped in src/assets and public | grep hero.png/vite.svg/vue.svg/icons.svg in src index.html docs -> 0 references; files exist; std: none: judgement; goal: none | S | picked | 001 |

Evidence ends with `; std: <standard>; goal: <goal link>` (see references/standards.md); never put `|` inside a cell.

## Archive

| ID | Pri | Score | Dimension | Title | Evidence | Effort | Status | Cycle |
|----|-----|-------|-----------|-------|----------|--------|--------|-------|

## Status legend

- `proposed`: found and scored, awaiting user choice.
- `picked`: user chose it for the current cycle.
- `in-progress`: being executed on the cycle branch.
- `done`: committed and verified. Never re-proposed.
- `blocked`: attempted, failed or reverted; reason recorded in the cycle report.
- `deferred`: user chose not to do it now; re-validated next cycle.
- `stale`: evidence no longer present; kept for history.
- `rejected`: user declined permanently; not re-proposed.

## Dimensions

Performance, Security, Stability, New features, UI, UX & accessibility, Code quality & tests, DX/CI-CD/dependencies, Observability & ops.
