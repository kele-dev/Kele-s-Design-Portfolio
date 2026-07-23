<template>
  <section class="umkm-section section-padding" id="umkm-impact">
    <div class="container">
      <div class="umkm-card glass-panel" v-motion-slide-visible-once-bottom>
        <div class="umkm-header">
          <span class="category-pill gold-pill">🌱 Empowering Local Business</span>
          <h2 class="umkm-title text-gradient">Mendorong Pertumbuhan UMKM Melalui Desain Berdampak</h2>
          <p class="umkm-desc">
            Saya percaya bahwa usaha lokal dan UMKM berhak memiliki identitas visual sekelas brand nasional/global. Kele Design siap mendampingi perjalanan usaha Anda dari nol hingga menjadi brand yang berdaya saing tinggi.
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
          <div class="cta-badge">
            <span class="pulse-dot"></span>
            <span>Program Pendampingan Visual UMKM Aktif</span>
          </div>
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
import { ref } from 'vue'

const pillars = ref([
  {
    id: 1,
    icon: '🎯',
    title: 'Visual Identity Upgrade',
    desc: 'Mentransformasi logo dan tampilan visual usaha lokal yang sederhana menjadi identitas brand yang profesional, konsisten, dan mudah diingat konsumen.',
    tag: 'Logo & Brand System',
    bg: 'rgba(0, 102, 226, 0.15)',
    color: '#0066e2'
  },
  {
    id: 2,
    icon: '📦',
    title: 'Packaging & Merchandise',
    desc: 'Mendesain kemasan produk retail, stiker kemasan, poster menu, dan merchandise cetak (kaos, mug) yang meningkatkan daya saing di pasaran.',
    tag: 'Print & Product Collateral',
    bg: 'rgba(255, 210, 0, 0.15)',
    color: '#ffd200'
  },
  {
    id: 3,
    icon: '🌐',
    title: 'Digital & Web Presence',
    desc: 'Menyusun materi feed sosial media promo dan antarmuka website sederhana yang menarik calon pembeli dan meningkatkan kepercayaan.',
    tag: 'Social Feed & Landing Page',
    bg: 'rgba(0, 204, 153, 0.15)',
    color: '#00cc99'
  }
])
</script>

<style scoped>
.umkm-card {
  padding: 64px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
}

.umkm-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 56px;
}

.gold-pill {
  background: rgba(255, 210, 0, 0.1);
  color: var(--color-accent);
  border-color: rgba(255, 210, 0, 0.25);
}

.umkm-title {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.2;
  margin-top: 16px;
  margin-bottom: 16px;
}

.umkm-desc {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 48px;
}

.pillar-card {
  padding: 32px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #ffffff;
}

.pillar-desc {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 20px;
}

.pillar-tag {
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.umkm-cta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 20px;
}

.cta-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: var(--color-accent);
  border-radius: 50%;
  animation: pulse-ring 2s infinite ease-in-out;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.6; }
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
