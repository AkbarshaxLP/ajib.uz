<template>
  <div class="product-page">
    <MainHeader />
    <main>
      <ProductHero />
      <ProductOverview />
      <div v-scroll-animate="'fade-up'">
        <ProductFeatures />
      </div>
      <ProductDescription />
      <ProductLifestyle />
      <!-- <ProductTechSpecs /> -->
      <ProductRelated />
    </main>
    <div v-scroll-animate="'fade-up'">
      <MainNewsletter />
      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '../main-page/MainHeader.vue'
import MainNewsletter from '../main-page/MainNewsletter.vue'
import MainFooter from '../main-page/MainFooter.vue'
import ProductHero from './ProductHero.vue'
import ProductOverview from './ProductOverview.vue'
import ProductFeatures from './ProductFeatures.vue'
import ProductDescription from './ProductDescription.vue'
import ProductLifestyle from './ProductLifestyle.vue'
import ProductTechSpecs from './ProductTechSpecs.vue'
import ProductRelated from './ProductRelated.vue'
</script>

<style scoped>
.product-page {
  font-family: 'Inter', sans-serif;
  background: #ebedec;
  color: #111;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 70px;
}
</style>
