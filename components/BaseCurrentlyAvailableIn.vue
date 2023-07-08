<script setup lang="ts">
// IMPORTS ********************************************************************
import { useLandingPageStore } from '@/stores/landing-page'

// STORE ********************************************************************
const landingPageStore = useLandingPageStore()
</script>

<template>
  <div class="mt-[24px] text-center text-[#403E48]">
    Currently availble in
    <span v-for="(availableLocation, idx) in landingPageStore.honeydewAvailableLocations" :key="idx">{{
      landingPageStore.honeydewAvailableLocations.length > 1 && idx !== landingPageStore.honeydewAvailableLocations.length - 1
        ? availableLocation + ', '
        : availableLocation
    }}</span>
  </div>
</template>
