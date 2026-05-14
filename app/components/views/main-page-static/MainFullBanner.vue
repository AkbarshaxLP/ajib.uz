<template>
  <div v-scroll-animate="'fade-up'" class="container">
    <div class="full-banner">
      <img
        v-if="!failed"
        :src="props.image"
        alt="Ajib Banner"
        class="full-banner-img"
        @error="failed = true"
      />
      <div v-else class="full-banner-fallback">Ajib Banner</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const failed = ref(false)

interface Props {
  image: string
}
const props = defineProps<Props>()

</script>

<style scoped>
.container { max-width: 1600px; margin: 0 auto; padding: 24px 24px 60px; }
.full-banner { border-radius: 20px; overflow: hidden; background: transparent; margin-top: 40px; }
.full-banner-img { width: 100%; display: block; object-fit: cover; }
.full-banner-fallback {
  height: 300px; display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.3); font-size: 16px;
}

@media (max-width: 768px) {
  .container { padding: 16px 12px 32px; }
  .full-banner { border-radius: 14px; margin-top: 0; }
}
</style>
