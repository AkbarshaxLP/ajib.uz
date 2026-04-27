<template>
  <section class="hero-section">
    <div class="hero-wrap">
      <swiper-container ref="swiperEl" init="false" class="hero-swiper" @swiperslidechange="onSlideChange">
        <swiper-slide v-for="slide in HERO_SLIDES" :key="slide.id">
          <img :src="slide.banner" :alt="slide.alt" class="hero-img" />
        </swiper-slide>
      </swiper-container>

      <!-- Dots -->
      <div class="hero-dots">
        <button
          v-for="(_, i) in HERO_SLIDES"
          :key="i"
          :class="['hero-dot', { active: currentIndex === i }]"
          @click="instance?.slideToLoop(i)"
        />
      </div>

      <!-- Arrows -->
      <button class="hero-arrow hero-arrow--left" @click="prev()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>
      <button class="hero-arrow hero-arrow--right" @click="next()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const HERO_SLIDES = [
  { id: 1, banner: 'https://ajib.uz/wp-content/uploads/2025/02/main-site-i25-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg', alt: 'ajib i25 Series' },
  { id: 2, banner: 'https://ajib.uz/wp-content/uploads/2024/12/2560x1097-UZUM-BANNER-ajib-series.png', alt: 'ajib Series' },
]

const swiperEl = ref(null)
const currentIndex = ref(0)

const { instance, next, prev } = useSwiper(swiperEl, {
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  allowTouchMove: true,
  speed: 600,
})

const onSlideChange = (e: CustomEvent) => {
  currentIndex.value = e.detail[0].realIndex
}
</script>

<style scoped>
.hero-section {
  background: #ebedec;
  padding: 54px 24px 40px;
  display: flex;
  justify-content: center;
}
.hero-wrap {
  position: relative;
  width: 100%; max-width: 1580px; height: 700px;
  border-radius: 20px; overflow: hidden;
}
.hero-swiper { width: 100%; height: 100%; }

:deep(swiper-slide) { width: 100%; height: 100%; }

.hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }

.hero-dots {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px; z-index: 10;
}
.hero-dot {
  width: 8px; height: 8px; border-radius: 4px;
  background: rgba(0,0,0,0.35); transition: all 0.3s ease; cursor: pointer; border: none;
}
.hero-dot.active { width: 28px; background: #111; }

.hero-arrow {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center;
  color: #fff; border: none; cursor: pointer; transition: background 0.15s;
  backdrop-filter: blur(4px);
}
.hero-arrow:hover { background: rgba(0,0,0,0.55); }
.hero-arrow--left { left: 24px; }
.hero-arrow--right { right: 24px; }

@media (max-width: 768px) {
  .hero-section { padding: 16px 12px 20px; }
  .hero-wrap { height: 240px; border-radius: 14px; }
  .hero-arrow { width: 34px; height: 34px; }
  .hero-arrow--left { left: 10px; }
  .hero-arrow--right { right: 10px; }
  .hero-dots { bottom: 14px; }
  .hero-img { object-fit: contain; padding: 8px 0 ; background-color: #fff; }
}
@media (max-width: 480px) {
  .hero-wrap { height: 190px; }
}
</style>
