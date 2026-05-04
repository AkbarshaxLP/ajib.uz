<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Категории</h1>
        <p class="text-sm text-muted-foreground mt-1">Управление категориями товаров</p>
      </div>
      <Button @click="openCreate">+ Добавить категорию</Button>
    </div>

    <div class="rounded-lg border bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b bg-muted/40">
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Название</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Действия</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="pending">
            <tr v-for="i in 4" :key="i" class="border-b">
              <td v-for="j in 3" :key="j" class="px-4 py-3">
                <Skeleton class="h-4 w-full" />
              </td>
            </tr>
          </template>

          <template v-else-if="categories.length">
            <tr
              v-for="category in categories"
              :key="category.id"
              class="border-b last:border-0 hover:bg-muted/20 transition-colors"
            >
              <td class="px-4 py-3 text-muted-foreground font-mono text-xs">{{ category.id }}</td>
              <td class="px-4 py-3 font-medium">{{ category.name }}</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="openEdit(category)">Изменить</Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    :disabled="deletingId === category.id"
                    @click="deleteCategory(category.id)"
                  >
                    {{ deletingId === category.id ? '...' : 'Удалить' }}
                  </Button>
                </div>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr>
              <td colspan="3" class="px-4 py-16 text-center text-muted-foreground">
                <p class="text-base mb-1">Категории не найдены</p>
                <p class="text-sm">
                  <button class="underline underline-offset-2" @click="openCreate">Добавить первую категорию</button>
                </p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="closeModal" />
        <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div class="px-5 py-4 border-b border-border/60 bg-muted/20 rounded-t-xl" style="border-top: 3px solid #6366f1">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #ede9fe; color: #6366f1">
                  <Icon name="lucide:tag" size="16" />
                </div>
                <div>
                  <h2 class="text-sm font-semibold leading-tight">{{ editingId ? 'Изменить категорию' : 'Новая категория' }}</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Введите название</p>
                </div>
              </div>
              <button
                @click="closeModal"
                class="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <Icon name="lucide:x" size="15" />
              </button>
            </div>
          </div>

          <form @submit.prevent="onSubmit" class="p-5 space-y-4">
            <Transition name="fade">
              <div v-if="formError" class="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
                <Icon name="lucide:circle-alert" size="16" class="text-destructive mt-0.5 shrink-0" />
                <p class="text-sm text-destructive">{{ (formError as any)?.message || 'Ошибка при сохранении' }}</p>
              </div>
            </Transition>

            <div class="space-y-1.5">
              <label class="text-sm font-medium leading-none flex items-center gap-1">
                Название <span class="text-destructive">*</span>
              </label>
              <Input v-model="form.name" placeholder="Смартфоны" required autofocus />
            </div>

            <div class="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                @click="closeModal"
                class="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium border border-input bg-background hover:bg-muted transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="formPending"
                class="inline-flex items-center gap-2 justify-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icon v-if="formPending" name="lucide:loader-2" size="14" class="animate-spin" />
                <Icon v-else name="lucide:check" size="14" />
                {{ formPending ? (editingId ? 'Сохранение...' : 'Создание...') : (editingId ? 'Сохранить' : 'Создать') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'

const { data, pending, refresh } = useApiService().Dictionary.CategoryController_findAll()
const categories = computed(() => (data.value as any[] | null) ?? [])

const deletingId = ref<number | null>(null)

async function deleteCategory(id: number) {
  if (!confirm('Удалить категорию?')) return
  deletingId.value = id
  try {
    await useApiService({ immediate: false }).Dictionary.CategoryController_remove(id)
    await refresh()
  } finally {
    deletingId.value = null
  }
}

/* ───── modal ───── */
const modalOpen = ref(false)
const editingId = ref<number | null>(null)
const form = ref({ name: '' })
const formPending = ref(false)
const formError = ref<any>(null)

function openCreate() {
  editingId.value = null
  form.value = { name: '' }
  formError.value = null
  modalOpen.value = true
}

function openEdit(category: any) {
  editingId.value = category.id
  form.value = { name: category.name }
  formError.value = null
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function onSubmit() {
  formPending.value = true
  formError.value = null
  try {
    if (editingId.value) {
      await useApiService({ immediate: true }).Dictionary.CategoryController_update(editingId.value, form.value)
    } else {
      await useApiService({ immediate: true }).Dictionary.CategoryController_create(form.value)
    }
    closeModal()
    await refresh()
  } catch (e) {
    formError.value = e
  } finally {
    formPending.value = false
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.15s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
