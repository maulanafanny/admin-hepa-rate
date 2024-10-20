import type { User } from '#auth-utils'

export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, session } = useUserSession()

  // Check if the code is running in the client (browser)
  if (process.client) {
    const token = localStorage.getItem('token')

    // If the user is not logged in and the path is not the login page
    if (!loggedIn.value && to.path !== '/login') {
      if (token) {
        try {
          // Query the user profile using the token
          const { data: profile } = await useFetch<User>('/api/user/profile', {
            method: 'POST',
            body: {
              token,
            },
          })

          // Set the session user with the fetched profile
          session.value.user = profile.value!
        } catch (error) {
          console.error('Failed to fetch user profile:', error)
        }
      }

      // If still not logged in after attempting to fetch the profile
      if (!loggedIn.value) {
        Notify.error('You need to log in to view this page')

        return navigateTo('/login')
      }
    }
  }
})
