<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'
import TheTransitionWrapper from '@/components/TheTransitionWrapper.vue'
import CouponImage from '@/assets/images/coupon-image.png'
import XIcon from '@/assets/icons/x-icon.svg'
import { useLandingPageStore } from '@/stores/landing-page'

// STORES **********************************************************************
const landingPageStore = useLandingPageStore()

// PROPS ****************************************************************
withDefaults(
  defineProps<{
    canClose?: boolean
    customHeader?: boolean
    customButtons?: boolean
    hardClose?: boolean
    triggerOpen?: boolean
  }>(),
  {
    canClose: true,
    customHeader: false,
    customButtons: false,
  }
)

// EMITS ****************************************************************
const emit = defineEmits<{
  (event: 'action-click'): void
}>()

// STATE ****************************************************************
const modalIsOpen = ref<boolean>(false)
const customerEmail = ref<string>()
const isError = ref<boolean>(false)

// METHODS ****************************************************************
function handleSubmit() {
  if (!customerEmail.value) isError.value = true
}
</script>

<template>
  <TheTransitionWrapper>
    <div
      v-if="modalIsOpen || triggerOpen"
      class="shadow fixed w-screen z-30 min-h-screen flex justify-center items-start left-0 top-0 bottom-0"
      @click="canClose ? landingPageStore.handleFirstVisitCouponInvisible() : ''"
    >
      <div class="relative flex justify-center top-24 lg:top-1/5 w-full max-w-[600px] mx-4 p-1">
        <transition name="modal">
          <div class="bg-honeydew-bg2 rounded-[4px] shadow-xl flex flex-col" @click.stop>
            <div class="flex items-start">
              <img class="w-1/3 rounded-l-xl" :src="CouponImage" alt="Coupon Image" />
              <div class="flex flex-col w-full">
                <div class="w-full justify-end items-end flex p-4">
                  <img @click="landingPageStore.handleFirstVisitCouponInvisible()" :src="XIcon" alt="X Icon" class="text-black scale-90 cursor-pointer" />
                </div>
                <div class="px-4 text-center">
                  <h1 class="text-center font-bold md:text-3xl text-gray-3">Unlock 10% off and learn more!</h1>
                  <p class="text-gray-3 mt-2 text-xs">Everyone deserves to be happy in their skin!</p>
                  <input class="bg-transparent border border-[#E1E0E6] rounded-[3px] mt-2 md:mt-4 p-1 md:p-2 w-full" placeholder="First name" type="text" />
                  <input class="bg-transparent border border-[#E1E0E6] rounded-[3px] mt-2 md:mt-4 p-1 md:p-2 w-full" placeholder="Last name" type="text" />
                  <div class="relative">
                    <input
                      v-model="customerEmail"
                      :class="[isError ? 'border-red' : 'border-[#E1E0E6]']"
                      class="bg-transparent border rounded-[3px] mt-2 md:mt-4 p-1 md:p-2 w-full"
                      placeholder="Email"
                      type="text"
                    />
                    <p v-if="isError" class="text-red mt-2 text-[8px] -bottom-3 absolute">Need this field to unlock offer.</p>
                  </div>
                  <button @click="handleSubmit" class="bg-[#167551] text-[10px] md:text-[14px] w-full text-white p-2 mt-2 md:mt-4 font-semibold rounded-[4px]">
                    Unlock Offer
                  </button>
                  <p class="text-gray-3 mt-2 text-[8px]">By signing up, you agree to receive email marketing</p>
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
      <BaseButton color-scheme="gray" @click.stop="modalIsOpen = true"> Press For Modal </BaseButton>
    </slot>
  </div>
</template>

<style scoped>
.shadow {
  background: rgba(4, 3, 4, 0.5);
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

input::placeholder,
input {
  font-weight: 300;
  font-size: 12px;
  text-align: start;
  display: flex;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
