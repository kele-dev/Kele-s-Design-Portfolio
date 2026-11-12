<template>
  <section class="portfolio-section section-padding" id="works">
    <div class="container">
      <div class="section-header">
        <span class="category-pill">Visual Suites & Full Identity</span>
        <h2 class="section-title text-gradient">Koleksi Desain & Brand Systems</h2>
        <p class="section-subtitle">
          Dari logo, identitas merek, merchandise, antarmuka website, hingga materi promosi usaha lokal.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="filter-wrapper interactive">
        <button 
          v-for="cat in categories" 
          :key="cat"
          class="filter-btn"
          :class="{ 'active': activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
          <div v-if="activeCategory === cat" class="active-dot"></div>
        </button>
      </div>

      <!-- Portfolio Grid with TransitionGroup for layout animations -->
      <TransitionGroup name="grid" tag="div" class="portfolio-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card glass-panel interactive"
          role="button"
          tabindex="0"
          :aria-label="`Lihat visual suite: ${project.title}`"
          @click="openProject(project)"
          @keydown.enter.prevent="openProject(project)"
          @keydown.space.prevent="openProject(project)"
        >
          <div class="project-image-wrapper">
            <img :src="project.image" :alt="project.title" class="project-image" width="1024" height="1024" loading="lazy" decoding="async" />
            
            <!-- Special Project Badge Tag -->
            <div v-if="project.badge" class="special-badge-pill">
              {{ project.badge }}
            </div>

            <div class="project-overlay">
              <div class="view-pill">
                <span>Lihat Visual Suite</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
          <div class="project-info">
            <div class="project-meta-row">
              <span class="project-category">{{ project.category }}</span>
              <span class="project-formats-tag">{{ project.mediaFormats }}</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.shortDesc }}</p>
          </div>
        </div>
      </TransitionGroup>

      <!-- Case Study Modal with Multi-Slide Viewer. Deep-linkable via #/case/<slug>. -->
      <Transition name="modal">
        <div
          v-if="selectedProject"
          class="modal-overlay"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedProject.title"
          @click.self="closeProject"
          @keydown.tab="trapFocus"
        >
          <div class="modal-content glass-panel" ref="modalRef">
            <button ref="closeBtnRef" class="modal-close-btn interactive" aria-label="Tutup" @click="closeProject">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            
            <div class="modal-body">
              <!-- Multi-Slide Image Container -->
              <div class="modal-image-container">
                <img :src="currentSlideImage" :alt="selectedProject.title" class="modal-image" width="1024" height="1024" />
                
                <!-- Slide Navigation Controls if project has multiple slides -->
                <div v-if="selectedProject.slides && selectedProject.slides.length > 1" class="slide-nav-controls">
                  <button @click="prevSlide" class="slide-btn interactive" aria-label="Slide sebelumnya" title="Slide Sebelumnya">‹</button>
                  <span class="slide-indicator">{{ activeSlideIndex + 1 }} / {{ selectedProject.slides.length }}</span>
                  <button @click="nextSlide" class="slide-btn interactive" aria-label="Slide selanjutnya" title="Slide Selanjutnya">›</button>
                </div>
              </div>

              <!-- Modal Text Content -->
              <div class="modal-text-content">
                <div class="modal-header-info">
                  <div class="modal-badge-row">
                    <span v-if="selectedProject.badge" class="special-badge-pill modal-special-badge">{{ selectedProject.badge }}</span>
                    <span class="modal-category">{{ selectedProject.category }}</span>
                  </div>
                  <h2 class="modal-title">{{ selectedProject.title }}</h2>
                </div>
                
                <div class="modal-meta-grid">
                  <div class="meta-item">
                    <span class="meta-label">Sektor</span>
                    <span class="meta-val">{{ selectedProject.client }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Tahun</span>
                    <span class="meta-val">{{ selectedProject.year }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Peran Desain</span>
                    <span class="meta-val">{{ selectedProject.role }}</span>
                  </div>
                </div>
                
                <div class="modal-divider"></div>
                
                <div class="modal-desc-section">
                  <h3 class="modal-section-title">Tantangan Komunikasi Visual</h3>
                  <p class="modal-paragraph">{{ selectedProject.challenge }}</p>
                </div>
                
                <div class="modal-desc-section">
                  <h3 class="modal-section-title">Solusi Layout & Branding</h3>
                  <p class="modal-paragraph">{{ selectedProject.solution }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { categories, projects as allProjects, type Project } from '../content'

const activeCategory = ref('All')
const selectedProject = ref<Project | null>(null)
const activeSlideIndex = ref(0)

const projects = allProjects

// Map slugs to projects so the #/case/<slug> hash resolves in O(1)
const slugIndex = new Map(projects.map(p => [p.slug, p]))

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

const currentSlideImage = computed(() => {
  if (!selectedProject.value) return ''
  if (selectedProject.value.slides && selectedProject.value.slides.length > 0) {
    return selectedProject.value.slides[activeSlideIndex.value] || selectedProject.value.image
  }
  return selectedProject.value.image
})

const handleModalKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeProject()
  else if (e.key === 'ArrowRight') nextSlide()
  else if (e.key === 'ArrowLeft') prevSlide()
}

/* ----- Deep-linkable case studies (#/case/<slug>) ----- */

const CASE_HASH = /^#\/case\/(.+)$/

const modalRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
let lastFocusedEl: HTMLElement | null = null

const openProject = (project: Project, opts: { syncHash?: boolean } = {}) => {
  selectedProject.value = project
  activeSlideIndex.value = 0
  document.body.style.overflow = 'hidden' // prevent body scrolling
  document.addEventListener('keydown', handleModalKeydown)

  // Remember what had focus so closing can hand it back
  lastFocusedEl = document.activeElement as HTMLElement | null
  nextTick(() => closeBtnRef.value?.focus())

  // Reflect the open case study in the URL without triggering hashchange
  if (opts.syncHash !== false) {
    const target = `#/case/${project.slug}`
    if (location.hash !== target) {
      try {
        history.pushState(null, '', target)
      } catch {
        location.hash = target
      }
    }
  }
}

const closeProject = () => {
  if (!selectedProject.value) return
  selectedProject.value = null
  // '' hands scrolling back to the stylesheet; 'auto' would pin it to a value
  // the page never set in the first place.
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleModalKeydown)

  // Drop the #/case/... hash without adding a history entry, so the browser
  // Back button goes to the page the visitor came from, not the closed modal.
  if (CASE_HASH.test(location.hash)) {
    history.replaceState(null, '', location.pathname + location.search)
  }

  lastFocusedEl?.focus?.()
  lastFocusedEl = null
}

// Keep the modal in sync with the URL (Back/Forward buttons, pasted deep links)
const syncFromHash = () => {
  const match = location.hash.match(CASE_HASH)
  if (match) {
    // decodeURIComponent throws on malformed hashes like #/case/% — never let
    // a hand-edited URL break the hashchange handler.
    let slug = ''
    try {
      slug = decodeURIComponent(match[1])
    } catch {
      return
    }
    const project = slugIndex.get(slug)
    if (project && selectedProject.value?.id !== project.id) {
      openProject(project, { syncHash: false })
    }
  } else if (selectedProject.value) {
    closeProject()
  }
}

// Cycle Tab within the modal so keyboard users can't reach the page behind it
const trapFocus = (e: KeyboardEvent) => {
  const root = modalRef.value
  if (!root) return
  const focusables = Array.from(root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  ))
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement
  if (e.shiftKey && (active === first || active === root)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  // Support opening a case study straight from a shared URL
  syncFromHash()
  window.addEventListener('hashchange', syncFromHash)
})

