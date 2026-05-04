<template>
  <main class="flex-1 overflow-y-auto">
    <form @submit.prevent="onSubmit" class="p-6 space-y-6">

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
          class="grid grid-cols-3 gap-4 border rounded-xl p-4"
        >
          <!-- IMAGE -->
          <FormField :name="`hero_banner.${index}.image`">
            <div class="space-y-2">
              <Label>Image</Label>
              <Input type="file" @change="onHeroFileChange($event, index)" />
            </div>
          </FormField>

          <!-- SELECT -->
          <FormField :name="`hero_banner.${index}.model_id`">
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
                    :value="phone.id"
                  >
                    {{ phone?.model_name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          <!-- REMOVE -->
          <div class="flex items-end">
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

        <FormField name="banners.middle">
          <div class="space-y-2">
            <Label>Image</Label>
            <Input type="file" @change="onBannerChange($event, 'middle')" />
          </div>
        </FormField>
      </Card>

      <!-- FOOTER -->
      <Card class="p-5 space-y-4">
        <h2 class="text-lg font-semibold">Footer banner</h2>

        <FormField name="banners.footer">
          <div class="space-y-2">
            <Label>Image</Label>
            <Input type="file" @change="onBannerChange($event, 'footer')" />
          </div>
        </FormField>
      </Card>

      <!-- SUBMIT -->
      <div>
        <Button type="submit" class="w-full">
          Сохранить
        </Button>
      </div>

    </form>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const { data: phones } = useApiService().Phone.PhoneController_findAll();


const form = reactive({
  hero_banner: [
    {
      image: null as File | null,
      model_id: ''
    }
  ],
  banners: {
    middle: null as File | null,
    footer: null as File | null
  }
})

// HERO
const addHero = () => {
  form.hero_banner.push({
    image: null,
    model_id: ''
  })
}

const removeHero = (index: number) => {
  form.hero_banner.splice(index, 1)
}

const onHeroFileChange = (e: Event, index: number) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    form.hero_banner[index].image = file
  }
}

// BANNERS
const onBannerChange = (e: Event, type: 'middle' | 'footer') => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    form.banners[type] = file
  }
}

// SUBMIT
const onSubmit = async () => {
  const fd = new FormData()

  form.hero_banner.forEach((item, index) => {
    if (item.image) {
      fd.append(`hero_banner[${index}].image`, item.image)
    }
    fd.append(`hero_banner[${index}].model_id`, item.model_id)
  })

  if (form.banners.middle) {
    fd.append('banners.middle', form.banners.middle)
  }

  if (form.banners.footer) {
    fd.append('banners.footer', form.banners.footer)
  }

  // debug
  for (const [k, v] of fd.entries()) {
    console.log(k, v)
  }

  useApiService().Main_Page.MainPageController_update(fd)

  // await $fetch('/api', { method: 'POST', body: fd })
}
</script>