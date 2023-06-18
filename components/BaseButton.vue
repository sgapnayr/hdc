<script setup lang="ts">
// IMPORTS ********************************************************************
import TheTransitionWrapper from '@/components/TheTransitionWrapper.vue'

// PROPS ****************************************************************
withDefaults(
  defineProps<{
    colorScheme?: 'green' | 'white' | 'blue' | 'gray'
    state?: 'idle' | 'loading' | 'success' | 'disabled' | 'failed'
    slim?: boolean
  }>(),
  {
    colorScheme: 'blue',
    icon: undefined,
    state: 'idle',
    slim: false,
  }
)
</script>

<template>
  <button
    class="h-[56px] rounded-[60px] text-[16px] flex justify-center items-center transition active:scale-95 uppercase leading-[24px] whitespace-nowrap relative"
    :class="[
      state === 'idle'
        ? ' text-white bg-honeydew-purple cursor-pointer'
        : state === 'disabled'
        ? 'bg-honeydew-gray cursor-not-allowed text-gray-1'
        : state === 'failed'
        ? 'bg-red cursor-pointer'
        : state === 'success'
        ? 'bg-honeydew-green cursor-pointer'
        : '',
    ]"
  >
    <!-- Text & Icon -->
    <TheTransitionWrapper>
      <div :class="[state === 'idle' || state === 'disabled' ? '' : 'invisible']">
        <slot> Continue </slot>
      </div>
    </TheTransitionWrapper>

    <!-- Loader -->
    <TheTransitionWrapper>
      <div
        v-if="state === 'loading'"
        class="absolute inline-block h-7 w-7 ml-2 animate-spin rounded-full border-4 border-solid border-transparent border-r-honeydew-purple align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
    </TheTransitionWrapper>

    <!-- Success State -->
    <TheTransitionWrapper>
      <div v-if="state === 'success'" class="absolute w-full text-white">SUCCESS</div>
    </TheTransitionWrapper>

    <!-- Failure State -->
    <TheTransitionWrapper>
      <div v-if="state === 'failed'" class="absolute w-full text-white">FAILED</div>
    </TheTransitionWrapper>
  </button>
</template>
