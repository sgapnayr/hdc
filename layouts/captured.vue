<template>
  <div class="flex flex-col justify-center items-center">
    <TheSideBar class="fixed w-[80px] left-0 top-0 z-10" />
    <div class="flex w-full justify-end">
      <div class="min-h-screen element flex justify-center items-start bg-honeydew-bg2 w-full">
        <NuxtPage class="w-full" />
      </div>
    </div>
    <!-- Add view port size and scroll fade? -->
    <!-- <div>
      <TheFooterApp />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import TheFooterApp from './TheFooterApp.vue'
import TheSideBar from './TheSideBar.vue'
</script>

<style scoped>
.element {
  width: calc(100% - 80px);
}
</style>
