import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const isSuccessfulToastVisible = ref(false)
  const isFailedToastVisible = ref(false)

  function showSuccessfulToast() {
    isSuccessfulToastVisible.value = true

    setTimeout(() => {
      isSuccessfulToastVisible.value = false
    }, 1000)
  }

  function showFailedToast() {
    isFailedToastVisible.value = true

    setTimeout(() => {
      isFailedToastVisible.value = false
    }, 1000)
  }

  return {
    showSuccessfulToast,
    showFailedToast,
    isSuccessfulToastVisible,
    isFailedToastVisible,
  }
})
