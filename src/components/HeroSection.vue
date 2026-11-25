<template>
<section class="hero-section" id="hero">
      <div class="container hero-container">
        <div class="hero-content" v-motion-fade @pointerenter="handleHeroPointerEnter" @pointerleave="handleHeroPointerLeave" @focusin="handleHeroFocusIn" @focusout="handleHeroFocusOut">
          <div class="hero-badge-wrapper">
            <div class="hero-badge">
              <span>Branding</span>
              <div class="badge-semicircle"></div>
              <span>Graphic Design</span>
              <div class="badge-semicircle"></div>
              <span>Web Development</span>
            </div>
          </div>
          
          <h1 class="hero-title">
            <span class="headline-container">
              <Transition name="headline-slide" mode="out-in">
                <span :key="activeHeadlineIndex" class="light-title headline-text">
                  <span class="phrase-line">{{ headlines[activeHeadlineIndex].line1 }}</span>
                  <span class="phrase-line">{{ headlines[activeHeadlineIndex].line2 }}</span>
                </span>
              </Transition>
            </span>
            <span class="text-accent-gradient bold-title">Through Design.</span>
          </h1>
          
          <p class="hero-desc">
            Halo! Saya <span class="highlight-name">Bagus Hari Wijaya</span>, desainer di balik <strong>kele design studio</strong>. Menghasilkan sistem identitas merek, desain website, dan materi visual promosi yang fungsional berestetika tinggi ala studio agensi profesional.
          </p>
          
          <div class="hero-buttons">
            <a href="#works" class="btn-primary interactive">
              Explore Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m19 9-7 7-7-7"/></svg>
            </a>
            <a href="#about" class="btn-outline interactive">About Studio</a>
          </div>
        </div>
      </div>
      
      <!-- Draggable Stickers Playground Overlay -->
      <InteractiveStickers />
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import InteractiveStickers from './InteractiveStickers.vue'
import { useMotionPause } from '../composables/useMotionPause'
import { headlines } from '../content'

const { motionPaused } = useMotionPause()
const activeHeadlineIndex = ref(0)
let headlineTimer: number | undefined

// Rotate headline every 3.2s, but not while the tab is hidden, motion is
// paused, or the visitor is reading the hero (pointer over / keyboard focus
// inside it).
const heroHovered = ref(false)
const heroFocused = ref(false)
const headlinePaused = computed(() =>
  heroHovered.value || heroFocused.value || motionPaused.value || document.hidden
)

const startHeadlineTimer = () => {
  stopHeadlineTimer()
  headlineTimer = window.setInterval(() => {
    if (headlinePaused.value) return
    activeHeadlineIndex.value = (activeHeadlineIndex.value + 1) % headlines.length
  }, 3200)
}

const stopHeadlineTimer = () => {
  if (headlineTimer) {
    clearInterval(headlineTimer)
    headlineTimer = undefined
  }
}

const handleHeroPointerEnter = () => { heroHovered.value = true }
const handleHeroPointerLeave = () => { heroHovered.value = false }
const handleHeroFocusIn = () => { heroFocused.value = true }
const handleHeroFocusOut = () => { heroFocused.value = false }

const handleVisibility = () => {
  if (document.hidden || motionPaused.value) stopHeadlineTimer()
  else startHeadlineTimer()
}

watch(motionPaused, (paused) => {
  if (paused) stopHeadlineTimer()
  else if (!document.hidden) startHeadlineTimer()
})

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibility)
  if (!motionPaused.value) startHeadlineTimer()
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
  stopHeadlineTimer()
})
</script>
