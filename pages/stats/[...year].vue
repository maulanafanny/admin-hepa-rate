<script setup lang="ts">
const route = useRoute()
const currentRouteYear = computed(() => route.path.split('/')[2])

definePageMeta({
  title: 'Kriteria',
  breadcrumb: 'disabled',
})

const { data: criterias, pending: loadingCriterias } = useLazyFetch('/api/criteria/findByYear', {
  params: { year: currentRouteYear.value },
})
</script>

<template>
  <v-container fluid>
    <h1 class="mb-3">Grafik Tingkat Kerawanan Tahunan Hepatitis-A</h1>

    <v-card
      class="pa-2"
      height="600px"
      :loading="loadingCriterias"
    >
      <ChartBar
        v-if="!loadingCriterias"
        :data-values="criterias?.map((c) => c.criteria.cluster_id + 1) || []"
      />
    </v-card>
  </v-container>
</template>

<style></style>
