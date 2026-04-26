<template>
  <a
    :href="href"
    :class="['product-card', { 'product-card--hovered': hovered }]"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="product-card-img-wrap">
      <img
        v-if="!imgFailed"
        :src="img"
        :alt="name"
        class="product-card-img"
        :style="{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }"
        @error="imgFailed = true"
      />
      <div v-else class="product-card-fallback" :style="{ background: fallbackColor }">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
      </div>
    </div>
    <div class="product-card-info">
      <p class="product-card-name">{{ name }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  name: string
  img: string
  href?: string
  idx?: number
}>()

const PLACEHOLDER_COLORS = ['#e8eaf0', '#e0e8e0', '#ece8e0', '#e0e8ec', '#ece0e8']

const hovered = ref(false)
const imgFailed = ref(false)
const fallbackColor = computed(() => PLACEHOLDER_COLORS[(props.idx ?? 0) % PLACEHOLDER_COLORS.length])
</script>

<style scoped>
.product-card {
  flex: 0 0 auto; width: 180px; text-decoration: none;
  background: #fff; border-radius: 16px; overflow: hidden;
  border: 1px solid #f0f0f0; transition: all 0.2s ease; cursor: pointer; display: block;
}
.product-card--hovered {
  background: #f9f9f9; border-color: #e0e0e0;
  transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}
.product-card-img-wrap {
  background: #f8f8f8; padding: 16px;
  display: flex; align-items: center; justify-content: center; height: 160px;
}
.product-card-img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.3s; }
.product-card-fallback {
  width: 100%; height: 100%; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.product-card-info { padding: 12px 14px 14px; }
.product-card-name { font-size: 13px; font-weight: 600; color: #111; }
</style>
