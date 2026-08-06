<template>
  <div class="stickers-area" ref="areaRef">

    <div 
      v-for="sticker in stickers" 
      :key="sticker.id"
      class="sticker-wrapper"
      :class="{ 'dragging': sticker.isDragging }"
      :style="{ 
        transform: `translate(${sticker.x}px, ${sticker.y}px)`,
        zIndex: sticker.zIndex
      }"
      @pointerdown="startDrag($event, sticker)"
    >
      <div 
        class="sticker interactive"
        :class="`float-pattern-${sticker.id}`"
        :style="{ 
          background: sticker.bg,
          color: sticker.color,
          border: sticker.border,
          boxShadow: sticker.isDragging ? '0 20px 40px rgba(0,0,0,0.5)' : '0 10px 22px rgba(0,0,0,0.25)'
        }"
      >
        <!-- Optional Semicircle logo inside kele design sticker -->
        <div v-if="sticker.hasHalfMoon" class="mini-logo-wrapper">
          <span class="bold-text">kele</span>
          <div class="mini-half-moon"></div>
        </div>
        <span v-else>{{ sticker.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { stickers as contentStickers } from '../content'
import type { Sticker } from '../content'

const areaRef = ref<HTMLElement | null>(null)
let topZ = 10

// Wrap in a ref (not the raw module array): ref() deep-converts the nested
// objects to reactive proxies, so dragging can mutate sticker.x/y/zIndex and
// the DOM updates. A plain imported array is not reactive at all.
const stickers = ref<Sticker[]>([...contentStickers])

const arrangeStickers = () => {
  if (areaRef.value) {
    const width = areaRef.value.clientWidth
    const height = areaRef.value.clientHeight
    
    // Position stickers nicely based on viewport size
    stickers.value[0].x = width * 0.1
    stickers.value[0].y = height * 0.25
    
    stickers.value[1].x = width * 0.72
    stickers.value[1].y = height * 0.15
    
    stickers.value[2].x = width * 0.18
    stickers.value[2].y = height * 0.65
    
    stickers.value[3].x = width * 0.78
    stickers.value[3].y = height * 0.6
    
    stickers.value[4].x = width * 0.45
    stickers.value[4].y = height * 0.72
    
    stickers.value[5].x = width * 0.46
    stickers.value[5].y = height * 0.2
  }
}

onMounted(() => {
  arrangeStickers()
  window.addEventListener('resize', arrangeStickers)
})

// Holds the teardown for an in-flight drag so it can be cancelled on unmount.
let releaseDrag: (() => void) | null = null

onUnmounted(() => {
  window.removeEventListener('resize', arrangeStickers)
  releaseDrag?.()
})

const startDrag = (event: PointerEvent, sticker: Sticker) => {
  event.preventDefault()

  // A second pointerdown before the previous drag ended would otherwise
  // orphan the earlier move/up listeners on window.
  releaseDrag?.()

  // Bring the dragged sticker to the front
  topZ += 1
  sticker.zIndex = topZ
  sticker.isDragging = true

  const startX = event.clientX - sticker.x
  const startY = event.clientY - sticker.y

  const handlePointerMove = (e: PointerEvent) => {
    sticker.x = e.clientX - startX
    sticker.y = e.clientY - startY
  }

  releaseDrag = () => {
    sticker.isDragging = false
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)
    releaseDrag = null
  }

  const handlePointerUp = () => releaseDrag?.()

  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
  // Without pointercancel the sticker stays latched to the pointer when the
  // browser steals the gesture (touch scroll, context menu, tab switch).
  window.addEventListener('pointercancel', handlePointerUp)
}
</script>

<style scoped>
.stickers-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

.sticker-wrapper {
  position: absolute;
  pointer-events: auto;
  user-select: none;
  cursor: grab;
  will-change: transform;
}

.sticker-wrapper.dragging {
  cursor: grabbing;
}

.sticker {
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s;
}

/* Pause float animation smoothly during drag */
.sticker-wrapper.dragging .sticker {
  animation-play-state: paused !important;
  transform: scale(1.1) !important;
}

/* Pattern 1: Elliptical & Tilt Drift */
.float-pattern-1 {
  animation: float-path-1 6s infinite ease-in-out alternate;
}
@keyframes float-path-1 {
  0% { transform: translate(0px, 0px) rotate(-10deg) scale(1); }
  25% { transform: translate(16px, -20px) rotate(-4deg) scale(1.04); }
  50% { transform: translate(-12px, 14px) rotate(6deg) scale(0.96); }
  75% { transform: translate(-20px, -14px) rotate(-16deg) scale(1.02); }
  100% { transform: translate(0px, 0px) rotate(-10deg) scale(1); }
}

/* Pattern 2: Diagonal Up-Right & Spin Tilt */
.float-pattern-2 {
  animation: float-path-2 7s infinite ease-in-out alternate;
}
@keyframes float-path-2 {
  0% { transform: translate(0px, 0px) rotate(8deg) scale(1); }
  33% { transform: translate(-24px, -18px) rotate(20deg) scale(1.06); }
  66% { transform: translate(18px, 22px) rotate(-4deg) scale(0.95); }
  100% { transform: translate(0px, 0px) rotate(8deg) scale(1); }
}

/* Pattern 3: Swaying 360 Spin & Drift */
.float-pattern-3 {
  animation: float-path-3 8s infinite ease-in-out alternate;
}
@keyframes float-path-3 {
  0% { transform: translate(0px, 0px) rotate(-5deg) scale(1); }
  25% { transform: translate(22px, 16px) rotate(18deg) scale(1.05); }
  50% { transform: translate(-18px, -24px) rotate(-25deg) scale(0.94); }
  75% { transform: translate(14px, -10px) rotate(10deg) scale(1.03); }
  100% { transform: translate(0px, 0px) rotate(-5deg) scale(1); }
}

/* Pattern 4: Horizontal Wave & Pulse */
.float-pattern-4 {
  animation: float-path-4 5.5s infinite ease-in-out alternate;
}
@keyframes float-path-4 {
  0% { transform: translate(0px, 0px) rotate(12deg) scale(1); }
  50% { transform: translate(-30px, 12px) rotate(-10deg) scale(1.07); }
  100% { transform: translate(0px, 0px) rotate(12deg) scale(1); }
}

/* Pattern 5: S-Curve Diagonal Wave */
.float-pattern-5 {
  animation: float-path-5 6.5s infinite ease-in-out alternate;
}
@keyframes float-path-5 {
  0% { transform: translate(0px, 0px) rotate(-15deg) scale(1); }
  30% { transform: translate(26px, -18px) rotate(0deg) scale(1.05); }
  70% { transform: translate(-18px, 24px) rotate(-26deg) scale(0.95); }
  100% { transform: translate(0px, 0px) rotate(-15deg) scale(1); }
}

/* Pattern 6: Infinity Loop Drift */
.float-pattern-6 {
  animation: float-path-6 7.5s infinite ease-in-out alternate;
}
@keyframes float-path-6 {
  0% { transform: translate(0px, 0px) rotate(4deg) scale(1); }
  25% { transform: translate(-20px, 18px) rotate(-14deg) scale(1.05); }
  50% { transform: translate(18px, -20px) rotate(18deg) scale(0.94); }
  75% { transform: translate(22px, 14px) rotate(-8deg) scale(1.03); }
  100% { transform: translate(0px, 0px) rotate(4deg) scale(1); }
}

/* Kele design special sticker style */
.mini-logo-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.bold-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.8px;
}

.mini-half-moon {
  width: 14px;
  height: 28px;
  background: var(--color-accent);
  border-radius: 0 14px 14px 0;
  margin-left: 2px;
}

@media (max-width: 768px) {
  .sticker {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
  .mini-half-moon {
    width: 10px;
    height: 20px;
    border-radius: 0 10px 10px 0;
  }
  .bold-text {
    font-size: 0.95rem;
  }
  /* Stickers float over the hero text and swallow taps on small screens —
     hide the playground entirely instead of blocking the headline. */
  .stickers-area {
    display: none;
  }
}
</style>
