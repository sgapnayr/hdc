<script setup lang="ts">
// EMIT **********************************************************************
defineEmits<{
  (event: 'call-to-action'): void
}>()

function hlc() {}

// PROPS **********************************************************************
defineProps<{
  imagePath?: string
  altText?: string
  largeText?: string
  buttonText?: string
}>()
</script>

<template>
  <div class="flex w-full flex-col justify-center">
    <img class="mt-[80px]" :src="imagePath" :alt="altText" />
    <h1 class="w-full mt-[32px] text-[32px] font-[700] leading-[40px] text-[#403E48] text-center">{{ largeText }}</h1>
    <NuxtLink to="/sign-up" class="w-full flex justify-center items-center">
      <div
        class="flex items-center justify-center gap-[10px] w-full max-w-[380px] h-[56px] px-[32px] py-[15px] flex-shrink-0 rounded-[60px] bg-[#5e39f5] text-white mt-[40px]"
      >
        {{ buttonText }}
      </div>
    </NuxtLink>
  </div>
</template>
