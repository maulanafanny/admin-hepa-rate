import { defineStore } from 'pinia'

interface DatasetYear {
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
    fetchDatasetYears() {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.datasetYears = [{ year: 2017 }, { year: 2018 }, { year: 2019 }]
          resolve()
        }, 500)
      })
    },
  },
})
