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

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'blank',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const router = useRouter()
const route = useRoute()
const user = useAuthenticator()

onMounted(() => {
  watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })
})

// STORES ********************************************************************
const profileStore = useProfileStore()
const patientStore = usePatientStore()

// STATE ********************************************************************
const patientData = ref()

// INIT ********************************************************************
patientStore.getPatientFromGraphQL(route.params.patientId as string).then((patient) => {
  patientData.value = patient
})
</script>

<template>
  <div class="p-8">
    <BaseWrapper>
      <img :src="HoneydewIcon" />
      <!-- Patient's Information -->
      <div class="mt-8">
        <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3 mt-[32px]">
          {{ patientData?.patientName }}
        </h1>
        <div class="mt-[8px] w-3/4 flex flex-wrap items-center">
          <p class="text-[16px] text-gray-5 font-[400]">{{ patientData?.patientSex }}</p>
          <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
          <p class="text-[16px] text-gray-5 font-[400]">Age {{ patientData?.patientAge }}</p>
          <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
          <p class="text-[16px] text-gray-5 font-[400]">{{ patientData?.patientDOB }}</p>
        </div>
        <div class="text-[16px] font-[400] mt-[8px] text-gray-5 flex items-center">
          <div class="text-">H: {{ patientData?.patientHeight }}</div>
          <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
          <div class="text-">W: {{ patientData?.patientWeight }}lbs</div>
        </div>
        <div class="text-[16px] font-[400] mt-[32px] text-gray-3 flex flex-col items-start gap-y-6">
          <div class="flex items-center gap-x-[14px]">
            <img :src="PhoneIcon" alt="Phone Icon" />
            <div>{{ patientData?.patientPhoneNumber }}</div>
          </div>
          <div class="flex items-center gap-x-[14px]">
            <img :src="EmailIcon" alt="Email Icon" />
            <div>{{ patientData?.patientEmail }}</div>
          </div>
        </div>
      </div>
      <!-- Medical background -->
      <div class="mt-8">
        <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Medical background</h1>
        <div v-for="(medicalItem, jdx) in profileStore.scheduleVisitDataArr">
          <div :class="[profileStore.sexAssignedAtBirth === 'Female' ? '' : 'hidden']" class="my-[32px] w-full" :key="jdx">
            <div class="flex justify-start cursor-pointer text-[18px] font-[500] mb-[16px]">
              {{ medicalItem.medicalTitle }}
            </div>
            <div v-for="(itemDesc, kdx) in medicalItem.content" :key="kdx" class="flex w-full justify-between mb-[16px] pl-8">
              <div class="w-1/2 text-gray-5 font-[400]">
                {{ itemDesc.name }}
              </div>
              <div class="w-1/2 flex justify-end text-gray-5 font-[400]">
                {{ itemDesc.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Visit details -->
      <div class="mt-8">
        <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Visit details</h1>
        <div>{visitDate}</div>
        <div>Photos</div>
        <div class="flex gap-x-4">
          <div>{leftPhoto}</div>
          <div>{middlePhoto}</div>
          <div>{rightPhoto}</div>
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>
