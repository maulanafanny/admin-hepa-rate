<script setup lang="ts">
import type { DataTableHeaders } from '~/plugins/vuetify'
import type { Criteria } from '~/types/criteria'

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
  { title: 'Kepadatan Penduduk', key: 'criteria.total_population' },
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
</script>

<template>
  <v-container fluid>
    <h1 class="mb-3">Data Kriteria Hepatitis-A Pacitan</h1>

    <v-btn
      color="primary"
      class="mb-3"
    >
      Perbarui Cluster
    </v-btn>
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
              :loading="loadingCriterias"
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
                <v-chip :color="clusterDetail[item.criteria.cluster_id].color">
                  {{ clusterDetail[item.criteria.cluster_id].label }}
                </v-chip>
              </template>

              <template #bottom />
            </v-data-table>

            <template #fallback>
              <v-data-table
                :headers="headers"
                :items="[]"
                :loading="true"
              >
                <template #bottom />
              </v-data-table>
            </template>
          </client-only>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
