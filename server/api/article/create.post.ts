import { defineEventHandler } from 'h3'

type Article = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default defineEventHandler(async (event) => {
  const { title, content } = await readBody(event)
  const uri = `http://localhost:3000/api/article`

  const createdArticle = await $fetch<Article>(uri, {
    method: 'POST',
    body: {
      title,
      content,
    },
  })

  return createdArticle
})
