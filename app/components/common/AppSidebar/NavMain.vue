<script setup lang="ts">
defineProps<{
  items: {
    title: string
    url: string
    icon?: object
    isActive?: boolean
  }[]
}>()

const route = useRoute()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Меню</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton class="py-5" @click="() => $router.push(item.url)" :tooltip="item.title" :is-active="route.path === item.url">
          <component :is="item.icon" v-if="item.icon" class="!w-5 !h-5 mr-1" />
          <span class="text-lg">{{ item.title }}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
