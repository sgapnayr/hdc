<template>
  <div class="flex flex-col justify-center items-center">
    <TheSideBar v-if="!isMobile" class="fixed w-[80px] left-0 top-0 z-10 hidden md:flex" />
    <TheNavigationMobileInApp v-if="isMobile" class="flex md:hidden" />
    <div class="flex w-full justify-end">
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

const user = ref()
const isMobile = ref(false)

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
