<!-- To use this component, there are 2 attribute so far
1) You may pass an image from the parent component
by importing the image to the parent component (ie. import Image from 'your-image-path') at the top
of your script, and the add 'Image' to the base section like such <BaseSection :image="Image">

2) You may choose for the background image to be 'cover' or 'contain'

Bonus: Or feel free to use this as an HTML element, as we do have a slot. Plenty of options and variety. Cheers.
-->

<script setup lang="ts">
// PROPS ****************************************************************
withDefaults(
  defineProps<{
    backgroundImage?: string
    backgroundSize?: 'cover' | 'contain'
  }>(),
  {
    backgroundImage: '',
    backgroundSize: 'cover',
  }
)
</script>

<template>
  <div class="w-full mx-0 box-border px-[16px] md:px-[32px]" :style="{ backgroundImage: 'url(' + backgroundImage + ')', backgroundSize }">
    <div class="h-full max-w-[1440px] w-full m-auto">
      <slot />
    </div>
  </div>
</template>
