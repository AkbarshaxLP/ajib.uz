<template>
  <section class="related-section">
    <div class="container">
      <div class="related-header" v-scroll-animate="'fade-up'">
        <div>
          <p class="related-eyebrow">Ajib Mobile</p>
          <h2 class="related-heading">Yangi Mahsulotlar</h2>
        </div>
        <div class="nav-btns">
          <button
            class="nav-btn"
            :class="{ disabled: swiperApi.isBeginning.value }"
            aria-label="Previous"
            @click="swiperApi.prev()"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
          </button>
          <button
            class="nav-btn"
            :class="{ disabled: swiperApi.isEnd.value }"
            aria-label="Next"
            @click="swiperApi.next()"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </button>
        </div>
      </div>

      <swiper-container ref="swiperEl" class="related-swiper" init="false">
        <swiper-slide v-for="p in PRODUCTS" :key="p.id">
          <a href="#" class="product-card">
            <div class="card-img-wrap">
              <img
                v-if="p.imgOk"
                :src="p.img"
                :alt="p.name"
                class="card-img"
                @error="p.imgOk = false"
              />
              <div v-else class="card-img-placeholder" />
            </div>
            <div class="card-info">
              <p class="card-name">{{ p.name }}</p>
            </div>
          </a>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const swiperEl = ref(null)

const swiperApi = useSwiper(swiperEl, {
  loop: false,
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    0:   { slidesPerView: 1.2, spaceBetween: 14 },
    600: { slidesPerView: 2.2, spaceBetween: 16 },
    900: { slidesPerView: 3,   spaceBetween: 20 },
  },
})

const PRODUCTS = ref([
  { id: 1, name: 'ajib i15 series', img: 'https://ajib.uz/wp-content/uploads/2025/01/main-site2-i15-300x300.jpg',                                                                                     imgOk: true },
  { id: 2, name: 'ajib i10 series', img: 'https://ajib.uz/wp-content/uploads/2025/03/photo_2025-03-24_10-22-54-768x768.jpg',                                                                           imgOk: true },
  { id: 3, name: 'ajib X1',         img: 'https://ajib.uz/wp-content/uploads/2024/10/main-menu-images-8-768x768.webp',                                                                                 imgOk: true },
  { id: 4, name: 'ajib i1',         img: 'https://ajib.uz/wp-content/uploads/2024/10/main-menu-images-1-768x768.webp',                                                                                 imgOk: true },
  { id: 5, name: 'ajib flip',       img: 'https://ajib.uz/wp-content/uploads/2024/10/1-9-768x768.webp',                                                                                               imgOk: true },
  { id: 6, name: 'ajib Style',      img: 'https://ajib.uz/wp-content/uploads/2024/10/1-9-768x768.webp',                                                                                               imgOk: true },
  { id: 7, name: 'ajib Class',      img: 'https://ajib.uz/wp-content/uploads/2024/12/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F-%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C-5-768x768.png', imgOk: true },
  { id: 8, name: 'ajib Case',       img: 'https://ajib.uz/wp-content/uploads/2024/10/4-6-768x768.webp',                                                                                               imgOk: true },
  { id: 9, name: 'Premier P50',     img: 'https://ajib.uz/wp-content/uploads/2024/10/main-menu-images-8-768x768.webp',                                                                                imgOk: true },
])
</script>

<style scoped>
.related-section { padding: 80px 0; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.related-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.related-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 6px;
}
.related-heading {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #111;
}

.nav-btns { display: flex; gap: 8px; }
.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, opacity 0.15s;
}
.nav-btn:hover:not(.disabled) { opacity: 0.75; }
.nav-btn.disabled {
  background: #ddd;
  color: #aaa;
  cursor: default;
}

.related-swiper { width: 100%; }

.product-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: #f5f4f0;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #eaeae6;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  background: #f0efeb;
  border-color: #ddd;
}

.card-img-wrap {
  background: #fff;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
}
.card-img {
  height: 160px;
  object-fit: contain;
  transition: transform 0.3s;
}
.product-card:hover .card-img { transform: scale(1.06); }
.card-img-placeholder { height: 160px; width: 100px; border-radius: 12px; background: #e0e0dc; }

.card-info { padding: 16px 20px 20px; }
.card-name { font-size: 15px; font-weight: 700; color: #111; }

@media (max-width: 768px) {
  .related-section { padding: 48px 0; }
  .related-heading { font-size: 22px; }
  .card-img-wrap { height: 180px; }
  .card-img { height: 130px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .related-section { padding: 36px 0; }
  .nav-btn { width: 36px; height: 36px; }
  .card-info { padding: 12px 14px 16px; }
  .card-name { font-size: 13px; }
}
</style>
