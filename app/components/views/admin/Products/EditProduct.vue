<template>
  <views-admin-products-add-product :id="id" />
</template>

<script setup lang="ts">
const props = defineProps<{ id: string | number }>()
const id = props.id
</script>
