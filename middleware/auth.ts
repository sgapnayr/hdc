import { useAuthenticator } from '@aws-amplify/ui-vue'

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const user = useAuthenticator()
})
