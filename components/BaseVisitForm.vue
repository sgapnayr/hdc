<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import ChevronIcon2 from '@/assets/icons/chevron-down-icon.svg'
import { useProfileStore } from '~/stores/profile'
import { usePatientStore } from '~/stores/patient'
import { updatePatient } from '../lib/endpoints'
import { useRoute } from 'vue-router'
import { vMaska } from 'maska'

// EMITS ****************************************************************
const emit = defineEmits(['close-modal'])

// STORES ********************************************************************
const profileStore = useProfileStore()
const patientStore = usePatientStore()

// MEMBER DATA ****************************************************************
const route = useRoute()

const photo = ref()
const previewURL = ref()
const dragging = ref(false)

const feet = ref()
const inches = ref()

const updatePatientFirstName = ref(profileStore.profileData?.patientFirstName)
const updatePatientLastName = ref(profileStore.profileData?.patientLastName)
const updatePatientPhoneNumber = ref()
const updatePatientWeight = ref(patientStore.patientData?.patientWeight)
const updatePatientAddress = ref(patientStore.patientData?.patientAddress)
const updatePatientDOB = ref(patientStore.patientData?.patientDOB)
const updatePatientSex = ref(patientStore?.patientData?.patientSex)

// METHODS ********************************************************************
const computeHeightInInches = computed(() => {
  return Number(feet.value * 12) + Number(inches.value)
})

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

const handleStartVisit = async () => {
  navigateTo('/submit-the-visit/' + route.params.patientId)
  setTimeout(() => {
    emit('close-modal')
  }, 100)

  // NEED PHOTO UPDATES
  // const formData = new FormData()
  // formData.append('photo', photo.value)
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
  <div @click="emit('close-modal')" class="fixed w-full flex flex-col z-50 lg:flex bg-opacity-50 bg-[#403E4880] items-end grow min-h-screen">
    <div @click.stop class="flex flex-col w-full lg:max-w-[800px] bg-honeydew-bg2 grow min-h-screen shadow-2xl">
      <div @click.stop class="text-sm font-medium leading-[24px] flex gap-x-2 cursor-pointer bg-white items-center shadow-sm justify-between">
        <div class="flex items-center">
          <div @click="emit('close-modal')" class="border-r border-[#E1E0E6] p-6 mr-8">
            <img class="rotate-90" :src="ChevronIcon2" alt="Chevron Icon" />
          </div>
          <div class="flex text-[#403E48] text-lg">Visit details</div>
        </div>
        <button
          @click="handleStartVisit"
          class="w-[150px] rounded-full text-white p-3 text-center cursor-pointer transition active:scale-90 text-xs mx-6 bg-honeydew-purple"
        >
          START VISIT
        </button>
      </div>

      <div class="flex flex-col rounded-xl mx-6 overflow-y-auto scrollable-section">
        <!-- Patient's information -->
        <div class="p-6 flex flex-col border-b border-[#F2F4F7]">
          <BasePatientImages />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-section {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
