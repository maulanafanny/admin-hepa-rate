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
  const { title, content } = await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria`

  const createdCriteria = await $fetch<Criteria>(uri, {
    method: 'POST',
    body: {
      title,
      content,
    },
  })

  return createdCriteria
})
