<script setup lang="ts">
// IMPORTS **********************************************************************
import { ref } from 'vue'
import { useMedicationStore } from '~/stores/medications'
import PlusIcon from '@/assets/icons/plus-circle.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'

// PROPS **********************************************************************
const props = defineProps<{
  idx?: number
  treatmentGroups?: string[]
}>()

// STATE **********************************************************************
const inputText = ref('')
const items = ref([])
const medicationsStore = useMedicationStore()
const isDropDownOpen = ref(false)

// STORE **********************************************************************
medicationsStore.fetchMedications()

// EMITS **********************************************************************
const emit = defineEmits<{
  (name: 'add-group'): void
  (name: 'remove-group'): void
  (name: 'medications-id-arr', value: { id: number; medicationId: string; jdx: number }): void
}>()

// METHODS **********************************************************************
const addItem = () => {
  if (inputText.value.trim() !== '') {
    const matchedMedication = list.find((medication) => medication.medicationName.toLowerCase() === inputText.value.toLowerCase())

    if (matchedMedication) {
      items.value.push(matchedMedication)
      inputText.value = ''
      emit('medications-id-arr', matchedMedication)
    }
  }
}

const handleAddItem = (option, idx) => {
  console.log(option)
  items.value.push(option)
  emit('medications-id-arr', option)
  inputText.value = ''
  isDropDownOpen.value = false
}

const removeItem = (index) => {
  items.value.splice(index, 1)
}

function handleAddGroup() {
  emit('add-group')
  isDropDownOpen.value = false
}

function handleRemoveGroup() {
  emit('remove-group')
  isDropDownOpen.value = false
}

// DATA **********************************************************************
const list = medicationsStore.medicationData.map((medication) => {
  return { medicationName: medication.medicationName, medicationId: medication.medicationId, medicationStrength: medication.medicationStrength }
})

const filteredList = computed(() => {
  return list.filter((item) => item.medicationName.toLowerCase().includes(inputText.value.toLowerCase()))
})
</script>

<template>
  <div class="flex bg-white items-center py-4">
    <div class="flex w-full gap-2 items-start">
      <img v-if="idx === 0" @click="handleAddGroup" :src="PlusIcon" alt="Plus Icon" class="opacity-50 pl-4 cursor-pointer hover:opacity-100" />
      <img v-if="idx > 0" @click="handleRemoveGroup" :src="DeleteIcon" alt="Plus Icon" class="opacity-50 pl-4 cursor-pointer hover:opacity-100" />
      <div class="flex-wrap flex gap-2 w-full">
        <div
          v-for="(item, index) in items"
          :key="index"
          @click="removeItem(index)"
          class="shadow-md flex items-center p-2 rounded cursor-pointer hover:opacity-50 transition flex-wrap"
        >
          {{ item.medicationName }}
          <button @click="removeItem(index)" class="ml-2 bg-red-500 text-black rounded text-sm">X</button>
        </div>
        <input
          @click="isDropDownOpen = true"
          v-model="inputText"
          @keyup.enter="addItem"
          class="rounded cursor-pointer outline-none focus:outline-none w-full"
          placeholder="Seach for Medication"
        />
      </div>
    </div>
  </div>
  <div class="overflow-scroll no-scrollbars">
    <div
      v-if="isDropDownOpen || inputText"
      v-for="(medication, idx) in filteredList"
      class="w-full hover:bg-gray-2 bg-white h-[48px] outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer"
      @click="handleAddItem(medication, idx)"
    >
      <div class="shadow-md p-2">
        {{ medication.medicationName }}
        <span class="opacity-30 ml-1 text-xs">{{ medication.medicationStrength ? `(${medication.medicationStrength}mg)` : '' }}</span>
      </div>
    </div>
  </div>
</template>
