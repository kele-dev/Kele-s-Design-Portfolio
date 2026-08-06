<template>
  <!-- Decorative, but it wraps a real link: aria-hidden here would hide it from
       screen readers while Tab still focused it. Kept exposed instead. -->
  <div class="side-badge-fixed">
    <a href="#works" class="badge-link interactive">
      <span class="badge-accent" aria-hidden="true"></span>
      <span class="badge-text">KELE DESIGN STUDIO • VISUAL IDENTITY 2026</span>
    </a>
  </div>
</template>

<style scoped>
.side-badge-fixed {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: none;
}

@media (min-width: 1024px) {
  .side-badge-fixed {
    display: block;
  }
}

.badge-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  padding: 0.85rem 1.35rem;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-decoration: none;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, color 0.4s ease;
}

.badge-link:hover {
  transform: rotate(180deg) translateX(-6px);
}

.badge-accent {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
}
</style>
