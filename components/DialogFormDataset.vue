<script setup lang="ts">
import type { DataTableHeaders } from '~/plugins/vuetify'
import type { CreateCriteria, CreateDataset, Criteria } from '~/types/criteria'

defineProps({
  maxWidth: {
    type: String,
    default: '600px',
  },
})

const form = ref()
const dialog = ref(false)
const datasetName = ref('')
const datasets = ref<CreateCriteria[]>([
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 1,
      name: 'Arjosari',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 2,
      name: 'Bandar',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 3,
      name: 'Donorojo',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 4,
      name: 'Kebonagung',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 5,
      name: 'Nawangan',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 6,
      name: 'Ngadirojo',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 7,
      name: 'Pacitan',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 8,
      name: 'Pringkuku',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 9,
      name: 'Punung',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 10,
      name: 'Sudimoro',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 11,
      name: 'Tegalombo',
    },
  },
  {
    criteria: {
      total_case: 0,
      total_population: 0,
      sanitation_rate: 0,
      clean_water_rate: 0,
      safe_house_rate: 0,
    },
    district: {
      id: 12,
      name: 'Tulakan',
    },
  },
])

const datasetPayload: ComputedRef<CreateDataset> = computed(() => {
  return {
    name: datasetName.value,
    datasets: datasets.value,
  }
})

const close = () => {
  dialog.value = false
}

const open = () => {
  dialog.value = true
}

const createHeaders: DataTableHeaders = [
  { title: 'No', key: 'no', sortable: false },
  { title: 'Kecamatan', key: 'district.name', sortable: false, minWidth: '149px' },
  { title: 'Air Bersih', key: 'criteria.clean_water_rate', sortable: false, minWidth: '149px' },
  { title: 'Histori Kasus', key: 'criteria.total_case', sortable: false, minWidth: '149px' },
  {
    title: 'Jumlah Penduduk',
    key: 'criteria.total_population',
    sortable: false,
    minWidth: '149px',
  },
  {
    title: 'Sanitasi Lingkungan',
    key: 'criteria.sanitation_rate',
    sortable: false,
    minWidth: '149px',
  },
  { title: 'Rumah Sehat', key: 'criteria.safe_house_rate', sortable: false, minWidth: '149px' },
]

const validate = async () => {
  return await form.value.validate()
}

const submitForm = async () => {
  const { valid } = await validate()

  if (!valid) {
    Notify.error('Data tidak valid, silakan periksa kembali')

    return
  }

  try {
    await useFetch<Criteria[]>(`/api/criteria/createDataset`, {
      method: 'POST',
      body: {
        ...datasetPayload.value,
      },
    })

    Notify.success('Dataset baru berhasil ditambahkan, mohon reload web untuk melihat perubahan')
  } catch (e) {
    Notify.error(e)
  } finally {
    close()
  }

  return
}

const criteriaRequired = (v: any) => (v !== '' && v !== null && v !== undefined) || 'Wajib diisi'
const notNegative = (v: number) => v >= 0 || 'Tidak boleh negatif'

defineExpose({ open })
</script>

<template>
  <v-dialog
    v-model="dialog"
    :max-width="maxWidth"
  >
    <v-card>
      <v-card-item class="mb-2">
        <v-card-title> Buat Dataset Baru </v-card-title>
      </v-card-item>

      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent="submitForm"
        >
          <v-text-field
            v-model="datasetName"
            solo
            label="Nama Dataset"
            :rules="[(v: string) => !!v || 'Nama dataset tidak boleh kosong']"
          />

          <v-scroll-y-transition>
            <v-data-table
              v-if="dialog"
              :headers="createHeaders"
              :items="datasets || undefined"
              item-value="name"
              :items-per-page="12"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template #item.criteria.clean_water_rate="{ item }">
                <v-text-field
                  v-model.number="item.criteria.clean_water_rate"
                  density="compact"
                  type="number"
                  hide-details="auto"
                  step="0.01"
                  min="0"
                  max="1"
                  name="criteria.clean_water_rate"
                  :rules="[criteriaRequired, notNegative]"
                />
              </template>

              <template #item.criteria.total_case="{ item }">
                <v-text-field
                  v-model.number="item.criteria.total_case"
                  density="compact"
                  type="number"
                  step="1"
                  min="0"
                  hide-details="auto"
                  name="criteria.total_case"
                  :rules="[criteriaRequired, notNegative]"
                />
              </template>

              <template #item.criteria.total_population="{ item }">
                <v-text-field
                  v-model.number="item.criteria.total_population"
                  density="compact"
                  type="number"
                  step="1"
                  min="0"
                  hide-details="auto"
                  name="criteria.total_population"
                  :rules="[criteriaRequired, notNegative]"
                />
              </template>

              <template #item.criteria.sanitation_rate="{ item }">
                <v-text-field
                  v-model.number="item.criteria.sanitation_rate"
                  density="compact"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  hide-details="auto"
                  name="criteria.sanitation_rate"
                  :rules="[criteriaRequired, notNegative]"
                />
              </template>

              <template #item.criteria.safe_house_rate="{ item }">
                <v-text-field
                  v-model.number="item.criteria.safe_house_rate"
                  density="compact"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  hide-details="auto"
                  name="criteria.safe_house_rate"
                  :rules="[criteriaRequired, notNegative]"
                />
              </template>

              <template #bottom />
            </v-data-table>
          </v-scroll-y-transition>
        </v-form>
      </v-card-text>

      <v-card-actions class="ms-auto px-4 pb-4">
        <v-btn
          color="primary darken-1"
          @click="close"
        >
          Batal
        </v-btn>
        <v-btn
          color="primary darken-1"
          @click="submitForm"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
