<template>
  <div class="service-page">
    <MainHeader />
    <main>
      <ServiceHero />
      <ServiceAdvantages />
      <ServiceCenters />
    </main>
    <div v-scroll-animate="'fade-up'">
      <MainNewsletter />
      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader     from '../main-page/MainHeader.vue'
import MainNewsletter from '../main-page/MainNewsletter.vue'
import MainFooter     from '../main-page/MainFooter.vue'
import ServiceHero        from './ServiceHero.vue'
import ServiceAdvantages  from './ServiceAdvantages.vue'
import ServiceCenters     from './ServiceCenters.vue'
</script>

<style scoped>
.service-page {
  font-family: 'Inter', sans-serif;
  background: #ebedec;
  color: #111;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 70px;
}
</style>
