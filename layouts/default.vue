<template>
  <Loading v-if="isLoading" />
  <BaseChatBot />
  <div v-if="!isLoading || isLoading" :class="isLoading ? 'invisible overflow-hidden' : ''" class="flex flex-col justify-center items-center">
    <div class="hidden md:flex flex-col w-full">
      <TheNavigationDeskop v-if="!isMobile" />
    </div>
    <div class="flex md:hidden flex-col w-full">
      <TheNavigationMobile v-if="isMobile" />
    </div>
    <div class="w-full min-h-[90vh] flex justify-center items-start bg-honeydew-bg2">
      <NuxtPage />
    </div>
    <TheFooterPublic />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TheNavigationDeskop from './TheNavigationDeskop.vue'
import TheNavigationMobile from './TheNavigationMobile.vue'
import TheFooterPublic from '@/layouts/TheFooterPublic.vue'
import Loading from '~/components/Loading.vue'

const isMobile = ref(false)
const isLoading = ref(true)

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})

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
</script>
