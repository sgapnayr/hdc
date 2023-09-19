<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import { useEmployeeStore } from '~/stores/employees'
import { assignPatientProvider, getPatient } from '@/lib/endpoints'

// PROPS **********************************************************************
const props = defineProps<{
  patientId?: string | string[]
  patientData?: string | any
}>()

// STORE **********************************************************************
const employeeStore = useEmployeeStore()

// STATE **********************************************************************
const selectedProvider = ref()
const isMenuOpen = ref(false)

// COMPUTED *********************************************************************
const providers = computed(() => {
  return employeeStore.allEmployees.filter((employee: any) => employee?.role?.includes('PROVIDER')).map((provider) => provider)
})

const providersId = computed(() => {
  return employeeStore.allEmployees.filter((employee: any) => employee?.role?.includes('PROVIDER')).map((provider) => provider.employeeId)
})

// METHODS **********************************************************************
async function handleSelectedProvider(provider: any) {
  selectedProvider.value = provider.firstName + ' ' + provider.lastName
  assignPatientProvider(props.patientId, provider.employeeId)
  isMenuOpen.value = false
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="p-4 bg-[#f8f7fe] border border-[#F2F4F7] flex justify-between cursor-pointer boxShadow flex-col hover:bg-[#F2F4F7] active:opacity-0 transition"
      :class="[isMenuOpen ? 'rounded-t-md z-40' : 'rounded-md']"
      placeholder="Search by patient's name"
      type="text"
      @click.stop="isMenuOpen = !isMenuOpen"
    >
      <div class="px-4 rounded-[24px] whitespace-nowrap flex justify-between w-full">
        {{ selectedProvider || patientData.patientProvider || 'Select Provider' }}
        <img :class="[isMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="transition" />
      </div>
    </div>
    <div v-if="isMenuOpen">
      <div
        class="p-4 bg-[#f8f7fe] border border-[#F2F4F7] flex justify-between cursor-pointer boxShadow flex-col hover:bg-[#F2F4F7] active:opacity-0 transition"
        v-for="(provider, idx) in providers"
        :key="idx"
        :class="[providers.length - 1 === idx ? 'rounded-b-md' : '']"
        @click="handleSelectedProvider(provider)"
      >
        <div class="px-4">
          {{ provider.firstName + ' ' + provider.lastName }}
        </div>
      </div>
    </div>
  </div>
</template>
