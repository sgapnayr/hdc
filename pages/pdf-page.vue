<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import { useProfileStore } from '~/stores/profile'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'blank',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const router = useRouter()
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
</script>

<template>
  <div class="p-8">
    <BaseWrapper>
      <img :src="HoneydewIcon" />
      <!-- Patient's Information -->
      <div class="mt-8">
        <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Patient's Information</h1>
        <div>{patientName}</div>
        <div class="flex w-full justify-between">
          <div class="flex">
            <div>{patientSex}</div>
            <div>{patientAge}</div>
            <div>{patientDOB}</div>
          </div>
          <div>
            <div>{patientPhone}</div>
            <div>{patientEmail}</div>
          </div>
        </div>
        <div class="flex">
          <div>{patientHeight}</div>
          <div>{patientWeight}</div>
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
