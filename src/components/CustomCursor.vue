<template>
  <div v-if="!isMobile" class="custom-cursor-container" :class="{ 'has-moved': hasMoved }">
    <div 
      class="custom-cursor-dot" 
      :style="{ left: dotX + 'px', top: dotY + 'px' }"
      :class="{ 'custom-cursor-hovering': isHovering }"
    ></div>
    <div 
      class="custom-cursor-ring" 
      :style="{ left: ringX + 'px', top: ringY + 'px' }"
      :class="{ 'custom-cursor-hovering': isHovering }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dotX = ref(-100)
const dotY = ref(-100)
const ringX = ref(-100)
const ringY = ref(-100)
const isHovering = ref(false)
const isMobile = ref(true)
const hasMoved = ref(false)

let targetX = -100
let targetY = -100
let animationFrameId = 0

const INTERACTIVE_SELECTOR = '.interactive, a, button, input, textarea, select, label, [role="button"]'

const updatePosition = (e: MouseEvent) => {
  if (!hasMoved.value) {
    hasMoved.value = true
    ringX.value = e.clientX
    ringY.value = e.clientY
  }

  targetX = e.clientX
  targetY = e.clientY

  dotX.value = targetX
  dotY.value = targetY
}

// Driven by pointerover (fires only when the hovered element changes) rather than
// per animation frame — the old version ran querySelector(':hover') plus
// getComputedStyle ~60x/sec, which forced a style recalc on every frame.
const updateHoverState = (e: Event) => {
  const target = e.target
  isHovering.value = target instanceof Element && !!target.closest(INTERACTIVE_SELECTOR)
}

const clearHoverState = () => {
  isHovering.value = false
}

const animateRing = () => {
  const ease = 0.18
  ringX.value += (targetX - ringX.value) * ease
  ringY.value += (targetY - ringY.value) * ease
  animationFrameId = requestAnimationFrame(animateRing)
}

const startTracking = () => {
  if (animationFrameId) return
  window.addEventListener('mousemove', updatePosition)
  document.addEventListener('pointerover', updateHoverState)
  document.addEventListener('pointerout', clearHoverState)
  animationFrameId = requestAnimationFrame(animateRing)
}

const stopTracking = () => {
  window.removeEventListener('mousemove', updatePosition)
  document.removeEventListener('pointerover', updateHoverState)
  document.removeEventListener('pointerout', clearHoverState)
  cancelAnimationFrame(animationFrameId)
  animationFrameId = 0
  isHovering.value = false
}

const handleResize = () => {
  const mobile = window.innerWidth <= 768
  if (mobile === isMobile.value) return
  isMobile.value = mobile
  // Re-arm on the way back to desktop; the old code only attached listeners once
  // at mount, so a mobile-width first paint left the cursor permanently dead.
  if (mobile) stopTracking()
  else startTracking()
}

// The rAF chase loop ran forever even in a hidden tab; pause it entirely while
// the document isn't visible and re-arm on return.
const handleVisibility = () => {
  if (document.hidden) stopTracking()
  else if (!isMobile.value) startTracking()
}

onMounted(() => {
  isMobile.value = window.innerWidth <= 768
  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', handleVisibility)
  if (!isMobile.value) startTracking()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibility)
  stopTracking()
})
</script>

<style scoped>
.custom-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 2147483647 !important;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-cursor-container.has-moved {
  opacity: 1;
}
</style>
