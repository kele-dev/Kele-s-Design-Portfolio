<template>
  <section class="portfolio-section section-padding" id="works">
    <div class="container">
      <div class="section-header">
        <span class="category-pill">Visual Suites & Portfolio</span>
        <h2 class="section-title text-gradient">Koleksi Desain Industri</h2>
        <p class="section-subtitle">
          Kumpulan materi visual lintas industri — dari post feed, poster menu, hingga display kampanye promosi.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="filter-wrapper interactive">
        <button 
          v-for="cat in categories" 
          :key="cat"
          class="filter-btn"
          :class="{ 'active': activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
          <div v-if="activeCategory === cat" class="active-dot"></div>
        </button>
      </div>

      <!-- Portfolio Grid with TransitionGroup for layout animations -->
      <TransitionGroup name="grid" tag="div" class="portfolio-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card glass-panel interactive"
          @click="openProject(project)"
        >
          <div class="project-image-wrapper">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <div class="project-overlay">
              <div class="view-pill">
                <span>Lihat Visual Suite</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
          <div class="project-info">
            <div class="project-meta-row">
              <span class="project-category">{{ project.category }}</span>
              <span class="project-formats-tag">{{ project.mediaFormats }}</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.shortDesc }}</p>
          </div>
        </div>
      </TransitionGroup>

      <!-- Case Study Modal -->
      <Transition name="modal">
        <div v-if="selectedProject" class="modal-overlay" @click.self="closeProject">
          <div class="modal-content glass-panel">
            <button class="modal-close-btn interactive" @click="closeProject">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <div class="modal-body">
              <div class="modal-image-container">
                <img :src="selectedProject.image" :alt="selectedProject.title" class="modal-image" />
              </div>
              <div class="modal-text-content">
                <div class="modal-header-info">
                  <div class="modal-badge-row">
                    <span class="modal-category">{{ selectedProject.category }}</span>
                    <span class="modal-formats-badge">{{ selectedProject.mediaFormats }}</span>
                  </div>
                  <h2 class="modal-title">{{ selectedProject.title }}</h2>
                </div>
                
                <div class="modal-meta-grid">
                  <div class="meta-item">
                    <span class="meta-label">Klien / Sektor</span>
                    <span class="meta-val">{{ selectedProject.client }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Tahun</span>
                    <span class="meta-val">{{ selectedProject.year }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Peran Desain</span>
                    <span class="meta-val">{{ selectedProject.role }}</span>
                  </div>
                </div>
                
                <div class="modal-divider"></div>
                
                <div class="modal-desc-section">
                  <h4 class="modal-section-title">Tantangan Komunikasi Visual</h4>
                  <p class="modal-paragraph">{{ selectedProject.challenge }}</p>
                </div>
                
                <div class="modal-desc-section">
                  <h4 class="modal-section-title">Solusi Layout & Hirarki Desain</h4>
                  <p class="modal-paragraph">{{ selectedProject.solution }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  id: number
  title: string
  category: string
  mediaFormats: string
  shortDesc: string
  image: string
  client: string
  year: string
  role: string
  challenge: string
  solution: string
}

const activeCategory = ref('All')
const selectedProject = ref<Project | null>(null)

const categories = ['All', 'F&B / Culinary', 'Fashion & Lifestyle', 'Corporate & Tech', 'Retail & FMCG']

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Artisan Culinary & Menu Visual Suite',
    category: 'F&B / Culinary',
    mediaFormats: 'Social Media Feed • Menu Poster • POS Display',
    shortDesc: 'Koleksi materi visual promosi kuliner kafe/resto meliputi feed Instagram, poster menu fisik, dan banner display.',
    image: '/assets/branding_mockup.png',
    client: 'Kele Culinary Group',
    year: '2024',
    role: 'F&B Brand & Display Designer',
    challenge: 'Klien F&B membutuhkan identitas visual yang menggugah selera sekaligus mempertahankan fleksibilitas layout untuk berbagai media cetak menu dan postingan promo digital harian.',
    solution: 'Membangun sistem tata letak modular dengan hirarki harga yang tajam pada poster menu, dipadu dengan warna hangat selera makan dan aksen biru-kuning kele design yang memikat di feed sosial media.'
  },
  {
    id: 2,
    title: 'SaaS App & Digital Display Suite',
    category: 'Corporate & Tech',
    mediaFormats: 'App UI Showcase • Banner Ad • Promotional Post',
    shortDesc: 'Rangkaian materi visual untuk produk teknologi aplikasi digital dan display promosi fitur.',
    image: '/assets/ui_ux_mockup.png',
    client: 'Galaxy Tech',
    year: '2025',
    role: 'Tech Visual & UI Designer',
    challenge: 'Menyajikan fitur aplikasi SaaS yang kompleks menjadi materi visual promosi yang mudah dipahami calon pengguna dalam waktu singkat.',
    solution: 'Menggunakan tema antarmuka gelap dengan aksen glow neon cyan dan kartu glassmorphism yang meng-highlight fitur utama secara bersih.'
  },
  {
    id: 3,
    title: 'Urban Apparel & Lookbook Suite',
    category: 'Fashion & Lifestyle',
    mediaFormats: 'Lookbook Feed • Poster Event • Campaign Display',
    shortDesc: 'Koleksi visual kampanye fashion urban dengan eksplorasi tipografi eksperimental dan tata letak lookbook.',
    image: '/assets/typography_mockup.png',
    client: 'Synergy Fashion',
    year: '2024',
    role: 'Fashion Campaign Designer',
    challenge: 'Membuat visual rilis produk pakaian street-style yang berani, artistik, dan mencolok di keramaian feed sosial media.',
    solution: 'Menggabungkan tipografi distorsi geometris Plus Jakarta Sans dengan kontras warna pop-art yang tegas untuk memperkuat impresi visual.'
  },
  {
    id: 4,
    title: 'Consumer Goods & POS Display Suite',
    category: 'Retail & FMCG',
    mediaFormats: 'Packaging Graphic • Standee Banner • Feed Product Series',
    shortDesc: 'Desain visual promosi produk retail FMCG meliputi grafis kemasan dan banner display toko.',
    image: '/assets/illustration_mockup.png',
    client: 'Retro-Tech FMCG',
    year: '2024',
    role: 'Retail Graphic Illustrator',
    challenge: 'Meningkatkan daya tarik produk retail di rak fisik dan feed e-commerce dengan estetika modern nostalgia.',
    solution: 'Menerapkan ilustrasi vektor retro-futuristik bergaris bersih dan gradasi warna neon cerah yang meningkatkan eye-catching factor.'
  }
])

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects.value
  return projects.value.filter(p => p.category === activeCategory.value)
})

