<template>
  <section class="lifestyle-section">
    <div class="container">
      <div class="lifestyle-wrap" v-scroll-animate="'zoom-in'">
        <img
          v-if="imgOk"
          src="https://ajib.uz/wp-content/uploads/2025/01/main-site2-i25.jpg"
          alt="ajib i25 lifestyle"
          class="lifestyle-img"
          @error="imgOk = false"
        />
        <div v-else class="lifestyle-fallback">
          <span>ajib i25</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const imgOk = ref(true)
</script>

<style scoped>
.lifestyle-section { padding: 0 0 80px; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.lifestyle-wrap {
  border-radius: 28px;
  overflow: hidden;
  background: #fff;
}

.lifestyle-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.lifestyle-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lifestyle-fallback span {
  color: rgba(255, 255, 255, 0.2);
  font-size: 32px;
  font-weight: 800;
}

@media (max-width: 768px) {
  .lifestyle-section { padding: 0 0 48px; }
  .lifestyle-wrap { border-radius: 20px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .lifestyle-wrap { border-radius: 14px; }
}
</style>
