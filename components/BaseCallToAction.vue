<script setup lang="ts">
// EMIT **********************************************************************
defineEmits<{
  (event: 'call-to-action'): void
}>()

function hlc() {}

// PROPS **********************************************************************
defineProps<{
  imagePath?: string
  imagePathDesktop?: string
  altText?: string
  largeText?: string
  buttonText?: string
  logoColor?: string
}>()
</script>

<template>
  <div class="flex w-full flex-col justify-center md:flex-row-reverse gap-x-8 md:justify-between">
    <img class="mt-[80px] lg:hidden flex" :src="imagePath" :alt="altText" />
    <img class="mt-[80px] lg:flex hidden" :src="imagePathDesktop" :alt="altText" />
    <div class="flex flex-col py-8 pt-24">
      <svg
        :class="[logoColor === 'green' ? 'opacity-50' : '']"
        class="hidden md:flex"
        width="84"
        height="40"
        viewBox="0 0 84 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0C1.09549 22.276 19.4806 40 42 40C64.5195 40 82.9045 22.276 84 0H0Z"
          :fill="logoColor === 'yellow' ? '#faf6eb' : logoColor === 'purple' ? '#EEEBFC' : logoColor === 'green' ? '#60B257' : '#E7EEFF'"
        />
      </svg>

      <h1 class="w-full mt-[32px] text-[32px] font-[700] leading-[40px] text-[#403E48] text-center md:text-start">{{ largeText }}</h1>
      <BaseCurrentlyAvailableIn class="hidden md:flex grow" />
      <NuxtLink to="/sign-up" class="w-full flex justify-center items-center md:w-[230px]">
        <div
          class="flex items-center justify-center gap-[10px] w-full max-w-[380px] h-[56px] px-[32px] py-[15px] flex-shrink-0 rounded-[60px] bg-[#5e39f5] text-white mt-[40px]"
        >
          {{ buttonText }}
        </div>
      </NuxtLink>
      <BaseCurrentlyAvailableIn class="flex md:hidden" />
    </div>
  </div>
</template>
