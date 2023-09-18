<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import XIcon from '@/assets/icons/x-icon-white.svg'
import ChevronIcon2 from '@/assets/icons/chevron-down-icon.svg'
import { useProfileStore } from '~/stores/profile'

// EMITS ****************************************************************
const emit = defineEmits(['close-modal'])

// MEMBER DATA ****************************************************************
const isChecked = ref(false)
const signName = ref()
const testsOrdered = ref<string[]>([])

// STORES ********************************************************************
const profileStore = useProfileStore()

// METHODS ********************************************************************
function handleAddTestOrdered() {
  if (signName.value.trim()) {
    testsOrdered.value.push(signName.value.trim())
    signName.value = ''
  }
}

function handleRemoveTestOrdered(index: number) {
  testsOrdered.value.splice(index, 1)
}
</script>

<template>
  <!-- Desktop Version -->
  <div @click="emit('close-modal')" class="fixed w-full flex flex-col z-50 lg:flex bg-opacity-50 bg-[#403E4880] items-end grow min-h-screen">
    <div @click.stop class="flex flex-col w-full lg:max-w-[800px] bg-honeydew-bg2 grow min-h-screen shadow-2xl">
      <div @click.stop class="text-sm font-medium leading-[24px] flex gap-x-2 cursor-pointer mb-8 bg-white items-center shadow-sm justify-between">
        <div class="flex items-center">
          <div @click="emit('close-modal')" class="border-r border-r-[#E1E0E6] p-6 mr-8">
            <img class="rotate-90" :src="ChevronIcon2" alt="Chevron Icon" />
          </div>
          <div class="flex text-[#403E48] text-[20px]">Send blood slip form</div>
        </div>
        <button
          :disable="!isChecked && !signName"
          :class="[isChecked && signName ? 'bg-honeydew-purple ' : 'bg-gray-2']"
          class="w-[150px] rounded-[80px] text-white p-3 text-center cursor-pointer transition active:scale-90 text-[12px]"
        >
          POPULATE PDF
        </button>
      </div>

      <div class="flex flex-col rounded-xl shadow-sm bg-white mt-6 mx-6">
        <div class="p-6 flex justify-between border-b border-[#F2F4F7]">
          <div class="mb-3 text-[18px] w-full">Select blood slip template</div>
          <div class="w-full">
            <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Blood Slip Template</p>
            <input
              v-model="signName"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
            />
          </div>
        </div>
        <div class="p-6 flex justify-between border-b border-[#F2F4F7]">
          <div class="mb-3 text-[18px] w-full">Blood slip details</div>
          <div class="w-full">
            <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Diagnosis Code</p>
            <input
              v-model="signName"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
            />
            <p class="mb-[8px] mt-[16px] px-4 uppercase text-[12px] text-[#403E48]">Tests Ordered</p>
            <input
              v-model="signName"
              @keydown.enter="handleAddTestOrdered"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
            />
            <div v-if="testsOrdered.length > 0" class="flex flex-wrap gap-2 mb-2 mt-4">
              <div v-for="(test, idx) in testsOrdered" :key="test" class="bg-[#403e48] rounded-lg px-4 py-2 text-white text-sm flex gap-x-2">
                <div>
                  {{ test }}
                </div>
                <img @click="handleRemoveTestOrdered(idx)" class="scale-75 cursor-pointer transition" :src="XIcon" alt="X Icon" />
              </div>
            </div>
            <div class="mb-2 mt-4 text-[#403e48]" v-else>This is where tests ordered will be shown.</div>
            <p class="mb-[8px] mt-[16px] px-4 uppercase text-[12px] text-[#403E48]">Valid From</p>
            <input
              v-model="signName"
              type="date"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
            />
            <p class="mb-[8px] mt-[16px] px-4 uppercase text-[12px] text-[#403E48]">Frequency / Duration</p>
            <input
              v-model="signName"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
            />
          </div>
        </div>
      </div>
      <button
        :disable="!isChecked && !signName"
        :class="[isChecked && signName ? 'bg-honeydew-purple ' : 'bg-gray-2']"
        class="w-[150px] rounded-[80px] text-white p-3 text-center cursor-pointer transition active:scale-90 text-[12px] mx-6 mt-6"
      >
        POPULATE PDF
      </button>
    </div>
  </div>
</template>
