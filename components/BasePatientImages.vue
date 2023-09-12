<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { getMyProfileImages } from '../lib/endpoints'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const route = useRoute()

// STATE *********************************************************************
const patientImages = ref()

// INITIALIZATION *************************************************************
getMyProfileImages(route.params.patientId as string)
  .then((res) => (patientImages.value = res))
  .catch((error) => console.error(error))
</script>

<template>
  <div class="flex gap-x-2 my-8">
    <div v-for="(image, idx) in patientImages" :key="idx" class="flex justify-center items-center">
      <div class="flex flex-col text-center bg-white p-4 rounded-2xl shadow-sm">
        <img class="m-2 object-cover flex justify-center items-center h-32 w-32 rounded-xl" :src="image.path" :alt="image.fileName" />
        <p class="text-[#6C6A7C] text-[16px]">{{ image.fileName }}</p>
      </div>
    </div>
  </div>
</template>
