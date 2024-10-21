import { defineEventHandler } from 'h3'
import { Criteria } from '~/types/criteria'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria/${id}`

  const criteria = await $fetch<Criteria>(uri)

  return criteria
})
