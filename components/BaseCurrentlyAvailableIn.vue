<script setup lang="ts">
// IMPORTS ********************************************************************
import { useLandingPageStore } from '@/stores/landing-page'

// STORE ********************************************************************
const landingPageStore = useLandingPageStore()
</script>

<template>
  <div class="mt-[24px]">
    <div class="text-center text-sm text-[#403E48] flex-wrap flex gap-x-1">
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
