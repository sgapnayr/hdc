<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import ChevronIcon from '@/assets/icons/chevron-icon.svg'
import ChevronIcon2 from '@/assets/icons/chevron-down-icon.svg'
import BlueIcon from '@/assets/icons/blue-icon.svg'
import UploadIcon from '@/assets/icons/upload-icon.svg'
import { useProfileStore } from '~/stores/profile'

// EMITS ****************************************************************
const emit = defineEmits(['close-modal'])

// MEMBER DATA ****************************************************************
const photo = ref()
const previewURL = ref()
const dragging = ref(false)
const isChecked = ref(false)
const signName = ref()

// STORES ********************************************************************
const profileStore = useProfileStore()

// METHODS ********************************************************************
const handleFileSelect = (e: any) => {
  const file = e.target.files[0]
  if (file) {
    photo.value = file
    generatePreview(file)
  }
}

const handleDrop = (e: any) => {
  e.preventDefault()
  dragging.value = false
  const file = e.dataTransfer.files[0]
  if (file) {
    photo.value = file
    generatePreview(file)
  }
}

const generatePreview = (file: any) => {
  const reader = new FileReader()
  reader.onload = () => {
    previewURL.value = reader.result
  }
  reader.readAsDataURL(file)
}

const uploadPhoto = async () => {
  const formData = new FormData()
  formData.append('photo', photo.value)
  emit('close-modal')

  // try {
  //   const response = await axios.post('/api/upload', formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   })
  //   console.log(response.data)
  // } catch (error) {
  //   console.error(error)
  // }
}
</script>

