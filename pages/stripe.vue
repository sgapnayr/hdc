<script setup lang="ts">
// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <BaseWrapper>
      <BaseStripe />
    </BaseWrapper>
  </div>
</template>
