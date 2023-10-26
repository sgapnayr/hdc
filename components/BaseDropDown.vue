<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import { useRouter, useRoute } from 'vue-router'

// EMITS **********************************************************************
const emit = defineEmits<{
  (name: 'selected-option', value: string): string
}>()

// PROPS **********************************************************************
const props = defineProps<{
  options?: string[]
  titleText?: string
  customClass?: string
  placeHolder?: string
  noTitle?: boolean
  customWidth?: string
  noHeight?: boolean
}>()

// STATE **********************************************************************
const selectedOption = ref()
const isMenuOpen = ref(false)

const route = useRoute()

// METHODS **********************************************************************
function handleSelectedOption(option: string) {
  emit('selected-option', option)
  selectedOption.value = option
}
</script>

<template>
  <div :class="[customWidth ? `w-[${customWidth}px]` : 'w-[390px]', isMenuOpen ? 'z-40' : 'z-0']">
    <h2 v-if="!noTitle" :class="customClass" class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">
      {{ titleText || 'Date' }}
    </h2>
    <div
      class="bg-white md:w-full h-[48px] mb-[24px] shadow-sm outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
      :class="[isMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
      placeholder="Search by patient's name"
      type="text"
      @click.stop="isMenuOpen = !isMenuOpen"
    >
      <div class="px-4 py-1 rounded-[24px]">
        {{ selectedOption || route.query.selectedTreatmentGroup || placeHolder || 'Select' }}
      </div>
      <img :class="[isMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
      <div v-if="isMenuOpen">
        <div
          :class="noHeight ? '' : 'h-64'"
          class="absolute left-0 top-12 w-full overflow-scroll no-scrollbars border-b-gray-2 rounded-b-[28px] shadow-md bg-white"
        >
          <div
            class="w-full hover:bg-gray-2 bg-white h-[48px] outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer"
            v-for="(option, idx) in options"
            :key="idx"
            :class="[options.length - 1 === idx ? 'rounded-b-[28px]' : '']"
            @click="handleSelectedOption(option)"
          >
            <div class="px-4">
              {{ option }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
