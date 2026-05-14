<template>
  <section v-scroll-animate="'fade-up'" class="categories-section">
    <div class="container">
      <div class="section-title">
        <div>
          <p class="section-tag">Kategoriyalar</p>
          <h2 class="section-heading">Device kategoriyalari</h2>
        </div>
      </div>
      <div class="categories-grid">
        <NuxtLink
          v-for="(cat, i) in CATEGORIES"
          :key="cat.name"
          :to="`/devices/${cat.type}`"
          :class="['category-card', { 'category-card--hovered': hoveredCat === i }]"
          @mouseenter="hoveredCat = i"
          @mouseleave="hoveredCat = null"
        >
          <div class="category-img-wrap">
            <img
              :src="cat.img"
              :alt="cat.name"
              class="category-img"
              @error="(e: Event) => ((e.target as HTMLElement).style.display = 'none')"
            />
          </div>
          <div class="category-info">
            <p class="category-label">{{ cat.label }}</p>
            <h3 class="category-name">{{ cat.name }}</h3>
            <p class="category-desc">{{ cat.desc }}</p>
            <span class="category-link">
              Ko'rish
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const CATEGORIES = [
  {
    name: 'Smartfonlar',
    label: 'Ajib Mobile',
    desc: 'Zamonaviy smartfonlar eng yaxshi narxlarda',
    img: 'https://ajib.uz/wp-content/uploads/2024/10/sp.webp',
    type: 'smartphone',
  },
  {
    name: 'Tugmali telefonlar',
    label: 'Ajib Mobile',
    desc: 'Ishonchli va uzoq ishlaydi, oddiy foydalanish uchun',
    img: 'https://ajib.uz/wp-content/uploads/2024/10/tp.webp',
    type: 'push_button',
  },
]

const hoveredCat = ref<number | null>(null)
</script>

<style scoped>
.container { max-width: 1600px; margin: 0 auto; padding: 0 24px; }

.categories-section { padding: 80px 0; background: #ebedec; }

.section-title { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; }
.section-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #888; margin-bottom: 6px; }
.section-heading { font-size: clamp(26px, 3vw, 36px); font-weight: 800; letter-spacing: -0.025em; }

.categories-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.category-card {
  border-radius: 32px; overflow: hidden;
  display: flex; flex-direction: row; align-items: stretch;
  background: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06); text-decoration: none;
  min-height: 220px;
}
.category-card--hovered { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }

.category-img-wrap {
  width: 48%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: #f5f5f5; overflow: hidden;
}
.category-img {
  width: 100%; height: 100%; object-fit: contain;
  transition: transform 0.4s ease;
  padding: 16px;
}
.category-card--hovered .category-img { transform: scale(1.06); }

.category-info {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  padding: 28px 24px; gap: 6px;
}
.category-label {
  font-size: 10px; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: #aaa; margin: 0;
}
.category-name {
  font-size: clamp(18px, 2vw, 22px); font-weight: 800;
  color: #111; margin: 0; letter-spacing: -0.02em; line-height: 1.2;
}
.category-desc {
  font-size: 13px; color: #777; margin: 4px 0 12px; line-height: 1.5;
}
.category-link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: #111;
  transition: gap 0.15s;
}
.category-card--hovered .category-link { gap: 8px; }

@media (max-width: 1024px) {
  .category-img-wrap { width: 44%; }
}

@media (max-width: 768px) {
  .categories-section { padding: 44px 0; }
  .categories-grid { grid-template-columns: 1fr; gap: 14px; }
  .category-card { min-height: 160px; }
  .category-img-wrap { width: 42%; }
  .category-info { padding: 20px 18px; }
  .section-title { margin-bottom: 20px; }
}

@media (max-width: 480px) {
  .category-card { border-radius: 14px; min-height: 140px; }
  .category-info { padding: 16px 14px; gap: 4px; }
  .category-desc { display: none; }
}
</style>
