<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import { getPatient, getTaskByAssignee } from '~/lib/endpoints'
import { usePatientStore } from '../stores/patient'

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
const selectedTab = ref(0)
const patientName = ref()

const patientStore = usePatientStore()

// METHOD **********************************************************************
function handleSelectedTab(tabIdx: number, tab: any) {
  selectedTab.value = tabIdx
  const selectedVal = props.tabs[tabIdx]

  emit('selected-patient-id', tab?.subAccountId)
}

function handleMainAccount(mainAccountId: string) {
  emit('selected-patient-id', mainAccountId)
}

const mainAccountId = computed(() => {
  return props?.tabs?.map((tab) => tab?.subAccountId?.split('-'))[0]
})
</script>

<template>
  <div class="flex w-full overflow-x-scroll">
    {{ patientData?.subAccounts }}
    <div
      @click="handleMainAccount(patientStore?.currentPrimaryAccountData?.patientId)"
      :class="['mx-[1px]', patientStore?.currentPrimaryAccountData?.patientId === highlighSubAccount ? 'opacity-100' : 'opacity-50']"
      class="px-4 py-1 bg-white rounded-t-2xl drop-shadow-sm text-sm cursor-pointer"
    >
      Primary
    </div>
    <div
      @click="handleSelectedTab(idx, tab)"
      :class="[idx !== 0 ? 'mx-[1px]' : '', tab.subAccountId === highlighSubAccount ? 'opacity-100' : 'opacity-50']"
      class="px-4 py-1 bg-white rounded-t-2xl drop-shadow-sm text-sm cursor-pointer"
      v-for="(tab, idx) in patientStore?.currentPrimaryAccountData?.subAccounts"
    >
      {{ tab.subAccountName }}
    </div>
  </div>
</template>
