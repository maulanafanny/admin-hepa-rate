import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/year`

  const years = await $fetch<Year[]>(uri)

  return years
})
