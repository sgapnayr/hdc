import { defineStore } from 'pinia'

export const useLandingPageStore = defineStore('landing-page', () => {
  const honeydewAvailableLocations = ref(['New York'])

  return { honeydewAvailableLocations }
})
