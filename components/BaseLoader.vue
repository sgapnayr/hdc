<template>
  <div></div>
  <!-- <transition>
    <div class="flex justify-center items-center relative h-48">
      <div
        class="inner-inner-spin inline-block w-3 h-3 border-[1px] border-current border-t-transparent border-x-transparent text-blue-600 rounded-full absolute"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <div
        class="inner-spin inline-block w-6 h-6 border-[1px] border-honeydew-purple border-b-transparent border-x-transparent text-blue-600 rounded-full absolutes"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <div
        class="outer-spin inline-block w-9 h-9 border-[1px] border-honeydew-green border-b-transparent border-x-transparent text-blue-600 rounded-full absolute"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <div
        class="outer-outer-spin inline-block w-12 h-12 border-[1px] border-current border-b-transparent border-x-transparent text-blue-600 rounded-full absolute"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </transition> -->
</template>

<style scoped>
.outer-outer-spin {
  animation: spin 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}
.outer-spin {
  animation: spin 3s cubic-bezier(0.23, 1, 0.32, 1) infinite;
}
.inner-spin {
  animation: spin 5s cubic-bezier(0.23, 1, 0.32, 1) infinite;
}
.inner-inner-spin {
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
