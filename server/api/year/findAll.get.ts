import { defineEventHandler } from 'h3'
import { Year } from '~/types/year'

export default defineEventHandler(async () => {
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/year`

  const years = await $fetch<Year[]>(uri)

  return years.sort((a, b) => a.id - b.id)
})
