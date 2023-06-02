<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="transition opacity"
    leave-to-class="opacity-0 absolute"
    leave-active-class="transition absolute"
    mode="in-out"
  >
    <slot />
  </transition>
</template>
