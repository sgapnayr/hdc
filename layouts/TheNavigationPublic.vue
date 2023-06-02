<script setup lang="ts">
// IMPORTS ********************************************************************
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import HamburgerIcon from '@/assets/icons/hamburger.svg'
import { useRouter } from 'vue-router'

// ROUTING **********************************************************************
const router = useRouter()

definePageMeta({
  middleware: ['auth'],
  // or middleware: 'auth'
})
</script>

<template>
  <BaseAlert />
  <div class="h-[80px] flex justify-center items-center w-full">
    <BaseWrapper>
      <div class="flex justify-between w-full items-center">
        <NuxtLink to="/" class="flex w-full h-[28px] items-center">
          <img class="w-[40px] md:w-auto mr-[16px]" :src="HoneydewIcon" alt="Honeydew Icon" />
          <img class="w-[148px] md:w-auto" :src="HoneydewLogo" alt="Honeydew Logo" />
        </NuxtLink>
        <div class="w-full justify-center gap-x-[48px] hidden md:flex items-center">
          <NuxtLink to="/whyus">WHY US</NuxtLink>
          <NuxtLink to="/pricing">PRICING</NuxtLink>
          <NuxtLink to="/faq">FAQ</NuxtLink>
        </div>
        <div class="flex w-full justify-end items-center">
          <NuxtLink to="/login" class="hidden md:flex cursor-pointer">LOGIN</NuxtLink>
          <button
            class="bg-honeydew-purple h-[48px] justify-center text-white items-center flex w-[153px] rounded-[60px] ml-[40px] font-[500] text-[14px] leading-[24px] cursor-pointer"
            @click="router.push('/sign-up')"
          >
            GET STARTED
          </button>
        </div>
        <div class="md:hidden relative flex justify-center items-center border w-[48px] h-[48px] rounded-[12px] cursor-pointer border-gray-2 text-gray-3">
          <img class="absolute w-[18px]" :src="HamburgerIcon" alt="Hamburger Menu" />
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>
