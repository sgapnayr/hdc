<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useProfileStore } from '~/stores/profile'
import { usePatientStore } from '~/stores/patient'
import { useTasksStore } from '~/stores/task'
import { useAppointmentsStore } from '~/stores/appointments'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import UploadIcon from '@/assets/icons/upload-icon.svg'
import { useRoute } from 'vue-router'
import { getPatient } from '../../lib/endpoints'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const route = useRoute()

// STORE **********************************************************************
const profileStore = useProfileStore()
const patientStore = usePatientStore()
const tasksStore = useTasksStore()
const appointmentsStore = useAppointmentsStore()

// STATE *********************************************************************
const treatmentHistoryOrDocumentsSelected = ref<string>('Treatment History')
const isOpen = ref<any[]>([])
const documentModalMenuOpen = ref(false)
const photo = ref()
const previewURL = ref()
const dragging = ref(false)

// METHODS *********************************************************************
function handleOpen(idx: string) {
  if (!isOpen.value.includes(idx)) {
    isOpen.value.push(idx)
  } else {
    const deleteIdx = isOpen.value.indexOf(idx)
    isOpen.value.splice(deleteIdx, 1)
  }
}

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
}

const patientProfile = ref()
const selectedSubAccountId = ref()

getPatient(route.params.patientId as string)
  .then((res) => (patientProfile.value = res))
  .catch((error) => console.error(error))

tasksStore.getAllTasksFromGraphQLByPatient(route.params.patientId as string)

appointmentsStore.getAllAppointments()
profileStore.setMyProfile()
profileStore.setMyProfile(route.params.patientId as string)

function handleSubAccount(selectedSubAccount: string) {
  selectedSubAccountId.value = selectedSubAccount
  navigateTo('/view-history/' + selectedSubAccount)
  patientStore.currentPatientId = selectedSubAccount
  profileStore.setMyProfile(patientStore.currentPatientId as string)
}
</script>

<template>
  <BaseWrapper>
    <div class="flex justify-end w-full gap-x-4 flex-row -mb-8 mt-4">
      <div>
        <BaseAddTaskButton />
      </div>
    </div>
    <div class="flex py-8 pb-24 gap-x-6 flex-col lg:flex-row">
      <!-- Left Side -->
      <div class="flex flex-col lg:w-1/3 relative z-10">
        <BaseTab
          class="absolute -top-6"
          @selected-patient-id="(selectedSubAccount) => handleSubAccount(selectedSubAccount)"
          :tabs="patientStore?.patientData?.subAccounts"
          :patientId="profileStore?.profileData?.patientId"
          :patientData="profileStore?.profileData"
          :highlighSubAccount="(route.params.patientId as string)"
        />
        <BasePatientViewHistoryCard />
      </div>

      <!-- Right Side (Treatment history & @photo-uploaded="isPhotoUploaded = true") -->
      <div class="lg:w-2/3 rounded-[8px] flex flex-col z-0 mt-4 lg:mt-0">
        <div class="bg-white flex px-8 gap-x-6 shadow-sm">
          <div
            @click="treatmentHistoryOrDocumentsSelected = 'Treatment History'"
            class="py-6 cursor-pointer whitespace-nowrap"
            :class="[treatmentHistoryOrDocumentsSelected === 'Treatment History' ? 'text-honeydew-purple border-b-2 border-b-honeydew-purple' : '']"
          >
            Treatment History
          </div>
          <div
            @click="treatmentHistoryOrDocumentsSelected = 'Documents'"
            class="py-6 cursor-pointer"
            :class="[treatmentHistoryOrDocumentsSelected === 'Documents' ? 'text-honeydew-purple border-b-2 border-b-honeydew-purple' : '']"
          >
            Documents
          </div>
        </div>

        <!-- Treatment History -->
        <div v-if="treatmentHistoryOrDocumentsSelected === 'Treatment History'" class="p-8">
          <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Medical background</h1>
          <div>
            <div v-if="profileStore?.scheduleVisitDataArr?.length === 0">
              <a href="/schedule-my-free-visit" class="opacity-50 hover:opacity-100 cursor-pointer transition my-2 text-sm">Fill Out Medical Background?</a>
            </div>
            <div v-for="(medicalItem, jdx) in profileStore.scheduleVisitDataArr">
              <div
                :class="[medicalItem.medicalTitle === 'Cycle & Menstruation' && patientStore?.patientData?.patientSex === 'Male' ? 'hidden' : '']"
                class="my-[32px] w-full"
                :key="jdx"
              >
                <div @click="handleOpen(medicalItem.medicalTitle)" class="flex justify-start cursor-pointer text-[18px] font-[500] mb-[16px]">
                  <div
                    class="transition flex justify-center items-center mr-[12px] z-0"
                    :class="[!isOpen.includes(medicalItem.medicalTitle) ? '' : '-rotate-90']"
                  >
                    <img :src="CaretIcon" alt="Caret Icon" />
                  </div>
                  {{ medicalItem.medicalTitle }}
                </div>
                <div
                  v-for="(itemDesc, kdx) in medicalItem.content"
                  :key="kdx"
                  :class="[!isOpen.includes(medicalItem.medicalTitle) ? '' : 'hidden']"
                  class="flex w-full justify-between mb-[16px] pl-8"
                >
                  <div class="w-1/2 text-gray-5 font-[400]">
                    {{ itemDesc.name }}
                  </div>
                  <div class="w-1/2 flex justify-end text-gray-5 font-[400]">
                    {{ itemDesc.value }}
                  </div>
                </div>
              </div>
            </div>
            <!-- <div>{notesComponent}</div> -->
          </div>
        </div>

        <!-- Documents -->
        <div v-if="treatmentHistoryOrDocumentsSelected === 'Documents'" class="p-8 flex w-full justify-between relative flex-col">
          <div class="flex w-full justify-between">
            <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Documents</h1>
            <img @click="documentModalMenuOpen = !documentModalMenuOpen" class="hover:opacity-50 cursor-pointer" :src="PlusCircleIcon" alt="Plus Circle Icon" />
          </div>
          <div class="absolute right-8 mt-10 bg-white p-4 rounded-[12px] border border-[#F2F4F7]" v-if="documentModalMenuOpen">
            <BaseModal>
              <template #header> Upload a document </template>
              <template #content>
                <div class="p-6 mx-6 rounded-xl shadow-sm bg-white mt-6">
                  <div
                    class="border border-[#F2F4F7] p-20 rounded-xl flex justify-center items-center flex-col w-[450px]"
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
                </div>
              </template>
              <template #button>
                <div class="hover:text-honeydew-purple cursor-pointer transition">Upload Document</div>
              </template>
              <template #button-text> Next </template>
            </BaseModal>
            <div @click="profileStore.handleBloodSlipForm" class="hover:text-honeydew-purple cursor-pointer transition mt-1">Create a form</div>
          </div>
        </div>

        <div class="px-8 flex gap-x-8">
          <div class="w-2/3">
            <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Patient Images</h1>
            <BasePatientImages />
          </div>
          <div class="flex flex-col w-1/3">
            <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Notes</h1>
            <BaseNotes />
          </div>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>
``
