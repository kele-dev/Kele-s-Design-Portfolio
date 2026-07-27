<template>
  <div class="creative-bg-root">
    <!-- Fine Artboard Grid -->
    <div class="grid-bg-enhanced"></div>

    <!-- Ambient Glowing Orbs -->
    <div class="glow-orb orb-primary"></div>
    <div class="glow-orb orb-yellow"></div>
    <div class="glow-orb orb-magenta"></div>
    <div class="glow-orb orb-cyan"></div>

    <!-- Designer Blueprint & Crop Marks Overlay -->
    <div class="designer-blueprint">
      <!-- Corner Crop Marks -->
      <div class="crop-mark top-left">┌</div>
      <div class="crop-mark top-right">┐</div>
      <div class="crop-mark bottom-left">└</div>
      <div class="crop-mark bottom-right">┘</div>

      <!-- Floating Graphic Design Annotations -->
      <div class="design-annotation annotation-1">
        <span class="anno-dot"></span>
        <span>CMYK: 100 • 50 • 0 • 0</span>
      </div>

      <div class="design-annotation annotation-2">
        <span class="anno-badge">300 DPI</span>
        <span>VECTOR CANVAS</span>
      </div>

      <div class="design-annotation annotation-3">
        <span>KELE DESIGN SYSTEM • 2026</span>
      </div>

      <!-- Floating Geometric Graphic Shapes -->
      <div class="floating-vector shape-semicircle"></div>
      <div class="floating-vector shape-ring"></div>
      <div class="floating-vector shape-plus">+</div>
      <div class="floating-vector shape-dots"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Creative background component for graphic designer portfolio
</script>

<style scoped>
.creative-bg-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* Enhanced Artboard Grid */
.grid-bg-enhanced {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(rgba(0, 102, 226, 0.15) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px, 80px 80px, 80px 80px;
  opacity: 0.8;
}

/* Glowing Orbs with Smooth Floating Keyframes */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.25;
  animation: orb-float 20s infinite ease-in-out alternate;
}

.orb-primary {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
  top: -100px;
  left: -100px;
  animation-duration: 22s;
}

.orb-yellow {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
  top: 30%;
  right: -150px;
  animation-duration: 18s;
  animation-delay: -5s;
}

.orb-magenta {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #ff3366 0%, transparent 70%);
  bottom: -100px;
  left: 20%;
  animation-duration: 25s;
  animation-delay: -10s;
}

.orb-cyan {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #00e5ff 0%, transparent 70%);
  top: 60%;
  right: 25%;
  animation-duration: 28s;
  animation-delay: -15s;
}

@keyframes orb-float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -50px) scale(1.15); }
  100% { transform: translate(-30px, 30px) scale(0.95); }
}

/* Corner Crop Marks */
.designer-blueprint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.crop-mark {
  position: absolute;
  font-family: monospace;
  font-size: 1.5rem;
  color: var(--border-glass);
  line-height: 1;
}

.crop-mark.top-left { top: 20px; left: 20px; }
.crop-mark.top-right { top: 20px; right: 20px; }
.crop-mark.bottom-left { bottom: 20px; left: 20px; }
.crop-mark.bottom-right { bottom: 20px; right: 20px; }

/* Design Annotations */
.design-annotation {
  position: absolute;
  font-family: var(--font-primary);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
}

.anno-dot {
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-accent);
}

.anno-badge {
  background: rgba(0, 102, 226, 0.2);
  border: 1px solid rgba(0, 102, 226, 0.4);
  color: var(--color-primary);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.65rem;
}

.annotation-1 { top: 140px; left: 40px; }
.annotation-2 { bottom: 120px; right: 40px; }
.annotation-3 { top: 50%; left: 20px; transform: rotate(-90deg); transform-origin: left center; }

/* Floating Vector Shapes */
.floating-vector {
  position: absolute;
  opacity: 0.35;
  animation: shape-drift 30s infinite linear;
}

.shape-semicircle {
  width: 70px;
  height: 140px;
  background: var(--color-accent);
  border-radius: 0 140px 140px 0; /* Kele yellow semicircle */
  top: 25%;
  left: 8%;
  filter: drop-shadow(0 0 15px rgba(255, 210, 0, 0.3));
  animation: rotate-float 35s infinite linear;
}

.shape-ring {
  width: 90px;
  height: 90px;
  border: 3px dashed rgba(0, 229, 255, 0.5);
  border-radius: 50%;
  top: 70%;
  left: 12%;
  animation: rotate-float 40s infinite reverse linear;
}

.shape-plus {
  font-family: monospace;
  font-size: 3rem;
  color: #ff3366;
  top: 18%;
  right: 12%;
  animation: pulse-float 6s infinite ease-in-out alternate;
}

.shape-dots {
  width: 60px;
  height: 60px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.4) 2px, transparent 2px);
  background-size: 15px 15px;
  bottom: 25%;
  right: 8%;
}

@keyframes rotate-float {
  from { transform: rotate(0deg) translateY(0px); }
  to { transform: rotate(360deg) translateY(20px); }
}

@keyframes pulse-float {
  0% { transform: scale(1) rotate(0deg); opacity: 0.2; }
  100% { transform: scale(1.3) rotate(45deg); opacity: 0.5; }
}

@media (max-width: 768px) {
  .design-annotation, .shape-semicircle, .shape-ring {
    display: none; /* Keep mobile view clean */
  }
}
</style>
