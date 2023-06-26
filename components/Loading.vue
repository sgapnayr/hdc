<script setup lang="ts">
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
</script>

<template>
  <transition>
    <div class="absolute w-full min-h-screen z-50 bg-honeydew-bg left-0">
      <div class="flex justify-center items-center min-h-screen">
        <div class="absolute bottom-24 flex flex-col justify-center items-center">
          <div class="flex">
            <img class="w-[40px] md:w-auto mr-[16px]" :src="HoneydewIcon" alt="Honeydew Icon" />
            <img class="w-[148px] md:w-auto" :src="HoneydewLogo" alt="Honeydew Logo" />
          </div>
          <div class="mt-4 w-full flex justify-center items-center">
            <div class="flex gap-x-1 container justify-center items-center">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
        <div
          class="inner-inner-spin inline-block w-16 h-16 border-[2px] border-current border-t-transparent border-x-transparent text-blue-600 rounded-full absolute"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <div
          class="inner-spin inline-block w-32 h-32 border-[2px] border-honeydew-purple border-b-transparent border-x-transparent text-blue-600 rounded-full absolute"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <div
          class="outer-spin inline-block w-48 h-48 border-[2px] border-honeydew-green border-b-transparent border-x-transparent text-blue-600 rounded-full absolute"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <div
          class="outer-outer-spin inline-block w-64 h-64 border-[2px] border-current border-b-transparent text-blue-600 rounded-full absolute"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes fallingAnimation {
  0% {
    transform: translate(0, -15px);
    opacity: 0;
  }
  25%,
  50%,
  75% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(0, 15px);
    opacity: 0;
  }
}
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #6c6a7c;
}

.container .dot:nth-last-child(1) {
  animation: fallingAnimation 1s 0.3s linear infinite;
}
.container .dot:nth-last-child(2) {
  animation: fallingAnimation 1s 0.2s linear infinite;
}
.container .dot:nth-last-child(3) {
  animation: fallingAnimation 1s 0.1s linear infinite;
}

.outer-outer-spin {
  animation: spin 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;

  @keyframes spin {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.outer-spin {
  animation: spin 3s cubic-bezier(0.23, 1, 0.32, 1) infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.inner-spin {
  animation: spin 5s cubic-bezier(0.23, 1, 0.32, 1) infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.inner-inner-spin {
  animation: spin 0.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
