<script setup lang="ts">
import DialogForm from '~/components/DialogForm.vue'
import type { DataTableHeaders } from '~/plugins/vuetify'
import type { Criteria } from '~/types/criteria'

const route = useRoute()
const currentRouteYear = computed(() => route.path.split('/')[2])

definePageMeta({
  title: 'Kriteria',
  breadcrumb: 'disabled',
})

const search = ref('')
const dialogCreate = ref<InstanceType<typeof DialogForm> | null>(null)
const openDialogCreate = () =>
  dialogCreate.value?.open('Tambah Data', {}, async (value: any) => {
    await fetch('/api/criteria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    })
  })

const oldData = ref<any>({})
const editId = ref<number | null>(null)
const headers: DataTableHeaders = [
  { title: 'No', key: 'no', sortable: false },
  { title: 'Kecamatan', key: 'district.name' },
  { title: 'Air Bersih', key: 'criteria.clean_water_rate' },
  { title: 'Histori Kasus', key: 'criteria.total_case' },
  { title: 'Kepadatan Penduduk', key: 'criteria.total_population' },
  { title: 'Sanitasi Lingkungan', key: 'criteria.sanitation_rate' },
  { title: 'Rumah Sehat', key: 'criteria.safe_house_rate' },
  { title: 'Aksi', key: 'actions', align: 'center', sortable: false },
]

const handleStartEdit = (item: Criteria) => {
  editId.value = item.district.id
  oldData.value = Object.assign({}, item.criteria)
}
const handleCancelEdit = (item: Criteria) => {
  editId.value = null
  const cancelled = criterias.value?.find((criteria) => criteria.district.id === item.district.id)
  cancelled!.criteria = Object.assign({}, oldData.value)
}
const handleSubmitEdit = async (item: Criteria) => {
  editId.value = null
  oldData.value = {}

  try {
    await useFetch(`/api/criteria/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: { ...item.criteria },
    })

    Notify.success('Berhasil mengubah data')
  } catch (error) {
    console.error(error)
    Notify.error('Terjadi kesalahan saat mengubah data')
  }
}

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
      @click="openDialogCreate"
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

              <template #item.criteria.clean_water_rate="{ item }">
                <div v-if="editId !== item.district.id">{{ item.criteria.clean_water_rate }}</div>
                <v-text-field
                  v-else
                  id="id"
                  v-model="item.criteria.clean_water_rate"
                  density="compact"
                  type="number"
                  hide-details="auto"
                  step="0.01"
                  name="criteria.clean_water_rate"
                />
              </template>

              <template #item.criteria.total_case="{ item }">
                <div v-if="editId !== item.district.id">{{ item.criteria.total_case }}</div>
                <v-text-field
                  v-else
                  id="id"
                  v-model="item.criteria.total_case"
                  density="compact"
                  type="number"
                  step="1"
                  hide-details="auto"
                  name="criteria.total_case"
                />
              </template>

              <template #item.criteria.total_population="{ item }">
                <div v-if="editId !== item.district.id">{{ item.criteria.total_population }}</div>
                <v-text-field
                  v-else
                  id="id"
                  v-model="item.criteria.total_population"
                  density="compact"
                  type="number"
                  step="1"
                  hide-details="auto"
                  name="criteria.total_population"
                />
              </template>

              <template #item.criteria.sanitation_rate="{ item }">
                <div v-if="editId !== item.district.id">{{ item.criteria.sanitation_rate }}</div>
                <v-text-field
                  v-else
                  id="id"
                  v-model="item.criteria.sanitation_rate"
                  density="compact"
                  type="number"
                  step="0.01"
                  hide-details="auto"
                  name="criteria.sanitation_rate"
                />
              </template>

              <template #item.criteria.safe_house_rate="{ item }">
                <div v-if="editId !== item.district.id">{{ item.criteria.safe_house_rate }}</div>
                <v-text-field
                  v-else
                  id="id"
                  v-model="item.criteria.safe_house_rate"
                  density="compact"
                  type="number"
                  step="0.01"
                  hide-details="auto"
                  name="criteria.safe_house_rate"
                />
              </template>

              <template #item.actions="{ item }">
                <v-defaults-provider
                  :defaults="{
                    VBtn: {
                      size: 28,
                      variant: 'text',
                      class: 'ml-1',
                      color: 'amber-darken-2',
                    },
                    VIcon: {
                      size: 20,
                    },
                  }"
                >
                  <v-tooltip
                    v-if="editId !== item.district.id"
                    location="top"
                  >
                    <template #activator="{ props }">
                      <v-btn
                        icon="mdi-pencil-outline"
                        v-bind="props"
                        @click="handleStartEdit(item)"
                      />
                    </template>
                    <span>Ubah</span>
                  </v-tooltip>
                  <div
                    v-else
                    class="d-flex align-center"
                  >
                    <v-tooltip location="top">
                      <template #activator="{ props }">
                        <v-btn
                          icon="mdi-close"
                          v-bind="props"
                          color="error"
                          @click="handleCancelEdit(item)"
                        />
                      </template>
                      <span>Batal</span>
                    </v-tooltip>

                    <v-tooltip location="top">
                      <template #activator="{ props }">
                        <v-btn
                          icon="mdi-check"
                          v-bind="props"
                          color="success"
                          @click="handleSubmitEdit(item)"
                        />
                      </template>
                      <span>Simpan Perubahan</span>
                    </v-tooltip>
                  </div>
                </v-defaults-provider>
              </template>

              <template #bottom>
                <div />
              </template>
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

          <DialogForm ref="dialogCreate">
            <v-text-field
              v-model="search"
              solo
              label="label"
            />
          </DialogForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
