<script setup lang="ts">
import { ref } from 'vue'
import UploadIcon from '@/assets/icons/upload-icon.svg'

const previewURL = ref('')
const dragging = ref(false)
const photo = ref<File | null>(null)

defineProps<{
  imageURL?: string
  describedImage?: string
  buttonText?: string
}>()

const emit = defineEmits<{
  (event: 'photo-uploaded', value: void): void
}>()

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    photo.value = file
    generatePreview(file)
  }
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  dragging.value = true
}

const handleDragLeave = () => {
  dragging.value = false
}

const handleDrop = (e: DragEvent) => {
  emit('photo-uploaded')
  e.preventDefault()
  dragging.value = false
  const file = e.dataTransfer.files?.[0]
  if (file) {
    photo.value = file
    generatePreview(file)
  }
}

const generatePreview = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    previewURL.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

const uploadPhoto = async () => {
  if (photo.value) {
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
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="bg-white h-[200px] w-[200px] rounded-[12px] border border-[#E1E0E6] flex justify-end items-center flex-col"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <div v-if="!previewURL" class="flex z-10 flex-col items-center justify-center grow -mb-4">
        <img :src="UploadIcon" alt="Upload Icon" class="w-10" />
        <label for="fileInput" class="text-center relative cursor-pointer">
          <p>Choose a photo</p>
        </label>
        <input id="fileInput" type="file" @change="handleFileSelect" class="hidden" />
        <p class="text-[#6C6A7C]">{{ dragging ? 'You can drop it' : 'or drag it here' }}</p>
      </div>
      <img v-if="previewURL" class="rounded-xl h-[300px]" :src="previewURL" alt="Photo Preview" />
      <img v-if="!previewURL" :src="imageURL" alt="Image URL" class="absolute" />
      <div v-if="!previewURL" class="z-10 w-full flex justify-end px-4 mb-4">
        <div class="bg-[#403E48] text-white px-3 h-[28px] z-10 rounded-[6px] flex justify-center items-center">{{ buttonText }}</div>
      </div>
    </div>
    <div class="mt-6 text-[#6C6A7C] text-center">
      {{ describedImage }}
    </div>
  </div>
</template>
