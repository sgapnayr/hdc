<script setup lang="ts">
// IMPORTS ********************************************************************
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
</script>

<template>
  <div class="h-[80px] flex justify-center">
    <img class="mr-[16px]" :src="HoneydewIcon" alt="Honeydew Icon" />
    <img :src="HoneydewLogo" alt="Honeydew Logo" />
  </div>
</template>
