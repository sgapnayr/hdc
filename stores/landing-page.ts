import { defineStore } from 'pinia'

export const useLandingPageStore = defineStore('landing-page', () => {
  const honeydewAvailableLocations = ref(['New York, New Hampshire, Rhode Island, Massachusetts, Virgin Islands, Puerto Rico'])

  return { honeydewAvailableLocations }
})
