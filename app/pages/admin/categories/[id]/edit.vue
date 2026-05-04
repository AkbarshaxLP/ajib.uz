<template>
  <views-admin-categories-category-form :id="id" />
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'admin-panel' })
const route = useRoute()
const id = route.params.id as string
</script>
