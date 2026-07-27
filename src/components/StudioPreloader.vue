<template>
  <Transition name="fade">
    <div v-if="visible" class="studio-preloader" aria-hidden="true">
      <div class="preloader-content">
        <svg class="spinner-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="5" stroke-dasharray="200" stroke-dashoffset="60" class="spinner-ring" />
          <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-weight="900" font-size="28" fill="currentColor">K</text>
        </svg>
        <div class="preloader-text-group">
          <span class="preloader-brand">KELE STUDIO</span>
          <span class="preloader-sub">VISUAL IDENTITY</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)

onMounted(() => {
  const hide = () => {
    setTimeout(() => {
      visible.value = false
    }, 600)
  }

  if (document.readyState === 'complete') {
    hide()
  } else {
    window.addEventListener('load', hide, { once: true })
    setTimeout(hide, 2000)
  }
})
</script>

<style scoped>
.studio-preloader {
  position: fixed;
  inset: 0;
  background-color: var(--bg-primary);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: background-color 0.4s ease;
}

.preloader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.spinner-logo {
  width: 72px;
  height: 72px;
  animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.spinner-ring {
  opacity: 0.85;
}

.preloader-text-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.preloader-brand {
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--text-primary);
}

.preloader-sub {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--text-muted);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-leave-to {
  opacity: 0;
}
</style>
