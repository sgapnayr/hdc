<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'

// PROPS **********************************************************************
const props = defineProps<{
  tabs: string[]
}>()

// STATE **********************************************************************
const selectedTabIdx = ref(0)
</script>

<template>
  <div class="flex w-full">
    <div
      @click="selectedTabIdx = idx"
      :class="[idx !== 0 ? 'mx-[1px]' : '', idx === selectedTabIdx ? 'opacity-100' : 'opacity-50']"
      class="px-4 py-1 bg-white rounded-t-2xl drop-shadow-sm text-sm cursor-pointer"
      v-for="(tab, idx) in tabs"
    >
      {{ tab }}
    </div>
  </div>
</template>
