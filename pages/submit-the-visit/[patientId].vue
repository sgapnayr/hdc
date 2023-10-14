<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { usePatientStore } from '../../stores/patient'
import { useMedicationStore } from '../../stores/medications'
import { useRoute } from '~/.nuxt/vue-router'
import { assignTreatmentPlanToPatient } from '@/lib/endpoints'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
})

// ROUTER **********************************************************************
const route = useRoute()

// STORE **********************************************************************
const patientStore = usePatientStore()
const medicationStore = useMedicationStore()

// STATE **********************************************************************
const tabSelected = ref<string>('Treatment Plan')

// INIT **********************************************************************
patientStore.getPatientFromGraphQL(route?.params?.patientId as string)
</script>

<template>
  <BaseWrapper>
    <div class="p-8 rounded-[16px] flex justify-between w-full relative flex-col no-scrollbars">
      <div class="w-full">
        <div class="flex justify-between w-full flex-col md:flex-row">
          <div>
            <div class="text-[32px] font-[500] text-[#403E48]">
              Submit {{ patientStore?.patientData?.patientName && patientStore?.patientData?.patientName + "'s" }} visit
            </div>
          </div>
          <div
            @click="assignTreatmentPlanToPatient(route?.params?.patientId, medicationStore.selectedPatientTreatmentPlan)"
            class="text-[12px] h-[40px] flex justify-center items-center rounded-[60px] text-white bg-honeydew-purple uppercase cursor-pointer mt-[16px] text-center whitespace-nowrap px-6 hover:opacity-50 active:opacity-0 transition"
          >
            Submit Visit
          </div>
        </div>
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[
              tabSelected === 'Treatment Plan'
                ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple'
                : 'border-b-2 border-b-honeydew-bg2 hover:opacity-50 transition',
            ]"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Treatment Plan'"
          >
            Treatment Plan
          </div>
          <div
            :class="[
              tabSelected === 'Medical Background'
                ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple'
                : 'border-b-2 border-b-honeydew-bg2 hover:opacity-50 transition',
            ]"
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
