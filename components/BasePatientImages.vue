<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { getMyProfileImages } from '../lib/endpoints'
import { useProfileStore } from '../stores/profile'
import { usePatientStore } from '../stores/patient'
import ChevronIcon from '../assets/icons/chevron-icon.svg'
import { getMyAppointments, getMyAppointmentImages, getPatientName, getEmployeeName, getPatientTreatment, viewImage } from '@/lib/endpoints'
import { formatLegibleDate } from '@/utils/helpers'
import FaceFrontOutline from '@/assets/images/face-front-outline.svg'
import FaceLeftOutline from '@/assets/images/face-left-outline.svg'
import FaceRightOutline from '@/assets/images/face-right-outline.svg'

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
const patientImageUrls = ref<{ [key: string]: string | null }>({
  'Left profile': null,
  'Front profile': null,
  'Right profile': null,
})
const appointments = ref()

// FUNCTIONS *********************************************************************
const fetchPatientTreatment = async (patientId: string, appointmentId: string) => {
  profileStore.isVisitFormOpen = true

  try {
    const imagesResponse = await getMyAppointmentImages(appointmentId, patientId)
    patientImages.value = imagesResponse.images

    for (let profile of ['Left profile', 'Front profile', 'Right profile']) {
      const image = patientImages.value.find((img) => img.filename.includes(profile))
      patientImageUrls.value[profile] = image ? await viewImage(image.imageId, appointmentId, patientId) : null
    }
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
</script>

<template>
  <div class="flex gap-x-2 my-4 flex-wrap gap-4">
    <div class="flex w-full flex-col">
      <div class="flex items-center gap-x-4" v-for="(appointment, idx) in appointments">
        <BaseVisitForm>
          <template #trigger>
            <div
              @click="fetchPatientTreatment(appointment.patientId, appointment.appointmentId)"
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
              <p>{{ formatLegibleDate(appointment.startTime) }}</p>
              <p class="text-sm opacity-50 my-1 w-full">{{ appointment.service }}</p>
              <div class="flex gap-x-4 my-2">
                <div class="flex" v-for="profile in ['Left profile', 'Front profile', 'Right profile']">
                  <img v-if="patientImageUrls[profile]" class="w-[172px] rounded-2xl shadow-sm" :src="patientImageUrls[profile]" />
                  <div v-else class="w-[172px] h-[172px] rounded-2xl shadow-sm border"></div>
                </div>
              </div>
            </div>
          </template>
        </BaseVisitForm>
        <div class="flex gap-x-4 my-2">
          <div class="flex items-center" v-for="profile in ['Left profile', 'Front profile', 'Right profile']">
            <img v-if="patientImageUrls[profile]" class="w-[104px] rounded-2xl shadow-sm" :src="patientImageUrls[profile]" />
            <div v-else class="w-[104px] h-[104px] rounded-2xl shadow-sm border border-gray-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
