<template>
  <section class="portfolio-section section-padding" id="works">
    <div class="container">
      <div class="section-header">
        <span class="category-pill">Visual Suites & Full Identity</span>
        <h2 class="section-title text-gradient">Koleksi Desain & Brand Systems</h2>
        <p class="section-subtitle">
          Dari logo, identitas merek, merchandise, antarmuka website, hingga materi promosi usaha lokal.
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
            
            <!-- Special Project Badge Tag -->
            <div v-if="project.badge" class="special-badge-pill">
              {{ project.badge }}
            </div>

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

      <!-- Case Study Modal with Multi-Slide Viewer -->
      <Transition name="modal">
        <div v-if="selectedProject" class="modal-overlay" @click.self="closeProject">
          <div class="modal-content glass-panel">
            <button class="modal-close-btn interactive" @click="closeProject">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            
            <div class="modal-body">
              <!-- Multi-Slide Image Container -->
              <div class="modal-image-container">
                <img :src="currentSlideImage" :alt="selectedProject.title" class="modal-image" />
                
                <!-- Slide Navigation Controls if project has multiple slides -->
                <div v-if="selectedProject.slides && selectedProject.slides.length > 1" class="slide-nav-controls">
                  <button @click="prevSlide" class="slide-btn interactive" title="Slide Sebelumnya">‹</button>
                  <span class="slide-indicator">{{ activeSlideIndex + 1 }} / {{ selectedProject.slides.length }}</span>
                  <button @click="nextSlide" class="slide-btn interactive" title="Slide Selanjutnya">›</button>
                </div>
              </div>

              <!-- Modal Text Content -->
              <div class="modal-text-content">
                <div class="modal-header-info">
                  <div class="modal-badge-row">
                    <span v-if="selectedProject.badge" class="special-badge-pill modal-special-badge">{{ selectedProject.badge }}</span>
                    <span class="modal-category">{{ selectedProject.category }}</span>
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
                  <h4 class="modal-section-title">Solusi Layout & Branding</h4>
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
  badge?: string
  mediaFormats: string
  shortDesc: string
  image: string
  slides?: string[]
  client: string
  year: string
  role: string
  challenge: string
  solution: string
}

const activeCategory = ref('All')
const selectedProject = ref<Project | null>(null)
const activeSlideIndex = ref(0)

