import { defineEventHandler } from 'h3'
import { Criteria } from '~/types/criteria'

export default defineEventHandler(async (event) => {
  const { id, total_case, total_population, sanitation_rate, clean_water_rate, safe_house_rate } =
    await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria/${id}`

  const updatedCriteria = await $fetch<Criteria>(uri, {
    method: 'PATCH',
    body: {
      total_case,
      total_population,
      sanitation_rate,
      clean_water_rate,
      safe_house_rate,
    },
  })

  return updatedCriteria
})
