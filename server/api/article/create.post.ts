import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const { title, content } = await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/article`

  const createdArticle = await $fetch<Article>(uri, {
    method: 'POST',
    body: {
      title,
      content,
    },
  })

  return createdArticle
})
