<script setup lang="ts">
// IMPORTS ********************************************************************
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import HamburgerIcon from '@/assets/icons/hamburger.svg'
import XIcon from '@/assets/icons/x-icon.svg'
import { useRouter } from 'vue-router'
import { Auth } from 'aws-amplify'

// STATE **********************************************************************
const isMenuOpen = ref(false)

// DATA **********************************************************************
const linkData = [
  { text: 'Admin', route: '/admin' },
  { text: 'Tasks Pool', route: '/tasks-pool' },
  { text: 'Profile', route: '/profile' },
  { text: 'Medications', route: '/medications' },
  { text: 'Help', route: '' },
  { text: 'Employees', route: '/employees' },
]

// COMPUTED *********************************************************************
const currentRoute = computed(() => {
  return router.currentRoute.value.path
})

// ROUTER *********************************************************************
const router = useRouter()
const route = useRoute()

// Close the menu when the route changes
router.beforeEach(() => {
  isMenuOpen.value = false
})

// METHODS *********************************************************************
async function signOut() {
  console.log('SIGN OUT')
  try {
    await Auth.signOut()
    navigateTo('/')
    // Sign-out successful
    // You can redirect the user or perform other actions here
  } catch (error) {
    console.log('Error signing out:', error)
    // Handle sign-out error
  }
}
</script>

<template>
  <div class="h-[80px] flex justify-center items-center w-full bg-white">
    <BaseWrapper>
      <div class="flex justify-between w-full items-center relative">
        <NuxtLink class="flex w-full h-[28px] items-center">
          <img class="w-[40px] md:w-auto mr-[16px]" :src="HoneydewIcon" alt="Honeydew Icon" />
          <img class="w-[148px] md:w-auto" :src="HoneydewLogo" alt="Honeydew Logo" />
        </NuxtLink>

        <div
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden relative flex justify-center items-center border w-[48px] h-[48px] rounded-[12px] cursor-pointer border-gray-2 text-gray-3 hover:opacity-50 active:opacity-30"
        >
          <img v-if="!isMenuOpen" class="absolute w-[18px]" :src="HamburgerIcon" alt="Hamburger Menu" />
          <img v-if="isMenuOpen" class="absolute w-[18px] scale-90" :src="XIcon" alt="X Icon" />
        </div>
      </div>
    </BaseWrapper>
  </div>
  <div
    v-if="isMenuOpen"
    class="bg-white flex justify-start flex-col w-full gap-y-12 px-5 mt-[24px] transition uppercase"
    :class="[isMenuOpen ? 'h-screen' : 'h-0']"
  >
    <NuxtLink v-for="(link, idx) in linkData" :key="idx" :to="link.route" :class="[currentRoute === link.route ? 'text-honeydew-purple' : '']">
      {{ link.text }}
    </NuxtLink>
    <div
      @click="signOut"
      class="bg-white flex justify-start flex-col w-full transition uppercase cursor-pointer"
      :class="[route.path === '/login' ? 'bg-[#EEEBFC]' : '']"
    >
      LOG OUT
    </div>
  </div>
</template>
