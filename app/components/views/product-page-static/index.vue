<template>
  <main style="padding-top: 70px;">
    <ProductHero />
    <ProductOverview />
    <ProductKeySpecs />
    <div v-scroll-animate="'fade-up'">
      <ProductFeatures />
    </div>
    <ProductDescription />
    <ProductLifestyle />
    <!-- <ProductTechSpecs /> -->
    <ProductRelated />
  </main>
</template>

<script setup lang="ts">
import ProductHero from './ProductHero.vue'
import ProductOverview from './ProductOverview.vue'
import ProductKeySpecs from './ProductKeySpecs.vue'
import ProductFeatures from './ProductFeatures.vue'
import ProductDescription from './ProductDescription.vue'
import ProductLifestyle from './ProductLifestyle.vue'
import ProductTechSpecs from './ProductTechSpecs.vue'
import ProductRelated from './ProductRelated.vue'
</script>
