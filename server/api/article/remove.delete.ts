import { defineEventHandler } from 'h3'

type Article = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)
  const uri = `http://localhost:3000/api/article/${id}`

  const article = await $fetch<Article>(uri, {
    method: 'DELETE',
  })

  return article
})
