<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Категории</h1>
        <p class="text-sm text-muted-foreground mt-1">Управление категориями товаров</p>
      </div>
      <Button as-child>
        <NuxtLink to="/admin/categories/add">+ Добавить категорию</NuxtLink>
      </Button>
    </div>

    <div class="rounded-lg border bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b bg-muted/40">
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Название</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Slug</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Действия</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="pending">
            <tr v-for="i in 4" :key="i" class="border-b">
              <td v-for="j in 4" :key="j" class="px-4 py-3">
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
              <td class="px-4 py-3 text-muted-foreground">{{ category.slug }}</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" as-child>
                    <NuxtLink :to="`/admin/categories/${category.id}/edit`">Изменить</NuxtLink>
                  </Button>
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
              <td colspan="4" class="px-4 py-16 text-center text-muted-foreground">
                <p class="text-base mb-1">Категории не найдены</p>
                <p class="text-sm">
                  <NuxtLink to="/admin/categories/add" class="underline underline-offset-2">Добавить первую категорию</NuxtLink>
                </p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const config = useRuntimeConfig()

const { data, pending, refresh } = useApiService().Dictionary.CategoryController_findAll()

const categories = computed(() => data.value ?? [])

const deletingId = ref<number | null>(null)

async function deleteCategory(id: number) {
  if (!confirm('Удалить категорию?')) return
  deletingId.value = id
  try {
    await $fetch(`/api/v1/category/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase,
      headers: { Authorization: `Bearer ${localStorage.getItem('auth:access')}` },
    })
    await refresh()
  } finally {
    deletingId.value = null
  }
}
</script>
