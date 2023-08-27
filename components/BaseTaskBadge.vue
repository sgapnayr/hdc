<template>
  <div
    class="px-4 py-1 rounded-[24px] shadow-sm"
    :class="{
      'bg-[#F0F5FE] text-[#5E83D4]': isCurrentColor(0),
      'bg-[#EEF7EE] text-[#3A6A34]': isCurrentColor(1),
      'bg-[#FFF7E5] text-[#996600]': isCurrentColor(2),
    }"
  >
    {{ taskLabel }}
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const { taskLabel, idx } = defineProps(['taskLabel', 'idx'])

const currentColorIndex = ref(idx % 3)

const isCurrentColor = (colorIndex) => currentColorIndex.value === colorIndex
</script>
