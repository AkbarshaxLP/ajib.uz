<template>
  <div class="history-page">
    <MainHeader />
    <main>
      <HistoryHero />
      <HistoryTimeline />
      <HistoryTech />
      <HistoryMission />
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
import HistoryHero      from './HistoryHero.vue'
import HistoryTimeline  from './HistoryTimeline.vue'
import HistoryTech      from './HistoryTech.vue'
import HistoryMission   from './HistoryMission.vue'
</script>

<style scoped>
.history-page {
  font-family: 'Inter', sans-serif;
  background: #ebedec;
  color: #111;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 70px;
}
</style>
