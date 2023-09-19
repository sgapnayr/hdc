<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, onMounted } from 'vue'
import { useProfileStore } from '~/stores/profile'
import { useRouter } from 'vue-router'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

// STORE *************************************************************
const profileStore = useProfileStore()
const router = useRouter()

// INIT *************************************************************
onMounted(async () => {
  await profileStore?.setMyProfile()
  const patientId = profileStore?.profileData?.patientId
  if (patientId) {
    router?.push(`/profiles/${patientId}`)
  } else {
    console.error('Patient ID not available.')
    router?.push(`/`)
  }
})
</script>

<template>
  <BaseWrapper>
    <Loading />
  </BaseWrapper>
</template>
