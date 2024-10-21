import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/article/${id}`

  const article = await $fetch<Article>(uri, {
    method: 'DELETE',
  })

  return article
})
