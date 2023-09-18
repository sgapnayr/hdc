<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useProfileStore } from '~/stores/profile'
import { usePatientStore } from '~/stores/patient'

// STORES ********************************************************************
const profileStore = useProfileStore()
const patientStore = usePatientStore()

// INITIALIZATION *************************************************************
</script>

<template>
  <!-- Medical background -->
  <div class="mt-8">
    <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Medical background</h1>
    <div v-for="(medicalItem, jdx) in profileStore.scheduleVisitDataArr">
      <div
        :class="[medicalItem.medicalTitle === 'Cycle & Menstruation' && patientStore?.patientData?.patientSex === 'Male' ? 'hidden' : '']"
        class="my-[32px] w-full"
        :key="jdx"
      >
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
</template>
