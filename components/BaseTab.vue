<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import { getTaskByAssignee } from '~/lib/endpoints'

// PROPS **********************************************************************
const props = defineProps<{
  tabs: any
  patientId: string
  patientData: any
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

function handleMainAccount(mainAccountId: string) {
  emit('selected-patient-id', mainAccountId)
}

const mainAccountId = computed(() => {
  return props?.tabs?.map((tab) => tab.subAccountId.slice(0, tab.subAccountId.length - 2))[0]
})
</script>

<template>
  <div class="flex w-full overflow-x-scroll">
    <div
      @click="props?.tabs?.map((tab) => tab.subAccountId).length > 0 ? handleMainAccount(mainAccountId) : ''"
      :class="['mx-[1px]', mainAccountId === highlighSubAccount ? 'opacity-100' : 'opacity-50']"
      class="px-4 py-1 bg-white rounded-t-2xl drop-shadow-sm text-sm cursor-pointer"
    >
      Primary
    </div>
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
