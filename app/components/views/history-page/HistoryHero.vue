<template>
  <section class="history-hero">
    <div class="container">
      <div class="hero-content">
        <p class="eyebrow" ref="eyebrowEl">ajib mobile — 2023</p>
        <h1 class="hero-title" ref="titleEl">Kelajakni Bugundan<br /><span class="accent">Xis Eting</span></h1>
        <p class="hero-sub" ref="subEl">
          Toshkent shahrida tashkil etilgan ajib mobile — foydalanuvchi qulayligi,
          zamonaviy dizayn va ilg'or texnologiyalarni birlashtirgan o'zbek brendi.
        </p>
        <div class="stats-row" ref="statsEl">
          <div v-for="stat in STATS" :key="stat.label" class="stat-item">
            <p class="stat-val">{{ stat.val }}</p>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-grid" aria-hidden="true" />
    <div class="hero-glow" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const eyebrowEl = ref<HTMLElement | null>(null)
const titleEl   = ref<HTMLElement | null>(null)
const subEl     = ref<HTMLElement | null>(null)
const statsEl   = ref<HTMLElement | null>(null)

const STATS = [
  { val: '2023',  label: 'Asos solingan' },
  { val: '13+',   label: 'Servis markazi' },
  { val: '20+',   label: 'Mahsulot modeli' },
  { val: '1 yil', label: 'Rasmiy kafolat' },
]

onMounted(() => {
  const els = [eyebrowEl, titleEl, subEl, statsEl]
  els.forEach((el, i) => {
    setTimeout(() => el.value?.classList.add('sa--visible'), 100 + i * 140)
  })
})
</script>

<style scoped>
.history-hero {
  position: relative;
  background: #0a0a0a;
  color: #fff;
  padding: 130px 0 110px;
  overflow: hidden;
}

.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }

.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 72px 72px;
  pointer-events: none;
}
.hero-glow {
  position: absolute;
  top: -200px; left: -100px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(106,0,248,0.18) 0%, transparent 70%);
  pointer-events: none;
}

.eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 0.22em;
  text-transform: uppercase; color: rgba(255,255,255,0.38); margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(40px, 7vw, 96px);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1.02;
  margin-bottom: 28px;
  color: #fff;
}
.accent {
  background: linear-gradient(90deg, #a855f7, #6a00f8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: clamp(14px, 1.4vw, 17px);
  color: rgba(255,255,255,0.5);
  line-height: 1.75;
  max-width: 560px;
  margin-bottom: 60px;
}

.stats-row {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
}
.stat-item { display: flex; flex-direction: column; gap: 4px; }
.stat-val   { font-size: clamp(24px, 3vw, 36px); font-weight: 900; letter-spacing: -0.03em; color: #fff; }
.stat-label { font-size: 13px; color: rgba(255,255,255,0.38); font-weight: 500; }

/* Animate */
.eyebrow, .hero-title, .hero-sub, .stats-row {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

@media (max-width: 768px) {
  .history-hero { padding: 90px 0 72px; }
  .stats-row { gap: 28px; }
  .hero-sub { margin-bottom: 40px; }
}
@media (max-width: 480px) {
  .container { padding: 0 20px; }
  .history-hero { padding: 72px 0 56px; }
  .stats-row { gap: 20px; }
  .stat-val { font-size: 24px; }
}
</style>
