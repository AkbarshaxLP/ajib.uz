<template>
  <section v-if="specs.length || image" class="keyspecs-section">
    <div class="container">
      <div class="keyspecs-inner" v-scroll-animate="'fade-up'">

        <!-- Left: phone image -->
        <div v-if="image" class="phone-col">
          <img
            v-if="imgOk"
            :src="image"
            alt=""
            class="phone-img"
            @error="imgOk = false"
          />
          <div v-else class="phone-placeholder" />
        </div>

        <!-- Right: title + spec grid -->
        <div class="specs-col">
          <h2 class="section-title">Eng muhim xususiyatlari</h2>

          <div class="specs-grid">
            <div v-for="(spec, i) in specs" :key="spec.title + i" class="spec-card">
              <div class="spec-icon">
                <component :is="DEFAULT_ICONS[i % DEFAULT_ICONS.length]" />
              </div>
              <span class="spec-text">{{ spec.title }}: {{ spec.value }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  image?: string
  specs?: { title: string; value: string }[]
}>(), {
  image: '',
  specs: () => [],
})

const imgOk = ref(true)

const DEFAULT_ICONS = [
  'IconParamsIconDisplay',
  'IconParamsIconBluetooth',
  'IconParamsIconMemory',
  'IconParamsIconBattery',
  'IconParamsIconCamera',
  'IconParamsIconProcessor',
]
</script>

<style scoped>
.keyspecs-section {
  padding: 0 0 32px;
  background: #ebedec;
}
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.keyspecs-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
  background: #fff;
  border-radius: 24px;
  padding: 56px 48px;
}

/* Phone */
.phone-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone-img {
  width: min(380px, 100%);
  object-fit: contain;
  filter: drop-shadow(0 16px 40px rgba(0,0,0,0.1));
}
.phone-placeholder {
  width: 240px; height: 460px;
  border-radius: 32px; background: #f0f0f0;
  display: flex; align-items: center; justify-content: center;
  color: #bbb; font-size: 14px;
}

/* Specs */
.specs-col { display: flex; flex-direction: column; }

.section-title {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #111;
  margin-bottom: 32px;
  line-height: 1.1;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.spec-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border: 1.5px solid #e5e5e5;
  border-radius: 14px;
  background: #fff;
  transition: border-color 0.18s, box-shadow 0.18s;
  cursor: default;
}
.spec-card:hover {
  border-color: #bbb;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.spec-icon {
  flex-shrink: 0;
  width: 40px; height: 40px;
  border-radius: 10px;
  background: #f5f5f5;
  display: flex; align-items: center; justify-content: center;
  color: #333;
}

.spec-text {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  line-height: 1.35;
}

@media (max-width: 900px) {
  .keyspecs-inner { grid-template-columns: 1fr; padding: 32px 24px; gap: 28px; }
  .phone-col { display: none; }
}
@media (max-width: 600px) {
  .specs-grid { grid-template-columns: 1fr; gap: 8px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .keyspecs-inner { padding: 24px 16px; border-radius: 16px; }
  .section-title { font-size: 22px; margin-bottom: 20px; }
  .spec-card { padding: 13px 14px; }
  .spec-text { font-size: 13px; }
}
</style>
