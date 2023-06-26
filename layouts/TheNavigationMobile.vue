<script setup lang="ts">
// IMPORTS ********************************************************************
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import HamburgerIcon from '@/assets/icons/hamburger.svg'
import XIcon from '@/assets/icons/x-icon.svg'
import { useRouter } from 'vue-router'

// STATE **********************************************************************
const isMenuOpen = ref(false)

// DATA **********************************************************************
const linkData = [
  { text: 'HOME', route: '/' },
  { text: 'WHY US', route: '/why-us' },
  { text: 'PRICING', route: '/pricing' },
  { text: 'FAQ', route: '/faq' },
  { text: 'LOG IN', route: '/login' },
]

// COMPUTED *********************************************************************
const currentRoute = computed(() => {
  return router.currentRoute.value.path
})

// ROUTER *********************************************************************
const router = useRouter()

// Close the menu when the route changes
router.beforeEach(() => {
  isMenuOpen.value = false
})
</script>

<template>
  <BaseAlert />
  <div class="h-[80px] flex justify-center items-center w-full">
    <BaseWrapper>
      <div class="flex justify-between w-full items-center relative">
        <NuxtLink to="/" class="flex w-full h-[28px] items-center">
          <img class="w-[40px] md:w-auto mr-[16px]" :src="HoneydewIcon" alt="Honeydew Icon" />
          <img class="w-[148px] md:w-auto" :src="HoneydewLogo" alt="Honeydew Logo" />
        </NuxtLink>
        <div class="w-full justify-center gap-x-4 xl:gap-x-[48px] hidden md:flex items-center">
          <NuxtLink to="/whyus" :class="[currentRoute === '/whyus' ? 'text-honeydew-purple' : '']">WHY US</NuxtLink>
          <NuxtLink to="/pricing" :class="[currentRoute === '/pricing' ? 'text-honeydew-purple' : '']">PRICING</NuxtLink>
          <NuxtLink to="/faq" :class="[currentRoute === '/faq' ? 'text-honeydew-purple' : '']">FAQ</NuxtLink>
        </div>

        <div
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden relative flex justify-center items-center border w-[48px] h-[48px] rounded-[12px] cursor-pointer border-gray-2 text-gray-3 hover:opacity-50 active:opacity-30"
        >
          <img v-if="!isMenuOpen" class="absolute w-[18px]" :src="HamburgerIcon" alt="Hamburger Menu" />
          <img v-if="isMenuOpen" class="absolute w-[18px]" :src="XIcon" alt="X Icon" />
        </div>
      </div>
    </BaseWrapper>
  </div>
  <div v-if="isMenuOpen" class="bg-white h-screen flex justify-start flex-col w-full gap-y-12 px-5 mt-[24px]">
    <NuxtLink v-for="(link, idx) in linkData" :key="idx" :to="link.route" :class="[currentRoute === link.route ? 'text-honeydew-purple' : '']">
      {{ link.text }}
    </NuxtLink>
  </div>
</template>
