<script setup lang="ts">
// IMPORTS ********************************************************************
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import HamburgerIcon from '@/assets/icons/hamburger.svg'
import { useRouter, useRoute } from 'vue-router'

// ROUTING **********************************************************************
const router = useRouter()
const route = useRoute()
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
        <div class="w-full justify-center gap-x-6 lg:gap-x-[48px] hidden md:flex items-center text-[#6C6A7C] text-sm">
          <NuxtLink class="transition hover:text-honeydew-purple" :class="[route.path === '/why-us' ? 'text-honeydew-purple' : '']" to="/why-us"
            >WHY US</NuxtLink
          >
          <NuxtLink class="transition hover:text-honeydew-purple" :class="[route.path === '/pricing' ? 'text-honeydew-purple' : '']" to="/pricing"
            >PRICING</NuxtLink
          >
          <NuxtLink class="transition hover:text-honeydew-purple" :class="[route.path === '/faq' ? 'text-honeydew-purple' : '']" to="/faq">FAQ</NuxtLink>
        </div>
        <div class="flex w-full justify-end items-center">
          <NuxtLink to="/login" class="hidden md:flex cursor-pointer text-[#6C6A7C] text-sm hover:text-honeydew-purple">LOGIN</NuxtLink>
          <NuxtLink
            to="/sign-up"
            class="bg-honeydew-purple h-[48px] justify-center text-white items-center flex w-[153px] rounded-[60px] ml-6 lg:ml-[40px] font-[500] text-[14px] leading-[24px] cursor-pointer"
          >
            GET STARTED
          </NuxtLink>
        </div>
        <div class="md:hidden relative flex justify-center items-center border w-[48px] h-[48px] rounded-[12px] cursor-pointer border-gray-2 text-gray-3">
          <img class="absolute w-[18px]" :src="HamburgerIcon" alt="Hamburger Menu" />
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>
