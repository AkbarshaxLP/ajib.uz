<template>
  <main style="padding-top: 70px;">
    <MainHero v-if="heroSlides.length" :slides="heroSlides" />
    <MainProducts v-if="newPhones.length" :products="newPhones" />
    <MainFullBanner v-if="middleBanner" :image="middleBanner" />
    <MainFullBanner v-if="footerBanner" :image="footerBanner" />
    <MainCategories />
  </main>
</template>

<script setup lang="ts">
import MainHero from './main-page/MainHero.vue'
import MainProducts from './main-page/MainProducts.vue'
import MainFullBanner from './main-page/MainFullBanner.vue'
import MainCategories from './main-page/MainCategories.vue'

const { data: mainPageData } = useApiService().Main_Page.MainPageController_get()

const heroSlides = computed(() => {
  const arr = (mainPageData.value as any)?.hero_banner ?? []
  return arr.map((b: any, i: number) => ({
    id: b.model_id ?? i,
    banner: b.image ?? '',
    alt: b.model_name ?? '',
  }))
})

const newPhones = computed(() => {
  const arr = (mainPageData.value as any)?.new_phones ?? []
  return arr.map((p: any, i: number) => ({
    id: p.phone_id ?? i,
    name: p.model_name ?? '',
    img: p.image ?? '',
    href: p.phone_id ? `/products/${p.phone_id}` : '#',
  }))
})

const middleBanner = computed(() => (mainPageData.value as any)?.banners?.middle ?? '')
const footerBanner = computed(() => (mainPageData.value as any)?.banners?.footer ?? '')
</script>
