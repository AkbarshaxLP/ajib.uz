<template>
  <section class="service-hero">
    <div class="container">
      <p class="hero-eyebrow" ref="eyebrowEl">Ajib Mobile</p>
      <h1 class="hero-title" ref="titleEl">
        Respublika bo'ylab<br />
        servis markazlari
      </h1>
      <p class="hero-sub" ref="subEl">
        Barcha ajib qurilmalariga <strong>1 yillik rasmiy kafolat</strong> beriladi.<br />
        Qurilmangiz butun xizmat muddati davomida bizning qo'llab-quvvatlashimizda.
      </p>
      <div class="hero-badge" ref="badgeEl">
        <div class="badge-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <p class="badge-title">1 Yillik rasmiy kafolat</p>
          <p class="badge-sub">Barcha ajib mahsulotlari uchun</p>
        </div>
      </div>
    </div>
    <div class="hero-bg-grid" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const eyebrowEl = ref<HTMLElement | null>(null)
const titleEl   = ref<HTMLElement | null>(null)
const subEl     = ref<HTMLElement | null>(null)
const badgeEl   = ref<HTMLElement | null>(null)

onMounted(() => {
  const els = [eyebrowEl, titleEl, subEl, badgeEl]
  els.forEach((el, i) => {
    setTimeout(() => el.value?.classList.add('sa--visible'), 120 + i * 130)
  })
})
</script>

<style scoped>
.service-hero {
  position: relative;
  background: #0a0a0a;
  color: #fff;
  padding: 120px 0 100px;
  overflow: hidden;
}

.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }

/* Animated grid background */
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

.hero-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(36px, 6vw, 80px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: 28px;
  background: linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: clamp(14px, 1.4vw, 17px);
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 48px;
}
.hero-sub strong { color: rgba(255,255,255,0.85); font-weight: 600; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 18px 28px;
  backdrop-filter: blur(8px);
}
.badge-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: #6a00f8;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #fff;
}
.badge-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 3px; }
.badge-sub   { font-size: 13px; color: rgba(255,255,255,0.45); }

/* Animate */
.hero-eyebrow, .hero-title, .hero-sub, .hero-badge {
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

@media (max-width: 768px) {
  .service-hero { padding: 80px 0 64px; }
  .hero-title { font-size: clamp(28px, 8vw, 52px); }
  .hero-sub { font-size: 14px; margin-bottom: 32px; }
  .hero-badge { padding: 14px 18px; gap: 12px; }
  .badge-icon { width: 40px; height: 40px; border-radius: 10px; }
  .badge-title { font-size: 14px; }
}
@media (max-width: 480px) {
  .container { padding: 0 20px; }
  .service-hero { padding: 64px 0 48px; }
  .hero-badge { flex-direction: column; align-items: flex-start; gap: 10px; }
}
</style>
