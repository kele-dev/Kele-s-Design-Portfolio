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

const checkHover = () => {
  try {
    const hoveredEl = document.querySelector(':hover')
    if (hoveredEl) {
      const isInteractive = hoveredEl.closest('.interactive') || 
                            hoveredEl.closest('a') || 
                            hoveredEl.closest('button') ||
                            hoveredEl.closest('input') ||
                            hoveredEl.closest('textarea') ||
                            hoveredEl.closest('[role="button"]') ||
                            window.getComputedStyle(hoveredEl).cursor === 'pointer'
      isHovering.value = !!isInteractive
    } else {
      isHovering.value = false
    }
  } catch (err) {
    isHovering.value = false
  }
}

let animationFrameId: number

const animateRing = () => {
  const ease = 0.18
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
  z-index: 99999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-cursor-container.has-moved {
  opacity: 1;
}
</style>
