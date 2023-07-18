<template>
  <BaseCompletePregnancy v-if="profileStore.isPregnantModalOpen" @close-modal="profileStore.handleModal" />
  <BasePatientDetailsForm v-if="profileStore.isPatientDetailsFormOpen" @close-modal="profileStore.handlePatientDetailsForm" />
  <BaseBloodSlipForm v-if="profileStore.isBloodSlipFormOpen" @close-modal="profileStore.handleBloodSlipForm" />
  <div class="bg-honeydew-bg2 absolute w-full h-screen p-10 min-w-[1440px] -z-20"></div>
  <div class="flex flex-col justify-center items-center w-full">
    <TheSideBar v-if="!isMobile" class="fixed w-[80px] left-0 top-0 z-10 hidden md:flex" />
    <TheNavigationMobileInApp v-if="isMobile" class="flex md:hidden" />
    <div class="flex w-full justify-end mt-[80px] md:mt-auto">
      <div class="min-h-screen element flex justify-center items-start bg-honeydew-bg2 w-full">
        <NuxtPage class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheNavigationMobileInApp from './TheNavigationMobileInApp.vue'
import TheSideBar from './TheSideBar.vue'
import { Auth } from 'aws-amplify'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const user = ref()
const isMobile = ref(false)
const isModalOpen = ref(true)

async function getUser() {
  try {
    const userVal = await Auth.currentAuthenticatedUser()
    console.log(userVal.authenticationFlowType) // Need to set admin, care coord, auth roles, etc.
    return (user.value = userVal)
  } catch (error) {
    console.log('Error:', error)
  }
}

function checkIfMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile)
})

getUser()
</script>

<style scoped>
.element {
  width: calc(100% - 80px);
}

@media screen and (max-width: 768px) {
  .element {
    width: 100%;
  }
}
</style>
