<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import PlusIcon from '@/assets/icons/plus-circle.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
// PROPS **********************************************************************
const props = defineProps<{
  idx: number
}>()
// EMITS **********************************************************************
const emit = defineEmits<{
  (name: 'add-group'): void
  (name: 'remove-group'): void
  (name: 'medications-id-arr', value: { id: number; medicationId: string; jdx: number }): void
}>()
// STATE *********************************************************************
const medicationMenuOpen = ref(false)
const medicationsCount = ref([])
const medicationIdsArr = ref([])
const medArr = ref()
// METHODS ********************************************************************
function handleRemoveMedication(idx: number) {
  medicationsCount.value.splice(idx, 1)
  medicationIdsArr.value.splice(idx, 1)
}

function handleBuildTreatmentGroup(medicationId: string, jdx: number) {
  const medicationObject = { id: props.idx, medicationId: medicationId, jdx: jdx }

  emit('medications-id-arr', medicationObject)
}
</script>
<template>
  <div :class="[medicationMenuOpen ? 'z-40' : 'z-0']">
    <div class="mb-[8px] mt-4 flex w-full justify-between items-center">
      <div class="flex">
        <img v-if="idx === 0" @click="emit('add-group')" :src="PlusIcon" alt="Plus Icon" class="opacity-50 pl-4 cursor-pointer hover:opacity-100" />
        <img v-if="idx > 0" @click="emit('remove-group')" :src="DeleteIcon" alt="Plus Icon" class="opacity-50 pl-4 cursor-pointer hover:opacity-100" />
        <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase px-1">Group</h2>
      </div>
      <img @click="medicationsCount.push(medicationsCount.length)" :src="PlusIcon" alt="Plus Icon" class="opacity-50 px-4 cursor-pointer hover:opacity-100" />
    </div>
    <div class="no-scrollbars">
      <div class="flex items-center justify-between px-4" v-for="(item, idx) in medicationsCount" :key="idx">
        <BaseMedication @medication-id="(medicationId) => handleBuildTreatmentGroup(medicationId, idx)" class="w-3/4" :key="idx" />
        <div class="h-[48px] flex items-center justify-center opacity-50 hover:opacity-100 cursor-pointer" @click="handleRemoveMedication(idx)">
          <img :src="DeleteIcon" alt="Trash Icon" />
        </div>
      </div>
    </div>
  </div>
</template>
