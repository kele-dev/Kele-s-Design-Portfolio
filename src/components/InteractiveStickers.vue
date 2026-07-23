<template>
  <div class="stickers-area" ref="areaRef">
    <div class="playground-overlay">
      <span class="hint-pill">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spark-icon"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
        Playground: Stiker melayang & bisa diseret!
      </span>
    </div>
    
    <div 
      v-for="sticker in stickers" 
      :key="sticker.id"
      class="sticker interactive"
      :class="{ 'dragging': sticker.isDragging }"
      :style="{ 
        transform: `translate(${sticker.x}px, ${sticker.y}px) rotate(${sticker.rotation}deg) scale(${sticker.isDragging ? 1.08 : 1})`,
        zIndex: sticker.zIndex,
        background: sticker.bg,
        color: sticker.color,
        border: sticker.border,
        boxShadow: sticker.isDragging ? '0 15px 30px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.2)'
      }"
      @pointerdown="startDrag($event, sticker)"
    >
      <div class="sticker-inner">
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
import { ref, onMounted } from 'vue'

interface Sticker {
  id: number
  text: string
  x: number
  y: number
  rotation: number
  zIndex: number
  bg: string
  color: string
  border?: string
  hasHalfMoon?: boolean
  isDragging?: boolean
}

const areaRef = ref<HTMLElement | null>(null)
let topZ = 10

const stickers = ref<Sticker[]>([
  { id: 1, text: 'kele design', x: 0, y: 0, rotation: -10, zIndex: 1, bg: '#0066e2', color: '#ffffff', hasHalfMoon: true, border: '3px solid #ffffff' },
  { id: 2, text: '💡 Ideas & Impact', x: 0, y: 0, rotation: 8, zIndex: 2, bg: '#ffd200', color: '#080d1a', border: '3px solid #ffffff' },
  { id: 3, text: '🎨 UI/UX', x: 0, y: 0, rotation: -5, zIndex: 3, bg: '#ff3366', color: '#ffffff', border: '3px solid #ffffff' },
  { id: 4, text: 'CMYK', x: 0, y: 0, rotation: 12, zIndex: 4, bg: '#ffffff', color: '#080d1a', border: '3px solid #0066e2' },
  { id: 5, text: '👋 Halo, Saya Bagus', x: 0, y: 0, rotation: -15, zIndex: 5, bg: '#00cc99', color: '#ffffff', border: '3px solid #ffffff' },
  { id: 6, text: 'Plus Jakarta Sans', x: 0, y: 0, rotation: 4, zIndex: 6, bg: 'rgba(8, 13, 26, 0.95)', color: '#ffd200', border: '1px solid rgba(255, 255, 255, 0.2)' }
])

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

const startDrag = (event: PointerEvent, sticker: Sticker) => {
  event.preventDefault()
  
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
  
  const handlePointerUp = () => {
    sticker.isDragging = false
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }
  
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
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

.playground-overlay {
  position: absolute;
  top: 24px;
  right: 24px;
  pointer-events: auto;
}

.hint-pill {
  background: rgba(13, 22, 46, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  user-select: none;
}

.spark-icon {
  color: var(--color-accent);
  animation: pulse 2s infinite ease-in-out;
}

.sticker {
  position: absolute;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.5px;
  pointer-events: auto;
  user-select: none;
  cursor: grab;
  transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  white-space: nowrap;
}

.sticker.dragging {
  cursor: grabbing;
  transition: transform 0.05s ease-out;
}

/* Floating Bobbing Animation for Inner Sticker Content */
.sticker-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float-bobbing 4s infinite ease-in-out alternate;
}

/* Varied Floating Speeds & Delays for Organic Unsynchronized Movement */
.sticker:nth-child(1) .sticker-inner { animation-duration: 4.2s; animation-delay: 0s; }
.sticker:nth-child(2) .sticker-inner { animation-duration: 3.8s; animation-delay: -1.2s; }
.sticker:nth-child(3) .sticker-inner { animation-duration: 4.6s; animation-delay: -2.4s; }
.sticker:nth-child(4) .sticker-inner { animation-duration: 3.5s; animation-delay: -0.8s; }
.sticker:nth-child(5) .sticker-inner { animation-duration: 4.0s; animation-delay: -1.8s; }
.sticker:nth-child(6) .sticker-inner { animation-duration: 4.8s; animation-delay: -3.1s; }

/* Pause floating animation smoothly while user drags sticker */
.sticker.dragging .sticker-inner {
  animation-play-state: paused !important;
}

@keyframes float-bobbing {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-14px) rotate(2.5deg);
  }
  100% {
    transform: translateY(8px) rotate(-2deg);
  }
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

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
}

@media (max-width: 768px) {
  .hint-pill {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
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
}
</style>
