<template>
  <div class="bg-honeydew-bg w-full flex justify-center min-h-[5vh] items-start text-gray-1 leading-[24px] font-[400]">
    &copy; {{ date.getFullYear() }} Honeydew Health, Inc. All rights reserved.
  </div>
</template>

<script setup lang="ts">
const date = new Date()
</script>
