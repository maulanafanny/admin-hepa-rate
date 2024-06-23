<script setup lang="ts">
import DialogConfirm from '~/components/DialogConfirm.vue'
import type { DataTableHeaders } from '~/plugins/vuetify'

definePageMeta({
  icon: 'mdi-database-outline',
  title: 'Data Kriteria',
  drawerIndex: 4,
  breadcrumb: 'disabled',
  widget: 'nav-menu-year-group',
})

const search = ref('')
const dialogDelete = ref<InstanceType<typeof DialogConfirm> | null>(null)

const headers: DataTableHeaders = [
  { title: 'No', key: 'no' },
  { title: 'Kecamatan', key: 'district' },
  { title: 'Air Bersih', key: 'clean_water_rate' },
  { title: 'Histori Kasus', key: 'total_cases' },
  { title: 'Kepadatan Penduduk', key: 'population_density' },
  { title: 'Sanitasi Lingkungan', key: 'sanitation_rate' },
  { title: 'Rumah Sehat', key: 'safe_house_rate' },
  { title: 'Aksi', key: 'actions', align: 'center' },
]
const datasets = ref([
  {
    district: 'Arjosari',
    clean_water_rate: '1',
    total_cases: '34',
    population_density: '42110',
    sanitation_rate: '0.68',
    safe_house_rate: '0.7792',
  },
  {
    district: 'Bandar',
    clean_water_rate: '0.667',
    total_cases: '17',
    population_density: '45109',
    sanitation_rate: '0.977',
    safe_house_rate: '0.7624',
  },
  {
    district: 'Donorojo',
    clean_water_rate: '0.364',
    total_cases: '10',
    population_density: '38309',
    sanitation_rate: '1',
    safe_house_rate: '0.7815',
  },
  {
    district: 'Kebonagung',
    clean_water_rate: '0.92',
    total_cases: '2',
    population_density: '47126',
    sanitation_rate: '1',
    safe_house_rate: '0.7752',
  },
  {
    district: 'Nawangan',
    clean_water_rate: '1',
    total_cases: '16',
    population_density: '51856',
    sanitation_rate: '1',
    safe_house_rate: '0.7716',
  },
  {
    district: 'Ngadirojo',
    clean_water_rate: '0.88',
    total_cases: '255',
    population_density: '48927',
    sanitation_rate: '0.929',
    safe_house_rate: '0.778',
  },
  {
    district: 'Pacitan',
    clean_water_rate: '1',
    total_cases: '7',
    population_density: '77954',
    sanitation_rate: '0.809',
    safe_house_rate: '0.7843',
  },
  {
    district: 'Pringkuku',
    clean_water_rate: '1',
    total_cases: '5',
    population_density: '37232',
    sanitation_rate: '0.995',
    safe_house_rate: '0.7803',
  },
  {
    district: 'Punung',
    clean_water_rate: '1',
    total_cases: '12',
    population_density: '33227',
    sanitation_rate: '1',
    safe_house_rate: '0.7761',
  },
  {
    district: 'Sudimoro',
    clean_water_rate: '1',
    total_cases: '699',
    population_density: '34841',
    sanitation_rate: '0.942',
    safe_house_rate: '0.779',
  },
  {
    district: 'Tegalombo',
    clean_water_rate: '1',
    total_cases: '12',
    population_density: '53255',
    sanitation_rate: '0.992',
    safe_house_rate: '0.7825',
  },
  {
    district: 'Tulakan',
    clean_water_rate: '1',
    total_cases: '102',
    population_density: '86683',
    sanitation_rate: '0.941',
    safe_house_rate: '0.803',
  },
])
</script>

<template>
  <v-container fluid>
    <h1 class="mb-3">Data Kriteria Hepatitis-A Pacitan</h1>

    <v-btn
      color="primary"
      class="mb-3"
    >
      Tambah Data
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
          <v-data-table
            :headers="headers"
            :items="datasets"
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
            <template #bottom>
              <div />
            </template>
          </v-data-table>
          <DialogConfirm ref="dialogDelete" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
