<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthenticator } from '@aws-amplify/ui-vue'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

const router = useRouter()
const route = useRoute()
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
    <BaseWrapper> <BaseSelectAppointment /> </BaseWrapper>
  </div>
</template>
