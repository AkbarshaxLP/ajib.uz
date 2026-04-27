<template>
  <section v-scroll-animate="'fade-up'" class="products-section">
    <div class="container">
      <div class="section-title">
        <div>
          <p class="section-tag">Ajib Mobile</p>
          <h2 class="section-heading">Yangi Mahsulotlar</h2>
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

      <swiper-container ref="swiperEl" init="false" class="products-swiper">
        <swiper-slide
          v-for="(p, i) in AJIB_PRODUCTS"
          :key="p.id"
          class="product-slide"
        >
          <ProductCard :name="p.name" :img="p.img" :href="p.href" :idx="i" />
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

const AJIB_PRODUCTS = [
  { id: 1, name: 'ajib i10 Series', img: 'https://ajib.uz/wp-content/uploads/2025/03/photo_2025-03-24_10-22-54-768x768.jpg', href: '#' },
  { id: 2, name: 'ajib X1 Series', img: 'https://ajib.uz/wp-content/uploads/2024/10/main-menu-images-8-768x768.webp', href: '#' },
  { id: 3, name: 'ajib i1 Series', img: 'https://ajib.uz/wp-content/uploads/2024/10/main-menu-images-1-768x768.webp', href: '#' },
  { id: 4, name: 'ajib Style', img: 'https://ajib.uz/wp-content/uploads/2024/10/1-9-768x768.webp', href: '#' },
  { id: 5, name: 'ajib Case', img: 'https://ajib.uz/wp-content/uploads/2024/10/4-6-768x768.webp', href: '#' },
  { id: 6, name: 'ajib 5010', img: 'https://ajib.uz/wp-content/uploads/2024/10/main-menu-images-7-768x768.webp', href: '#' },
  { id: 7, name: 'ajib 3010', img: 'https://ajib.uz/wp-content/uploads/2024/10/2-7-768x768.webp', href: '#' },
  { id: 8, name: 'ajib 3011', img: 'https://ajib.uz/wp-content/uploads/2024/10/3-8-768x768.webp', href: '#' },
  { id: 9, name: 'ajib 1030', img: 'https://ajib.uz/wp-content/uploads/2024/10/main-menu-images-6-768x768.webp', href: '#' },
  { id: 10, name: 'ajib 1010', img: 'https://ajib.uz/wp-content/uploads/2024/10/grey-2000-1-1-768x768.webp', href: '#' },
  { id: 11, name: 'ajib Class', img: 'https://ajib.uz/wp-content/uploads/2024/12/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F-%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C-5-768x768.png', href: '#' },
]

const swiperEl = ref(null)

const swiperApi = useSwiper(swiperEl, {
  loop: false,
  slidesPerView: 5,
  spaceBetween: 16,
  grabCursor: true,
  breakpoints: {
    0:    { slidesPerView: 1.5, spaceBetween: 12 },
    480:  { slidesPerView: 2.2, spaceBetween: 14 },
    768:  { slidesPerView: 3,   spaceBetween: 16 },
    1024: { slidesPerView: 4,   spaceBetween: 16 },
    1280: { slidesPerView: 5,   spaceBetween: 16 },
  },
})
</script>

<style scoped>
.container { max-width: 1600px; margin: 0 auto; padding: 0 24px; }

.products-section { padding: 80px 0; border-bottom: 1px solid #f0f0f0; background: #fff; }

.section-title { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.section-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; margin-bottom: 6px; }
.section-heading { font-size: clamp(26px, 3vw, 36px); font-weight: 800; letter-spacing: -0.025em; }

.nav-btns { display: flex; gap: 8px; }
.nav-btn {
  width: 40px; height: 40px; border-radius: 50%; border: none;
  background: #111; color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s, color 0.2s, opacity 0.15s;
}
.nav-btn:hover:not(.disabled) { opacity: 0.75; }
.nav-btn.disabled { background: #ddd; color: #aaa; cursor: default; }

.products-swiper { padding-top: 8px; padding-bottom: 16px; }

@media (max-width: 768px) {
  .products-section { padding: 44px 0; }
  .section-title { align-items: flex-start; gap: 12px; margin-bottom: 20px; }
}
</style>
