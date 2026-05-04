<template>
  <div class="p-6 max-w-lg">
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink
        to="/admin/categories"
        class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      >
        <Icon name="lucide:arrow-left" size="16" />
      </NuxtLink>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Категории</span>
        <Icon name="lucide:chevron-right" size="14" class="text-muted-foreground/50" />
        <span class="text-sm font-medium">{{ isEdit ? 'Изменить категорию' : 'Новая категория' }}</span>
      </div>
    </div>

    <div class="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
      <div class="px-5 py-4 border-b border-border/60 bg-muted/20" style="border-top: 3px solid #6366f1">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #ede9fe; color: #6366f1">
            <Icon name="lucide:tag" size="16" />
          </div>
          <div>
            <h2 class="text-sm font-semibold leading-tight">Информация о категории</h2>
            <p class="text-xs text-muted-foreground mt-0.5">Название и URL-идентификатор</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="onSubmit" class="p-5 space-y-4">
        <Transition name="fade">
          <div v-if="loadingCategory" class="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-4">
            <Icon name="lucide:loader-2" size="16" class="animate-spin text-muted-foreground shrink-0" />
            <p class="text-sm text-muted-foreground">Загрузка данных категории...</p>
          </div>
        </Transition>

        <Transition name="fade">
          <div v-if="displayError" class="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
            <Icon name="lucide:circle-alert" size="16" class="text-destructive mt-0.5 shrink-0" />
            <p class="text-sm text-destructive">{{ (displayError as any)?.message || (isEdit ? 'Ошибка при сохранении' : 'Ошибка при создании') }}</p>
          </div>
        </Transition>

        <div class="space-y-1.5">
          <label class="text-sm font-medium leading-none flex items-center gap-1">
            Название <span class="text-destructive">*</span>
          </label>
          <Input v-model="form.name" placeholder="Смартфоны" required />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium leading-none flex items-center gap-1">
            Slug <span class="text-destructive">*</span>
          </label>
          <div class="relative">
            <Input v-model="form.slug" placeholder="smartfony" class="pl-7" required />
            <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 text-xs">/</span>
          </div>
          <p class="text-xs text-muted-foreground">Латинские буквы, цифры и дефис</p>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2">
          <NuxtLink
            to="/admin/categories"
            class="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium border border-input bg-background hover:bg-muted transition-colors"
          >
            Отмена
          </NuxtLink>
          <button
            type="submit"
            :disabled="isPending"
            class="inline-flex items-center gap-2 justify-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon v-if="isPending" name="lucide:loader-2" size="14" class="animate-spin" />
            <Icon v-else name="lucide:check" size="14" />
            {{ isPending ? (isEdit ? 'Сохранение...' : 'Создание...') : (isEdit ? 'Сохранить' : 'Создать') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = defineProps<{ id?: string | number }>()
const isEdit = computed(() => !!props.id)

const form = ref({ name: '', slug: '' })
const loadingCategory = ref(false)

onMounted(async () => {
  if (!props.id) return
  loadingCategory.value = true
  try {
    const {data: category} = await useApiService().Dictionary.CategoryController_findOne(props.id)
    form.value = category.value
  } catch (e) {
    console.error('Ошибка загрузки категории:', e)
  } finally {
    loadingCategory.value = false
  }
})

const pending = ref(false)
const error = ref<any>(null)

const isPending = computed(() => pending.value)
const displayError = computed(() => error.value)

async function onSubmit() {
  pending.value = true
  error.value = null
  try {
    if (isEdit.value) {
      await useApiService().Dictionary.CategoryController_update(props.id, form.value)
    } else {
      await useApiService().Dictionary.CategoryController_create(form.value)
    }
    navigateTo('/admin/categories')
  } catch (e) {
    error.value = e
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
