<script setup lang="ts">
// IMPORTS ********************************************************************
import SendButton from '@/assets/icons/send-button.svg'

// INITIALIZATION *************************************************************
</script>

<template>
  <div class="flex items-center w-full my-4">
    <div class="bg-white flex px-2 pr-3 py-2 rounded-md w-full justify-between shadow-sm">
      <input class="bg-white w-full text-start outline-none focus:outline-none focus:ring-0" placeholder="Input Note Here" type="text" />
      <img class="cursor-pointer hover:opacity-50 transition active:scale-90" :src="SendButton" alt="Send Button" />
    </div>
  </div>
  <div class="bg-[#f0f5fe] w-full p-4 rounded-2xl text-[14px] text-[#403E48]">
    <div>{noteContent}</div>
    <div class="text-[#6C6A7C] mt-4 text-xs">{noteMadeByThisPerson} on {noteCreatedOnThisDate}</div>
  </div>
</template>
