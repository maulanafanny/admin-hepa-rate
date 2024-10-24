import { defineEventHandler } from 'h3'
import { ClusterResult } from '~/types/criteria'

export default defineEventHandler(async (event) => {
  const { year_id } = await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/criteria/clustering`

  const clusterResult = await $fetch<ClusterResult[]>(uri, {
    method: 'POST',
    body: {
      year_id,
    },
  })

  return clusterResult
})
