<template>
  <div class="flex flex-col justify-center items-center">
    <TheNavigationPublic />
    <div class="w-full min-h-[90vh] flex justify-center items-start bg-honeydew-bg2">
      <NuxtPage />
    </div>
    <TheFooterPublic />
  </div>
</template>

<script setup lang="ts">
import TheNavigationDesktop from '@/layouts/TheNavigationDesktop.vue'
import TheNavigationPublic from './TheNavigationPublic.vue'
import TheFooterApp from '@/layouts/TheFooterApp.vue'
import TheFooterPublic from '@/layouts/TheFooterPublic.vue'
</script>
