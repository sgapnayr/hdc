<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'

// EMITS ****************************************************************
const emit = defineEmits(['selected-option'])

// STATE ****************************************************************
const isSelected = ref<boolean>(false)

// PROPS ****************************************************************
defineProps<{
  selectedAnswer?: string
  questionLabel: string
}>()
</script>

<template>
  SELECT: {{ selectedAnswer }}
  <div @click="isSelected = !isSelected" class="w-[370px] h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer">
    <div
      class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
      :class="[selectedAnswer === questionLabel ? 'bg-honeydew-green' : '']"
    >
      {{ selectedAnswer }}
      <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
    </div>
    <div class="text-gray-3">
      {{ questionLabel }}
    </div>
  </div>
</template>
