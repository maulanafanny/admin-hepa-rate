import { defineEventHandler } from 'h3'
import { Criteria } from '~/types/criteria'

export default defineEventHandler(async () => {
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria`

  const criterias = await $fetch<Criteria[]>(uri)

  return criterias
})
