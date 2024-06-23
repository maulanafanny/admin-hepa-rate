import { defineEventHandler } from 'h3'

type Criteria = {
  id: number
  year: number
}

export default defineEventHandler(async (event) => {
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/year`

  const criterias = await $fetch<Criteria[]>(uri)

  return criterias
})
