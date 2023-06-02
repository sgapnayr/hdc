<script setup lang="ts">
// IMPORTS ********************************************************************
import GiantQuotes from '@/assets/icons/quotes.svg'
import StarIcon from '@/assets/icons/star.svg'

// PROPS **********************************************************************
defineProps<{
  image1: string
  image2: string
  image3: string
  image4: string
  signedText: string
  headingText: string
  slotText: string
}>()
</script>

<template>
  <p class="font-[700] text-[32px] leading-[42px] mt-[48px] lg:mt-[120px] w-full flex justify-center">
    {{ headingText }}
  </p>
  <div class="flex flex-col-reverse lg:flex-row justify-center items-center text-center lg:text-start">
    <div class="mx-[24px] lg:mt-[48px] mb-[124px] w-full">
      <div class="flex justify-center items-center lg:items-start flex-col w-full">
        <img :src="GiantQuotes" alt="Quotes" class="mb-[16px]" />
        <p class="font-[400] text-[20px] leading-[30px] text-gray-3 mt-[48px] w-full lg:w-10/12 text-start">
          {{ slotText }}
        </p>
        <p class="font-[500] text-[18px] leading-[30px] text-gray-3 mt-[16px]">{{ signedText }}</p>
      </div>
      <div class="flex mt-[18px] gap-x-3 items-center justify-center lg:justify-start">
        <img :src="StarIcon" alt="Star Icon" />
        <img :src="StarIcon" alt="Star Icon" />
        <img :src="StarIcon" alt="Star Icon" />
        <img :src="StarIcon" alt="Star Icon" />
        <img :src="StarIcon" alt="Star Icon" />
      </div>
    </div>
    <div class="mb-[124px] w-full mt-[120px] grid grid-cols-2">
      <img class="rounded-[20px] w-[290px] pr-[8px]" :src="image1" alt="Testimony-image" />
      <img class="rounded-[20px] w-[290px] pl-[8px]" :src="image2" alt="Testimony-image" />
      <img class="rounded-[20px] w-[290px] pr-[8px]" :src="image3" alt="Testimony-image" />
      <img class="rounded-[20px] w-[290px] pl-[8px]" :src="image4" alt="Testimony-image" />
    </div>
  </div>
</template>
