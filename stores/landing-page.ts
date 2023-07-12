import { defineStore } from 'pinia'

export const useLandingPageStore = defineStore('landing-page', () => {
  const honeydewAvailableLocations = ref(['New York, New Hampshire, Rhode Island, Massachusetts, Virgin Islands, Puerto Rico'])
  const firstVisitCouponVisible = ref(false)

  function handleFirstVisitCouponVisible() {
    setTimeout(() => {
      firstVisitCouponVisible.value = true
    }, 4000)
  }

  function handleFirstVisitCouponInvisible() {
    firstVisitCouponVisible.value = false
  }

  return { firstVisitCouponVisible, honeydewAvailableLocations, handleFirstVisitCouponVisible, handleFirstVisitCouponInvisible }
})
