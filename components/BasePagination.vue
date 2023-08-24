<script setup lang="ts">
import { ref, computed } from 'vue'
import ChevronIcon from '@/assets/icons/chevron-down-icon.svg'

// PROPS ****************************************************************
const props = defineProps({
  currentPageProps: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

// EMIT ****************************************************************
const emit = defineEmits(['page-back', 'page-forward', 'skip-to'])

// COMPUTED ****************************************************************
const displayedPages = computed(() => {
  const pages = []
  pages.push(props.currentPageProps) // current page

  // prev page
  if (props.currentPageProps > 0) pages.unshift(props.currentPageProps - 1)

  // next page
  if (props.currentPageProps < props.totalPages - 1) pages.push(props.currentPageProps + 1)

  return pages
})
</script>

<template>
  <div v-if="totalPages > 1" class="flex gap-x-4 mt-4 items-center">
    <!-- Previous Button -->
    <div
      class="cursor-pointer flex justify-center items-center transition active:scale-90 p-2 border border-[#E1E0E6] rounded-md"
      :class="{ 'opacity-50': props.currentPageProps === 0 }"
      @click="emit('page-back')"
    >
      <img class="rotate-90" :src="ChevronIcon" alt="Chevron Icon" />
    </div>

    <!-- Page Numbers -->
    <div
      v-for="page in displayedPages"
      :key="page"
      @click="emit('skip-to', page)"
      class="transition cursor-pointer"
      :class="[props.currentPageProps === page ? 'opacity-100' : 'active:scale-90 opacity-25 hover:opacity-50']"
    >
      {{ page + 1 }}
    </div>

    <!-- Next Button -->
    <div
      class="cursor-pointer flex justify-center items-center transition active:scale-90 p-2 border border-[#E1E0E6] rounded-md"
      :class="{ 'opacity-50': props.currentPageProps === props.totalPages - 1 }"
      @click="emit('page-forward')"
    >
      <img class="rotate-[270deg]" :src="ChevronIcon" alt="Chevron Icon" />
    </div>
  </div>
</template>
