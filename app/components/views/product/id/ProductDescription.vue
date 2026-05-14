<template>
  <section v-if="title || description" class="desc-section">
    <div class="container">
      <div class="desc-inner" v-scroll-animate="'fade-up'">
        <h2 v-if="title" class="desc-title">{{ title }}</h2>
        <p v-if="description" class="desc-text">{{ description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: '',
  description: '',
})
</script>

<style scoped>
.desc-section { padding: 60px 0; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.desc-inner {
  display: flex;
  align-items: center;
  gap: 80px;
  justify-content: center;
}

.desc-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 900;
  letter-spacing: -0.04em;
  flex-shrink: 0;
  line-height: 1;
  color: #111;
}

.desc-text {
  font-size: 15px;
  line-height: 1.8;
  color: #444;
  max-width: 600px;
}

@media (max-width: 768px) {
  .desc-section { padding: 40px 0; }
  .desc-inner { flex-direction: column; gap: 16px; align-items: flex-start; }
  .desc-title { font-size: 36px; }
  .desc-text { max-width: 100%; font-size: 14px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .desc-section { padding: 32px 0; }
  .desc-title { font-size: 28px; }
  .desc-text { font-size: 13.5px; line-height: 1.7; }
}
</style>
