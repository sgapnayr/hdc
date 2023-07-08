<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import ChevronIcon from '@/assets/icons/chevron-icon.svg'
import BlueIcon from '@/assets/icons/blue-icon.svg'
import UploadIcon from '@/assets/icons/upload-icon.svg'

// MEMBER DATA ****************************************************************
const photo = ref()
const previewURL = ref()
const dragging = ref(false)

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
  <div class="absolute w-full flex flex-col z-10">
    <div class="flex flex-col w-full bg-honeydew-bg2 h-screen">
      <div class="bg-white p-5 rounded-xl shadow-sm">
        <div class="text-honeydew-purple text-[16px] font-[500] leading-[24px] flex gap-x-2 cursor-pointer mb-8">
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
            <img v-if="previewURL" class="rounded-xl" :src="previewURL" alt="Photo Preview" />
          </div>
          <BaseCheckBox class="mt-4">I confirm that this is my own pregnancy test and it was taken today</BaseCheckBox>

          <div class="mt-4 border-t border-[#F2F4F7] pt-3">
            <div class="mb-3">2. Type your name to provide an e-signature</div>
            <BaseInput />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
