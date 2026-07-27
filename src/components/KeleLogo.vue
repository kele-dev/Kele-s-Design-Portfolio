<template>
  <div class="logo-container interactive" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <a href="#hero" class="logo-link">
      <img 
        src="/assets/kele_logo_official.png" 
        alt="kele design" 
        class="official-logo-img" 
        :class="{ 'logo-hovered': isHovered }" 
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<style scoped>
.logo-container {
  display: inline-flex;
  align-items: center;
  height: 42px;
  user-select: none;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.official-logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.4));
}

.logo-hovered {
  transform: scale(1.08) translateY(-2px);
  filter: drop-shadow(0 4px 20px rgba(255, 210, 0, 0.5));
}
</style>
