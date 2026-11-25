<template>
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
            </div>
            
            <!-- The form composes a mailto: link from the fields so submissions
                 genuinely reach kele.designid@gmail.com without a backend. -->
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
              
              <button type="submit" class="btn-primary interactive btn-submit">
                <span>Kirim Pesan</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="send-icon"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
              <p v-if="formFeedback" class="form-feedback" role="status">
                Aplikasi email Anda sedang dibuka — atau tulis langsung ke
                <a href="mailto:kele.designid@gmail.com" class="interactive">kele.designid@gmail.com</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { trackEvent } from '../analytics'

// Form Submission: compose a mailto: with the filled fields
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  const subject = encodeURIComponent(`Proyek baru dari ${form.name}`)
  const body = encodeURIComponent(
    `Halo Bagus,\n\nNama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`
  )
  trackEvent('contact_submit', 'mailto form')
  window.location.href = `mailto:kele.designid@gmail.com?subject=${subject}&body=${body}`
  // Visible feedback: webmail-only users see nothing happen without this.
  formFeedback.value = 1
  window.setTimeout(() => { formFeedback.value = 0 }, 6000)
}

// 0 = hidden, 1 = "email app opening" hint
const formFeedback = ref(0)
</script>
