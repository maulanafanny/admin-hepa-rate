<script setup lang="ts">
import type { DataTableHeaders } from '~/plugins/vuetify'
import type { ClusterResult, Criteria } from '~/types/criteria'

definePageMeta({
  title: 'Cluster',
  breadcrumb: 'disabled',
})

const route = useRoute()
const currentRouteYear = computed(() => route.path.split('/')[2])

const headers: DataTableHeaders = [
  { title: 'No', key: 'no', sortable: false },
  { title: 'Kecamatan', key: 'district.name' },
  { title: 'Air Bersih', key: 'criteria.clean_water_rate' },
  { title: 'Histori Kasus', key: 'criteria.total_case' },
  { title: 'Jumlah Penduduk', key: 'criteria.total_population' },
  { title: 'Sanitasi Lingkungan', key: 'criteria.sanitation_rate' },
  { title: 'Rumah Sehat', key: 'criteria.safe_house_rate' },
  { title: 'Kerawanan', key: 'criteria.cluster_id', align: 'center' },
]
const clusterDetail = [
  {
    label: 'Rendah',
    color: 'success',
  },
  {
    label: 'Sedang',
    color: 'warning',
  },
  {
    label: 'Tinggi',
    color: 'error',
  },
]

const search = ref('')
const { data: criterias, pending: loadingCriterias } = useLazyFetch<Criteria[]>(
  '/api/criteria/findByYear',
  {
    params: { year: currentRouteYear.value },
  },
)

const loadingClusters = ref(false)
const updateClusters = async () => {
  try {
    loadingClusters.value = true

    const result = await useFetch<ClusterResult[]>('/api/criteria/updateCluster', {
      method: 'POST',
      body: { year_id: criterias.value?.[0].year.id },
    })

    result.data.value?.forEach(({ id, cluster_id }) => {
      const criteria = criterias.value?.find((criteria) => criteria.criteria.id === id)

      if (criteria) {
        criteria.criteria.cluster_id = cluster_id
        criteria.year.is_stale = false
      }
    })

    Notify.success('Berhasil memperbarui cluster')
  } catch (error) {
    Notify.error('Gagal memperbarui cluster')
  } finally {
    loadingClusters.value = false
  }
}
const isStale = computed(() => criterias.value?.[0].year.is_stale)
</script>

<template>
  <v-container fluid>
    <h1 class="mb-3">Hasil Clustering Hepatitis-A Pacitan</h1>

    <div class="d-flex align-center mb-3">
      <v-btn
        :color="isStale ? 'primary' : ''"
        :disabled="!isStale"
        :loading="loadingClusters"
        class="mr-3"
        @click="updateClusters"
      >
        Perbarui Cluster
      </v-btn>

      <div v-if="loadingClusters">
        <span>Sedang Memproses Data</span>
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
      <div v-else-if="!isStale">
        <span class="text-success">Data sudah terbaru</span>
        <v-icon
          icon="mdi-check-circle"
          color="success"
          class="ml-2"
        />
      </div>
      <div v-else>
        <span class="text-warning">Data perlu diperbarui</span>
        <v-icon
          icon="mdi-alert-box"
          color="warning"
          class="ml-2"
        />
      </div>
    </div>

    <v-row>
      <v-col>
        <v-card>
          <client-only>
            <teleport to="#app-bar">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                density="compact"
                class="mr-2"
                rounded="xl"
                flat
                variant="solo"
                style="width: 250px"
              />
            </teleport>
          </client-only>

          <client-only>
            <v-data-table
              :headers="headers"
              :items="criterias || undefined"
              :loading="loadingCriterias && loadingClusters"
              item-value="name"
              :items-per-page="12"
              :search="search"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template #item.actions>
                <v-defaults-provider
                  :defaults="{
                    VBtn: {
                      size: 20,
                      rounded: 'sm',
                      variant: 'text',
                      class: 'ml-1',
                      color: '',
                    },
                    VIcon: {
                      size: 20,
                    },
                  }"
                >
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-btn
                        icon="mdi-pencil-outline"
                        v-bind="props"
                      />
                    </template>
                    <span>Ubah</span>
                  </v-tooltip>
                </v-defaults-provider>
              </template>

              <template #item.criteria.cluster_id="{ item }">
                <v-chip
                  v-if="item.criteria.cluster_id !== null"
                  :color="clusterDetail[item.criteria.cluster_id].color"
                >
                  {{ clusterDetail[item.criteria.cluster_id].label }}
                </v-chip>
                <v-chip v-else> Unknown </v-chip>
              </template>
            </v-data-table>

            <template #fallback>
              <v-data-table
                :headers="headers"
                :items="[]"
                :loading="true"
              />
            </template>
          </client-only>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
