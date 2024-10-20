<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router/auto'
import { useDatasetStore } from '~/stores/dataset'

const props = defineProps<{ item: RouteRecordRaw }>()
const icon = computed(() => props.item.meta?.icon)
const title = computed(() => props.item.meta?.title)

const pages = ref()

const datasetStore = useDatasetStore()
const { datasetYears } = storeToRefs(datasetStore)

const fetchPages = async () => {
  if (pages.value) return
  if (!datasetYears.value.length) await useDatasetStore().fetchDatasetYears()

  pages.value = datasetYears.value.map((el) => ({
    name: el.year,
    label: `Tahun ${el.year}`,
    icon: 'mdi-circle-small',
  }))
}
</script>

<template>
  <v-list-group
    :prepend-icon="icon"
    color="primary"
    @click="fetchPages"
  >
    <template #activator="{ props: vProps }">
      <v-list-item
        :title="title"
        link
        nav
        v-bind="vProps"
      />
    </template>

    <v-skeleton-loader
      v-if="!pages"
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
  background: rgb(var(--v-theme-background)) !important;
}
</style>
