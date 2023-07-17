<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'

// PROPS **********************************************************************
const props = defineProps<{
  taskAssignedAt: any
}>()

// STATE ********************************************************************
const remainingTime = ref('')
const countDownExpired = ref(false)

// METHODS ********************************************************************
function countdown(initialTime: string) {
  const COUNT_DOWN_IN_DAYS = 5
  const expirationDate = new Date(initialTime)

  expirationDate.setDate(expirationDate.getDate() + COUNT_DOWN_IN_DAYS)
  countDownExpired.value = false
  const targetDate = expirationDate.getTime()

  const updateCountdown = () => {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance < 0) {
      remainingTime.value = 'Countdown expired'
      countDownExpired.value = true
      return
    }

    const hours = Math.floor(distance / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    remainingTime.value = `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  }

  // Update the countdown every second
  setInterval(updateCountdown, 1000)
}

// INITIALIZATION *************************************************************
onMounted(() => {
  countdown(props.taskAssignedAt)
})
</script>

<template>
  <div
    :class="[
      !remainingTime
        ? 'px-8 bg-[#EEEBFC] text-honeydew-purple animate-pulse'
        : countDownExpired
        ? 'text-white bg-honeydew-green animate-pulse'
        : 'bg-[#EEEBFC] text-honeydew-purple',
    ]"
    class="py-1 px-3 rounded-[80px] flex items-center text-[10px] shadow-sm"
  >
    <span v-if="!remainingTime"> Loading...</span>
    <span v-else>
      {{ remainingTime }}
    </span>
  </div>
</template>
