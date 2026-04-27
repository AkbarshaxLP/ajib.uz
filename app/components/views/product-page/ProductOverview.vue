<template>
  <section class="overview-section" v-scroll-animate="'fade-up'">
    <div class="container">
      <h2 class="overview-title">ajib i25 series</h2>
      <div class="overview-card">
        <!-- Left: image + thumbnails -->
        <div class="image-col">
          <div class="main-img-wrap">
            <img
              v-if="imgOk[activeImg]"
              :key="activeImg"
              :src="THUMBS[activeImg]"
              alt="ajib i25"
              class="main-img"
              @error="setFailed(activeImg)"
            />
            <div v-else class="img-placeholder">ajib i25</div>
          </div>
          <div class="thumbs-row">
            <button
              v-for="(src, i) in THUMBS"
              :key="i"
              :class="['thumb-btn', { active: activeImg === i }]"
              @click="activeImg = i"
            >
              <img
                v-if="imgOk[i]"
                :src="src"
                alt=""
                class="thumb-img"
                @error="setFailed(i)"
              />
              <div v-else class="thumb-placeholder" />
            </button>
          </div>
        </div>

        <!-- Right: specs + buttons -->
        <div class="specs-col">
          <div
            v-for="([key, val], i) in SPECS"
            :key="key"
            :class="['spec-row', { 'last': i === SPECS.length - 1 }]"
          >
            <span class="spec-key">{{ key }}:</span>
            <span class="spec-val">{{ val }}</span>
          </div>
          <div class="buy-row">
            <a
              href="https://uzum.uz/ru/product/smartfon-ajib-i25-1509056"
              target="_blank"
              class="btn-dark"
            >Xarid qilish</a>
            <a
              href="https://uzum.uz/ru/product/smartfon-ajib-i25-1507292?skuid=4942294"
              target="_blank"
              class="btn-purple"
            >
              <img
                v-if="uzumIconOk"
                src="https://ajib.uz/wp-content/uploads/2024/10/Uzum-01-4.webp"
                alt="Uzum"
                class="uzum-icon"
                @error="uzumIconOk = false"
              />
              Xarid qilish
            </a>
            <span class="price-pill">1 399 000 So'm</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const THUMBS = [
  'https://ajib.uz/wp-content/uploads/2025/02/1.png',
  'https://ajib.uz/wp-content/uploads/2025/02/3-300x300.png',
]

const SPECS: [string, string][] = [
  ['Model', 'ajib i25'],
  ['Protsessor', 'Unisoc T606'],
  ['Displey', '6,7" HD+ IPS 90Hz'],
  ['Xotira', '128GB'],
  ['Batareya quvvati', '5000mAh'],
  ['Asosiy kamera', '48MP'],
  ['Old kamera', '16MP'],
  ['Internet', '5G/4G/3G/2G'],
  ['Wi-fi', '2.4G/5G'],
]

const activeImg = ref(0)
const imgOk = ref([true, true])
const uzumIconOk = ref(true)

const setFailed = (i: number) => {
  imgOk.value = imgOk.value.map((v, idx) => (idx === i ? false : v))
}
</script>

<style scoped>
.overview-section { padding: 80px 0; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.overview-title {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 40px;
  color: #111;
}

.overview-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 40px 48px;
}

/* Image column */
.image-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.main-img-wrap {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-img {
  height: 280px;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.1));
  transition: opacity 0.25s;
}
.img-placeholder {
  width: 180px;
  height: 280px;
  border-radius: 20px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bbb;
  font-size: 12px;
}

.thumbs-row { display: flex; gap: 10px; }
.thumb-btn {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  background: #e8e7e4;
  padding: 4px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.thumb-btn.active { border-color: #111; }
.thumb-img { width: 100%; height: 100%; object-fit: contain; }
.thumb-placeholder { width: 100%; height: 100%; background: #d0d0d0; border-radius: 6px; }

/* Specs column */
.specs-col { display: flex; flex-direction: column; }
.spec-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dotted #ccc;
}
.spec-row.last { border-bottom: none; }
.spec-key { font-size: 14px; color: #555; font-weight: 500; white-space: nowrap; }
.spec-val { font-size: 14px; font-weight: 600; color: #111; text-align: right; }

.buy-row {
  display: flex;
  gap: 10px;
  margin-top: 28px;
  flex-wrap: wrap;
  align-items: center;
}

.btn-dark, .btn-purple {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 24px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s;
  color: #fff;
}
.btn-dark { background: #111; }
.btn-dark:hover { opacity: 0.8; }
.btn-purple { background: #6a00f8; }
.btn-purple:hover { background: #5800d4; }

.uzum-icon {
  height: 18px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.price-pill {
  display: inline-flex;
  align-items: center;
  padding: 13px 22px;
  border-radius: 50px;
  border: 1.5px solid #ccc;
  font-size: 14px;
  font-weight: 700;
  color: #111;
  background: #fff;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .overview-section { padding: 48px 0; }
  .overview-card { grid-template-columns: 1fr; padding: 28px 20px; gap: 24px; }
  .main-img-wrap { height: 200px; }
  .main-img { height: 180px; }
  .overview-title { margin-bottom: 24px; }
}

@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .overview-section { padding: 32px 0; }
  .overview-title { font-size: 20px; margin-bottom: 16px; }
  .overview-card { padding: 20px 16px; border-radius: 16px; }
  .main-img-wrap { height: 180px; }
  .main-img { height: 160px; }
  .spec-key { font-size: 13px; }
  .spec-val { font-size: 13px; }
  .buy-row { flex-direction: column; align-items: stretch; margin-top: 20px; }
  .btn-dark, .btn-purple { justify-content: center; }
  .price-pill { justify-content: center; }
}
</style>
