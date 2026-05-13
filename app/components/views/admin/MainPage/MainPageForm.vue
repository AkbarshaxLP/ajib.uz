<template>
  <main class="flex-1 overflow-y-auto">
    <form @submit.prevent="onSubmit" class="p-6 space-y-6">

      <!-- Loading -->
      <Transition name="fade">
        <div v-if="pendingGet" class="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-4">
          <Icon name="lucide:loader-2" size="16" class="animate-spin text-muted-foreground shrink-0" />
          <p class="text-sm text-muted-foreground">Загрузка данных...</p>
        </div>
      </Transition>

      <!-- Error -->
      <Transition name="fade">
        <div v-if="submitError" class="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
          <Icon name="lucide:circle-alert" size="16" class="text-destructive mt-0.5 shrink-0" />
          <p class="text-sm text-destructive">{{ (submitError as any)?.message || 'Ошибка при сохранении' }}</p>
        </div>
      </Transition>

      <!-- HERO BANNERS -->
      <Card class="p-5 space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Hero banners</h2>
          <Button type="button" variant="outline" @click="addHero">
            + Добавить
          </Button>
        </div>

        <div
          v-for="(item, index) in form.hero_banner"
          :key="index"
          class="grid grid-cols-[1fr_1fr_auto] gap-4 border rounded-xl p-4 items-start"
        >
          <!-- IMAGE -->
          <div class="space-y-2">
            <Label>Image</Label>
            <input
              type="file"
              accept="image/*"
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              @change="onHeroFileChange($event, index)"
            />
            <div v-if="item.preview" class="mt-2 w-full h-24 rounded-md border border-border overflow-hidden bg-muted">
              <img :src="item.preview" class="w-full h-full object-contain" />
            </div>
          </div>

          <!-- SELECT -->
          <div class="space-y-2">
            <Label>Телефон</Label>
            <Select v-model="item.model_id">
              <SelectTrigger>
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="phone in phones"
                  :key="phone.id"
                  :value="String(phone.id)"
                >
                  {{ phone?.model_name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- REMOVE -->
          <div class="flex items-end h-full">
            <Button
              type="button"
              variant="destructive"
              @click="removeHero(index)"
            >
              Удалить
            </Button>
          </div>
        </div>
      </Card>

      <!-- MIDDLE -->
      <Card class="p-5 space-y-4">
        <h2 class="text-lg font-semibold">Middle banner</h2>
        <div class="space-y-2">
          <Label>Image</Label>
          <input
            type="file"
            accept="image/*"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            @change="onBannerChange($event, 'middle')"
          />
          <div v-if="banners.middle.preview" class="mt-2 w-full h-32 rounded-md border border-border overflow-hidden bg-muted">
            <img :src="banners.middle.preview" class="w-full h-full object-contain" />
          </div>
        </div>
      </Card>

      <!-- FOOTER -->
      <Card class="p-5 space-y-4">
        <h2 class="text-lg font-semibold">Footer banner</h2>
        <div class="space-y-2">
          <Label>Image</Label>
          <input
            type="file"
            accept="image/*"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            @change="onBannerChange($event, 'footer')"
          />
          <div v-if="banners.footer.preview" class="mt-2 w-full h-32 rounded-md border border-border overflow-hidden bg-muted">
            <img :src="banners.footer.preview" class="w-full h-full object-contain" />
          </div>
        </div>
      </Card>

      <!-- SUBMIT -->
      <div>
        <Button type="submit" class="w-full" :disabled="pendingSubmit">
          {{ pendingSubmit ? 'Сохранение...' : 'Сохранить' }}
        </Button>
      </div>

    </form>
  </main>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const { data: phonesData } = useApiService().Phone.PhoneController_findAll()
const phones = computed(() => (phonesData.value as any[] | null) ?? [])

type HeroItem = {
  image_url: string
  file: File | null
  preview: string
  model_id: string
}
type BannerItem = {
  image_url: string
  file: File | null
  preview: string
}

const form = reactive<{ hero_banner: HeroItem[] }>({
  hero_banner: [],
})

const banners = reactive<{ middle: BannerItem; footer: BannerItem }>({
  middle: { image_url: '', file: null, preview: '' },
  footer: { image_url: '', file: null, preview: '' },
})

/* ───── load existing ───── */
const { data: mainPageData, pending: pendingGet } = useApiService().Main_Page.MainPageController_get()

watch(mainPageData, (val) => {
  if (!val) return
  const v: any = val
  form.hero_banner = (v.hero_banner ?? []).map((b: any) => ({
    image_url: b.image ?? '',
    file: null,
    preview: b.image ?? '',
    model_id: b.model_id ? String(b.model_id) : '',
  }))
  banners.middle = { image_url: v.banners?.middle ?? '', file: null, preview: v.banners?.middle ?? '' }
  banners.footer = { image_url: v.banners?.footer ?? '', file: null, preview: v.banners?.footer ?? '' }
}, { immediate: true })

/* ───── hero ops ───── */
const addHero = () => {
  form.hero_banner.push({ image_url: '', file: null, preview: '', model_id: '' })
}

const removeHero = (index: number) => {
  const item = form.hero_banner[index]
  if (item?.file) URL.revokeObjectURL(item.preview)
  form.hero_banner.splice(index, 1)
}

const onHeroFileChange = (e: Event, index: number) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const item = form.hero_banner[index]
  if (item.file) URL.revokeObjectURL(item.preview)
  item.file = file
  item.preview = URL.createObjectURL(file)
  ;(e.target as HTMLInputElement).value = ''
}

/* ───── banners ops ───── */
const onBannerChange = (e: Event, type: 'middle' | 'footer') => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const slot = banners[type]
  if (slot.file) URL.revokeObjectURL(slot.preview)
  slot.file = file
  slot.preview = URL.createObjectURL(file)
  ;(e.target as HTMLInputElement).value = ''
}

/* ───── submit ───── */
const pendingSubmit = ref(false)
const submitError = ref<any>(null)

function buildFormData() {
  const fd = new FormData()

  const heroPayload = form.hero_banner.map(item => {
    const obj: { model_id: string; image?: string } = { model_id: item.model_id || '' }
    if (!item.file && item.image_url) obj.image = item.image_url
    return obj
  })
  fd.append('hero_banner', JSON.stringify(heroPayload))

  form.hero_banner.forEach(item => {
    if (item.file) fd.append('hero_banner_images', item.file)
  })

  const bannersPayload = {
    middle: banners.middle.file ? '' : (banners.middle.image_url || ''),
    footer: banners.footer.file ? '' : (banners.footer.image_url || ''),
  }
  fd.append('banners', JSON.stringify(bannersPayload))

  if (banners.middle.file) fd.append('banners_middle', banners.middle.file)
  if (banners.footer.file) fd.append('banners_footer', banners.footer.file)

  return fd
}

const onSubmit = async () => {
  pendingSubmit.value = true
  submitError.value = null
  try {
    const fd = buildFormData()
    await useApiService({ immediate: true, body: fd }).Main_Page.MainPageController_update(fd as any)
  } catch (e) {
    submitError.value = e
  } finally {
    pendingSubmit.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
