import { defineEventHandler } from 'h3'
import { Criteria } from '~/types/criteria'

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