const categories = ['All', 'Full Brand Systems', 'F&B & Retail', 'Web & Digital', 'Fashion & Corporate']

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Kele Artisan Coffee & Bakery Identity',
    category: 'Full Brand Systems',
    badge: '⭐ Full Identity',
    mediaFormats: 'Logo System • Guidelines • Merchandise • Packaging',
    shortDesc: 'Sistem identitas merek komplit dari konstruksi logo, panduan warna, hingga kaos merchandise dan stiker kemasan.',
    image: '/assets/branding_mockup.png',
    slides: [
      '/assets/branding_mockup.png',
      '/assets/illustration_mockup.png',
      '/assets/typography_mockup.png'
    ],
    client: 'Kele Coffee Co. (UMKM Partner)',
    year: '2024',
    role: 'Lead Brand System Designer',
    challenge: 'Usaha lokal kedai kopi & bakery membutuhkan identitas visual utuh dari logo hingga merch agar mampu bersaing dengan waralaba kopi besar.',
    solution: 'Mendesain logogram geometris bermotif setengah lingkaran yang fleksibel diaplikasikan pada mug, kaos tim, kantong kemasan, serta stiker promo.'
  },
  {
    id: 2,
    title: 'Space Explorer SaaS Web App',
    category: 'Web & Digital',
    badge: '🌐 Web Design',
    mediaFormats: 'Website Design • UI/UX • Interactive Landing Page',
    shortDesc: 'Desain website antarmuka interaktif dan landing page promosi aplikasi dengan visualisasi data gelap imersif.',
    image: '/assets/ui_ux_mockup.png',
    slides: [
      '/assets/ui_ux_mockup.png',
      '/assets/typography_mockup.png'
    ],
    client: 'Galaxy Works Studio',
    year: '2025',
    role: 'Web UI/UX Designer',
    challenge: 'Merancang tata letak website yang responsif dan menyajikan fitur aplikasi digital secara visual tanpa membingungkan calon pembeli.',
    solution: 'Membangun antarmuka bertema gelap pekat dengan efek glow-orb pada navigasi dan kartu glassmorphism yang responsif di seluruh layar.'
  },
  {
    id: 3,
    title: 'Artisan Culinary & Menu Suite',
    category: 'F&B & Retail',
    badge: '🌱 UMKM Partner',
    mediaFormats: 'Social Media Feed • Menu Poster • POS Display',
    shortDesc: 'Koleksi materi promosi cetak & digital tempat makan lokal meliputi menu fisik, feed Instagram, dan banner toko.',
    image: '/assets/illustration_mockup.png',
    slides: [
      '/assets/illustration_mockup.png',
      '/assets/branding_mockup.png'
    ],
    client: 'Warung Kuliner Nusantara (UMKM)',
    year: '2024',
    role: 'F&B Visual Designer',
    challenge: 'Meningkatkan penjualan tempat makan lokal dengan memperbaiki hirarki baca poster menu dan visual feed promo sosial media.',
    solution: 'Menerapkan tipografi menu legibel, penataan foto hidangan unggulan yang memikat selera makan, dan layout poster promo cetak yang tajam.'
  },
  {
    id: 4,
    title: 'Urban Apparel & Streetwear Suite',
    category: 'Fashion & Corporate',
    badge: '⭐ Full Identity',
    mediaFormats: 'Lookbook Feed • Merchandise • Launch Poster',
    shortDesc: 'Desain kampanye brand pakaian street-style meliputi seri poster acara, merchandise kaos, dan lookbook sosial media.',
    image: '/assets/typography_mockup.png',
    slides: [
      '/assets/typography_mockup.png',
      '/assets/branding_mockup.png'
    ],
    client: 'Synergy Urban Apparel',
    year: '2024',
    role: 'Fashion Campaign & Merch Designer',
    challenge: 'Membuat visual rilis produk pakaian street-style yang berani, artistik, dan mencolok di keramaian feed sosial media.',
    solution: 'Menggabungkan tipografi distorsi geometris Plus Jakarta Sans dengan kontras warna pop-art yang tegas untuk memperkuat impresi visual.'
  }
])

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects.value
  return projects.value.filter(p => p.category === activeCategory.value)
})

const currentSlideImage = computed(() => {
  if (!selectedProject.value) return ''
  if (selectedProject.value.slides && selectedProject.value.slides.length > 0) {
    return selectedProject.value.slides[activeSlideIndex.value] || selectedProject.value.image
  }
  return selectedProject.value.image
})

const openProject = (project: Project) => {
  selectedProject.value = project
  activeSlideIndex.value = 0
  document.body.style.overflow = 'hidden' // prevent body scrolling
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto' // restore body scrolling
}

const nextSlide = () => {
  if (selectedProject.value?.slides) {
    activeSlideIndex.value = (activeSlideIndex.value + 1) % selectedProject.value.slides.length
  }
}

const prevSlide = () => {
  if (selectedProject.value?.slides) {
    activeSlideIndex.value = (activeSlideIndex.value - 1 + selectedProject.value.slides.length) % selectedProject.value.slides.length
  }
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

.special-badge-pill {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(8, 13, 26, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
  z-index: 20;
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
  position: relative;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Slide controls */
.slide-nav-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(8, 13, 26, 0.85);
  backdrop-filter: blur(8px);
  padding: 6px 16px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.slide-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  padding: 0 4px;
  transition: var(--transition-bounce);
}

.slide-btn:hover {
  color: var(--color-accent);
  transform: scale(1.3);
}

.slide-indicator {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-muted);
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

.modal-special-badge {
  position: relative;
  top: 0;
  left: 0;
}

.modal-category {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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
