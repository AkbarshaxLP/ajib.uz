<template>
  <section v-scroll-animate="'fade-up'" class="products-section">
    <div class="container">
      <div class="section-title">
        <div>
          <p class="section-tag">Ajib Mobile</p>
          <h2 class="section-heading">Yangi Mahsulotlar</h2>
        </div>
        <a href="#" class="see-all">
          Barchasini ko'rish
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
          </svg>
        </a>
      </div>

      <div class="swiper-outer">
      <button class="scroll-btn scroll-btn--left" @click="prev()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>

      <swiper-container ref="swiperEl" init="false" class="products-swiper">
        <swiper-slide
          v-for="(p, i) in AJIB_PRODUCTS"
          :key="p.id"
          class="product-slide"
        >
          <ProductCard :name="p.name" :img="p.img" :href="p.href" :idx="i" />
        </swiper-slide>
      </swiper-container>

      <button class="scroll-btn scroll-btn--right" @click="next()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round">
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </button>
      </div>
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

const { next, prev } = useSwiper(swiperEl, {
  slidesPerView: 'auto',
  spaceBetween: 16,
  grabCursor: true,
})
</script>

<style scoped>
.container { max-width: 1600px; margin: 0 auto; padding: 0 24px; }

.products-section { padding: 80px 0; border-bottom: 1px solid #f0f0f0; background: #fff; }

.section-title { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; }
.section-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; margin-bottom: 6px; }
.section-heading { font-size: clamp(26px, 3vw, 36px); font-weight: 800; letter-spacing: -0.025em; }
.see-all {
  display: flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: #555; text-decoration: none; padding-bottom: 4px; transition: color 0.15s;
}
.see-all:hover { color: #111; }

.swiper-outer { position: relative; }

.products-swiper { padding-top: 8px; padding-bottom: 16px; }

:deep(swiper-slide).product-slide { width: auto; height: auto; }

.scroll-btn {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
  width: 40px; height: 40px; border-radius: 50%; background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;
  transition: box-shadow 0.15s;
}
.scroll-btn:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.18); }
.scroll-btn--left { left: 4px; }
.scroll-btn--right { right: 4px; }

@media (max-width: 768px) {
  .products-section { padding: 44px 0; }
  .section-title { flex-direction: column; align-items: flex-start; gap: 6px; margin-bottom: 20px; }
  .scroll-btn { display: none; }
}
</style>
