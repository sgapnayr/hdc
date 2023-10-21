<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import PhoneIcon from '@/assets/icons/phone-icon.svg'
import EmailIcon from '@/assets/icons/email-icon.svg'
import { useProfileStore } from '~/stores/profile'
import { usePatientStore } from '~/stores/patient'
import { useRoute } from 'vue-router'
import { getMyProfileImages } from '~/lib/endpoints'
import { calculateAge, calculateHeightInFeetAndInches } from '../../utils/helpers'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'blank',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const route = useRoute()
const user = useAuthenticator()
let userImages = []

onMounted(async () => {
  watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })
  userImages = await getMyProfileImages()
  console.log('user images: ', userImages)
})

// STORES ********************************************************************
const profileStore = useProfileStore()
const patientStore = usePatientStore()

const auth = useAuthenticator()

// STATE ********************************************************************
const patientData = ref()

// INIT ********************************************************************
watch(patientStore.currentPatientId, () => {
  profileStore.setMyProfile(patientStore.currentPatientId as string)
  patientStore.getPatientFromGraphQL(patientStore.currentPatientId as string)
})

profileStore.setMyProfile((patientStore.currentPatientId as string) || (route.params.patientId as string))
patientStore.getPatientFromGraphQL((patientStore.currentPatientId as string) || (route.params.patientId as string))
</script>

<template>
  <div class="p-8 bg-honeydew-bg2 min-h-screen">
    <BaseWrapper>
      <img :src="HoneydewIcon" />
      <!-- Patient's Information -->
      <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3 mt-[32px]">
        {{ patientStore?.patientData?.patientName || 'Loading...' }}
      </h1>
      <div class="mt-[8px] w-3/4 flex flex-wrap items-center">
        <p class="text-[16px] text-gray-5 font-[400]">{{ patientStore?.patientData?.patientSex }}</p>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <p class="text-[16px] text-gray-5 font-[400]">{{ patientStore.patientData?.patientDOB }}</p>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <p class="text-[16px] text-gray-5 font-[400]">{{ calculateAge(patientStore.patientData?.patientDOB) + ' yrs' }}</p>
      </div>
      <div class="text-[16px] font-[400] mt-[8px] text-gray-5 flex items-center">
        <div class="text-">H: {{ calculateHeightInFeetAndInches(patientStore.patientData?.patientHeight) }}</div>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <div class="text-">W: {{ patientStore.patientData?.patientWeight }}lbs</div>
      </div>
      <div class="text-[16px] font-[400] mt-[32px] text-gray-3 flex flex-col items-start gap-y-6">
        <div class="flex items-center gap-x-[14px]">
          <img :src="PhoneIcon" alt="Phone Icon" />
          <div>{{ patientStore.patientData?.patientPhoneNumber || '-' }}</div>
        </div>
        <div class="flex items-center gap-x-[14px]">
          <img :src="EmailIcon" alt="Email Icon" />
          <div>{{ patientStore.patientData?.patientEmail || auth?.user?.signInUserSession?.idToken?.payload?.email }}</div>
        </div>
      </div>
      <!-- Medical background -->
      <BaseMedicalBackground />

      <!-- Visit details -->
      <div class="mt-8">
        <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Patient Visits</h1>
        <BasePatientImages />
      </div>
    </BaseWrapper>
  </div>
</template>
