import { defineEventHandler } from 'h3'
import { CreateDataset, Criteria } from '~/types/criteria'

export default defineEventHandler(async (event) => {
  const createDataset: CreateDataset = await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria/dataset`

  const createdCriteria = await $fetch<Criteria>(uri, {
    method: 'POST',
    body: {
      ...createDataset,
    },
  })

  return createdCriteria
})
