<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import JoelSpitzDesktop from '@/assets/images/joel-spitz-desktop.png'
import DavidDesktop from '@/assets/images/david-desktop.png'

// STATE ********************************************************************
const visitType = ref<'Initial-visit' | 'Follow-up'>('Initial-visit')

// METHODS ********************************************************************
const initialVisitProvidersToChooseFrom = [
  {
    providerName: 'Joel Spitz',
    providerUrl: 'https://schedule.nylas.com/joel-spitz-initial-consultation-30min',
    providerBio: 'Princeton / Columbia College of Physicians and Surgeons',
    providerImage: JoelSpitzDesktop,
  },

  {
    providerName: 'David Futoran',
    providerUrl: 'https://schedule.nylas.com/david-futoran-inital-consultation',
    providerBio: 'Princeton / Columbia College of Physicians and Surgeons',
    providerImage: DavidDesktop,
  },
]

const followUpVisitProvidersToChooseFrom = [
  {
    providerName: 'Joel Spitz',
    providerUrl: 'https://schedule.nylas.com/joel-spitz-follow-up-30min',
    providerBio: 'Princeton / Columbia College of Physicians and Surgeons',
    providerImage: JoelSpitzDesktop,
  },

  {
    providerName: 'David Futoran',
    providerUrl: 'https://schedule.nylas.com/david-futoran-follow-up',
    providerBio: 'Princeton / Columbia College of Physicians and Surgeons',
    providerImage: DavidDesktop,
  },
]

// INITIALIZATION *************************************************************
</script>

<template>
  <div v-if="visitType === 'Initial-visit'" class="flex flex-wrap">
    <NuxtLink :to="provider.providerUrl" v-for="(provider, idx) in initialVisitProvidersToChooseFrom" class="flex flex-col text-start md:w-[296px] w-full">
      <img class="flex rounded-xl w-[270px]" :src="provider.providerImage" alt="Employee Image" />
      <h2 class="text-[24px] mt-[24px] text-[#403E48]">{{ provider.providerName }}</h2>
      <p class="text-honeydew-purple text-[16px]">{{ provider.providerName }}</p>
      <p class="text-[#6C6A7C] text-[16px] w-1/2">{{ provider.providerBio }}</p>
    </NuxtLink>
  </div>

  <div v-if="visitType === 'Follow-up'" class="flex flex-wrap">
    <NuxtLink :to="provider.providerUrl" v-for="(provider, idx) in followUpVisitProvidersToChooseFrom" class="flex flex-col text-start md:w-[296px] w-full">
      <img class="flex rounded-xl w-[270px]" :src="provider.providerImage" alt="Employee Image" />
      <h2 class="text-[24px] mt-[24px] text-[#403E48]">{{ provider.providerName }}</h2>
      <p class="text-honeydew-purple text-[16px]">{{ provider.providerName }}</p>
      <p class="text-[#6C6A7C] text-[16px] w-1/2">{{ provider.providerBio }}</p>
    </NuxtLink>
  </div>
</template>
