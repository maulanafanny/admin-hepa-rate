<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router/auto'
const props = defineProps<{ item: RouteRecordRaw }>()
const icon = computed(() => props.item.meta?.icon)
const title = computed(() => props.item.meta?.title)
const loading = ref(false)
const pages = ref()
const fetchData = () => {
  if (pages.value) return
  loading.value = true
  setTimeout(() => {
    pages.value = [
      {
        name: '2017',
        label: 'Tahun 2017',
        icon: 'mdi-circle-small',
      },
      {
        name: '2018',
        label: 'Tahun 2018',
        icon: 'mdi-circle-small',
      },
      {
        name: '2019',
        label: 'Tahun 2019',
        icon: 'mdi-circle-small',
      },
    ]
    loading.value = false
  }, 500)
}
</script>
<template>
  <v-list-group
    :prepend-icon="icon"
    color="primary"
    @click="fetchData"
  >
    <template #activator="{ props: vProps }">
      <v-list-item
        :title="title"
        v-bind="vProps"
      />
    </template>
    <v-skeleton-loader
      v-if="loading"
      type="list-item-two-line"
      class="menu-year-group-skeleton"
    />
    <v-list-item
      v-for="page in pages"
      v-else
      :key="page"
      :to="`${String(item.path)}/${page.name}`"
      :prepend-icon="page.icon"
      active-class="text-primary"
      :title="page.label"
    />
  </v-list-group>
</template>
<style>
.menu-year-group-skeleton {
  background-color: rgb(var(--v-theme-background));
}
</style>
