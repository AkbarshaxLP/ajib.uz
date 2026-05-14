<template>
  <main class="category-page">
    <div class="container">
      <h1 class="page-title">{{ category?.name || ' ' }}</h1>

      <div v-if="phones.length" class="phones-grid">
        <div v-for="phone in phones" :key="phone.id" class="phone-card">
          <h3 class="phone-name">{{ phone.model_name }}</h3>
          <p v-if="phone.price" class="phone-price">{{ phone.price }} So'm</p>

          <div class="phone-btns">
            <a v-if="phone.buy_button_link" :href="phone.buy_button_link" target="_blank" class="btn btn--dark">Xarid
              qilish</a>
            <NuxtLink v-else :to="`/products/${phone.id}`" class="btn btn--dark">Xarid qilish</NuxtLink>

            <a v-if="phone.uzum_button_link" :href="phone.uzum_button_link" target="_blank" class="btn btn--purple">
              <img src="https://ajib.uz/wp-content/uploads/2024/10/Uzum-01-4.webp" alt="Uzum" class="uzum-icon" />
              Xarid qilish
            </a>
          </div>

          <NuxtLink :to="`/products/${phone.id}`" class="phone-img-wrap">
            <img v-if="phoneImage(phone)" :src="phoneImage(phone)" :alt="phone.model_name" class="phone-img" />
            <div v-else class="phone-img-placeholder" />
          </NuxtLink>
        </div>
      </div>

      <p v-else-if="!pending" class="empty-state">
        Hozircha bu kategoriyada telefonlar yo'q
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string | number }>()

const { data: categoryData } = useApiService().Dictionary.CategoryController_findOne(props.id)
const { data: phonesData, pending } = useApiService().Phone.PhoneController_findAll()

const category = computed<any>(() => categoryData.value ?? null)

const phones = computed<any[]>(() => {
  const all = (phonesData.value as any[] | null) ?? []
  const id = Number(props.id)
  return all.filter((p) => (p.category?.id ?? p.category_id) === id)
})

const phoneImage = (p: any) =>
  p?.characteristics?.photos?.[0]
  ?? p?.hero?.photo
  ?? p?.parametrs?.data?.photo
  ?? ''
</script>

<style scoped>
.category-page {
  padding: 100px 0 80px;
  background: #ebedec;
  min-height: 100vh;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-title {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #111;
  margin-bottom: 36px;
}

.phones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.phone-card {
  background: #fff;
  border-radius: 24px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.phone-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.phone-name {
  font-size: 20px;
  font-weight: 800;
  color: #111;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.phone-price {
  font-size: 15px;
  font-weight: 600;
  color: #444;
  margin-bottom: 16px;
}

.phone-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 240px;
  margin-bottom: 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 50px;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s, background 0.15s;
  white-space: nowrap;
}

.btn--dark {
  background: #111;
  color: #fff;
}

.btn--dark:hover {
  opacity: 0.85;
}

.btn--purple {
  background: #6a00f8;
  color: #fff;
}

.btn--purple:hover {
  background: #5800d4;
}

.uzum-icon {
  height: 16px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.phone-img-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 280px;
  margin-top: auto;
}

.phone-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.phone-card:hover .phone-img {
  transform: scale(1.04);
}

.phone-img-placeholder {
  width: 140px;
  height: 220px;
  border-radius: 20px;
  background: #f0f0f0;
}

.empty-state {
  text-align: center;
  font-size: 15px;
  color: #888;
  padding: 80px 20px;
}

@media (max-width: 1024px) {
  .phones-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .category-page {
    padding: 90px 0 48px;
  }

  .container {
    padding: 0 16px;
  }

  .phones-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .phone-card {
    padding: 22px 18px 0;
    border-radius: 18px;
  }

  .phone-img-wrap {
    height: 240px;
  }
}
</style>
