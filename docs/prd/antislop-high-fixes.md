# PRD: antislop HIGH fixes (audit 2026-11-13, findings #1-#13)

## Goal
Fix every HIGH (Hard Gate) finding from the antislop audit of the Vue 3 + Vite portfolio, without changing the visual direction beyond what each fix needs.

## Owner decisions (from chat, 2026-11-13)
- #4 stats: remove the three metric cards entirely.
- #5 projects/clients: they are concept/practice work. Label every project visibly as "Proyek konsep", drop fictional client names, remove the "Brands & Logos Built by Kele" marquee.
- #6: remove "Tahun Berdiri: 2023" and the "Program Pendampingan Visual UMKM Aktif" badge.
- #7: no preference given; decision: hide social links until real profile URLs exist, and remove placeholder og:url / og:image / twitter:image.

## Non-goals
MEDIUM/LOW findings (#14-#26): glow, glass, emoji icons, arrows, palette, copy tone, comments. Image re-encoding (PNG/JPEG size). Light theme. No new dependencies.

## Measured colour values (WCAG, via antislop check_contrast)
- `--text-muted` #6B7280 -> **#8B93A0** (5.0:1 on #242427, the worst case).
- Per-theme `primaryText` (primary-coloured text on dark/tinted bg): blue **#66A3EE** (6.76), purple **#B980EE** (6.29), orange #ff5e00 (5.57, unchanged), pink #ff007f (4.74, unchanged).
- Per-theme `onPrimary` (text on primary-filled buttons): blue #ffffff (5.25), purple #ffffff (5.96), orange **#0a0a0c** (6.46), pink **#0a0a0c** (5.24).
- Stickers 3 (#ff3366) and 5 (#00cc99): text colour -> **#080d1a** (5.46 and 9.32).

## Tasks

### T1: head, fonts, logo (#1, #3 head part, #7 meta part, #13 font/logo)
Files: `index.html`, `src/style.css` (line 1 only), `src/components/KeleLogo.vue`, `public/assets/kele_logo_official.svg` (delete).
- index.html: replace every em dash. `<title>` -> `kele design | Bringing Ideas &amp; Impact Through Design | Bagus Hari Wijaya`. meta description -> `Bringing Ideas &amp; Impact Through Design. Portofolio resmi ...` (rest unchanged). og:title and twitter:title -> `kele design | Bringing Ideas &amp; Impact Through Design`.
- index.html: delete `og:image`, `og:url`, `twitter:image` meta lines and the TODO comment about the placeholder domain; change `twitter:card` to `summary`.
- Move the Google Fonts URL from `@import` in style.css:1 to `<link rel="stylesheet" href="...same URL...">` in index.html right after the two preconnect links; delete style.css line 1.
- KeleLogo.vue: `src="/assets/kele_logo_official.png"`, add `width="300" height="129" fetchpriority="high"` (CSS keeps height 38px / width auto). `git rm public/assets/kele_logo_official.svg` (it is a PNG with an .svg name; nothing else references it).
- Verify: `grep -c "—" index.html` prints 0; `grep -rn "kele_logo_official.svg" src index.html` prints nothing; `npm run build` passes.

### T2: honest content (#3 body part, #4, #5, #6, #7 links)
Files: `src/content/index.ts`, `src/components/UmkmImpact.vue`, `src/App.vue` (template + imports only), `src/components/PortfolioGrid.vue` (line ~106 label only), `src/components/LogoMarquee.vue` (delete).
- App.vue:139 alt -> `Bagus Hari Wijaya, kele design`; App.vue:143 -> `Graphic & Brand Designer, kele design`.
- App.vue: remove `<LogoMarquee />` (and its comment) and its import; `git rm src/components/LogoMarquee.vue`. In content/index.ts delete the `LogoMark` interface, the `logos` array and its banner comment.
- App.vue: delete the whole "Media Sosial" `.contact-item` block (lines 196-205, including the TODO comment). Delete `<div class="footer-right">...Tahun Berdiri...</div>`.
- UmkmImpact.vue: delete `.metrics-row` block (lines 13-27) and the `.cta-badge` div (lines 45-48); delete their now-unused CSS rules (`.metrics-row`, `.metric-card`, `.metric-number`, `.metric-label`, `.cta-badge`, `.pulse-dot`, its keyframes, and matching media-query rules). Keep the CTA link; if `.umkm-cta-row` used `justify-content: space-between`, keep the button visually aligned (centre it).
- content/index.ts projects: set `badge: 'Proyek konsep'` on all four. `client` values: `'Konsep: kedai kopi & bakery'`, `'Konsep: aplikasi web SaaS'`, `'Konsep: warung makan lokal'`, `'Konsep: brand streetwear'`.
- PortfolioGrid.vue:106 meta label `Klien / Sektor` -> `Sektor`.
- content/index.ts stickers id 3 and id 5: `color: '#080d1a'`.
- Verify: `grep -rn "—" src --include=*.vue --include=*.ts` shows only comments; `grep -rn "81%\|Tahun Berdiri\|Pendampingan Visual UMKM Aktif\|instagram.com\|LogoMarquee" src` prints nothing; `npm run build` passes.

### T3: contrast (#2)
Files: `src/composables/useTheme.ts`, `src/style.css`, `src/components/PortfolioGrid.vue` (style only).
- Theme interface: add `primaryText: string` and `onPrimary: string`; fill per the table above. `themeStyles` also emits `--color-primary-text` and `--color-on-primary`.
- style.css: `--text-muted: #8B93A0`; add defaults `--color-primary-text: #66A3EE; --color-on-primary: #ffffff;` in `:root`; `.btn-primary` `color: var(--color-on-primary)` (check hover/active rules and any svg/stroke inheriting it).
- PortfolioGrid.vue scoped `.category-pill` (line ~295): text colour `var(--color-primary-text)`. Grep other scoped/global rules that use `color: var(--color-primary)` on small text (< 18.66px bold / 24px regular) over dark bg and switch them to `var(--color-primary-text)`; list them in the report.
- Verify: `npm run build` passes.

### T4: keyboard, semantics, motion pause (#8, #9, #10, #11 form focus + mobile menu)
Files: `src/App.vue`, `src/style.css`, new `src/composables/useMotionPause.ts`, `src/components/PortfolioGrid.vue` (two h4 only).
- Theme toggle (App.vue:31): add `aria-label="Ganti warna aksen tema"`, `type="button"`; icon div gets `aria-hidden="true"`.
- Hamburger: `:aria-label="mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"`, `aria-controls="mobile-menu"`, `type="button"`; its svgs `aria-hidden="true"`.
- Mobile overlay div: `id="mobile-menu"`, `role="dialog"`, `aria-modal="true"`, `aria-label="Menu navigasi"`. On open focus the first link (nextTick); Tab/Shift+Tab cycle within the overlay (same approach as PortfolioGrid `trapFocus`); on close (Escape, link click, toggle) return focus to the hamburger button (template ref).
- Landmarks: wrap from the hero `<section>` through the contact `<section>` in `<main id="main">`. Give the two navs `aria-label` ("Navigasi utama", "Navigasi mobile").
- Headings: avatar card `<h3>Bagus Hari Wijaya</h3>` -> `<p class="avatar-name">` and update its CSS selector so styling is identical; `<h4 class="skills-title">` -> `<h3>`. PortfolioGrid modal `<h4 class="modal-section-title">` (x2) -> `<h3>` (styles are class-based; confirm no `h4` selector).
- Motion pause: `useMotionPause()` returns `{ motionPaused, toggleMotion }`; initial value `true` when `matchMedia('(prefers-reduced-motion: reduce)').matches`, else `false` (no persistence needed); a `watch` toggles class `motion-paused` on `document.documentElement`. Add a button in `.nav-actions` before the theme toggle: `type="button"`, `class="motion-toggle-btn interactive"`, `:aria-pressed`, `:aria-label="motionPaused ? 'Putar animasi' : 'Jeda animasi'"`, inline pause/play svg with `aria-hidden="true"`, styled like `.theme-toggle-btn` (44x44). style.css: `.motion-paused *, .motion-paused *::before, .motion-paused *::after { animation-play-state: paused !important; }`. App.vue headline timer: do not start/restart while `motionPaused` is true; stop when it becomes true, start when false (watch).
- Form focus (style.css:599-603): replace `outline: none` with `outline: 2px solid var(--color-primary); outline-offset: 2px;` (keep border/background changes).
- Base cursor layer (style.css, near top, before the custom-cursor media query): `a[href], button:not(:disabled), summary, select, label[for], [role="button"], [role="tab"] { cursor: pointer; } button:disabled { cursor: not-allowed; }`.
- Verify: `npm run build` passes.

### T5: stickers keyboard, tap targets, image dimensions (#11 stickers, #12, #13 img)
Files: `src/components/InteractiveStickers.vue`, `src/App.vue` (style + the about `<img>` only), `src/components/PortfolioGrid.vue`.
- Stickers: change `.sticker-wrapper` div to `<button type="button">` with `:aria-label="`Stiker ${sticker.hasHalfMoon ? 'kele design' : sticker.text}, geser dengan tombol panah`"`; reset button styles (background none, border 0, padding 0, font/color inherit). Add `@keydown` handler: ArrowLeft/Right/Up/Down move 16px (Shift = 48px), `preventDefault`, bring to front (topZ). Keep pointer drag as is. Ensure the `:focus-visible` ring is visible on it.
- Tap targets >= 44x44: App.vue `.theme-toggle-btn`, `.mobile-menu-btn`, new `.motion-toggle-btn` -> width/height 44px (check the 768px media query overrides too); `.btn-proposal-pill` min-height 44px with `display:inline-flex; align-items:center`. PortfolioGrid `.filter-btn` min-height 44px; `.slide-btn` min-width/min-height 44px with centred content.
- Images: App.vue about photo add `width="678" height="930"`; PortfolioGrid card img and modal img add `width="1024" height="1024"`. CSS keeps controlling rendered size (confirm `height: auto` or object-fit so nothing stretches).
- Verify: `npm run build` passes.

## Acceptance tests (main session, in browser after all tasks)
1. Navbar logo renders (naturalWidth 300), no console errors.
2. No `—` in rendered text, title, or meta; no 81%/55%/12+, no "Tahun Berdiri", no social links, no marquee; each project card and modal shows "Proyek konsep".
3. Contrast tool: muted text, category pill, sticker 3/5, btn-primary in all 4 accent themes pass 4.5:1.
4. At 375px: toggle, motion, hamburger, Get Proposal, filter buttons, slide buttons measure >= 44x44; no horizontal scroll.
5. Keyboard: Tab reaches motion toggle, theme toggle, stickers (arrow keys move them), form inputs show an outline; mobile menu opens with focus inside, Tab stays inside, Escape closes and returns focus to hamburger.
6. Motion toggle pauses marquee-free loops (stickers, orbs) and the headline rotation; reduced-motion starts paused.
7. One `<main>`, heading order h1 > h2 > h3 with no skips.
8. `npm run build` passes.

## Risks
- `cursor: none !important` custom-cursor layer must still win on desktop; base cursor layer must sit before it.
- Removing metrics/cta-badge may leave empty grid gaps; executors check the section still looks intentional.
- Sticker as `<button>` may pick up global button styles; reset explicitly.

## Assumptions
- Concept projects keep their titles and years; only client and badge change.
- No persistence for the motion toggle.
