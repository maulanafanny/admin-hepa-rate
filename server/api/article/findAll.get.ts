import { defineEventHandler } from 'h3'

type Article = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default defineEventHandler(async (event) => {
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/article`

  const articles = await $fetch<Article[]>(uri)

  return articles
})
