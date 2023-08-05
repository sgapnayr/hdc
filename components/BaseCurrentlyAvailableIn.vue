<script setup lang="ts">
// IMPORTS ********************************************************************
import { useLandingPageStore } from '@/stores/landing-page'

// STORE ********************************************************************
const landingPageStore = useLandingPageStore()

// PROPS ********************************************************************
defineProps<{
  altLayout?: boolean
}>()
</script>

<template>
  <div :class="[altLayout ? 'flex-row' : 'flex-col']" class="mt-[24px] text-center text-[#403E48] flex">
    <div v-if="!altLayout">Currently availble in</div>
    <span class="flex" v-for="(availableLocation, idx) in landingPageStore.honeydewAvailableLocations" :key="idx">
      <div v-if="altLayout && idx === 0" class="mr-1">Currently availble in</div>
      {{
        landingPageStore.honeydewAvailableLocations.length > 1 && idx !== landingPageStore.honeydewAvailableLocations.length - 1
          ? availableLocation + ', '
          : availableLocation
      }}</span
    >
  </div>
</template>
