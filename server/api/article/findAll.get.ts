import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/article`

  const articles = await $fetch<Article[]>(uri)

  return articles
})
