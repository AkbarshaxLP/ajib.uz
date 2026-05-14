<template>
  <section class="techspecs-section">
    <div class="container">
      <div class="specs-header" v-scroll-animate="'fade-up'">
        <p class="specs-eyebrow">Texnik ma'lumotlar</p>
        <h2 class="specs-heading">Xususiyatlar jadvali</h2>
      </div>

      <div class="specs-table" v-scroll-animate="{ animation: 'fade-up', delay: 120 }">
        <div
          v-for="([key, val], i) in TECH_SPECS"
          :key="key"
          :class="['spec-row', { even: i % 2 === 0 }]"
        >
          <span class="spec-key">{{ key }}</span>
          <span class="spec-val">{{ val }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const TECH_SPECS: [string, string][] = [
  ['Model', 'ajib i25'],
  ['Protsessor', 'Octa Core (Unisoc T606)'],
  ['Displey', "6.7'' HD+ IPS 90Hz"],
  ['RAM', '6+6 GB'],
  ['Xotira', '128 GB'],
  ['Batareya', '5000 mAh'],
  ['Asosiy kamera', '48 MP'],
  ['Old kamera', '16 MP'],
  ['Internet', '5G / 4G / 3G / 2G'],
  ['Wi-Fi', '2.4G / 5G'],
  ['Bluetooth', '5.0'],
  ['SIM', '2x nano-SIM'],
  ['OS', 'Android 14'],
  ['Quvvat', '18W tez quvvatlash'],
]
</script>

<style scoped>
.techspecs-section { padding: 80px 0; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.specs-header { margin-bottom: 48px; }

.specs-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 10px;
}

.specs-heading {
  font-size: clamp(28px, 3.5vw, 46px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #111;
}

.specs-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 900px;
  border: 1px solid #f0f0f0;
  border-radius: 20px;
  overflow: hidden;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  transition: background 0.15s;
}
.spec-row.even { background: #fdfdfd; }
.spec-row:hover { background: #fafafa; }
.spec-row:last-child, .spec-row:nth-last-child(2) { border-bottom: none; }

.spec-key { font-size: 13.5px; color: #888; font-weight: 500; }
.spec-val { font-size: 13.5px; font-weight: 650; color: #111; text-align: right; }

@media (max-width: 768px) {
  .specs-table { grid-template-columns: 1fr; max-width: 100%; }
  .spec-row:last-child { border-bottom: none; }
  .spec-row:nth-last-child(2) { border-bottom: 1px solid #f2f2f2; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .specs-heading { font-size: 28px; }
}
</style>
