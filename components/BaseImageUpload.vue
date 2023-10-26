<script setup lang="ts">
import { ref } from 'vue'
import UploadIcon from '@/assets/icons/upload-icon.svg'
import { getPresignedUrl } from '~/lib/endpoints'

const previewURL = ref('')
const dragging = ref(false)
const photo = ref<File | null>(null)

const { imageURL, describedImage, buttonText, appointmentId } = defineProps<{
  imageURL?: string
  describedImage?: string
  buttonText?: string
  appointmentId?: string
}>()

const emit = defineEmits<{
  (event: 'photo-uploaded', value: void): void
}>()

const handleFileSelect = (e: Event) => {
  console.log('Handle file select')
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    photo.value = file
    generatePreview(file)
    uploadPhoto(file)
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
    uploadPhoto(file)
  }
}

const generatePreview = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    previewURL.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

const resizeImage = async (file: File): Promise<Blob> => {
  const image = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  return new Promise((resolve, reject) => {
    image.onload = () => {
      canvas.width = 256
      canvas.height = 256
      ctx!.drawImage(image, 0, 0, 256, 256)
      canvas.toBlob(resolve, file.type)
    }

    image.onerror = reject
    image.src = URL.createObjectURL(file)
  })
}

const uploadPhoto = async (file: File) => {
  try {
    const resizedBlob = await resizeImage(file)

    const url = await getPresignedUrl(buttonText, file.type, appointmentId)

    const uploadResult = await fetch(url, {
      method: 'PUT',
      body: resizedBlob, // note: we upload the resized blob
      headers: {
        'Content-Type': file.type,
      },
    })

    console.log('Upload result: ', uploadResult)
  } catch (error) {
    console.error('Upload failed:', error)
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
      <img v-if="!previewURL" :src="imageURL" class="absolute" />
      <div v-if="!previewURL" class="z-10 w-full flex justify-end px-4 mb-4">
        <div class="bg-[#403E48] text-white px-3 h-[28px] z-10 rounded-[6px] flex justify-center items-center">{{ buttonText }}</div>
      </div>
    </div>
    <div class="mt-6 text-[#6C6A7C] text-center">
      {{ describedImage }}
    </div>
  </div>
</template>
