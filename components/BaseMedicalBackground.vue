<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useProfileStore } from '~/stores/profile'
import { usePatientStore } from '~/stores/patient'
import { updateAcneSkinDryness, getPatientAcneHistory } from '@/lib/endpoints'
import { useRoute } from 'vue-router'
import CaretIcon from '@/assets/icons/caret-icon.svg'

// STORES ********************************************************************
const profileStore = useProfileStore()
const patientStore = usePatientStore()

// ROUTE *************************************************************
const route = useRoute()

// INITIALIZATION *************************************************************
updateAcneSkinDryness(route.params.patientId as string, 'A lot')
getPatientAcneHistory(route.params.patientId as string)

// HANDLE TOGGLE OPEN ********************************************************
const isOpen = ref([]) // Create a ref to store which sections are open

function handleOpen(medicalTitle: string) {
  if (isOpen.value.includes(medicalTitle)) {
    const index = isOpen.value.indexOf(medicalTitle)
    isOpen.value.splice(index, 1)
  } else {
    isOpen.value.push(medicalTitle)
  }
}
</script>

<template>
  <!-- Medical background -->
  <div class="mt-8">
    <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Medical background</h1>
    <div v-for="(medicalItem, jdx) in profileStore.scheduleVisitDataArr" class="w-full" :key="jdx">
      <div
        :class="[medicalItem.medicalTitle === 'Cycle & Menstruation' && patientStore?.patientData?.patientSex === 'Male' ? 'hidden' : '']"
        class="my-[32px] w-full"
      >
        <div @click="handleOpen(medicalItem.medicalTitle)" class="flex justify-start cursor-pointer text-[18px] font-[500] mb-[16px]">
          <div class="transition flex justify-center items-center mr-[12px] z-0" :class="[!isOpen.includes(medicalItem.medicalTitle) ? '' : '-rotate-90']">
            <img :src="CaretIcon" alt="Caret Icon" />
          </div>
          {{ medicalItem.medicalTitle }}
        </div>
        <div
          v-for="(itemDesc, kdx) in medicalItem.content"
          :key="kdx"
          :class="[!isOpen.includes(medicalItem.medicalTitle) ? '' : 'hidden']"
          class="flex w-full justify-between mb-[16px] pl-8"
        >
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
</template>
