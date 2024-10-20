import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/auth/login`

  const data = await $fetch<{ access_token: string }>(uri, {
    method: 'POST',
    body: {
      email,
      password,
    },
  })

  return data
})
