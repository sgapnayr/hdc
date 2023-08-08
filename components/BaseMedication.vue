<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useMedicationStore } from '@/stores/medications'
import CaretIcon from '@/assets/icons/caret-icon.svg'

// STORE **********************************************************************
const medicationsStore = useMedicationStore()

// STATE **********************************************************************
const selectedMedicationId = ref()
const selectedMedicationName = ref()
const medicationMenuOpen = ref(false)
</script>

<template>
  <div
    class="bg-white h-[48px] mb-[12px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
    :class="[medicationMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
    placeholder="Search by patient's name"
    type="text"
    @click="medicationMenuOpen = !medicationMenuOpen"
  >
    <div class="px-4 py-1 rounded-[24px]">
      {{ selectedMedicationName || 'Medication Name' }}
      <span class="opacity-30 ml-2 text-xs">{{ '' }}</span>
    </div>
    <img :class="[medicationMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
    <div v-if="medicationMenuOpen">
      <div class="absolute left-0 top-12 w-full h-48 overflow-scroll rounded-b-[28px] no-scrollbars">
        <div
          class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer"
          v-for="(medication, idx) in medicationsStore.medicationData"
          :key="idx"
          :class="[medicationsStore.medicationData.length - 1 === idx ? 'rounded-b-[28px]' : '']"
          @click=";(selectedMedicationId = medication.medicationId), (selectedMedicationName = medication.medicationName)"
        >
          <!-- @click=";(selectedPatientIdToBecomeNewEmployee = patient.patientId), (selectedPatientNameForNewEmployee = patient.patientName)" -->
          <div class="px-4 py-1 rounded-[24px]">
            {{ medication.medicationName }}
            <!-- <span class="opacity-30 ml-2 text-xs">{{ medication.medicationId }}</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.no-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}
</style>
