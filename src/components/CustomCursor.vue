<template>
  <div v-if="!isMobile" class="custom-cursor-container">
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

const dotX = ref(0)
const dotY = ref(0)
const ringX = ref(0)
const ringY = ref(0)
const isHovering = ref(false)
const isMobile = ref(true)

let targetX = 0
let targetY = 0

const updatePosition = (e: MouseEvent) => {
  targetX = e.clientX
  targetY = e.clientY
  
  // The small dot follows the mouse instantly
  dotX.value = targetX
  dotY.value = targetY
}

const checkHover = () => {
  const hoveredEl = document.querySelector(':hover')
  if (hoveredEl) {
    const isInteractive = hoveredEl.closest('.interactive') || 
                          hoveredEl.closest('a') || 
                          hoveredEl.closest('button') ||
                          hoveredEl.closest('input') ||
                          hoveredEl.closest('textarea') ||
                          window.getComputedStyle(hoveredEl).cursor === 'pointer'
    isHovering.value = !!isInteractive
  } else {
    isHovering.value = false
  }
}

let animationFrameId: number

const animateRing = () => {
  // Smooth spring-like easing for the trailing outer ring
  const ease = 0.15
  ringX.value += (targetX - ringX.value) * ease
  ringY.value += (targetY - ringY.value) * ease
  
  checkHover()
  animationFrameId = requestAnimationFrame(animateRing)
}

onMounted(() => {
  isMobile.value = window.innerWidth <= 768
  
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
  }
  
  window.addEventListener('resize', handleResize)

  if (!isMobile.value) {
    window.addEventListener('mousemove', updatePosition)
    animateRing()
  }
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', updatePosition)
    cancelAnimationFrame(animationFrameId)
  })
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
  z-index: 9999;
}
</style>
