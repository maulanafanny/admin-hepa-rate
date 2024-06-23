import { defineEventHandler } from 'h3'

type Article = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default defineEventHandler(async (event) => {
  const { id, title, content } = await readBody(event)
  const uri = `http://localhost:3000/api/article/${id}`

  const updatedArticle = await $fetch<Article>(uri, {
    method: 'PATCH',
    body: {
      title,
      content,
    },
  })

  return updatedArticle
})
