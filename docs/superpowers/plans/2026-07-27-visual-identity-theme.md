# Dual-Theme Studio & Visual Identity Aesthetic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Kele's Design Portfolio into a world-class studio website inspired by visualidentity.studio, featuring a dynamic Dual-Theme Switcher (Light Studio & Dark Glass), Floating Glassmorphic Header, Vertical Side Badge, Studio Preloader, and high-editorial portfolio grid cards.

**Architecture:** Implement CSS Custom Properties on `:root[data-theme="light"]` and `:root[data-theme="dark"]` for seamless instant theme switching. Store theme preference in `localStorage`. Build clean Vue 3 components for Studio Preloader and Vertical Side Badge, while updating `App.vue`, `PortfolioGrid.vue`, `UmkmImpact.vue`, `InteractiveStickers.vue`, and `CustomCursor.vue`.

**Tech Stack:** Vue 3 (Composition API, TypeScript), Vanilla CSS, Lucide Icons / Inline SVG, Vite.

## Global Constraints

- Theme tokens defined strictly via CSS variables in `src/style.css`.
- Light Studio mode uses porcelain background `#EBEBEB` and deep black typography `#0F0F0F`.
- Dark Glass mode uses obsidian background `#0A0A0C` and frosted glass borders.
- Floating glass header uses `backdrop-filter: blur(16px)` and `border-radius: 9999px`.
- Vertical side badge fixed on left screen margin (`top: 50%; transform: translateY(-50%)`).

---

### Task 1: CSS Theme Tokens & Dynamic Theme Controller

**Files:**
- Modify: `src/style.css`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: HTML root `data-theme` attribute
- Produces: Theme state `theme` ('light' | 'dark') and toggle method `toggleTheme()` in `App.vue`

- [ ] **Step 1: Define CSS Theme Variables in `src/style.css`**

Add root variables for light and dark themes in `src/style.css`:
```css
:root, :root[data-theme="light"] {
  --bg-primary: #EBEBEB;
  --bg-secondary: #F5F5F7;
  --bg-card: rgba(255, 255, 255, 0.75);
  --bg-glass: rgba(235, 235, 235, 0.75);
  --text-primary: #0F0F0F;
  --text-secondary: #555555;
  --text-muted: #888888;
  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-glass: rgba(0, 0, 0, 0.12);
  --pill-cta-bg: #0F0F0F;
  --pill-cta-text: #FFFFFF;
  --glass-blur: blur(16px);
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color-scheme: light;
}

:root[data-theme="dark"] {
  --bg-primary: #0A0A0C;
  --bg-secondary: #121216;
  --bg-card: rgba(20, 20, 25, 0.65);
  --bg-glass: rgba(10, 10, 12, 0.75);
  --text-primary: #F3F4F6;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-glass: rgba(255, 255, 255, 0.15);
  --pill-cta-bg: #FFFFFF;
  --pill-cta-text: #0A0A0C;
  --glass-blur: blur(16px);
  color-scheme: dark;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  transition: background-color 0.4s ease, color 0.4s ease;
  margin: 0;
  overflow-x: hidden;
}
```

- [ ] **Step 2: Add theme state reactive handling in `src/App.vue`**

Initialize theme from `localStorage` (defaulting to `'light'`), sync `document.documentElement.setAttribute('data-theme', theme.value)`.

- [ ] **Step 3: Test build & theme initialization**

Run: `npm run build`
Expected: Build succeeds without CSS or TypeScript syntax errors.

- [ ] **Step 4: Commit**

```bash
git add src/style.css src/App.vue
git commit -m "feat: implement CSS theme tokens for Light Studio and Dark Glass modes"
```

---

### Task 2: Studio Preloader Component

**Files:**
- Create: `src/components/StudioPreloader.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: Props `isLoading: boolean` or self-dismissing timeout
- Produces: Visual preloader element fading out cleanly

- [ ] **Step 1: Create `src/components/StudioPreloader.vue`**

```vue
<template>
  <Transition name="fade">
    <div v-if="visible" class="studio-preloader">
      <div class="preloader-content">
        <svg class="spinner-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="6" stroke-dasharray="200" stroke-dashoffset="60" class="spinner-ring" />
          <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-weight="900" font-size="28" fill="currentColor">K</text>
        </svg>
        <span class="preloader-text">KELE STUDIO</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 700)
})
</script>

