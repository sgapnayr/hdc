<!-- Base Alert Component Instructions
The Base alert component handles deleting itself off the page and can accept 4 props so far, alertText, linkText, linkDestination, and canClose.
1) The alertText props will be the main heading text, whatever your alert needs to say should go here. Example: <BaseAlert alert-text="This is an alert.">
2) The linkText and linkDestination are to be used in conjunction with one another, the linkText will be the underlined
text to the right side of the alertText, please give it a destination as well, so upon clicking the link, our users have
a place to arrive. Including our prop alertText, our example may look like...

<BaseAlert
  alert-text="This is an alert."
  link-text="Click Here"
  link-destination="/new-coupon">

3) and canClose is a prop in which the alert has the ability to close itself`

Love,
Ryan -->

<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import XIcon from '@/assets/icons/x-icon-white.svg'

// PROPS ****************************************************************
withDefaults(
  defineProps<{
    alertText?: string
    linkText?: string
    linkDestination?: string
    canClose?: boolean
  }>(),
  {
    alertText: 'New Coupon',
    linkText: 'Book Now',
    linkDestination: '/sign-up',
    canClose: true,
  }
)

// MEMBER DATA ****************************************************************
const alertOpen = ref(true)
</script>

<template>
  <div v-if="alertOpen" class="page-wrapper bg-honeydew-purple2 flex items-center text-white h-[48px]" :class="[!alertText ? 'h-2' : '']">
    <div class="content-wrapper uppercase flex justify-center items-center text-white p-1 text-sm">
      <slot>
        <div>
          {{ alertText }} <a class="text-sm underline ml-2" :href="linkDestination">{{ linkText }}</a>
        </div>
      </slot>
    </div>
    <div v-if="canClose" class="flex justify-end cursor-pointer" @click="alertOpen = false">
      <img class="scale-90" :src="XIcon" alt="X Icon" />
    </div>
  </div>
</template>

<style scoped>
/* Default styles for page wrapper */
.page-wrapper {
  background-size: cover;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: 0 16px;
}

/* Default styles for content wrapper */
.content-wrapper {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

@media only screen and (max-width: 390px) {
  .page-wrapper {
    padding: 0 16px;
  }
}
</style>
