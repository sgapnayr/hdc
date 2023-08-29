<template>
  <transition enter-from-class="opacity-0" enter-active-class="transition opacity" leave-to-class="opacity-0" leave-active-class="transition">
    <slot />
  </transition>
</template>
