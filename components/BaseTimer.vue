<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, onMounted } from 'vue'

// PROPS **********************************************************************
const props = defineProps<{
  taskAssignedAt: any
}>()

// STATE ********************************************************************
const elapsedTime = ref(0)

// METHODS ********************************************************************
function startTimer() {
  const initialTime = new Date(props.taskAssignedAt).getTime()

  const updateTimer = () => {
    const now = new Date().getTime()
    elapsedTime.value = now - initialTime
  }

  // Update the timer every second
  setInterval(updateTimer, 1000)
}

// INITIALIZATION *************************************************************
onMounted(() => {
  startTimer()
})
</script>

<template>
  <div
    :class="[!elapsedTime ? 'px-8 bg-[#EEEBFC] text-honeydew-purple animate-pulse' : 'bg-[#EEEBFC] text-honeydew-purple']"
    class="py-1 px-3 rounded-[80px] flex items-center text-[10px] shadow-sm"
  >
    <span v-if="!elapsedTime"> Loading...</span>
    <span v-else>
      {{
        `${Math.floor(elapsedTime / (1000 * 60 * 60 * 24))} days, ${Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, ${Math.floor(
          (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
        )} minutes, ${Math.floor((elapsedTime % (1000 * 60)) / 1000)} seconds`
      }}
    </span>
  </div>
</template>
