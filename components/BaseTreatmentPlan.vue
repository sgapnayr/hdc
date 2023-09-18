<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useMedicationStore } from '@/stores/medications'

// STORES *********************************************************************
const medicationsStore = useMedicationStore()

// COMPUTED ********************************************************************
const treatmentNames = computed(() => {
  return medicationsStore?.treatmentData?.map((treatment) => treatment.treatmentName)
})

// INITIALIZATION *************************************************************
medicationsStore.getMedicationsFromGraphQL()
medicationsStore.getTreatmentPlansFromGraphQL()
</script>

<template>
  <div class="mt-8">
    <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Update treatment plan</h1>
    <div class="mt-4 flex gap-x-4">
      <BaseDropDown :options="treatmentNames" titleText="Treatment Plan" />
      <BaseDropDown :options="treatmentNames" titleText="Diagnosis Codes" />
    </div>
  </div>
</template>