<style scoped>
.studio-preloader {
  position: fixed;
  inset: 0;
  background-color: var(--bg-primary);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.preloader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.spinner-logo {
  width: 70px;
  height: 70px;
  animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.spinner-ring {
  opacity: 0.85;
}

.preloader-text {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--text-secondary);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 2: Mount `StudioPreloader.vue` in `src/App.vue`**

Import and render `<StudioPreloader />` at top of template.

- [ ] **Step 3: Test build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/StudioPreloader.vue src/App.vue
git commit -m "feat: add StudioPreloader component inspired by visualidentity.studio"
```

---

### Task 3: Floating Glassmorphic Header Navigation & Theme Switcher

**Files:**
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: Reactive `theme` state ('light' | 'dark')
- Produces: Top floating pill navbar with active section links, theme toggle button, and "Get Proposal" CTA

- [ ] **Step 1: Replace/Enhance Header in `src/App.vue`**

Design top fixed header:
```html
<header class="floating-header-container">
  <nav class="floating-navbar">
    <div class="nav-brand">
      <span class="brand-dot"></span>
      <span class="brand-title">KELE STUDIO</span>
    </div>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#impact">Impact</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <button @click="toggleTheme" class="theme-toggle-btn" :title="`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`">
        <svg v-if="theme === 'light'" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      </button>
      <a href="#contact" class="btn-proposal-pill">Get Proposal</a>
    </div>
  </nav>
</header>
```

Add CSS styles for `.floating-header-container`, `.floating-navbar`, `.btn-proposal-pill`, `.theme-toggle-btn`.

- [ ] **Step 2: Verify responsive layout & smooth scroll navigation**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/App.vue
git commit -m "feat: implement floating glassmorphic navbar with theme toggle and proposal CTA"
```

---

### Task 4: Fixed Vertical Side Badge Component

**Files:**
- Create: `src/components/SideBadge.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: None
- Produces: Left fixed side badge element

- [ ] **Step 1: Create `src/components/SideBadge.vue`**

```vue
<template>
  <div class="side-badge-fixed" aria-hidden="true">
    <a href="#projects" class="badge-link">
      <span class="badge-accent"></span>
      <span class="badge-text">KELE DESIGN STUDIO • VISUAL IDENTITY 2026</span>
    </a>
  </div>
</template>

<style scoped>
.side-badge-fixed {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: none;
}

@media (min-width: 1024px) {
  .side-badge-fixed {
    display: block;
  }
}

.badge-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  padding: 0.75rem 1.25rem;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, background-color 0.4s ease;
}

.badge-link:hover {
  transform: rotate(180deg) translateX(-4px);
}

.badge-accent {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
}
</style>
```

- [ ] **Step 2: Mount `SideBadge.vue` in `src/App.vue`**

- [ ] **Step 3: Test build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/SideBadge.vue src/App.vue
git commit -m "feat: add fixed vertical side badge styled after visualidentity.studio"
```

---

### Task 5: Portfolio Grid & Case Study Cards Redesign

**Files:**
- Modify: `src/components/PortfolioGrid.vue`

**Interfaces:**
- Consumes: Portfolio items array
- Produces: Redesigned studio card grid with rounded corners (`24px`), typography hierarchy, and hover glass actions

- [ ] **Step 1: Update Card Styles & Layout in `PortfolioGrid.vue`**

Apply studio visual updates:
- `--bg-card` glassmorphic background on `.portfolio-card`
- `border-radius: 24px`
- Border `1px solid var(--border-subtle)`
- Category badges in crisp sans-serif uppercase tracking
- Image hover zoom effect `scale(1.05)` with smooth transition

- [ ] **Step 2: Test build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/PortfolioGrid.vue
git commit -m "feat: redesign PortfolioGrid cards with studio typography and rounded glass borders"
```

---

### Task 6: Adapting Interactive Components & Visual Polish

**Files:**
- Modify: `src/components/UmkmImpact.vue`
- Modify: `src/components/InteractiveStickers.vue`
- Modify: `src/components/CustomCursor.vue`

**Interfaces:**
- Consumes: CSS variables for theme consistency
- Produces: Fully cohesive light studio and dark glass UI elements

- [ ] **Step 1: Update `UmkmImpact.vue` metric block styling**

Structure impact cards with large bold numbers ("12+", "81%", "100%") and glass card backgrounds.

- [ ] **Step 2: Update `InteractiveStickers.vue` and `CustomCursor.vue` colors**

Ensure sticker drop-shadows and text borders adapt to `var(--text-primary)` and `var(--bg-primary)`.

- [ ] **Step 3: Test build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/UmkmImpact.vue src/components/InteractiveStickers.vue src/components/CustomCursor.vue
git commit -m "feat: refine impact metrics and adapt stickers and custom cursor to dynamic themes"
```

---

### Task 7: Final Build Verification & Local Server Test

**Files:**
- Inspect: build output in `dist/`

- [ ] **Step 1: Execute full production build**

Run: `npm run build`
Expected: Clean build without errors.

- [ ] **Step 2: Commit any remaining updates**

```bash
git add .
git commit -m "chore: final polish and build validation for dual-theme studio redesign"
```
