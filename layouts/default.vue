<template>
  <Loading v-if="isLoading" />
  <!-- Only show BaseChatBot if the current route matches one of the specified routes -->
  <BaseChatBot v-if="showChatBot" />
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
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router' // import useRoute
import TheNavigationDeskop from './TheNavigationDeskop.vue'
import TheNavigationMobile from './TheNavigationMobile.vue'
import TheFooterPublic from '@/layouts/TheFooterPublic.vue'
import Loading from '~/components/Loading.vue'

const isMobile = ref(false)
const isLoading = ref(true)

// Get current route
const route = useRoute()

// Check if the current route is in the list of routes
const showChatBot = computed(() => {
  const allowedRoutes = ['/', '/why-us', '/pricing', '/our-story']
  return allowedRoutes.includes(route.path)
})

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)

  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile)
})

function checkIfMobile() {
  isMobile.value = window.innerWidth <= 768
}
</script>
