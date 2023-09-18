<script setup lang="ts">
// IMPORTS ********************************************************************
import 'v-calendar/style.css'
import Datepicker from 'vuejs3-datepicker'
import { ref } from 'vue'
import { useMedicationStore } from '@/stores/medications'
import DeleteIcon from '../assets/icons/delete-icon.svg'

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
    <div class="flex flex-col my-4 rounded-2xl shadow-sm">
      <div class="grid grid-cols-11 bg-[#F2F4F7] p-6 rounded-t-2xl">
        <div class="col-span-3">Treatment</div>
        <div class="col-span-2">Instructions</div>
        <div class="col-span-2">Special Instructions</div>
        <div class="col-span-1">Refills</div>
        <div class="col-span-2">Expiration</div>
        <div class="col-span-1">Action</div>
      </div>
      <div class="w-full grid grid-cols-11 bg-white p-6 rounded-b-2xl">
        <div class="col-span-3">{treatment}</div>
        <div class="col-span-2">{instructions}</div>
        <div class="col-span-2">{specialInstructions}</div>
        <div class="col-span-1">{refills}</div>
        <div class="col-span-2">{expiration}</div>
        <div class="col-span-1">
          <img :src="DeleteIcon" alt="Delete Icon" />
        </div>
      </div>
    </div>
    <div class="flex text-honeydew-purple cursor-pointer hover:opacity-50 transition active:opacity-0">+ ADD TREATMENT</div>

    <div class="my-8 flex w-full gap-x-16">
      <div class="w-full">
        <h2 class="text-[24px] font-[500] leading-[40px] text-gray-3">Add message to patient</h2>
        <div class="w-full bg-white my-4 p-6 h-[168px] rounded-2xl shadow-sm">
          <textarea class="w-full h-full outline-none focus:outline-none focus:ring-0 rounded" placeholder="Enter message here..."></textarea>
        </div>
      </div>
      <div class="w-full">
        <h2 class="text-[24px] font-[500] leading-[40px] text-gray-3 mb-4">Choose the follow-up date</h2>
        <datepicker :inline="true"></datepicker>
      </div>
    </div>
  </div>
</template>
