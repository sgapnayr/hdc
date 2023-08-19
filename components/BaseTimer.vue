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

function getColorScheme() {
  const hours = Math.floor(elapsedTime.value / (1000 * 60 * 60))
  if (hours >= 24) {
    return 'bg-[#FFF7E5] text-[#996600]'
  } else if (hours >= 72) {
    return 'bg-[#F0F5FE] text-[#5E83D4]'
  } else {
    return 'bg-[#EEEBFC] text-honeydew-purple'
  }
}

// INITIALIZATION *************************************************************
onMounted(() => {
  startTimer()
})
</script>

<template>
  <div
    :class="[!elapsedTime ? 'px-8 bg-[#EEEBFC] text-honeydew-purple animate-pulse' : getColorScheme()]"
    class="py-1 px-3 rounded-[80px] flex items-center text-[10px] shadow-sm"
  >
    <span v-if="!elapsedTime"> Loading...</span>
    <span v-else>
      {{
        `${Math.floor(elapsedTime / (1000 * 60 * 60))} hh, ${Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))} mm, ${Math.floor(
          (elapsedTime % (1000 * 60)) / 1000
        )} ss`
      }}
    </span>
  </div>
</template>
