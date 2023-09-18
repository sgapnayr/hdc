<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
})

// STATE **********************************************************************
const tabSelected = ref<string>('Treatment Plan')
</script>

<template>
  <BaseWrapper>
    <div class="p-8 rounded-[16px] flex justify-between w-full relative flex-col">
      <div class="w-full">
        <div class="flex justify-between w-full flex-col md:flex-row">
          <div class="text-[32px] font-[500] text-[#403E48]">Submit the visit</div>
          <div
            class="text-[12px] h-[40px] flex justify-center items-center rounded-[60px] text-white bg-honeydew-purple uppercase cursor-pointer mt-[16px] text-center whitespace-nowrap px-6"
          >
            Submit Visit
          </div>
        </div>
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Treatment Plan' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Treatment Plan'"
          >
            Treatment Plan
          </div>
          <div
            :class="[tabSelected === 'Medical Background' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Medical Background'"
          >
            Medical Background
          </div>
        </div>
      </div>
      <BaseTreatmentPlan v-if="tabSelected === 'Treatment Plan'" />
      <BaseMedicalBackground v-if="tabSelected === 'Medical Background'" />
    </div>
  </BaseWrapper>
</template>