<template>
  <!-- Desktop Version -->
  <div @click="emit('close-modal')" class="fixed w-full flex flex-col z-50 lg:flex bg-opacity-50 bg-[#403E4880] items-end grow min-h-screen">
    <div @click.stop class="flex flex-col w-full lg:max-w-[800px] bg-honeydew-bg2 grow min-h-screen shadow-2xl">
      <div @click.stop class="text-sm font-medium leading-[24px] flex gap-x-2 cursor-pointer mb-8 bg-white items-center shadow-sm justify-between">
        <div class="flex items-center">
          <div @click="emit('close-modal')" class="border-r border-r-[#E1E0E6] p-6 mr-8">
            <img class="rotate-90" :src="ChevronIcon2" alt="Chevron Icon" />
          </div>
          <div class="flex text-[#403E48] text-[20px]">Complete pregnancy test</div>
        </div>
        <button
          @click="uploadPhoto"
          :disable="!isChecked && !signName"
          :class="[isChecked && signName ? 'bg-honeydew-purple ' : 'bg-gray-2']"
          class="w-[150px] rounded-[80px] text-white p-3 text-center cursor-pointer transition active:scale-90 text-[12px]"
        >
          SIGN & SEND
        </button>
      </div>
      <div class="px-6">
        <p class="text-[#6C6A7C] text-[16px]">
          iPledge requires a negative pregnancy test to enroll you and begin your 30-day wait period. Please upload a picture of your urine pregnancy test.
        </p>
      </div>
      <div class="bg-[#E2EBFD] p-5 flex gap-x-4 rounded-xl shadow-sm items-start mx-6 mt-6">
        <img :src="BlueIcon" alt="Blue Icon" />
        <p class="text-[#403E48] text-[16px]">
          After this test, a pregnancy test will be required every 30 days and must be done at a CLIA-certified lab. We will send you a lab order before your
          first lab test in 30 days.
        </p>
      </div>
      <div class="p-6 mx-6 rounded-xl shadow-sm bg-white mt-6">
        <div class="mb-3 text-[18px]">1. Upload an image of your pregnancy test</div>
        <div
          class="border border-[#F2F4F7] p-20 rounded-xl flex justify-center items-center flex-col"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop="handleDrop"
        >
          <img :src="UploadIcon" alt="Upload Icon" />
          <label for="fileInput" class="text-center relative cursor-pointer mt-2">
            <p>Choose a photo</p>
          </label>
          <input id="fileInput" type="file" @change="handleFileSelect" class="hidden" />
          <p class="text-[#6C6A7C]">{{ dragging ? 'You can drop it' : 'or drag it here' }}</p>
          <img v-if="previewURL" class="rounded-xl h-[320px]" :src="previewURL" alt="Photo Preview" />
        </div>
        <BaseCheckBox @checkbox-selected="(val) => (isChecked = val)" class="my-8"
          >I confirm that this is my own pregnancy test and it was taken today</BaseCheckBox
        >
        <div class="mt-4 border-t border-[#F2F4F7] pt-3">
          <div class="mb-3 text-[18px]">2. Type your name to provide an e-signature</div>
          <input
            v-model="signName"
            :placeholder="profileStore.signUpName || 'Enter your full name'"
            class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
          />
        </div>
      </div>
      <button
        @click="uploadPhoto"
        :disable="!isChecked && !signName"
        :class="[isChecked && signName ? 'bg-honeydew-purple ' : 'bg-gray-2']"
        class="w-[150px] rounded-[80px] text-white p-3 text-center cursor-pointer transition active:scale-90 text-[12px] mx-6 mt-6"
      >
        SIGN & SEND
      </button>
    </div>
  </div>

  <!-- Mobile Version -->
  <div class="absolute w-full flex flex-col z-50 bg-[#403E4880] items-end grow min-h-screen md:hidden">
    <div class="flex flex-col w-full md:max-w-[800px] bg-honeydew-bg2 grow">
      <div class="bg-white p-5 rounded-xl shadow-sm">
        <div @click="emit('close-modal')" class="text-honeydew-purple text-[16px] font-[500] leading-[24px] flex gap-x-2 cursor-pointer mb-8">
          <img :src="ChevronIcon" alt="Chevron Icon" />
          Back
        </div>
        <div class="flex text-[#403E48] text-[18px] mb-[10px]">Complete pregnancy test</div>
        <p class="text-[#6C6A7C] text-[14px]">
          iPledge requires a negative pregnancy test to enroll you and begin your 30-day wait period. Please upload a picture of your urine pregnancy test.
        </p>
      </div>
      <div class="bg-[#E2EBFD] mt-2 p-5 flex gap-x-4 rounded-xl shadow-sm items-start">
        <img :src="BlueIcon" alt="Blue Icon" />
        <p class="text-[#403E48] text-[14px]">
          After this test, a pregnancy test will be required every 30 days and must be done at a CLIA-certified lab. We will send you a lab order before your
          first lab test in 30 days.
        </p>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm">
        <div class="border border-[#F2F4F7] p-3 rounded-xl">
          <div class="mb-3">1. Upload an image of your pregnancy test</div>
          <div
            class="border border-[#F2F4F7] p-10 rounded-xl flex justify-center items-center flex-col"
            @dragover.prevent="dragging = true"
            @dragleave="dragging = false"
            @drop="handleDrop"
          >
            <img :src="UploadIcon" alt="Upload Icon" />
            <label for="fileInput" class="text-center relative cursor-pointer">
              <p>Choose a photo</p>
            </label>
            <input id="fileInput" type="file" @change="handleFileSelect" class="hidden" />
            <p class="text-[#6C6A7C]">{{ dragging ? 'You can drop it' : 'or drag it here' }}</p>
            <img v-if="previewURL" class="rounded-xl h-[300px]" :src="previewURL" alt="Photo Preview" />
          </div>
          <BaseCheckBox @checkbox-selected="(val) => (isChecked = val)" class="mt-4"
            >I confirm that this is my own pregnancy test and it was taken today</BaseCheckBox
          >
          <div class="mt-4 border-t border-[#F2F4F7] pt-3">
            <div class="mb-3">2. Type your name to provide an e-signature</div>
            <input
              v-model="signName"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
            />
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl shadow-sm w-full mt-4">
        <button
          @click="uploadPhoto"
          :disable="!isChecked && !signName"
          :class="[isChecked && signName ? 'bg-honeydew-purple ' : 'bg-gray-2']"
          class="w-full rounded-[80px] text-white p-4 text-center cursor-pointer transition active:scale-90"
        >
          SIGN & SEND
        </button>
      </div>
    </div>
  </div>
</template>
