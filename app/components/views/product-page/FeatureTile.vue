<template>
  <div
    class="tile"
    :class="`tile--${size}`"
    :style="{ background: hov ? '#e8e7e4' : '#eeede9' }"
    @mouseenter="hov = true"
    @mouseleave="hov = false"
  >
    <p class="tile-value">{{ value }}</p>
    <p v-if="label" class="tile-label">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  value: string
  label?: string
  size?: 'xl' | 'lg' | 'md' | 'sm'
}>()

const hov = ref(false)
</script>

<style scoped>
.tile {
  border-radius: 18px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background 0.18s;
  cursor: default;
  min-height: 90px;
}

.tile-value {
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(100deg, #b8a898, #000000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tile--xl .tile-value { font-size: clamp(28px, 4.5vw, 60px); }
.tile--lg .tile-value { font-size: clamp(18px, 2.8vw, 40px); }
.tile--md .tile-value { font-size: clamp(15px, 2.2vw, 30px); }
.tile--sm .tile-value { font-size: clamp(13px, 1.6vw, 22px); }

@media (max-width: 480px) {
  .tile { padding: 16px 12px; min-height: 72px; border-radius: 14px; }
  .tile-label { font-size: 11px; margin-top: 4px; }
}

.tile-label {
  font-size: 13px;
  font-weight: 700;
  color: #555;
  margin-top: 6px;
  letter-spacing: 0.01em;
}
</style>
