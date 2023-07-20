<script setup lang="ts">
// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})
</script>

<template>
  <div class="flex flex-col justify-start items-center h-screen py-8">
    <BaseWrapper>
      <!-- Summary Top -->
      <div class="w-full mb-8">
        <div class="flex justify-between w-full">
          <div class="text-[32px] font-[500] text-[#403E48]">Checkout</div>
          <div class="flex"></div>
        </div>
        <div class="text-[16px] font-[400] text-[#403E48]">Edit cart, add a new products, remove products, etc.</div>
      </div>
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between lg:w-1/2 flex-col mt-[32px] shadow-sm">
        <BaseStripe />
      </div>
    </BaseWrapper>
  </div>
</template>
