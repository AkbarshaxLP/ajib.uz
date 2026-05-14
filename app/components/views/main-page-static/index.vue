<template>
  <div class="homepage">
    <MainHeader />
    <main style="padding-top: 70px;">
      <MainHero />
      <MainProducts />
      <MainFullBanner :image="banner1" />
      <MainFullBanner :image="banner2" />
      <MainCategories />
    </main>
    <div v-scroll-animate="'fade-up'">
      <MainNewsletter />
      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from './MainHeader.vue'
import MainHero from './MainHero.vue'
import MainProducts from './MainProducts.vue'
import MainFullBanner from './MainFullBanner.vue'
import MainCategories from './MainCategories.vue'
import MainNewsletter from './MainNewsletter.vue'
import MainFooter from './MainFooter.vue'

const banner1 = 'https://ajib.uz/wp-content/uploads/2024/10/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F-%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C-10-scaled.webp'
const banner2 = 'https://ajib.uz/wp-content/uploads/2024/10/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F-%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C-9.webp'
</script>

<style scoped>
.homepage {
  font-family: 'Inter', sans-serif;
  background: #ebedec;
  color: #111;
  overflow: hidden;
  min-height: 100vh;
}
</style>
