<template>
  <main style="padding-top: 70px;">
    <ProductHero
      :image="heroImage"
      :specs="heroSpecs"
      :buy-link="product?.buy_button_link"
      :uzum-link="product?.uzum_button_link"
    />
    <ProductOverview
      :title="product?.model_name"
      :images="overviewImages"
      :specs="characteristicsItems"
      :price="product?.price"
      :buy-link="product?.buy_button_link"
      :uzum-link="product?.uzum_button_link"
    />
    <ProductKeySpecs
      :image="parametrsPhoto"
      :specs="parametrsItems"
    />
    <div v-scroll-animate="'fade-up'">
      <ProductFeatures
        :image="parametrsPhoto"
        :title="product?.model_name"
        :tiles="parametrsItems"
      />
    </div>
    <ProductDescription
      :title="product?.model_name"
      :description="product?.description"
    />
    <ProductLifestyle :image="middleBannerImage" />
    <!-- <ProductTechSpecs :specs="characteristicsItems" /> -->
    <ProductRelated />
  </main>
</template>

<script setup lang="ts">
import ProductHero from './ProductHero.vue'
import ProductOverview from './ProductOverview.vue'
import ProductKeySpecs from './ProductKeySpecs.vue'
import ProductFeatures from './ProductFeatures.vue'
import ProductDescription from './ProductDescription.vue'
import ProductLifestyle from './ProductLifestyle.vue'
import ProductTechSpecs from './ProductTechSpecs.vue'
import ProductRelated from './ProductRelated.vue'

const props = defineProps<{ id: string | number }>()

const { data } = useApiService().Phone.PhoneController_findOne(props.id)
const product = computed<any>(() => data.value ?? null)

const heroImage = computed<string>(() => product.value?.hero?.photo ?? '')

const characteristicsItems = computed<{ key: string; value: string }[]>(() => {
  const raw = product.value?.characteristics_items ?? product.value?.characteristics?.items ?? []
  return Array.isArray(raw) ? raw.filter((i: any) => i?.key || i?.value) : []
})

const heroSpecs = computed<string[]>(() =>
  characteristicsItems.value
    .slice(0, 4)
    .map((i) => (i.key && i.value ? `${i.key} ${i.value}` : i.key || i.value || ''))
    .filter(Boolean),
)

const overviewImages = computed<string[]>(() => {
  const photos: string[] = product.value?.characteristics?.photos ?? []
  if (photos.length) return photos
  return heroImage.value ? [heroImage.value] : []
})

const parametrsPhoto = computed<string>(() => product.value?.parametrs?.data?.photo ?? heroImage.value)

const parametrsItems = computed<{ title: string; value: string }[]>(() => {
  const raw = product.value?.parametrs?.data?.items ?? []
  return Array.isArray(raw) ? raw.filter((i: any) => i?.title || i?.value) : []
})

const middleBannerImage = computed<string>(() => product.value?.middle_banner?.image ?? '')
</script>
