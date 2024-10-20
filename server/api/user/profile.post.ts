import { defineEventHandler } from 'h3'
import { Profile } from '~/types/user'

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)
  const { api_url } = useRuntimeConfig()
  const uri = `${api_url}/user/profile`

  const data = await $fetch<Profile>(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
})
