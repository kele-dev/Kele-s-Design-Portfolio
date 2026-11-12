<template>
  <section class="umkm-section section-padding" id="umkm-impact">
    <div class="container">
      <div class="umkm-card glass-panel" v-motion-slide-visible-once-bottom>
        <div class="umkm-header">
          <span class="category-pill">🌱 Empowering Local Business</span>
          <h2 class="umkm-title text-gradient">Mendorong Pertumbuhan UMKM Melalui Desain Berdampak</h2>
          <p class="umkm-desc">
            Saya percaya bahwa usaha lokal dan UMKM berhak memiliki identitas visual sekelas brand nasional/global. Kele Design Studio siap mendampingi perjalanan usaha Anda dari nol hingga menjadi brand yang berdaya saing tinggi.
          </p>
        </div>

        <div class="pillars-grid">
          <div 
            v-for="pillar in pillars" 
            :key="pillar.id"
            class="pillar-card glass-panel interactive"
          >
            <div class="pillar-icon" :style="{ background: pillar.bg, color: pillar.color }">
              <span>{{ pillar.icon }}</span>
            </div>
            <h3 class="pillar-title">{{ pillar.title }}</h3>
            <p class="pillar-desc">{{ pillar.desc }}</p>
            <div class="pillar-tag">{{ pillar.tag }}</div>
          </div>
        </div>

        <div class="umkm-cta-row">
          <a href="#contact" class="btn-primary interactive">
            Konsultasi Brand UMKM
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pillars } from '../content'
</script>

<style scoped>
.umkm-card {
  padding: 64px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
}

.umkm-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 48px;
}

.umkm-title {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.2;
  margin-top: 16px;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.umkm-desc {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.pillar-card {
  padding: 32px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
}

.pillar-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.pillar-title {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.pillar-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 20px;
}

.pillar-tag {
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.umkm-cta-row {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;
  gap: 20px;
}

@media (max-width: 900px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
  .umkm-card {
    padding: 36px;
  }
  .umkm-title {
    font-size: 2.1rem;
  }
}
</style>
