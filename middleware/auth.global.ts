import type { User } from '#auth-utils'

export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, session } = useUserSession()

  if (process.client) {
    const token = localStorage.getItem('token')

    if (!loggedIn.value && to.path !== '/login') {
      if (token) {
        try {
          const { data: profile } = await useFetch<User>('/api/user/profile', {
            method: 'POST',
            body: {
              token,
            },
          })

          session.value.user = profile.value!
        } catch (error) {
          console.error('Failed to fetch user profile:', error)
        }
      }

      if (!loggedIn.value) {
        Notify.error('You need to log in to view this page')

        return navigateTo('/login')
      }
    }
  }
})
