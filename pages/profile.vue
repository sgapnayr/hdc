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
  await profileStore.setMyProfile()
  const patientId = profileStore.profileData.patientId
  if (patientId) {
    // Redirect to the profile page
    router.push(`/profiles/${patientId}`)
  } else {
    // Handle the case where patientId is not available
    console.error('Patient ID not available.')
  }
})
</script>

<template>
  <BaseWrapper>
    <Loading />
  </BaseWrapper>
</template>
