<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { getMyProfileImages } from '../lib/endpoints'
import { useProfileStore } from '../stores/profile'
import { usePatientStore } from '../stores/patient'
import ChevronIcon from '../assets/icons/chevron-icon.svg'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

// STORE **********************************************************************
const profileStore = useProfileStore()
const patientStore = usePatientStore()

// ROUTER **********************************************************************
const route = useRoute()
const router = useRouter()

// STATE *********************************************************************
const patientImages = ref()

// INITIALIZATION *************************************************************
getMyProfileImages(patientStore.currentPatientId || (route.params.patientId as string))
  .then((res) => (patientImages.value = res))
  .catch((error) => console.error(error))
</script>

<template>
  <div class="flex gap-x-2 my-4 flex-wrap gap-4">
    <div class="flex w-full flex-col">
      <div @click="profileStore.handleVisitForm" class="flex flex-col mb-4 cursor-pointer">
        <p>{visitDate}</p>
        <div class="flex items-center w-full justify-between">
          <p class="text-sm opacity-50 w-full">Show Details</p>
          <img class="rotate-180" :src="ChevronIcon" alt="Chevron" />
        </div>
      </div>
      <div class="flex flex-wrap w-full">
        <div v-for="(image, idx) in patientImages" :key="idx" class="flex justify-center items-center">
          <div class="flex flex-col text-center bg-white p-4 rounded-2xl shadow-sm mx-1">
            <img class="m-2 object-cover flex justify-center items-center h-32 w-32 rounded-xl" :src="image.path" :alt="image.fileName" />
            <p class="text-[#6C6A7C] text-[12px]">{{ image.fileName.length > 16 ? image.fileName.slice(0, 16) + '...' : image.fileName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
