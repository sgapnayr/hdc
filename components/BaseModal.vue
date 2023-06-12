<!-- BaseModal Instructions

To use our base modal, we have one attribute you may pass in - this attribute allows for the modal
to be closed or not, perhaps you'd like for it to not close for a sign up flow, etc. This attribute would be passed
in with the parent like <BaseModal :can-close="true" />

The second important part to our modal, is taking advantage of named slots, to pass in custom content into our modal
you must use a template in our parent component that may look like the following

<BaseModal>
  <template #content>
    PUT YOUR DIVs AND CONTENT HERE
  </template>
</ BaseModal>

As seen, it is important to add the '#content' to the template tag. In addition to customizing the content
we may also customize the modal trigger button. This would like this...

<BaseModal>
  <template #content>
    PUT YOUR DIVs AND CONTENT HERE
  </template>

  <template #button>
    PUT YOUR CUSTOM TRIGGER HERE
  </template>`
</ BaseModal>

You can see we add a #button template... feel free to use these in conjunction with each other.

Cheers

-->

<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'
import TheTransitionWrapper from '@/components/TheTransitionWrapper.vue'
import XIcon from '@/assets/icons/x-icon.svg'

// PROPS ****************************************************************
withDefaults(
  defineProps<{
    canClose?: boolean
  }>(),
  {
    canClose: true,
  }
)

// EMITS ****************************************************************
const emit = defineEmits<{
  (event: 'action-click'): void
}>()

// MEMBER DATA ****************************************************************
const modalIsOpen = ref<boolean>(false)

function test() {
  emit('action-click')
  modalIsOpen.value = false
}
</script>

<template>
  <TheTransitionWrapper>
    <div
      v-if="modalIsOpen"
      class="shadow fixed w-screen z-30 min-h-screen flex justify-center items-start left-0 top-0 bottom-0"
      @click="canClose ? (modalIsOpen = false) : ''"
    >
      <div class="relative flex justify-center top-40 lg:top-1/5 w-full">
        <transition name="modal">
          <div class="bg-white rounded-[8px] shadow-xl" @click.stop>
            <div class="text-[18px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between p-4 px-6">
              <slot name="header"> Header </slot>
              <img @click="modalIsOpen = false" :src="XIcon" alt="X Icon" class="text-black scale-90 cursor-pointer" />
            </div>
            <div class="p-5 bg-honeydew-bg2 rounded-b-[8px]">
              <slot name="content"> Content </slot>
              <div class="flex w-full justify-end gap-x-4">
                <div
                  @click="modalIsOpen = false"
                  class="text-[12px] h-[40px] w-[133px] flex justify-center items-center rounded-[60px] bg-[#EEEBFC] text-honeydew-purple uppercase cursor-pointer mt-[32px]"
                >
                  Close
                </div>
                <div
                  @click="test"
                  class="text-[12px] h-[40px] px-6 flex justify-center items-center rounded-[60px] bg-honeydew-purple text-white uppercase cursor-pointer mt-[32px] whitespace-nowrap"
                >
                  <slot name="button-text"> Content </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </TheTransitionWrapper>
  <div @click="modalIsOpen = true">
    <slot name="button">
      <BaseButton color-scheme="gray" @click="modalIsOpen = true"> Press For Modal </BaseButton>
    </slot>
  </div>
</template>

<style scoped>
.shadow {
  background: rgba(64, 62, 72, 0.25);
  transition: opacity 0.25s ease-in-out;
}

.shadowOut {
  background: rgba(59, 60, 64, 0);
  transition: 0.5s all ease-in-out;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
