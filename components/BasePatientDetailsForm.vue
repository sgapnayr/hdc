<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import ChevronIcon from '@/assets/icons/chevron-icon.svg'
import ChevronIcon2 from '@/assets/icons/chevron-down-icon.svg'
import BlueIcon from '@/assets/icons/blue-icon.svg'
import UploadIcon from '@/assets/icons/upload-icon.svg'
import { useProfileStore } from '~/stores/profile'
import { usePatientStore } from '~/stores/patient'
import { updatePatient } from '../lib/endpoints'
import { useRoute } from 'vue-router'

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
const isChecked = ref(false)

const signName = ref()

const updatePatientFirstName = ref(profileStore.profileData?.patientFirstName)
const updatePatientLastName = ref(profileStore.profileData?.patientLastName)
const updatePatientPhoneNumber = ref()
const updatePatientEmailAddress = ref(patientStore.patientData?.patientEmail)
const updatePatientHeight = ref(patientStore.patientData?.patientHeight)
const updatePatientWeight = ref(patientStore.patientData?.patientWeight)
const updatePatientAddress = ref(patientStore.patientData?.patientAddress)
const updatePatientCountry = ref()
const updatePatientPostalCode = ref()
const updatePatientCity = ref()
const updatePatientStreetAddress = ref()
const updatePatientsParentFullName = ref()
const updatePatientsParentPhoneNumber = ref()
const updatePatientDOB = ref(patientStore.patientData?.patientDOB)
const updatePatientSex = ref(patientStore?.patientData?.patientSex)

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

const updateProfileChanges = async () => {
  updatePatient(
    route.params.patientId,
    updatePatientFirstName.value,
    updatePatientLastName.value,
    updatePatientWeight.value,
    updatePatientHeight.value,
    updatePatientEmailAddress.value,
    updatePatientDOB.value,
    updatePatientSex.value,
    updatePatientAddress.value
  )

  patientStore.getPatientFromGraphQL(route.params.patientId as string)
  profileStore.setMyProfile(route.params.patientId as string)
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
              :placeholder="profileStore.signUpName || 'Enter your phone number'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Email Address</p>
            <input
              v-model="updatePatientEmailAddress"
              :placeholder="profileStore.signUpName || 'Enter your email address'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Height</p>
            <input
              v-model="updatePatientHeight"
              :placeholder="profileStore.signUpName || 'Enter your height in inches'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Weight</p>
            <input
              v-model="updatePatientWeight"
              :placeholder="profileStore.signUpName || 'Enter your weight in lbs'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Date of Birth</p>
            <input
              v-model="updatePatientDOB"
              :placeholder="profileStore.signUpName || 'Enter your age'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Sex Assigned at Birth</p>
            <input
              v-model="updatePatientSex"
              :placeholder="profileStore.signUpName || 'Enter your age'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
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
            <!-- <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Postal Code</p>
            <input
              v-model="updatePatientPostalCode"
              :placeholder="profileStore.signUpName || 'Enter your zip code'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">CITY</p>
            <input
              v-model="updatePatientCity"
              :placeholder="profileStore.signUpName || 'Enter your city'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">STREET, APT.</p>
            <input
              v-model="updatePatientStreetAddress"
              :placeholder="profileStore.signUpName || 'Enter your street address'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            /> -->
          </div>
        </div>
        <!-- Parent's contact information -->
        <!-- <div class="p-6 flex flex-col border-b border-[#F2F4F7]">
          <div class="mb-3 text-xl w-full">Parent's contact information</div>
          <div class="w-full">
            <p class="mb-2 px-4 uppercase text-sm text-[#403E48]">Full name</p>
            <input
              v-model="updatePatientsParentFullName"
              :placeholder="profileStore.signUpName || 'Enter your parent\'s full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Phone Number</p>
            <input
              v-model="updatePatientsParentPhoneNumber"
              :placeholder="profileStore.signUpName || 'Enter your parent\'s phone number'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
            <p class="mb-2 mt-4 px-4 uppercase text-sm text-[#403E48]">Email Address</p>
            <input
              v-model="signName"
              :placeholder="profileStore.signUpName || 'Enter your full name'"
              class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-full h-[44px] w-full px-4"
            />
          </div>
        </div> -->
      </div>
      <button
        @click="updateProfileChanges"
        class="w-[150px] rounded-full text-white p-3 text-center cursor-pointer transition active:scale-90 text-xs mx-6 mt-6 bg-honeydew-purple"
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
