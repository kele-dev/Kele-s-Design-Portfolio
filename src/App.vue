<template>
  <div class="app-root" :style="themeStyles">
    <!-- Studio Preloader -->
    <StudioPreloader />

    <!-- Fixed Vertical Side Badge -->
    <SideBadge />

    <!-- Creative Animated Background Layer -->
    <CreativeBackground />

    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Floating Glassmorphic Header Navigation -->
    <header class="floating-header-wrapper" :class="{ 'scrolled': isScrolled }">
      <nav class="floating-navbar" aria-label="Navigasi utama">
        <div class="nav-brand">
          <KeleLogo />
        </div>

        <ul class="nav-links">
          <li><a href="#hero" class="nav-link interactive" :class="{ 'active': activeSection === 'hero' }">Home</a></li>
          <li><a href="#works" class="nav-link interactive" :class="{ 'active': activeSection === 'works' }">Projects</a></li>
          <li><a href="#about" class="nav-link interactive" :class="{ 'active': activeSection === 'about' }">About</a></li>
          <li><a href="#umkm-impact" class="nav-link interactive" :class="{ 'active': activeSection === 'umkm-impact' }">Impact</a></li>
          <li><a href="#contact" class="nav-link interactive" :class="{ 'active': activeSection === 'contact' }">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <button
            type="button"
            class="motion-toggle-btn interactive"
            :aria-pressed="motionPaused ? 'true' : 'false'"
            :aria-label="motionPaused ? 'Putar animasi' : 'Jeda animasi'"
            @click="toggleMotion"
          >
            <svg v-if="motionPaused" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          </button>

          <button
            type="button"
            @click="cycleTheme"
            class="theme-toggle-btn interactive"
            title="Ubah Warna Aksen Tema"
            aria-label="Ganti warna aksen tema"
          >
            <div class="theme-icon-semicircle" aria-hidden="true" :style="{ transform: `rotate(${themeAngle}deg)` }"></div>
          </button>

          <a href="#contact" class="btn-proposal-pill interactive" @click="trackEvent('cta_click', 'get-proposal')">
            Get Proposal
          </a>

          <!-- Mobile hamburger: nav links are hidden below 768px, so this is the
               only way phone visitors can jump between sections. -->
          <button
            ref="menuBtnRef"
            type="button"
            class="mobile-menu-btn interactive"
            :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
            aria-controls="mobile-menu"
            :aria-label="mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"
            @click="toggleMobileMenu"
          >
            <svg v-if="!mobileMenuOpen" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            <svg v-else aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile Full-Screen Menu Overlay -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        id="mobile-menu"
        ref="menuOverlayRef"
        class="mobile-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        @keydown.tab="trapFocus"
      >
        <nav class="mobile-menu-nav" aria-label="Navigasi mobile">
          <a 
            v-for="link in mobileLinks" 
            :key="link.id"
            :href="`#${link.id}`" 
            class="mobile-nav-link interactive"
            :class="{ 'active': activeSection === link.id }"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </a>
          <a href="#contact" class="btn-proposal-pill interactive mobile-menu-cta" @click="closeMobileMenu(); trackEvent('cta_click', 'get-proposal-mobile')">
            Get Proposal
          </a>
        </nav>
      </div>
    </Transition>

    <main id="main" :inert="mobileMenuOpen || undefined">
    <!-- Hero Section -->
    <!-- Hero -->
    <HeroSection />

    <!-- Works / Portfolio Section -->
    <PortfolioGrid />

    <!-- About -->
    <AboutSection />

    <!-- UMKM Impact Showcase Section -->
    <UmkmImpact />

    <!-- Contact -->
    <ContactSection />
    </main>

    <!-- Footer -->
    <footer class="footer" :inert="mobileMenuOpen || undefined">
      <div class="container footer-container">
        <div class="footer-left">
          <span class="footer-logo">kele.</span>
          <p>© 2026 kele design studio. Dibuat dengan Vue 3 & Motion.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import StudioPreloader from './components/StudioPreloader.vue'
import SideBadge from './components/SideBadge.vue'
import CreativeBackground from './components/CreativeBackground.vue'
import KeleLogo from './components/KeleLogo.vue'
import CustomCursor from './components/CustomCursor.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import PortfolioGrid from './components/PortfolioGrid.vue'
import UmkmImpact from './components/UmkmImpact.vue'
import { useTheme } from './composables/useTheme'
import { useMotionPause } from './composables/useMotionPause'
import { trackEvent } from './analytics'

// Playful Accent Color Theme Cycling Logic (persisted to localStorage)
const { themeAngle, themeStyles, cycleTheme } = useTheme()

// Ambient animation pause (starts paused under prefers-reduced-motion)
const { motionPaused, toggleMotion } = useMotionPause()

// Scrolled Header state
const isScrolled = ref(false)
const activeSection = ref('hero')

