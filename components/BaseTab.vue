<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { getTaskByAssignee } from '~/lib/endpoints'

// PROPS **********************************************************************
const props = defineProps<{
  tabs: any
  patientId: string
  highlighSubAccount?: string
}>()

// EMIT **********************************************************************
const emit = defineEmits<{
  (name: 'selected-patient-id', value: string): void
}>()

// STATE **********************************************************************
const selectedTabIdx = ref(0)

// METHOD **********************************************************************
function handleSelectedTab(tabIdx: number, tab: any) {
  selectedTabIdx.value = tabIdx
  const selectedVal = props.tabs[tabIdx]

  emit('selected-patient-id', tab?.subAccountId)
}
</script>

<template>
  <div class="flex w-full overflow-x-scroll">
    <div
      @click="handleSelectedTab(idx, tab)"
      :class="[idx !== 0 ? 'mx-[1px]' : '', tab.subAccountId === highlighSubAccount ? 'opacity-100' : 'opacity-50']"
      class="px-4 py-1 bg-white rounded-t-2xl drop-shadow-sm text-sm cursor-pointer"
      v-for="(tab, idx) in tabs"
    >
      {{ tab?.subAccountName }}
    </div>
  </div>
</template>
