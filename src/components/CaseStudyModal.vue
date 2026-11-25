<template>
  <Transition name="modal">
    <div
      v-if="visible"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="project.title"
      @click.self="$emit('close')"
      @keydown.tab="trapFocus"
    >
      <div class="modal-content glass-panel" ref="modalRef">
        <button ref="closeBtnRef" class="modal-close-btn interactive" aria-label="Tutup" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div class="modal-body">
          <!-- Multi-Slide Image Container -->
          <div class="modal-image-container">
            <img :src="currentSlideImage" :alt="project.title" class="modal-image" width="1024" height="1024" />

            <!-- Slide Navigation Controls if project has multiple slides -->
            <div v-if="project.slides && project.slides.length > 1" class="slide-nav-controls">
              <button @click="prevSlide" class="slide-btn interactive" aria-label="Slide sebelumnya" title="Slide Sebelumnya">‹</button>
              <span class="slide-indicator">{{ activeSlideIndex + 1 }} / {{ project.slides.length }}</span>
              <button @click="nextSlide" class="slide-btn interactive" aria-label="Slide selanjutnya" title="Slide Selanjutnya">›</button>
            </div>
          </div>

          <!-- Modal Text Content -->
          <div class="modal-text-content">
            <div class="modal-header-info">
              <div class="modal-badge-row">
                <span v-if="project.badge" class="special-badge-pill modal-special-badge">{{ project.badge }}</span>
                <span class="modal-category">{{ project.category }}</span>
              </div>
              <h2 class="modal-title">{{ project.title }}</h2>
            </div>

            <div class="modal-meta-grid">
              <div class="meta-item">
                <span class="meta-label">Sektor</span>
                <span class="meta-val">{{ project.client }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Tahun</span>
                <span class="meta-val">{{ project.year }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Peran Desain</span>
                <span class="meta-val">{{ project.role }}</span>
              </div>
            </div>

            <div class="modal-divider"></div>

            <div class="modal-desc-section">
              <h3 class="modal-section-title">Tantangan Komunikasi Visual</h3>
              <p class="modal-paragraph">{{ project.challenge }}</p>
            </div>

            <div class="modal-desc-section">
              <h3 class="modal-section-title">Solusi Layout &amp; Branding</h3>
              <p class="modal-paragraph">{{ project.solution }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { Project } from '../content'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{ close: [] }>()

const visible = ref(true)
const activeSlideIndex = ref(0)
const modalRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
let lastFocusedEl: HTMLElement | null = null

const currentSlideImage = computed(() => {
  if (props.project.slides && props.project.slides.length > 0) {
    return props.project.slides[activeSlideIndex.value] || props.project.image
  }
  return props.project.image
})

const nextSlide = () => {
  if (!props.project.slides) return
  activeSlideIndex.value = (activeSlideIndex.value + 1) % props.project.slides.length
}

const prevSlide = () => {
  if (!props.project.slides) return
  activeSlideIndex.value =
    (activeSlideIndex.value - 1 + props.project.slides.length) % props.project.slides.length
}

const handleModalKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emitClose()
  else if (e.key === 'ArrowRight') nextSlide()
  else if (e.key === 'ArrowLeft') prevSlide()
}

const emitClose = () => {
  visible.value = false
  // beri waktu transisi leave sebelum parent unmount
  window.setTimeout(() => emit('close'), 180)
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
  // Prevent body scrolling while the modal is open
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', handleModalKeydown)

  // Remember what had focus so closing can hand it back
  lastFocusedEl = document.activeElement as HTMLElement | null
  nextTick(() => closeBtnRef.value?.focus())
})

onUnmounted(() => {
  // '' hands scrolling back to the stylesheet; 'auto' would pin it to a value
  // the page never set in the first place.
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleModalKeydown)
  lastFocusedEl?.focus?.()
  lastFocusedEl = null
})
</script>
