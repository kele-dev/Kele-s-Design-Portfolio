<template>
  <section v-if="testimonials.length" class="testimonials-section section-padding" aria-label="Testimoni klien">
    <div class="container">
      <div class="section-header">
        <span class="category-pill">Testimoni</span>
        <h2 class="section-title text-gradient">Kata Klien</h2>
      </div>
      <div class="testimonials-grid">
        <figure v-for="t in testimonials" :key="t.name" class="testimonial-card glass-panel">
          <blockquote class="testimonial-quote">"{{ t.quote }}"</blockquote>
          <figcaption class="testimonial-author">
            <span class="testimonial-name">{{ t.name }}</span>
            <span class="testimonial-role">{{ t.role }}</span>
            <span v-if="t.project" class="testimonial-project">{{ t.project }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { testimonials } from '../content'
</script>

<style scoped>
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.testimonial-card {
  padding: 28px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.testimonial-quote {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-primary, #fff);
  margin: 0;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.testimonial-name {
  font-weight: 700;
  font-size: 0.9rem;
}

.testimonial-role {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.testimonial-project {
  font-size: 0.75rem;
  color: var(--color-primary-text);
}
</style>