const SECTION_IDS = ['hero', 'works', 'about', 'umkm-impact', 'contact']
let scrollTicking = false

const measureScroll = () => {
  scrollTicking = false
  isScrolled.value = window.scrollY > 30

  const scrollPos = window.scrollY + 140

  for (const section of SECTION_IDS) {
    const el = document.getElementById(section)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        activeSection.value = section
      }
    }
  }
}

// Coalesce to one measurement per frame. Reading offsetTop/offsetHeight forces a
// synchronous layout, and the raw handler did that 5x on every scroll event.
const handleScroll = () => {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(measureScroll)
}

// Mobile full-screen menu
const mobileLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'works', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'umkm-impact', label: 'Impact' },
  { id: 'contact', label: 'Contact' }
]

const mobileMenuOpen = ref(false)
const menuBtnRef = ref<HTMLButtonElement | null>(null)
const menuOverlayRef = ref<HTMLElement | null>(null)

const closeMobileMenu = () => {
  const wasOpen = mobileMenuOpen.value
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
  // Hand focus back to the hamburger that opened the overlay
  if (wasOpen) menuBtnRef.value?.focus()
}

const toggleMobileMenu = () => {
  if (mobileMenuOpen.value) {
    closeMobileMenu()
    return
  }
  mobileMenuOpen.value = true
  // Lock page scroll while the overlay is up
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    menuOverlayRef.value?.querySelector<HTMLElement>('a[href]')?.focus()
  })
}

// Cycle Tab within the mobile overlay (same approach as PortfolioGrid trapFocus)
const trapFocus = (e: KeyboardEvent) => {
  const root = menuOverlayRef.value
  if (!root) return
  const focusables = Array.from(root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  ))
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

const handleMenuEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) closeMobileMenu()
}

// If the viewport grows past the mobile breakpoint, the hamburger disappears
// from the DOM via CSS — don't leave the overlay or body scroll lock behind.
const handleMenuResize = () => {
  if (window.innerWidth > 768 && mobileMenuOpen.value) closeMobileMenu()
}

onMounted(() => {
  measureScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleMenuEscape)
  window.addEventListener('resize', handleMenuResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleMenuEscape)
  window.removeEventListener('resize', handleMenuResize)
  closeMobileMenu()
})
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}

/* Floating Glass Navbar Wrapper */
.floating-header-wrapper {
  position: fixed;
  top: 1.25rem;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 0 1.25rem;
  pointer-events: none;
  transition: transform 0.4s ease;
}

.floating-navbar {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  max-width: 1080px;
  padding: 0.55rem 1.4rem 0.55rem 1.6rem;
  background: var(--bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-glass);
  border-radius: 9999px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-header-wrapper.scrolled .floating-navbar {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
}

.nav-brand {
  display: flex;
  align-items: center;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.25s ease;
  position: relative;
  padding: 4px 0;
  display: inline-block;
}

.nav-link:hover, .nav-link.active {
  color: var(--text-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: var(--color-accent);
  border-radius: 2px;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease;
  box-shadow: 0 0 8px var(--color-accent);
}

.nav-link.active::after,
.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--border-glass);
  background: var(--border-subtle);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

/* Motion pause/play button, same look as the theme toggle, 44x44 target */
.motion-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--border-glass);
  background: var(--border-subtle);
  color: var(--text-primary);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;
}

.motion-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

.theme-icon-semicircle {
  width: 16px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 16px 16px 0 0;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;
}

/* Mobile hamburger button — only visible below the desktop breakpoint */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--border-glass);
  background: var(--border-subtle);
  color: var(--text-primary);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

.btn-proposal-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  background-color: var(--pill-cta-bg);
  color: var(--pill-cta-text);
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: transform 0.25s ease, opacity 0.25s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.btn-proposal-pill:hover {
  transform: translateY(-2px);
  opacity: 0.92;
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 7, 15, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 24px;
}

.mobile-menu-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 320px;
}

.mobile-nav-link {
  width: 100%;
  text-align: center;
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.25s ease, background 0.25s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}

.mobile-menu-cta {
  margin-top: 16px;
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.35s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

/* Category Pill Utility */
/* Mobile Responsiveness for Header */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .floating-navbar {
    padding: 0.5rem 0.9rem;
  }
  .nav-actions > .btn-proposal-pill {
    display: none;
  }
}

/* Dynamic Headline Slide Animation */
.headline-container {
  display: block;
  min-height: 2.2em;
  position: relative;
  padding-bottom: 0.1em;
}

.headline-text {
  display: block;
}

.phrase-line {
  display: block;
  line-height: 1.05;
}

.headline-slide-enter-active,
.headline-slide-leave-active {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.headline-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.headline-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.form-feedback {
  margin-top: 0.9rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-secondary, #9CA3AF);
  animation: form-feedback-in 0.25s ease-out;
}

@keyframes form-feedback-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
