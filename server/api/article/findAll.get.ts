import { defineEventHandler } from 'h3'

type Article = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default defineEventHandler(async (event) => {
  // await requireUserSession(event)
  const url = 'http://localhost:3000/api/article'

  const articles = await $fetch<Article[]>(url)

  return articles
})
