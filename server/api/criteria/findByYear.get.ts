import { defineEventHandler } from 'h3'
import { Criteria } from '~/types/criteria'

export default defineEventHandler(async (event) => {
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria`
  const { year } = getQuery(event)

  const criterias = await $fetch<Criteria[]>(uri)
  const criteriasByYear = criterias.filter((el) => el.year.year === Number(year))

  return criteriasByYear
})
