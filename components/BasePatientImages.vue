<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { getMyProfileImages } from '../lib/endpoints'
import { useProfileStore } from '../stores/profile'
import { usePatientStore } from '../stores/patient'
import ChevronIcon from '../assets/icons/chevron-icon.svg'
import { getMyAppointments, getMyAppointmentImages, getPatientName, getEmployeeName, getPatientTreatment } from '@/lib/endpoints'
import { formatLegibleDate } from '@/utils/helpers'

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
const appointments = ref()
const treatmentPlan = ref({})

// FUNCTIONS *********************************************************************
const fetchPatientTreatment = async (patientId: string) => {
  try {
    const result = await getPatientTreatment(patientId)
    treatmentPlan.value = result
  } catch (error) {
    console.error('Failed to fetch treatment plan:', error)
  }
}

// INITIALIZATION *************************************************************
getMyProfileImages(patientStore.currentPatientId || (route.params.patientId as string))
  .then((res) => (patientImages.value = res))
  .catch((error) => console.error(error))

getMyAppointments().then((res) => {
  appointments.value = res.appointments
})

getMyAppointmentImages('01HCXD1XZPYJR8EGBNQ2T09TRJ', '014750b8-fc6b-4238-9be5-26a2026bfcc1').then((res) => {
  appointments.value = { ...appointments.value, images: res.images }
})
</script>

<template>
  <div class="flex gap-x-2 my-4 flex-wrap gap-4">
    <div class="flex w-full flex-col">
      <div v-for="(appointment, idx) in appointments">
        <BaseVisitForm>
          <template #trigger>
            <div
              @click="fetchPatientTreatment(appointment.patientId)"
              class="flex flex-col mb-4 cursor-pointer my-2 p-4 rounded-2xl shadow-sm hover:bg-gray-2 bg-white"
            >
              <p>{{ formatLegibleDate(appointment.createdAt) }}</p>
              {{ appointment.images }}
              <p class="text-sm opacity-50 my-1 w-full">{{ appointment.service }}</p>
              <div class="flex items-center justify-between">
                <p class="text-sm opacity-50 w-full">Show Details</p>
                <img class="rotate-180 scale-90" :src="ChevronIcon" alt="Chevron" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex flex-col mb-4 cursor-pointer my-2 p-4 rounded-2xl shadow-sm hover:bg-gray-2 bg-white w-full">
              {{ appointment.patientId }}
              <p>{{ formatLegibleDate(appointment.startTime) }}</p>
              {{ appointment.images }}
              <p class="text-sm opacity-50 my-1 w-full">{{ appointment.service }}</p>
            </div>
            <div v-if="treatmentPlan" class="flex flex-col mb-4 cursor-pointer my-2 p-4 rounded-2xl shadow-sm hover:bg-gray-2 bg-white w-full">
              Treatment Plan: {{ treatmentPlan }}
            </div>
          </template>
        </BaseVisitForm>
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
