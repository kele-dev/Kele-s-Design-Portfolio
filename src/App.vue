<template>
  <div :style="themeStyles">
    <!-- Creative Animated Background Layer -->
    <CreativeBackground />

    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Navigation Header -->
    <header class="header-nav" :class="{ 'scrolled': isScrolled }">
      <div class="container nav-container">
        <KeleLogo />
        
        <nav class="nav-links-wrapper">
          <ul class="nav-links">
            <li><a href="#hero" class="nav-link interactive" :class="{ 'active': activeSection === 'hero' }">Home</a></li>
            <li><a href="#works" class="nav-link interactive" :class="{ 'active': activeSection === 'works' }">Works</a></li>
            <li><a href="#about" class="nav-link interactive" :class="{ 'active': activeSection === 'about' }">About</a></li>
            <li><a href="#umkm-impact" class="nav-link interactive" :class="{ 'active': activeSection === 'umkm-impact' }">UMKM</a></li>
            <li><a href="#contact" class="nav-link interactive" :class="{ 'active': activeSection === 'contact' }">Contact</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <!-- Theme Picker Button -->
          <button 
            @click="cycleTheme" 
            class="theme-toggle-btn interactive" 
            title="Ubah Warna Tema"
          >
            <div class="theme-icon-semicircle" :style="{ transform: `rotate(${themeAngle}deg)` }"></div>
          </button>
          
          <a href="mailto:kele.designid@gmail.com" class="btn-email interactive">
            kele.designid@gmail.com
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-section" id="hero">
      <div class="container hero-container">
        <div class="hero-content" v-motion-fade>
          <div class="hero-badge-wrapper">
            <div class="hero-badge">
              <span>design</span>
              <div class="badge-semicircle"></div>
              <span>branding</span>
              <div class="badge-semicircle"></div>
              <span>ui/ux</span>
            </div>
          </div>
          
          <h1 class="hero-title">
            <span class="headline-container">
              <Transition name="headline-slide" mode="out-in">
                <span :key="activeHeadlineIndex" class="light-title headline-text">
                  {{ headlines[activeHeadlineIndex] }}
                </span>
              </Transition>
            </span>
            <span class="text-accent-gradient bold-title">Through Design.</span>
          </h1>
          
          <p class="hero-desc">
            Halo! Saya <span class="highlight-name interactive">Bagus Hari Wijaya</span>, kreator di balik <strong>kele design</strong>. Menghasilkan sistem identitas merek, desain website, dan materi visual promosi yang fungsional secara profesional namun tetap berjiwa playful.
          </p>
          
          <div class="hero-buttons">
            <a href="#works" class="btn-primary interactive">
              Lihat Karya
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m19 9-7 7-7-7"/></svg>
            </a>
            <a href="#about" class="btn-outline interactive">Tentang Saya</a>
          </div>
        </div>
      </div>
      
      <!-- Draggable Stickers Playground Overlay -->
      <InteractiveStickers />
    </section>

    <!-- Animated Endless Logo Marquee Ticker -->
    <LogoMarquee />

    <!-- Works / Portfolio Section -->
    <PortfolioGrid />

    <!-- About Section -->
    <section class="about-section section-padding" id="about">
      <div class="container">
        <div class="about-grid">
          <!-- Left Visual Element -->
          <div class="about-visual-col" v-motion-slide-visible-once-left>
            <div class="avatar-card glass-panel interactive">
              <div class="avatar-photo-wrapper">
                <div class="photo-backdrop-circle"></div>
                <div class="photo-backdrop-semicircle"></div>
                <img src="/assets/bagus_photo.png" alt="Bagus Hari Wijaya — kele design" class="user-photo" />
              </div>
              <div class="avatar-card-info">
                <h3>Bagus Hari Wijaya</h3>
                <p>Graphic & Brand Designer — kele design</p>
              </div>
            </div>
          </div>
          
          <!-- Right Content Element -->
          <div class="about-content-col" v-motion-slide-visible-once-right>
            <span class="category-pill">About Me</span>
            <h2 class="about-title text-gradient">Siapa di Balik Kele Design?</h2>
            
            <p class="about-p">
              Saya adalah seorang desainer grafis & merek independen yang berbasis di Jakarta. Berfokus pada pengembangan sistem identitas brand (logo hingga merchandise), desain website digital (UI/UX), dan pendampingan visual usaha lokal (UMKM).
            </p>
            <p class="about-p">
              Bagi saya, desain bukan hanya tentang menyusun tata letak yang rapi, melainkan juga tentang menceritakan sebuah kisah dengan cara yang menyenangkan. Saya selalu menyisipkan sentuhan playful yang tak terduga ke dalam karya-karya profesional saya agar menghasilkan karya yang unik dan memorable.
            </p>
            
            <div class="skills-wrapper">
              <h4 class="skills-title">Keahlian & Bidang Fokus:</h4>
              <div class="skills-tags">
                <span class="skill-tag glass-panel interactive" v-for="skill in skills" :key="skill">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- UMKM Impact Showcase Section -->
    <UmkmImpact />

    <!-- Contact Section -->
    <section class="contact-section section-padding" id="contact">
      <div class="container">
        <div class="contact-card glass-panel" v-motion-slide-visible-once-bottom>
          <div class="contact-header">
            <span class="category-pill">Contact</span>
            <h2 class="contact-title text-gradient">Mulai Proyek Bersama!</h2>
            <p class="contact-desc">
              Punya ide menarik yang ingin diwujudkan? Silakan kirim pesan atau hubungi saya langsung di email!
            </p>
          </div>
          
          <div class="contact-content-grid">
            <div class="contact-info-col">
              <div class="contact-item">
                <span class="item-label">Email Resmi</span>
                <a href="mailto:kele.designid@gmail.com" class="item-val link-hover interactive">kele.designid@gmail.com</a>
              </div>
              <div class="contact-item">
                <span class="item-label">Lokasi</span>
                <span class="item-val">Jakarta, Indonesia</span>
              </div>
              <div class="contact-item">
                <span class="item-label">Media Sosial</span>
                <div class="social-links">
                  <a href="#" class="social-link interactive">Instagram</a>
                  <a href="#" class="social-link interactive">Dribbble</a>
                  <a href="#" class="social-link interactive">Behance</a>
                  <a href="#" class="social-link interactive">LinkedIn</a>
                </div>
              </div>
            </div>
            
            <form class="contact-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Nama Anda</label>
                <input type="text" id="name" v-model="form.name" required class="form-input interactive" placeholder="Bagus Wijaya" />
              </div>
              <div class="form-group">
                <label for="email">Alamat Email</label>
                <input type="email" id="email" v-model="form.email" required class="form-input interactive" placeholder="nama@email.com" />
              </div>
              <div class="form-group">
                <label for="message">Pesan Anda</label>
                <textarea id="message" v-model="form.message" required class="form-input interactive" rows="4" placeholder="Halo Bagus, mari buat proyek..." ></textarea>
              </div>
              
              <button type="submit" class="btn-primary interactive btn-submit" :disabled="formSubmitting">
                <span>{{ formSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="send-icon"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-container">
        <div class="footer-left">
          <span class="footer-logo">kele.</span>
          <p>© 2026 kele design. Dibuat dengan Vue 3 & Motion.</p>
        </div>
        <div class="footer-right">
          <p>Tahun Berdiri: <strong>2023</strong></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import CreativeBackground from './components/CreativeBackground.vue'
import KeleLogo from './components/KeleLogo.vue'
import CustomCursor from './components/CustomCursor.vue'
import InteractiveStickers from './components/InteractiveStickers.vue'
import LogoMarquee from './components/LogoMarquee.vue'
import PortfolioGrid from './components/PortfolioGrid.vue'
import UmkmImpact from './components/UmkmImpact.vue'

// High-Value Rotating Headline Text Phrases
const headlines = [
  'Bringing Ideas & Impact',
  'Solving Complex Problems',
  'Elevating Local Brands',
  'Driving Business Growth',
  'Creating Visual Value'
]

const activeHeadlineIndex = ref(0)
let headlineTimer: number | undefined

// Skills Data
const skills = ['Full Brand Identity', 'Logo Motion Design', 'Website Design & UI/UX', 'UMKM Branding Upgrade', 'Experimental Typography', 'Packaging & Merch Design', 'Vector Illustration']

// Form Submission logic
const form = reactive({
  name: '',
  email: '',
  message: ''
})
const formSubmitting = ref(false)

const handleSubmit = () => {
  formSubmitting.value = true
  setTimeout(() => {
    alert(`Terima kasih ${form.name}! Pesan Anda berhasil dikirim ke kele.designid@gmail.com.`)
    form.name = ''
    form.email = ''
    form.message = ''
    formSubmitting.value = false
  }, 1000)
}

// Scrolled Header state
const isScrolled = ref(false)
const activeSection = ref('hero')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  
  const sections = ['hero', 'works', 'about', 'umkm-impact', 'contact']
  const scrollPos = window.scrollY + 120
  
  for (const section of sections) {
    const el = document.getElementById(section)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        activeSection.value = section
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Rotate headline every 3.2 seconds
  headlineTimer = window.setInterval(() => {
    activeHeadlineIndex.value = (activeHeadlineIndex.value + 1) % headlines.length
  }, 3200)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (headlineTimer) clearInterval(headlineTimer)
})

// Playful theme cycling logic
interface Theme {
  primary: string
  primaryRgb: string
  accent: string
  accentRgb: string
}

const themes: Theme[] = [
  {
    primary: '#0066e2',
    primaryRgb: '0, 102, 226',
    accent: '#ffd200',
    accentRgb: '255, 210, 0'
  },
  {
    primary: '#8a2be2', // Purple
    primaryRgb: '138, 43, 226',
    accent: '#39ff14', // Neon green
    accentRgb: '57, 255, 20'
  },
  {
    primary: '#ff5e00', // Orange
    primaryRgb: '255, 94, 0',
    accent: '#00e5ff', // Neon cyan
    accentRgb: '0, 229, 255'
  }
]

const currentThemeIndex = ref(0)
const themeAngle = ref(0)

const themeStyles = computed(() => {
  const theme = themes[currentThemeIndex.value]
  return {
    '--color-primary': theme.primary,
    '--color-primary-rgb': theme.primaryRgb,
    '--color-accent': theme.accent,
    '--color-accent-rgb': theme.accentRgb
  }
})

const cycleTheme = () => {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length
  themeAngle.value += 120
}
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}

/* Dynamic Headline Slide Animation */
.headline-container {
  display: block;
  min-height: 1.15em;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

.headline-text {
  display: block;
  white-space: nowrap;
}

.headline-slide-enter-active,
.headline-slide-leave-active {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.headline-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.headline-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
