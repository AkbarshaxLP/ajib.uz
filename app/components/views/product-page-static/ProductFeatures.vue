<template>
  <section class="features-section">
    <div class="container">
      <div class="features-card">
        <!-- Left: phone image -->
        <div class="phone-col" v-scroll-animate="'fade-right'">
          <img
            v-if="phoneOk"
            src="https://ajib.uz/wp-content/uploads/2025/02/1.png"
            alt="ajib i25"
            class="phone-img"
            @error="phoneOk = false"
          />
          <div v-else class="phone-placeholder">ajib i25</div>
        </div>

        <!-- Right: specs tile grid -->
        <div class="specs-col" v-scroll-animate="{ animation: 'fade-left', delay: 100 }">
          <h2 class="features-title">Eng muhim xususiyatlari</h2>

          <!-- Row 1: wide left, narrow right -->
          <div class="tile-row tile-row--2-1">
            <FeatureTile value="48MP" label="Asosiy Kamera" size="xl" />
            <FeatureTile value="16 MP" label="Old Kamera" size="lg" />
          </div>

          <!-- Row 2: narrow left, wide right -->
          <div class="tile-row tile-row--1-2">
            <FeatureTile value="5000mAh" label="Batareya" size="lg" />
            <FeatureTile value="Premium Dizayn" size="lg" />
          </div>

          <!-- Row 3: wide left, narrow right -->
          <div class="tile-row tile-row--2-1">
            <FeatureTile value="6+6 GB" label="Tezkor Xotira" size="lg" />
            <FeatureTile value="128 GB" label="Ichki Xotira" size="lg" />
          </div>

          <!-- Row 4: narrow left, wide right -->
          <div class="tile-row tile-row--1-2">
            <FeatureTile value="Face ID" label="Yuz skaneri" size="sm" />
            <FeatureTile value="18W" label="Tezkor Quvvat" size="md" />
          </div>

          <!-- Row 5: full width -->
          <div class="tile-row tile-row--full">
            <FeatureTile value='6,7" HD+ IPS 90Hz' label="Displey" size="lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeatureTile from './FeatureTile.vue'

const phoneOk = ref(true)
</script>

<style scoped>
.features-section { padding: 0; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.features-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 48px;
}

.phone-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone-img {
  width: min(420px, 100%);
  object-fit: contain;
  filter: drop-shadow(0 20px 50px rgba(0,0,0,0.12));
}
.phone-placeholder {
  width: 300px;
  height: 560px;
  border-radius: 40px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 14px;
}

.specs-col { display: flex; flex-direction: column; }

.features-title {
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.tile-row {
  display: grid;
  gap: 8px;
  margin-bottom: 8px;
}
.tile-row:last-child { margin-bottom: 0; }
.tile-row--2-1 { grid-template-columns: 2fr 1fr; }
.tile-row--1-2 { grid-template-columns: 1fr 2fr; }
.tile-row--full { grid-template-columns: 1fr; }

@media (max-width: 900px) {
  .features-card { grid-template-columns: 1fr; gap: 28px; padding: 28px 20px; }
  .phone-col { display: none; } /* скрываем фото на планшете — тайлы занимают всю ширину */
  .phone-img { width: min(280px, 100%); }
  .features-title { font-size: 20px; }
}

@media (max-width: 600px) {
  /* На мобильном меняем плитки на равномерную сетку */
  .tile-row--2-1,
  .tile-row--1-2 { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .features-card { padding: 20px 16px; border-radius: 16px; }
  .tile-row--2-1,
  .tile-row--1-2 { grid-template-columns: 1fr 1fr; }
  .tile-row { gap: 6px; margin-bottom: 6px; }
}
</style>
