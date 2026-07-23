<template>
  <div class="logo-container interactive" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <svg viewBox="0 0 220 80" class="logo-svg">
      <!-- kele text -->
      <text x="10" y="52" class="logo-text-kele">kele</text>
      <!-- design text -->
      <text x="105" y="70" class="logo-text-design">design</text>
      <!-- Semicircle/D icon -->
      <path 
        d="M 165 17 A 26 26 0 0 1 165 69 Z" 
        class="logo-semicircle"
        :class="{ 'logo-semicircle-hover': isHovered }"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<style scoped>
.logo-container {
  display: inline-block;
  width: 170px;
  height: 60px;
  user-select: none;
}

.logo-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.logo-text-kele {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 46px;
  fill: #ffffff;
  letter-spacing: -2px;
}

.logo-text-design {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  fill: #ffffff;
  letter-spacing: 0.5px;
  opacity: 0.95;
}

.logo-semicircle {
  fill: var(--color-accent);
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), fill 0.3s;
  transform-origin: 165px 43px;
}

.logo-semicircle-hover {
  transform: scale(1.2) rotate(180deg);
  fill: #ffea00;
}
</style>
