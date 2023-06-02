import { defineNuxtPlugin } from 'nuxt/app'
import { Amplify, Auth } from 'aws-amplify'
import awsExports from '@/src/aws-exports'

export default defineNuxtPlugin((nuxtApp) => {
  Amplify.configure(awsExports)

  return {
    provide: {
      auth: Auth,
    },
  }
})
