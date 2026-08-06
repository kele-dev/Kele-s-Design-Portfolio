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
          :style="{ '--brand-color': logo.color }"
        >
          <div class="logo-icon-wrapper">
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
import { logos } from '../content'
</script>

<style scoped>
.marquee-section {
  width: 100%;
  padding: 36px 0;
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
  animation: marquee-scroll 25s linear infinite;
  width: max-content;
}

.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

.logo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  /* margin (not track gap) keeps the spacing inside each item's period, so
     the -50% loop lands exactly on the duplicate — no 1-gap seam jump. */
  margin-right: 20px;
  padding: 12px 24px;
  border-radius: 50px;
  white-space: nowrap;
  background: rgba(13, 22, 46, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s, background 0.3s;
  color: rgba(255, 255, 255, 0.5); /* Default Monochrome Translucent */
}

.logo-item:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: var(--brand-color);
  background: rgba(20, 32, 64, 0.85);
  color: var(--brand-color); /* Original Brand Color on Hover */
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
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s;
}

.logo-item:hover .logo-name {
  color: #ffffff;
}

.mini-badge {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.1);
  border: 1px solid rgba(var(--color-accent-rgb), 0.2);
  padding: 2px 8px;
  border-radius: 50px;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
