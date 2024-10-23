<script setup lang="ts">
import DialogConfirm from '~/components/DialogConfirm.vue'
import DialogForm from '~/components/DialogForm.vue'
import type { DataTableHeaders } from '~/plugins/vuetify'

definePageMeta({
  title: 'Informasi Umum',
  icon: 'mdi-information-outline',
  drawerIndex: 6,
})

const { data: articles, pending: loadingArticles } = useLazyFetch<Article[]>('/api/article/findAll')

const search = ref('')
const headers: DataTableHeaders = [
  { title: 'No', key: 'no', sortable: false },
  { title: 'Judul Informasi', key: 'title', minWidth: '200px' },
  {
    title: 'Konten Informasi',
    key: 'content',
    cellProps() {
      return {
        class: 'text-truncate',
        style: {
          maxWidth: '400px',
        },
      }
    },
  },
  { title: 'Waktu Dibuat', key: 'createdAt', align: 'center', minWidth: '150px' },
  { title: 'Terakhir Diperbarui', key: 'updatedAt', align: 'center', minWidth: '175px' },
  { title: 'Aksi', key: 'actions', align: 'center', minWidth: '80px', sortable: false },
]

const deleteArticle = async (id: number) => {
  await useFetch(`/api/article/remove`, {
    method: 'DELETE',
    params: { id },
  })
}

const dialogDelete = ref<InstanceType<typeof DialogConfirm> | null>(null)
const showDialogDelete = (id: number) => {
  dialogDelete.value
    ?.open('Apakah Anda yakin ingin menghapus artikel ini?')
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          const index = articles.value!.findIndex((v) => v.id === id)
          await deleteArticle(id)
          articles.value!.splice(index, 1)
          Notify.success('Deleted')
        } catch (e) {
          Notify.error(e)
        }
      }
    })
}

const submitForm = async (form: any) => {
  if (form.id === 0) {
    try {
      const { data } = await useFetch(`/api/article/create`, {
        method: 'POST',
        body: {
          title: form.title,
          content: form.content,
        },
      })
      articles.value!.push(data.value!)
      Notify.success('Artikel berhasil dibuat')
    } catch (e) {
      Notify.error(e)
    }

    return
  }

  const index = articles.value!.findIndex((v) => v.id === form.id)

  try {
    await useFetch(`/api/article/update`, {
      method: 'PATCH',
      body: {
        id: form.id,
        title: form.title,
        content: form.content,
      },
    })
    Object.assign(articles.value![index], form)
    Notify.success('Artikel berhasil diubah')
  } catch (e) {
    Notify.error(e)
  }
}

const dialogForm = ref<InstanceType<typeof DialogForm> | null>(null)
const showDialogForm = (item: any, title: string = 'Edit Artikel') => {
  dialogForm.value
    ?.open(title, item, (value) => submitForm(value))
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          Notify.success('Edited')
        } catch (e) {
          Notify.error(e)
        }
      }
    })
}

const dateFormat = (date: string) => {
  console.log(date)
  const [datePart, timePart] = date.split('T')
  const [year, month, day] = datePart.split('-')
  const [hour, minute] = timePart.split(':')

  return `${day}-${month}-${year} · ${hour}:${minute}`
}
</script>

<template>
  <v-container fluid>
    <h1 class="mb-3">Informasi Umum Hepatitis-A Pacitan</h1>

    <v-btn
      color="primary"
      class="mb-3"
      @click="showDialogForm({ id: 0, title: '', content: '' }, 'Buat Artikel Baru')"
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
              :items="articles || undefined"
              :loading="loadingArticles"
              item-value="name"
              :search="search"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template #item.createdAt="{ item }">
                {{ dateFormat(item.createdAt) }}
              </template>

              <template #item.updatedAt="{ item }">
                {{ dateFormat(item.updatedAt) }}
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
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-btn
                        icon="mdi-pencil-outline"
                        v-bind="props"
                        @click.stop="showDialogForm(item)"
                      />
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                </v-defaults-provider>

                <v-defaults-provider
                  :defaults="{
                    VBtn: {
                      size: 28,
                      variant: 'icon',
                      class: 'ml-1',
                      color: 'error',
                    },
                    VIcon: {
                      size: 20,
                    },
                  }"
                >
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-btn
                        icon="mdi-delete-outline"
                        v-bind="props"
                        @click.stop="showDialogDelete(item.id)"
                      />
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                </v-defaults-provider>
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

          <DialogConfirm ref="dialogDelete" />
          <DialogForm
            ref="dialogForm"
            max-width="1000px"
          >
            <template #default="{ modelValue }">
              <v-text-field
                v-model="modelValue.title"
                label="Judul"
                :rules="[(v: string) => !!v || 'Judul tidak boleh kosong']"
              />
              <v-textarea
                v-model="modelValue.content"
                label="Konten"
                auto-grow
                variant="outlined"
                :rules="[(v: string) => !!v || 'Konten tidak boleh kosong']"
              />
            </template>
          </DialogForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
