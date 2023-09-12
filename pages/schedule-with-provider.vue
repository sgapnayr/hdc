<script setup lang="ts">
// IMPORTS ********************************************************************
import { useAuthenticator } from '@aws-amplify/ui-vue'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

const user = useAuthenticator()

onMounted(() => {
  watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })
})
</script>

<template>
  <div class="flex flex-col py-8">
    <BaseWrapper> <BaseSelectAppointment visit-type="Initial-visit" /> </BaseWrapper>
  </div>
</template>
