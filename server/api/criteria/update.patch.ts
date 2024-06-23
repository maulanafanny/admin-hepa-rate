import { defineEventHandler } from 'h3'

type Criteria = {
  id: number
  total_case: number
  total_population: number
  sanitation_rate: number
  clean_water_rate: number
  safe_house_rate: number
  district_id: number
  year_id: number
  createdAt: Date
  updatedAt: Date
}

export default defineEventHandler(async (event) => {
  const { id, title, content } = await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria/${id}`

  const updatedCriteria = await $fetch<Criteria>(uri, {
    method: 'PATCH',
    body: {
      title,
      content,
    },
  })

  return updatedCriteria
})
