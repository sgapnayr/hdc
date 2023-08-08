<template>
  <div class="flex flex-col justify-center items-center relative">
    <TheNavigationCaptured />
    <div class="w-full min-h-screen flex justify-center items-start bg-honeydew-bg2 pb-16">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheFooterApp from '@/layouts/TheFooterApp.vue'
import TheNavigationCaptured from './TheNavigationCaptured.vue'
</script>
