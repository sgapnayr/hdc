<template>
  <div class="flex flex-col justify-center items-center">
    <TheNavigationDeskop v-if="!isMobile" />
    <TheNavigationMobile v-if="isMobile" />
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

const isMobile = ref(false)

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
