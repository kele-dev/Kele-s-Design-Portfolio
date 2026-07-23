# Multi-Industry Portfolio Visual Suites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `src/components/PortfolioGrid.vue` with an industry-based category filter system, multi-media visual suite cards, and detailed case-study modals for multi-industry design showcases.

**Architecture:** Vue 3 Composition API with reactive filtering, `<TransitionGroup>` for layout animations, and `<Transition>` for modal popups.

**Tech Stack:** Vue 3 (TypeScript), `@vueuse/motion`, Vanilla CSS.

## Global Constraints

- Typeface: Plus Jakarta Sans
- Styling: Vanilla CSS in `src/style.css` and scoped Vue component styles
- Build verification: `npm run build` must complete with 0 errors

---

### Task 1: Update Portfolio Dataset for Multi-Industry Visual Suites

**Files:**
- Modify: `src/components/PortfolioGrid.vue:120-180`

**Interfaces:**
- Consumes: `Project` interface in `PortfolioGrid.vue`
- Produces: Updated `Project` dataset with industry categories and media format tags

- [ ] **Step 1: Inspect existing project dataset structure in `src/components/PortfolioGrid.vue`**

Check lines 110-180 of `src/components/PortfolioGrid.vue` to ensure exact field names.

- [ ] **Step 2: Update categories and project items array in `src/components/PortfolioGrid.vue`**

Replace `categories` array with:
`['All', 'F&B / Culinary', 'Fashion & Lifestyle', 'Corporate & Tech', 'Retail & FMCG']`

Replace `projects` ref dataset with 4 comprehensive multi-industry Visual Suites:
1. `F&B / Culinary` - "Artisan Culinary & Menu Visual Suite"
2. `Fashion & Lifestyle` - "Urban Apparel & Lookbook Visual Suite"
3. `Corporate & Tech` - "SaaS App & Digital Display Suite"
4. `Retail & FMCG` - "Consumer Goods Packaging & POS Display Suite"

- [ ] **Step 3: Run build to verify dataset types**

Run: `npm run build`
Expected: PASS with 0 errors

- [ ] **Step 4: Commit**

```bash
git add src/components/PortfolioGrid.vue
git commit -m "feat(portfolio): update dataset for multi-industry visual suites"
```

---

### Task 2: Enhance Grid Card Layout with Industry Badges and Sub-Format Tags

**Files:**
- Modify: `src/components/PortfolioGrid.vue:20-60`
- Modify: `src/components/PortfolioGrid.vue:200-350`

**Interfaces:**
- Consumes: Multi-industry `Project` dataset from Task 1
- Produces: Enhanced card template with industry badges and media format tags

- [ ] **Step 1: Update Card Template in `src/components/PortfolioGrid.vue`**

Add industry badge pill (`project.category`) and media formats tag line (`project.mediaFormats`) inside `.project-info`.

- [ ] **Step 2: Update Card Styling in `src/components/PortfolioGrid.vue`**

Add scoped CSS for `.project-industry-badge` and `.media-formats-tag`.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS with 0 errors

- [ ] **Step 4: Commit**

```bash
git add src/components/PortfolioGrid.vue
git commit -m "feat(portfolio): add industry badges and format tags to grid cards"
```

---

### Task 3: Verify Production Build and End-to-End Visual Flow

**Files:**
- Verify: `src/components/PortfolioGrid.vue`
- Verify: `dist/index.html`

- [ ] **Step 1: Execute production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 2: Commit final implementation**

```bash
git add .
git commit -m "feat(portfolio): complete multi-industry visual suite implementation"
```
