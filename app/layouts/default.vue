<template>
  <div class="default-layout">
    <MainHeader />
    <slot />
    <div v-scroll-animate="'fade-up'">
      <MainNewsletter />
      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '~/components/views/main-page/MainHeader.vue'
import MainNewsletter from '~/components/views/main-page/MainNewsletter.vue'
import MainFooter from '~/components/views/main-page/MainFooter.vue'
</script>

<style scoped>
.default-layout {
  font-family: 'Inter', sans-serif;
  background: #ebedec;
  color: #111;
  overflow: hidden;
  min-height: 100vh;
}
</style>
