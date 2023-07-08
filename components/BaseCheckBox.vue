<!-- To use our base check box component, please reference the instructions below...

  The BaseCheckBox component is simply a boolean value emitter... fancy language for
  just saying it toggles between true or false.

  To access that true or false value, do such in the parent component,

  1) import BaseCheckBox from '/your/path'
  2) place it within your template <BaseCheckBox />
  3) access the emitted value like such 
  <BaseCheckBox @checkbox-selected="(nameOfYourEmittedBooleanValueHere) => nameOfYourFunction(nameOfYourEmittedBooleanValueHere)">

    it can seem complicated... it is simple though you are just receiving a boolean value in an arrow function like such (bool) => func(),
    you can choose to pass the bool value in your function or not.

    Cheers!
  -->

<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import CheckIcon from '@/assets/icons/checkmark.svg'

// STATE ****************************************************************
const isSelected = ref<boolean>(false)

// EMIT ****************************************************************
const emit = defineEmits(['checkbox-selected'])

// METHODS ****************************************************************
function handleCheckBox() {
  isSelected.value = !isSelected.value
  emit('checkbox-selected', isSelected.value)
}
</script>

<template>
  <div @click.stop="handleCheckBox" class="flex items-center md:items-start text-gray-4 w-full cursor-pointer">
    <div
      class="border border-gray-2 w-[26px] h-[20px] rounded-[4px] mr-[16px] cursor-pointer text-white flex justify-center items-center"
      :class="[isSelected ? 'bg-honeydew-green' : '']"
    >
      <img v-if="isSelected" :src="CheckIcon" alt="Checkmark Icon" class="scale-75" />
    </div>
    <slot>I agree to terms and conditions.</slot>
  </div>
</template>
