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

const feetVal = computed(() => {
  return Math.floor(patientStore?.patientData?.patientHeight / 12)
})

const inchesVal = computed(() => {
  return patientStore?.patientData?.patientHeight % 12
})

const feet = ref(feetVal.value)
const inches = ref(inchesVal.value)

const updatePatientFirstName = ref(profileStore.profileData?.patientFirstName)
const updatePatientLastName = ref(profileStore.profileData?.patientLastName)
const updatePatientPhoneNumber = ref(profileStore.profileData?.patientPhoneNumber)
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

const updateProfileChanges = async () => {
  updatePatient(
    route.params.patientId,
    updatePatientFirstName.value,
    updatePatientLastName.value,
    updatePatientWeight.value,
    updatePatientPhoneNumber.value,
    computeHeightInInches.value,
    updatePatientDOB.value,
    updatePatientSex.value,
    updatePatientAddress.value
  )

  watch(patientStore?.currentPatientId, () => {
    patientStore.getPatientFromGraphQL(patientStore?.currentPatientId)
  })

  setTimeout(() => {
    emit('close-modal')
  }, 100)
}
</script>

<template>
  <div @click="emit('close-modal')" class="fixed w-full flex flex-col z-50 lg:flex bg-opacity-50 bg-[#403E4880] items-end grow min-h-screen">
    <div @click.stop class="flex flex-col w-full lg:max-w-[800px] bg-honeydew-bg2 grow min-h-screen shadow-2xl">
      <div @click.stop class="text-sm font-medium leading-[24px] flex gap-x-2 cursor-pointer mb-8 bg-white items-center shadow-sm justify-between">
        <div class="flex items-center">
          <div @click="emit('close-modal')" class="border-r border-[#E1E0E6] p-6 mr-8">
            <img class="rotate-90" :src="ChevronIcon2" alt="Chevron Icon" />
          </div>
          <div class="flex text-[#403E48] text-lg">Edit patient's details</div>
        </div>
        <button
          @click="updateProfileChanges"
          class="w-[150px] rounded-full text-white p-3 text-center cursor-pointer transition active:scale-90 text-xs mx-6 bg-honeydew-purple"
        >
          SAVE CHANGES
        </button>
      </div>
      <div class="px-6 py-4">
        <p class="text-[#6C6A7C] text-lg">After you save the applied changes the details will be changed for patient as well.</p>
      </div>
      <!-- Make Scroll -->
      <div class="flex flex-col rounded-xl shadow-sm bg-white mt-6 mx-6 overflow-y-auto scrollable-section">
        <!-- Patient's information -->
        <div class="p-6 flex flex-col border-b border-[#F2F4F7]">
          <div class="mb-3 text-xl w-full">Patient's information</div>
          <div class="w-full">
            <p class="mb-2 px-4 uppercase text-sm text-[#403E48]">First name</p>
            <input
              v-model="updatePatientFirstName"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Last name</p>
            <input
              v-model="updatePatientLastName"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Phone Number</p>
            <input
              v-model="updatePatientPhoneNumber"
              v-maska
              :data-maska="['+' + '1' + ' (###) ###-####']"
              :placeholder="profileStore.signUpName || 'Enter your phone number'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <div class="flex gap-x-5 mt-4">
              <div class="flex flex-col">
                <p class="mb-2 px-4 uppercase text-sm text-[#403E48]">Height (Feet)</p>
                <input
                  v-maska
                  :data-maska="['#']"
                  v-model="feet"
                  :placeholder="profileStore.signUpName || '5'"
                  class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
                />
              </div>
              <div class="flex flex-col">
                <p class="mb-2 px-4 uppercase text-sm text-[#403E48]">Height (Inches)</p>
                <input
                  v-maska
                  :data-maska="['##']"
                  v-model="inches"
                  :placeholder="profileStore.signUpName || '8'"
                  class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
                />
              </div>
            </div>

            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Weight (in lbs)</p>
            <input
              v-maska
              :data-maska="['###']"
              v-model="updatePatientWeight"
              :placeholder="profileStore.signUpName || 'Enter your weight in lbs'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Date of Birth</p>
            <input
              v-maska
              :data-maska="['##/##/####']"
              v-model="updatePatientDOB"
              :placeholder="profileStore.signUpName || 'Enter your DOB'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <BaseDropDown
              :placeHolder="patientStore?.patientData?.patientSex"
              @selected-option="(val) => (updatePatientSex = val)"
              custom-class="px-4 text-sm mt-2"
              title-text="Sex Assigned at Birth"
              :options="['Male', 'Female']"
            />
          </div>
        </div>
        <!-- Shipping address -->
        <div class="p-6 flex flex-col border-b border-[#F2F4F7]">
          <div class="mb-3 text-xl w-full">Shipping address</div>
          <div class="w-full">
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Address</p>
            <input
              v-model="updatePatientAddress"
              :placeholder="profileStore.signUpName || '123 Main St. City, ST, 12345'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
          </div>
        </div>
      </div>
      <button
        @click="updateProfileChanges"
        class="w-[150px] rounded-full text-white p-3 text-center cursor-pointer transition text-xs mx-6 mt-6 bg-honeydew-purple"
      >
        SAVE CHANGES
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollable-section {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
