# Full-Spectrum Animated Portfolio & UMKM Impact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `LogoMarquee.vue` (animated logo ticker), `UmkmImpact.vue` (UMKM empowerment section), and enhance `PortfolioGrid.vue` with multi-slide case study modals, special project badges (`⭐ Full Identity`, `🌐 Web Design`, `🌱 UMKM Partner`), and full brand system datasets.

**Architecture:** Vue 3 Composition API with reactive animation states, CSS keyframe infinite marquee, and multi-slide modal carousel.

**Tech Stack:** Vue 3 (TypeScript), `@vueuse/motion`, Vanilla CSS.

## Global Constraints

- Typeface: Plus Jakarta Sans
- Styling: Vanilla CSS in `src/style.css` and scoped Vue component styles
- Build verification: `npm run build` must complete with 0 errors

---

### Task 1: Create LogoMarquee Component (Animated Endless Logo Ticker)

**Files:**
- Create: `src/components/LogoMarquee.vue`
- Modify: `src/App.vue:80-85`

**Interfaces:**
- Consumes: SVG/Vector logo list
- Produces: Infinite horizontal scrolling marquee ribbon with hover spring animation

- [ ] **Step 1: Create `src/components/LogoMarquee.vue`**

Implement infinite CSS marquee scrolling loop with 6 interactive brand/UMKM logo marks:
- Kele Culinary
- Synergy Fashion
- Galaxy Tech
- Retro FMCG
- Local Coffee Co
- Urban Apparel

- [ ] **Step 2: Mount `LogoMarquee.vue` in `src/App.vue`**

Import and place `<LogoMarquee />` right below Hero Section and above `PortfolioGrid`.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/LogoMarquee.vue src/App.vue
git commit -m "feat(logo-marquee): add interactive animated endless logo ticker"
```

---

### Task 2: Create UmkmImpact Component (Local Business Empowerment Section)

**Files:**
- Create: `src/components/UmkmImpact.vue`
- Modify: `src/App.vue:150-160`

**Interfaces:**
- Consumes: UMKM impact stats & value proposition data
- Produces: Glassmorphism section showcasing UMKM empowerment pillars

- [ ] **Step 1: Create `src/components/UmkmImpact.vue`**

Build 3-pillar glassmorphism card grid:
1. `🎯 Visual Upgrade`: Mentransformasi identitas visual UMKM dari sederhana menjadi sekelas brand besar.
2. `📦 Packaging & Merchandise`: Desain kemasan, stiker, kaos, dan media cetak yang meningkatkan selling point.
3. `🌐 Digital & Web Presence`: Tampilan media sosial dan landing page yang siap menarik pembeli.

- [ ] **Step 2: Mount `UmkmImpact.vue` in `src/App.vue`**

Import and place `<UmkmImpact />` right above the Contact Section.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/UmkmImpact.vue src/App.vue
git commit -m "feat(umkm-impact): add UMKM empowerment section"
```

---

### Task 3: Enhance PortfolioGrid Dataset & Case Study Modal with Multi-Slide Viewer

**Files:**
- Modify: `src/components/PortfolioGrid.vue`

**Interfaces:**
- Consumes: `Project` dataset with badges (`badge`, `mediaFormats`, `slides`)
- Produces: Enhanced PortfolioGrid with special badges and multi-slide modal viewer

- [ ] **Step 1: Update `Project` interface and dataset in `src/components/PortfolioGrid.vue`**

Add `badge?: string` and `slides?: string[]` to `Project` interface.
Update dataset with 5 projects:
1. `Full Brand Systems` - "Artisan Coffee & Bakery Full Identity" (`⭐ Full Identity`, `🌱 UMKM Partner`)
2. `F&B & Retail` - "Culinary Menu & Display Suite" (`🌱 UMKM Partner`)
3. `Web & Digital` - "SaaS Product & Landing Page" (`🌐 Web Design`)
4. `Fashion & Corporate` - "Urban Streetwear Lookbook Suite" (`⭐ Full Identity`)
5. `F&B & Retail` - "Retail FMCG Packaging Suite" (`🌱 UMKM Partner`)

- [ ] **Step 2: Add Multi-Slide Modal Carousel to `PortfolioGrid.vue`**

Add slide navigation buttons (`<` and `>`) inside modal image container so visitors can browse logo breakdown, merchandise, and web previews.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/PortfolioGrid.vue
git commit -m "feat(portfolio): add special badges and multi-slide modal carousel"
```

---

### Task 4: Final Verification and End-to-End Build Test

**Files:**
- Verify: `dist/index.html`

- [ ] **Step 1: Execute final production build**

Run: `npm run build`
Expected: PASS with 0 errors

- [ ] **Step 2: Commit complete feature branch**

```bash
git add .
git commit -m "feat(portfolio): complete full-spectrum animated portfolio implementation"
```
