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
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/article/${id}`

  const updatedArticle = await $fetch<Article>(uri, {
    method: 'PATCH',
    body: {
      title,
      content,
    },
  })

  return updatedArticle
})
