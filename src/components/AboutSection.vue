<template>
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
                <img src="/assets/bagus_photo.webp" alt="Bagus Hari Wijaya, kele design" class="user-photo" width="678" height="930" loading="lazy" decoding="async" />
              </div>
              <div class="avatar-card-info">
                <p class="avatar-name">Bagus Hari Wijaya</p>
                <p>Graphic & Brand Designer, kele design</p>
              </div>
            </div>
          </div>
          
          <!-- Right Content Element -->
          <div class="about-content-col" v-motion-slide-visible-once-right>
            <span class="category-pill">About Me</span>
            <h2 class="about-title text-gradient">Siapa di Balik Kele Design?</h2>
            
            <p class="about-p">
              Saya adalah seorang desainer grafis & merek independen berbasis di Jakarta. Berfokus pada pengembangan sistem identitas brand (logo hingga merchandise), desain website digital (UI/UX), dan pendampingan visual usaha lokal (UMKM).
            </p>
            <p class="about-p">
              Bagi saya, desain bukan hanya tentang menyusun tata letak yang rapi, melainkan juga tentang menceritakan sebuah kisah dengan cara yang menyenangkan. Saya menyisipkan sentuhan playful khas studio ke dalam karya-karya profesional agar menghasilkan impresi visual yang kuat.
            </p>
            
            <div class="skills-wrapper">
              <h3 class="skills-title">Keahlian & Bidang Fokus:</h3>
              <div class="skills-tags">
                <span class="skill-tag glass-panel" v-for="skill in skills" :key="skill">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { skills } from '../content'
</script>
