<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Продукты</h1>
        <p class="text-sm text-muted-foreground mt-1">Управление каталогом телефонов</p>
      </div>
      <Button as-child>
        <NuxtLink to="/admin/products/add">+ Добавить продукт</NuxtLink>
      </Button>
    </div>

    <div class="rounded-lg border bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b bg-muted/40">
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Модель</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Цена</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Тип</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Новинка</th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">Действия</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="pending">
            <tr v-for="i in 5" :key="i" class="border-b">
              <td v-for="j in 6" :key="j" class="px-4 py-3">
                <Skeleton class="h-4 w-full" />
              </td>
            </tr>
          </template>

          <template v-else-if="products.length">
            <tr
              v-for="product in products"
              :key="product.id"
              class="border-b last:border-0 hover:bg-muted/20 transition-colors"
            >
              <td class="px-4 py-3 text-muted-foreground font-mono text-xs">{{ product.id }}</td>
              <td class="px-4 py-3 font-medium">{{ product.model_name }}</td>
              <td class="px-4 py-3">{{ product.price }}</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-muted">
                  {{ product.phone_type === 'smartphone' ? 'Смартфон' : 'Кнопочный' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                    product.is_new ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                  ]"
                >
                  {{ product.is_new ? 'Да' : 'Нет' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" as-child>
                    <NuxtLink :to="`/admin/products/${product.id}/edit`">Изменить</NuxtLink>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    :disabled="deletingId === product.id"
                    @click="deleteProduct(product.id)"
                  >
                    {{ deletingId === product.id ? '...' : 'Удалить' }}
                  </Button>
                </div>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr>
              <td colspan="6" class="px-4 py-16 text-center text-muted-foreground">
                <p class="text-base mb-1">Продукты не найдены</p>
                <p class="text-sm">
                  <NuxtLink to="/admin/products/add" class="underline underline-offset-2">Добавить первый продукт</NuxtLink>
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

const { data, pending, refresh } = useApi<any[]>('/api/v1/phone', { method: 'GET' })

const products = computed(() => data.value ?? [])

const deletingId = ref<number | null>(null)

async function deleteProduct(id: number) {
  if (!confirm('Удалить продукт?')) return
  deletingId.value = id
  try {
    await $fetch(`/api/v1/phone/${id}`, {
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
