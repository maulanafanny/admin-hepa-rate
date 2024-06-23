import { defineStore } from 'pinia'

interface DatasetYear {
  id: number
  year: number
}

export const useDatasetStore = defineStore({
  id: 'myDatasetStore',
  state: () => {
    const datasetYears: DatasetYear[] = []

    return {
      datasetYears,
    }
  },
  actions: {
    async fetchDatasetYears() {
      const { data } = await useFetch<DatasetYear[]>(`/api/year/findAll`)

      this.datasetYears = data.value || []
    },
  },
})