// Closing the tab mid-modal must not leave <body> locked, the listener bound,
// or the URL holding a case-study hash that no longer exists.
onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleModalKeydown)
  window.removeEventListener('hashchange', syncFromHash)
})

const nextSlide = () => {
  if (selectedProject.value?.slides) {
    activeSlideIndex.value = (activeSlideIndex.value + 1) % selectedProject.value.slides.length
  }
}

const prevSlide = () => {
  if (selectedProject.value?.slides) {
    activeSlideIndex.value = (activeSlideIndex.value - 1 + selectedProject.value.slides.length) % selectedProject.value.slides.length
  }
}
</script>

<style scoped>
.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 50px;
}

.category-pill {
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary-text);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 16px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.section-subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Category Filters */
.filter-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.filter-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  min-height: 44px;
  padding: 10px 24px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  transition: var(--transition-smooth);
  position: relative;
  overflow: visible;
  cursor: pointer;
}

.filter-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-glass);
  background: var(--bg-card-hover);
}

.filter-btn.active {
  background: var(--pill-cta-bg);
  border-color: var(--pill-cta-bg);
  color: var(--pill-cta-text);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.active-dot {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background-color: var(--text-primary);
  border-radius: 50%;
}

/* Portfolio Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.project-card {
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
}

.project-card:hover {
  border-color: var(--border-glass);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.project-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.05);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.special-badge-pill {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--pill-cta-bg);
  color: var(--pill-cta-text);
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  z-index: 5;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s ease;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-pill {
  background: var(--pill-cta-bg);
  color: var(--pill-cta-text);
  padding: 10px 22px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  transform: translateY(12px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover .view-pill {
  transform: translateY(0);
}

.project-info {
  padding: 28px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.project-category {
  color: var(--text-secondary);
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.project-formats-tag {
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--border-subtle);
  padding: 4px 12px;
  border-radius: 9999px;
}

.project-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* TransitionGroup Animations for Grid Items */
.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.grid-leave-active {
  position: absolute;
  width: calc(50% - 16px);
}

.grid-move {
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Case Study Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 7, 15, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.modal-content {
  width: 100%;
  max-width: 1000px;
  max-height: 85vh;
  border-radius: 24px;
  overflow-y: auto;
  position: relative;
  background: rgba(13, 22, 46, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.modal-close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-bounce);
  z-index: 20;
}

.modal-close-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: scale(1.1) rotate(90deg);
}

.modal-body {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  min-height: 500px;
}

.modal-image-container {
  background: #0d162e;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--border-color);
  position: relative;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Slide controls */
.slide-nav-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(8, 13, 26, 0.85);
  backdrop-filter: blur(8px);
  padding: 6px 16px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.slide-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  padding: 0 4px;
  transition: var(--transition-bounce);
}

.slide-btn:hover {
  color: var(--color-accent);
  transform: scale(1.3);
}

.slide-indicator {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.modal-text-content {
  padding: 48px;
  overflow-y: auto;
  max-height: 85vh;
}

.modal-header-info {
  margin-bottom: 24px;
}

.modal-badge-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.modal-special-badge {
  position: relative;
  top: 0;
  left: 0;
}

.modal-category {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-title {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.2;
}

.modal-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-val {
  font-weight: 600;
  font-size: 0.95rem;
}

.modal-divider {
  height: 1px;
  background: var(--border-color);
  margin-bottom: 32px;
}

.modal-desc-section {
  margin-bottom: 32px;
}

.modal-section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
}

.modal-paragraph {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-active .modal-content {
  animation: modal-zoom-in 0.4s cubic-bezier(0.25, 0.8, 0.25, 1.1) forwards;
}

.modal-leave-active .modal-content {
  animation: modal-zoom-out 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes modal-zoom-in {
  from { transform: scale(0.92) translateY(15px); }
  to { transform: scale(1) translateY(0); }
}

@keyframes modal-zoom-out {
  from { transform: scale(1) translateY(0); }
  to { transform: scale(0.95) translateY(15px); }
}

/* Responsive Styles */
@media (max-width: 900px) {
  .modal-body {
    grid-template-columns: 1fr;
  }
  .modal-image-container {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    aspect-ratio: 16 / 10;
  }
  .modal-text-content {
    padding: 32px;
    max-height: none;
  }
  .modal-content {
    max-height: 90vh;
  }
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  .grid-leave-active {
    position: relative;
    width: 100%;
  }
  .section-title {
    font-size: 2rem;
  }
}
</style>
