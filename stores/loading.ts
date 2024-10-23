export const useLoadingStore = defineStore('loading', {
  state: () => {
    const loading = false

    return {
      loading,
    }
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
  },
})