const openProject = (project: Project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden' // prevent body scrolling
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto' // restore body scrolling
}
</script>

<style scoped>
.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 50px;
}

.category-pill {
  background: rgba(0, 102, 226, 0.1);
  color: var(--color-primary);
  border: 1px solid rgba(0, 102, 226, 0.2);
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 16px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.section-subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Category Filters */
.filter-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.filter-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--color-text-muted);
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition-smooth);
  position: relative;
  overflow: visible;
}

.filter-btn:hover {
  color: var(--color-text-main);
  border-color: var(--border-color-hover);
  background: var(--bg-card-hover);
}

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 102, 226, 0.3);
}

.active-dot {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: var(--color-accent);
  border-radius: 50%;
}

/* Portfolio Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.project-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #0d162e;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(8, 13, 26, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-pill {
  background: #ffffff;
  color: var(--color-text-dark);
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  transform: translateY(15px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card:hover .view-pill {
  transform: translateY(0);
}

.project-info {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.project-category {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-formats-tag {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  padding: 3px 10px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  transition: var(--transition-smooth);
}

.project-card:hover .project-title {
  color: var(--color-accent);
}

.project-desc {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* TransitionGroup Animations for Grid Items */
.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.grid-leave-active {
  position: absolute;
  width: calc(50% - 16px);
}

.grid-move {
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Case Study Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 7, 15, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.modal-content {
  width: 100%;
  max-width: 1000px;
  max-height: 85vh;
  border-radius: 24px;
  overflow-y: auto;
  position: relative;
  background: rgba(13, 22, 46, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.modal-close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-bounce);
  z-index: 10;
}

.modal-close-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: scale(1.1) rotate(90deg);
}

.modal-body {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  min-height: 500px;
}

.modal-image-container {
  background: #0d162e;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--border-color);
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-text-content {
  padding: 48px;
  overflow-y: auto;
  max-height: 85vh;
}

.modal-header-info {
  margin-bottom: 24px;
}

.modal-badge-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.modal-category {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-formats-badge {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.06);
  padding: 4px 12px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.2;
}

.modal-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-val {
  font-weight: 600;
  font-size: 0.95rem;
}

.modal-divider {
  height: 1px;
  background: var(--border-color);
  margin-bottom: 32px;
}

.modal-desc-section {
  margin-bottom: 32px;
}

.modal-section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
}

.modal-paragraph {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-active .modal-content {
  animation: modal-zoom-in 0.4s cubic-bezier(0.25, 0.8, 0.25, 1.1) forwards;
}

.modal-leave-active .modal-content {
  animation: modal-zoom-out 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes modal-zoom-in {
  from { transform: scale(0.92) translateY(15px); }
  to { transform: scale(1) translateY(0); }
}

@keyframes modal-zoom-out {
  from { transform: scale(1) translateY(0); }
  to { transform: scale(0.95) translateY(15px); }
}

/* Responsive Styles */
@media (max-width: 900px) {
  .modal-body {
    grid-template-columns: 1fr;
  }
  .modal-image-container {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    aspect-ratio: 16 / 10;
  }
  .modal-text-content {
    padding: 32px;
    max-height: none;
  }
  .modal-content {
    max-height: 90vh;
  }
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  .grid-leave-active {
    position: relative;
    width: 100%;
  }
  .section-title {
    font-size: 2rem;
  }
}
</style>
