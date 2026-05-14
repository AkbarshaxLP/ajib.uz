<template>
  <section class="hero-section">
    <!-- Full banner image -->
    <img
      v-if="image && imgOk"
      :src="image"
      alt=""
      class="hero-img"
      @error="imgOk = false"
    />
    <div v-else class="hero-fallback">
      <span>{{ alt || 'ajib' }}</span>
    </div>

    <!-- Bottom-left overlay: specs + buttons -->
    <div v-if="buyLink || uzumLink" class="hero-overlay">
      <!-- <ul v-if="specs.length" class="specs-list sa sa--fade-up" ref="specsEl">
        <li v-for="spec in specs" :key="spec" class="spec-item">{{ spec }}</li>
      </ul> -->
      <div v-if="buyLink || uzumLink" class="hero-btns sa sa--fade-up" ref="btnsEl">
        <a
          v-if="buyLink"
          :href="buyLink"
          target="_blank"
          class="uzum-btn uzum-btn--dark"
        >Xarid qilish</a>
        <a
          v-if="uzumLink"
          :href="uzumLink"
          target="_blank"
          class="uzum-btn uzum-btn--purple"
        >
          <img
            v-if="iconOk"
            src="https://ajib.uz/wp-content/uploads/2024/10/Uzum-01-4.webp"
            alt="Uzum"
            class="uzum-icon"
            @error="iconOk = false"
          />
          Xarid qilish
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

withDefaults(defineProps<{
  image?: string
  alt?: string
  specs?: string[]
  buyLink?: string
  uzumLink?: string
}>(), {
  image: '',
  alt: '',
  specs: () => [],
  buyLink: '',
  uzumLink: '',
})

const imgOk = ref(true)
const iconOk = ref(true)
const specsEl = ref<HTMLElement | null>(null)
const btnsEl = ref<HTMLElement | null>(null)

onMounted(() => {
  setTimeout(() => specsEl.value?.classList.add('sa--visible'), 200)
  setTimeout(() => btnsEl.value?.classList.add('sa--visible'), 450)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  display: block;
  height: calc(100vh - 70px);
  object-fit: contain;
  object-position: center top;
  background: #fff;
}

.hero-fallback {
  width: 100%;
  aspect-ratio: 16 / 7;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-fallback span {
  color: rgba(255, 255, 255, 0.15);
  font-size: 32px;
  font-weight: 800;
}

/* Desktop: абсолютный оверлей в левом нижнем углу */
.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30%;
  padding: 0 0 5% 7%;
  background-color: #fff;
}

.specs-list {
  list-style: none;
  margin-bottom: 20px;
}
.spec-item {
  font-size: clamp(11px, 1.1vw, 15px);
  font-weight: 600;
  color: #111;
  margin-bottom: 7px;
  line-height: 1.4;
}

.hero-btns {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.uzum-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s;
  white-space: nowrap;
}
.uzum-btn--dark { background: #111; color: #fff; }
.uzum-btn--dark:hover { background: #333; }
.uzum-btn--purple { background: #6a00f8; color: #fff; }
.uzum-btn--purple:hover { background: #5800d4; }

.uzum-icon {
  height: 20px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

/* Tablet */
@media (max-width: 1024px) {
  .hero-overlay { width: 40%; }
}

/* Mobile: оверлей выходит из потока, картинка уменьшается */
@media (max-width: 768px) {
  .hero-img {
    height: auto;
    min-height: unset;
    object-position: center top;
  }
  .hero-overlay {
    position: static;
    width: 100%;
    padding: 20px 20px 24px;
    background: #fff;
  }
  .spec-item { font-size: 13px; }
  .uzum-btn { padding: 12px 20px; font-size: 14px; }
  .hero-btns { gap: 8px; }
}

@media (max-width: 480px) {
  .uzum-btn { flex: 1; justify-content: center; }
  .hero-btns { flex-direction: column; }
}
</style>
