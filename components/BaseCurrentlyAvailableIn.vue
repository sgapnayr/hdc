<script setup lang="ts">
// IMPORTS ********************************************************************
import { useLandingPageStore } from '@/stores/landing-page'

// STORE ********************************************************************
const landingPageStore = useLandingPageStore()
</script>

<template>
  <div class="mt-[24px]">
    <div class="text-center text-sm text-[#403E48] whitespace-nowrap gap-x-1 flex flex-wrap items-center">
      <div v-for="(availableLocation, idx) in landingPageStore.honeydewAvailableLocations" :key="idx">
        {{
          landingPageStore.honeydewAvailableLocations.length > 1 && idx !== landingPageStore.honeydewAvailableLocations.length - 1 && idx !== 0
            ? availableLocation + ', '
            : availableLocation
        }}
      </div>
    </div>
  </div>
</template>
