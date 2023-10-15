<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, watch, onMounted } from 'vue'
import { useMedicationStore } from '@/stores/medications'
import { useRoute, useRouter } from 'vue-router'

// EMITS **********************************************************************
const emit = defineEmits(['remove-item'])

// PROPS **********************************************************************
const props = defineProps<{
  medicineData?: any
  idx?: number
}>()

// ROUTER *********************************************************************
const router = useRouter()
const route = useRoute()

// MEMBER DATA ****************************************************************
const selectedMedicine = ref('')
const isDropDownOpen = ref(false)

// METHODS ********************************************************************
const updateSelectedMedicineInUrl = () => {
  const selectedMedicineStr = JSON.stringify(selectedMedicine.value)
  router.push({ query: { ...router.currentRoute.value.query, selectedMedicine: selectedMedicineStr } })
}

// INITIALIZATION *************************************************************
watch(selectedMedicine, () => {
  updateSelectedMedicineInUrl()
})

onMounted(() => {
  const urlSelectedMedicine = route.query.selectedMedicine
  if (urlSelectedMedicine) {
    try {
      selectedMedicine.value = JSON.parse(urlSelectedMedicine as string)
    } catch (error) {
      console.error('Error parsing selectedMedicine from URL', error)
    }
  }
})
</script>

<template>
  <div class="flex flex-col w-full col-span-12">
    {{ idx }}
    <div class="flex gap-x-2 items-center col-span-11 w-full">
      <div @click="isDropDownOpen = !isDropDownOpen" class="cursor-pointer grid grid-cols-11 py-4 px-4 border border-gray-2 hover:bg-gray-2 w-full">
        <div v-if="selectedMedicine === ''" class="col-span-6">Select a medication</div>
        <div class="col-span-3">{{ selectedMedicine.medicationName }}</div>
        <div class="col-span-2">{{ selectedMedicine.medicationInstructions }}</div>
        <div class="col-span-3 flex">
          {{ selectedMedicine.medicationSpecialInstructions }}
        </div>
        <div class="col-span-1">{{ selectedMedicine.medicationRefills }}</div>
        <div class="col-span-2">{{ selectedMedicine.medicationRefillExpirationInDays }}</div>
      </div>
      <div @click="emit('remove-item', idx)" class="col-span-1 text-red text-xl cursor-pointer ml-4">X</div>
    </div>
    <div v-if="isDropDownOpen" class="flex gap-x-2 items-center col-span-12 w-full">
      <div class="col-span-11 w-full">
        <div
          @click=";(selectedMedicine = medicine), (isDropDownOpen = false)"
          v-for="(medicine, idx) in medicineData"
          class="grid grid-cols-11 py-3 hover:bg-gray-2 px-3 border border-gray-2"
        >
          <div class="col-span-3">{{ medicine.medicationName }}</div>
          <div class="col-span-2">{{ medicine.medicationInstructions }}</div>
          <div class="col-span-3 flex">
            {{ medicine.medicationSpecialInstructions }}
          </div>
          <div class="col-span-1">{{ medicine.medicationRefills }}</div>
          <div class="col-span-2">{{ medicine.medicationRefillExpirationInDays }}</div>
        </div>
      </div>
      <div @click="emit('remove-item')" class="col-span-1 text-red text-xl cursor-pointer ml-4 invisible">X</div>
    </div>
  </div>
</template>
