<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'

// PROPS **********************************************************************
defineProps<{
  mobileImage?: string
  desktopImage?: string
  employeeName?: string
  employeePosition?: string
  employeeGraduatedFrom?: string
}>()
</script>

<template>
  <div class="flex flex-col text-start md:w-[296px] w-full">
    <img class="hidden md:flex rounded-xl w-[270px]" :src="desktopImage" alt="Employee Image" />
    <img class="flex md:hidden rounded-xl" :src="mobileImage" alt="Employee Image" />
    <h2 class="text-[24px] mt-[24px] text-[#403E48]">{{ employeeName }}</h2>
    <p class="text-honeydew-purple text-[16px]">{{ employeePosition }}</p>
    <p class="text-[#6C6A7C] text-[16px] w-1/2">{{ employeeGraduatedFrom }}</p>
  </div>
</template>
