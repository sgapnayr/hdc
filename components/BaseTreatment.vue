<!-- Base Treatment component -->

<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import TreatmentIcon from '@/assets/icons/treatment-icon.svg'
import MorningIcon from '@/assets/icons/morning-icon.svg'
import NightIcon from '@/assets/icons/night-icon.svg'

// PROPS **********************************************************************
defineProps<{
  treatmentName?: string
  isPrescription?: boolean
  treatmentInstructions?: string
  morningNightOrBoth: 'morning' | 'night' | 'both'
  index?: number
}>()
</script>

<template>
  <div class="bg-white p-4 flex w-full justify-between">
    <div class="flex">
      <div class="flex justify-center items-center mr-[16px]">
        <img :src="TreatmentIcon" alt="Treatment Icon" />
      </div>
      <div>
        <div class="flex">
          <div class="text-[14px] font-[400] text-[#403E48] mr-[12px]">{{ treatmentName }}</div>
          <div class="text-[14px] font-[400] text-[#6C6A7C]">{{ isPrescription ? 'Prescription' : 'Non-prescription' }}</div>
        </div>
        <div class="text-[14px] text-[#403E48]">{{ treatmentInstructions }}</div>
      </div>
    </div>
    <div class="flex justify-center items-center gap-x-2">
      <img
        v-if="morningNightOrBoth.toLowerCase().includes('morning') || morningNightOrBoth.toLowerCase().includes('both')"
        :src="MorningIcon"
        alt="Morning Icon"
      />
      <img
        v-if="
          morningNightOrBoth.toLowerCase().includes('night') ||
          morningNightOrBoth.toLowerCase().includes('evening') ||
          morningNightOrBoth.toLowerCase().includes('both')
        "
        :src="NightIcon"
        alt="Night Icon"
      />
    </div>
  </div>
</template>
