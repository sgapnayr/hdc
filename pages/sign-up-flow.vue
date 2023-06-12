<!-- This file is responsible for which component the user is looking at within the current flow. -->
<!-- This file trusts 'next' and 'back' emits from it's child components (The child component itself should validate and only emit if progress is allowed) -->

<template>
  <div class="pharmacy-search w-full">
    <div class="w-full flex justify-center">
      <component :is="orderedComponentNames[currentIndex]" @next="next" @back="back" @go-to="goTo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Create child component imports here:
import TheCheckoutAppointment from '@/components/TheCheckoutAppointment.vue'
import TheCheckoutPayment from '@/components/TheCheckoutPayment.vue'
import PageRequest from '@/components/PageRequest.vue'
import TheCheckoutInsurance from '@/components/TheCheckoutInsurance.vue'

const currentIndex = ref(0)

// List the names of imported child components here.
const orderedComponentNames = [TheCheckoutAppointment, TheCheckoutInsurance, PageRequest, TheCheckoutPayment]

// If the user isn't already at the last component in the flow: Move forward.
function next() {
  currentIndex.value = currentIndex.value <= orderedComponentNames.length - 1 ? currentIndex.value + 1 : currentIndex.value
}

// If the user isn't at the first component of the flow: Move back.
function back() {
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : currentIndex.value
}

function goTo(value: number) {
  currentIndex.value = value
}
</script>
