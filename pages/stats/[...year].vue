<script setup lang="ts">
import ChartBarCumulative from '~/components/Chart/ChartBarCumulative.vue'
import ChartBarYearly from '~/components/Chart/ChartBarYearly.vue'
import type { Criteria } from '~/types/criteria'

definePageMeta({
  title: 'Grafik',
  breadcrumb: 'disabled',
})

const route = useRoute()
const currentRouteYear = computed(() => route.path.split('/')[2])
const currentType = ref('Tahunan')

const { data: criterias, pending: loadingCriterias } = useLazyFetch<Criteria[]>(
  '/api/criteria/findAll',
  {
    params: { year: currentRouteYear.value },
  },
)

const yearlyData = computed(() => {
  return (
    criterias.value
      ?.filter((c) => c.year.year === Number(currentRouteYear.value))
      .map((c) => ({ label: c.district.name, value: c.criteria.cluster_id + 1 })) || []
  )
})

const cumulativeData = computed(() => {
  return (
    criterias.value?.map((c) => ({
      label: c.district.name,
      value: c.criteria.cluster_id + 1,
      dataset: c.year.year,
    })) || []
  )
})
</script>

<template>
  <v-container fluid>
    <h1 class="mb-3">Grafik Tingkat Kerawanan Tahunan Hepatitis-A</h1>

    <v-select
      v-model="currentType"
      :items="['Tahunan', 'Kumulatif']"
      label="Tipe Grafik"
      placeholder="Pilih Tipe Grafik"
      variant="solo-filled"
    />
    <v-card
      class="pa-2"
      height="600px"
      :loading="loadingCriterias"
    >
      <template v-if="!loadingCriterias">
        <ChartBarYearly
          v-if="currentType === 'Tahunan'"
          :data-values="yearlyData"
        />
        <ChartBarCumulative
          v-else
          :data-values="cumulativeData"
        />
      </template>
    </v-card>
  </v-container>
</template>

<style></style>
