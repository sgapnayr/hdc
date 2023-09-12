<script setup lang="ts">
// IMPORTS ********************************************************************
import { useAuthenticator } from '@aws-amplify/ui-vue'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})
</script>

<template>
  <div class="flex flex-col py-8">
    <BaseWrapper> <BaseSelectAppointment visit-type="Follow-up" /> </BaseWrapper>
  </div>
</template>
