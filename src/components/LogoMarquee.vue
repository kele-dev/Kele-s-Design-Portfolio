<template>
  <div class="marquee-section">
    <div class="marquee-header">
      <span class="marquee-tag">Brands & Logos Built by Kele</span>
    </div>
    
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- Duplicate items for seamless infinite scrolling loop -->
        <div 
          v-for="(logo, index) in [...logos, ...logos]" 
          :key="index"
          class="logo-item glass-panel interactive"
        >
          <div class="logo-icon-wrapper" :style="{ color: logo.color }">
            <svg viewBox="0 0 40 40" class="mini-logo-svg">
              <circle cx="20" cy="20" r="16" fill="currentColor" opacity="0.15" />
              <path :d="logo.path" fill="currentColor" class="animated-path" />
            </svg>
          </div>
          <span class="logo-name">{{ logo.name }}</span>
          <span v-if="logo.badge" class="mini-badge">{{ logo.badge }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface LogoMark {
  name: string
  color: string
  path: string
  badge?: string
}

const logos = ref<LogoMark[]>([
  { name: 'Kele Culinary', color: '#ffd200', path: 'M 14 10 A 10 10 0 0 1 14 30 Z', badge: 'F&B' },
  { name: 'Synergy Apparel', color: '#ff3366', path: 'M 10 10 L 30 10 L 20 30 Z', badge: 'Fashion' },
  { name: 'Galaxy Tech', color: '#00d2ff', path: 'M 20 10 L 30 20 L 20 30 L 10 20 Z', badge: 'SaaS' },
  { name: 'Retro FMCG', color: '#00cc99', path: 'M 10 15 H 30 V 25 H 10 Z', badge: 'Retail' },
  { name: 'Local Coffee Co', color: '#ff9900', path: 'M 15 10 A 8 8 0 0 1 25 10 L 25 25 H 15 Z', badge: 'UMKM' },
  { name: 'Urban Studio', color: '#9933ff', path: 'M 12 12 L 28 12 L 28 28 L 12 28 Z', badge: 'Brand' }
])
</script>

<style scoped>
.marquee-section {
  width: 100%;
  padding: 40px 0;
  overflow: hidden;
  position: relative;
  background: rgba(4, 7, 15, 0.4);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.marquee-header {
  text-align: center;
  margin-bottom: 20px;
}

.marquee-tag {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.marquee-container {
  display: flex;
  overflow: hidden;
  user-select: none;
  width: 100%;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee-track {
  display: flex;
  gap: 20px;
  animation: marquee-scroll 25s linear infinite;
  width: max-content;
}

.marquee-container:hover .marquee-track {
  animation-play-state: paused; /* Pause scrolling on mouse hover for interactive exploration */
}

.logo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-radius: 50px;
  white-space: nowrap;
  background: rgba(13, 22, 46, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s, background 0.3s;
}

.logo-item:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: var(--color-accent);
  background: rgba(20, 32, 64, 0.8);
}

.logo-icon-wrapper {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-logo-svg {
  width: 100%;
  height: 100%;
}

.animated-path {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo-item:hover .animated-path {
  transform: scale(1.15) rotate(180deg);
  transform-origin: center;
}

.logo-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #ffffff;
}

.mini-badge {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(255, 210, 0, 0.1);
  border: 1px solid rgba(255, 210, 0, 0.2);
  padding: 2px 8px;
  border-radius: 50px;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
