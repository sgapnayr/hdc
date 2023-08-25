<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { getTaskByAssignee } from '~/lib/endpoints'

// PROPS **********************************************************************
const props = defineProps<{
  tabs: string[]
}>()

// EMIT **********************************************************************
const emit = defineEmits<{
  (name: 'selected-account', value: string): void
}>()

// STATE **********************************************************************
const selectedTabIdx = ref(0)

// METHOD **********************************************************************
function handleSelectedTab(tabIdx: number) {
  selectedTabIdx.value = tabIdx
  const selectedVal = props.tabs[tabIdx]

  emit('selected-account', selectedVal)
}
</script>

<template>
  <div class="flex w-full">
    <div
      @click="handleSelectedTab(idx)"
      :class="[idx !== 0 ? 'mx-[1px]' : '', idx === selectedTabIdx ? 'opacity-100' : 'opacity-50']"
      class="px-4 py-1 bg-white rounded-t-2xl drop-shadow-sm text-sm cursor-pointer"
      v-for="(tab, idx) in tabs"
    >
      {{ tab }}
    </div>
  </div>
</template>
