<script setup lang="ts">
// IMPORTS ****************************************************************
import ChevronIcon from '@/assets/icons/chevron-down-icon.svg'

// PROPS ****************************************************************
const props = defineProps<{
  currentPageProps: number
  totalPages: number
}>()

// EMIT ****************************************************************
const emit = defineEmits<{
  (event: 'page-back'): void
  (event: 'page-forward'): void
  (event: 'skip-to', value: number): number
}>()

// COMPUTED ****************************************************************
const rightNumberVisible = computed(() => {
  for (let idx = 0; idx < props.totalPages; idx++) {
    if (props.currentPageProps + 1 !== props.totalPages) {
      return props.currentPageProps + 2
    }
  }
  return ''
})

const rightRightNumberVisible = computed(() => {
  for (let idx = 0; idx < props.totalPages; idx++) {
    if (props.currentPageProps + 2 !== props.totalPages) {
      return props.currentPageProps + 3
    }
  }
  return ''
})

const leftNumberVisible = computed(() => {
  for (let idx = 0; idx < props.totalPages; idx++) {
    if (props.currentPageProps === 0) {
      return ''
    }
  }
  return props.currentPageProps
})
</script>

<template>
  <div class="flex gap-x-4 mt-4 items-center">
    <div class="cursor-pointer flex justify-center items-center transition active:scale-90 p-2 border border-[#E1E0E6] rounded-md" @click="emit('page-back')">
      <img class="rotate-90" :src="ChevronIcon" alt="Chevron Icon" />
    </div>

    <div v-if="leftNumberVisible" @click="emit('page-back')" class="active:scale-90 opacity-25 hover:opacity-50 cursor-pointer">
      {{ leftNumberVisible }}
    </div>
    <div
      v-for="(_, idx) in totalPages"
      :class="[currentPageProps === idx ? 'opacity-100' : 'active:scale-90 opacity-25 hover:opacity-50']"
      class="transition cursor-pointer"
      @click="emit('skip-to', idx)"
      v-show="currentPageProps === idx"
    >
      {{ idx + 1 }}
    </div>
    <div v-if="rightNumberVisible" @click="emit('page-forward')" class="active:scale-90 opacity-25 hover:opacity-50 cursor-pointer">
      {{ rightNumberVisible }}
    </div>
    <div
      v-if="rightRightNumberVisible && currentPageProps < 1"
      @click="emit('page-forward')"
      class="active:scale-90 opacity-25 hover:opacity-50 cursor-pointer"
    >
      {{ rightRightNumberVisible }}
    </div>
    <div
      class="cursor-pointer flex justify-center items-center transition active:scale-90 p-2 border border-[#E1E0E6] rounded-md"
      @click="emit('page-forward')"
    >
      <img class="rotate-[270deg]" :src="ChevronIcon" alt="Chevron Icon" />
    </div>
  </div>
</template>
