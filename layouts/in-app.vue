<template>
  <TheTransitionWrapper>
    <BaseCompletePregnancy v-if="profileStore.isPregnantModalOpen" @close-modal="profileStore.handlePregnancyModal" />
  </TheTransitionWrapper>
  <TheTransitionWrapper>
    <BasePatientDetailsForm v-if="profileStore.isPatientDetailsFormOpen" @close-modal="profileStore.handlePatientDetailsForm" />
  </TheTransitionWrapper>
  <TheTransitionWrapper>
    <BaseBloodSlipForm v-if="profileStore.isBloodSlipFormOpen" @close-modal="profileStore.handleBloodSlipForm" />
  </TheTransitionWrapper>

  <div class="flex flex-col justify-center items-center w-full">
    <TheSideBar v-if="!isMobile" class="fixed w-[80px] left-0 top-0 z-0 hidden md:flex" />
    <TheNavigationMobileInApp v-if="isMobile" class="flex md:hidden" />
    <div class="flex w-full justify-end md:mt-auto">
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

async function getUser() {
  try {
    const userVal = await Auth.currentAuthenticatedUser()
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
