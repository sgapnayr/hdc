<script setup lang="ts">
import { ref } from 'vue'

// PROPS ********************************************************************
const { taskLabel } = defineProps(['taskLabel'])
</script>

<template>
  <div
    class="px-4 py-1 rounded-[24px] shadow-sm"
    :class="{
      'bg-[#F0F5FE] text-[#5E83D4]':
        taskLabel.toLowerCase() === 'low' || taskLabel.toLowerCase() === 'new patient' || taskLabel.toLowerCase() === 'submit prescription',
      'bg-[#EEF7EE] text-[#3A6A34]':
        taskLabel.toLowerCase() === 'medium' || taskLabel.toLowerCase() === 'new messages' || taskLabel.toLowerCase() === 'accutane',
      'bg-[#FFF7E5] text-[#996600]':
        taskLabel.toLowerCase() === 'high' || taskLabel.toLowerCase() === 'send blood slip' || taskLabel.toLowerCase() === 'ents needed',
    }"
  >
    {{ taskLabel }}
  </div>
</template>
