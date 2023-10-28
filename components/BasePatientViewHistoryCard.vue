<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import ChevronDownIcon from '@/assets/icons/chevron-down-icon.svg'
import PencilIcon from '@/assets/icons/pencil-icon.svg'
import CheckIcon from '@/assets/icons/checkmark-circle.svg'
import PaperIcon from '@/assets/icons/paper-icon.svg'
import PhoneIcon from '@/assets/icons/phone-icon.svg'
import EmailIcon from '@/assets/icons/email-icon.svg'
import AlertIcon from '@/assets/icons/alert-icon.svg'
import NotesImage from '@/assets/images/notes-image.png'
import SearchIcon from '@/assets/icons/search-icon-dark.svg'
import { useProfileStore } from '@/stores/profile'
import { usePatientStore } from '~/stores/patient'
import { useTasksStore } from '@/stores/task'
import { useRoute } from 'vue-router'
import { calculateAge, calculateHeightInFeetAndInches } from '../utils/helpers'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// ROUTER *********************************************************************
const route = useRoute()

// STORES *********************************************************************
const profileStore = useProfileStore()
const tasksStore = useTasksStore()
const patientStore = usePatientStore()

const auth = useAuthenticator()

// STATE *********************************************************************
const toDoListOrDetailsSelected = ref<'To do' | 'Care Team'>('To do')
const selectedItem = ref<string[]>([])

const healthInsuranceName = ref(patientStore.patientData?.insurance?.healthInsuranceName)
const healthInsuranceMemberId = ref(patientStore.patientData?.insurance?.healthInsuranceMemberID)
const healthInsurancePolicyHolder = ref(patientStore.patientData?.insurance?.healthInsurancePolicyHolderName)
const healthInsuranceGroupNumber = ref(patientStore.patientData?.insurance?.healthInsuranceGroupNumber)
const PATIENT_ID = patientStore?.currentPatientId || (route.params.patientId as string)

const patientLastConfirmationDate = ref('')
const patientNextConfirmationDate = ref('')

const remsNumber = ref(patientStore?.patientData?.patientREMsNumber || '123')
const isEditing = ref<boolean>(false)

// METHODS *********************************************************************
function handleSelectedItem(selectedItemVal: string) {
  if (selectedItem.value.includes(selectedItemVal)) {
    selectedItem.value = selectedItem.value.filter((item) => item !== selectedItemVal)
  } else {
    selectedItem.value.push(selectedItemVal)
  }
}

async function handleUpdateInsurance() {
  await patientStore.updateInsuranceGraphQL(
    PATIENT_ID,
    healthInsuranceGroupNumber.value,
    healthInsuranceMemberId.value,
    healthInsuranceName.value,
    healthInsurancePolicyHolder.value
  )
  patientStore.getPatientFromGraphQL(patientStore?.currentPatientId || (route.params.patientId as string))
}

function handleUpdateRemsNumber(updatedRemsNumber: string) {
  isEditing.value = !isEditing.value
  remsNumber.value = updatedRemsNumber
}

watch(patientLastConfirmationDate, (newDate) => {
  if (newDate) {
    const nextDate = new Date(newDate)
    nextDate.setDate(nextDate.getDate() + 30)
    patientNextConfirmationDate.value = nextDate.toISOString().split('T')[0]
  }
})

function handlePdfPage(selectedSubAccount: string) {
  navigateTo('/pdf-page/' + selectedSubAccount)
  patientStore.currentPatientId = selectedSubAccount
  profileStore.setMyProfile(patientStore.currentPatientId as string)
}

tasksStore.getAllTasksFromGraphQLByPatient(PATIENT_ID)
watch(patientStore.currentPatientId, () => {
  patientStore.getPatientFromGraphQL(route.params.patientId as string)
})
</script>

<template>
  <div
    :class="
      profileStore.isBloodSlipFormOpen || profileStore.isPatientDetailsFormOpen || profileStore.isPregnantModalOpen || profileStore.isVisitFormOpen
        ? ''
        : 'z-10'
    "
    class="bg-white rounded-b-[8px] rounded-tr-[8px] drop-shadow-sm"
  >
    <!-- Padding Wrapper -->
    <div class="p-8">
      <!-- Patient Photo -->
      <div class="flex w-full justify-between">
        <img class="w-[90px] h-[70px]" :src="NotesImage" alt="Notes image" />
        <div class="flex gap-x-[12px]">
          <div
            @click="profileStore.handlePatientDetailsForm"
            class="w-[32px] h-[32px] flex justify-center items-center border border-[#E1E0E6] rounded-[8px] cursor-pointer"
          >
            <img :src="PencilIcon" alt="Pencil Icon" />
          </div>
          <NuxtLink
            @click="handlePdfPage(route.params.patientId as string)"
            class="w-[32px] h-[32px] flex justify-center items-center border border-[#E1E0E6] rounded-[8px] cursor-pointer"
          >
            <img :src="PaperIcon" alt="Paper Icon" />
          </NuxtLink>
        </div>
      </div>

      <!-- Patient Info -->
      <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3 mt-[32px]">
        {{ patientStore?.patientData?.patientName || 'Loading...' }}
      </h1>
      <div class="mt-[8px] w-3/4 flex flex-wrap items-center">
        <p class="text-[16px] text-gray-5 font-[400]">{{ patientStore?.patientData?.patientSex }}</p>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <p class="text-[16px] text-gray-5 font-[400]">{{ patientStore.patientData?.patientDOB }}</p>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <p class="text-[16px] text-gray-5 font-[400]">{{ calculateAge(patientStore.patientData?.patientDOB) + ' yrs' }}</p>
      </div>
      <div class="text-[16px] font-[400] mt-[8px] text-gray-5 flex items-center">
        <div class="text-">H: {{ calculateHeightInFeetAndInches(patientStore.patientData?.patientHeight) }}</div>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <div class="text-">W: {{ patientStore.patientData?.patientWeight }}lbs</div>
      </div>
      <div class="text-[16px] font-[400] mt-[32px] text-gray-3 flex flex-col items-start gap-y-6">
        <div class="flex items-center gap-x-[14px]">
          <img :src="PhoneIcon" alt="Phone Icon" />
          <div>{{ patientStore.patientData?.patientPhoneNumber || '-' }}</div>
        </div>
        <div class="flex items-center gap-x-[14px]">
          <img :src="EmailIcon" alt="Email Icon" />
          <div>{{ patientStore.patientData?.patientEmail || auth?.user?.signInUserSession?.idToken?.payload?.email }}</div>
        </div>
      </div>
    </div>

    <!-- Patient Allergies -->
    <div v-if="profileStore.doYouHaveAnyAllergies" class="bg-honeydew-orange w-full py-6 mb-2 px-8 flex gap-x-2 text-gray-3 font-[400]">
      <img :src="AlertIcon" alt="Alert Icon" />
      <div>Patient allergies: {{ profileStore.doYouHaveAnyAllergies || '-' }}</div>
    </div>

    <!-- Padding Wrapper -->
    <div class="pb-6">
      <div
        @click="handleSelectedItem('Shipping Address')"
        class="text-gray-3 font-[500] w-full border-b-[1px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col"
      >
        <div class="px-8">
          <div class="flex w-full justify-between">
            <div class="text-lg text-gray-1">Shipping address</div>
            <img :class="[selectedItem.includes('Shipping Address') ? '' : 'rotate-[270deg]']" :src="ChevronDownIcon" alt="Chevron Icon" />
          </div>
          <div v-if="selectedItem.includes('Shipping Address')" class="flex w-full justify-between text-gray-5 font-[400]">
            <div class="mt-4">{{ patientStore.patientData?.patientAddress }} {{ patientStore.patientData?.patientCity }}</div>
          </div>
        </div>
      </div>

      <div
        @click="handleSelectedItem('Health Insurance')"
        class="text-gray-3 font-[500] w-full border-b-[.5px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col"
      >
        <div class="flex w-full justify-between items-center px-8">
          <div class="text-lg text-gray-1">Health Insurance</div>
          <div class="flex gap-x-2">
            <BaseModal :no-shadow="true" @action-click="handleUpdateInsurance">
              <template #header>
                <div>Insurance information</div>
              </template>
              <template #content>
                <div class="min-w-[380px]">
                  <div class="mb-[10px] px-2 uppercase text-[12px] font-[500] text-[#313337]">Health Plan Name</div>
                  <input
                    class="rounded-[80px] border border-[#E4E7EC] mb-6 h-[48px] w-full"
                    v-model="healthInsuranceName"
                    type="text"
                    placeholder="Enter health plan name"
                  />
                  <div class="mb-[10px] px-2 uppercase text-[12px] font-[500] text-[#313337]">Member ID</div>
                  <input
                    class="rounded-[80px] border border-[#E4E7EC] mb-6 h-[48px] w-full"
                    v-model="healthInsuranceMemberId"
                    type="text"
                    placeholder="Enter member identification number"
                  />
                  <div class="mb-[10px] px-2 uppercase text-[12px] font-[500] text-[#313337]">Policy holder name</div>
                  <input
                    class="rounded-[80px] border border-[#E4E7EC] mb-6 h-[48px] w-full"
                    v-model="healthInsurancePolicyHolder"
                    type="text"
                    placeholder="Enter policy holder name"
                  />
                  <div class="mb-[10px] px-2 uppercase text-[12px] font-[500] text-[#313337]">Group number</div>
                  <input
                    class="rounded-[80px] border border-[#E4E7EC] mb-6 h-[48px] w-full"
                    v-model="healthInsuranceGroupNumber"
                    type="text"
                    placeholder="Enter group number"
                  />
                </div>
              </template>
              <template #button>
                <div class="w-[32px] h-[32px] flex justify-center items-center border border-[#E1E0E6] rounded-[8px] cursor-pointer">
                  <img :src="PencilIcon" alt="Pencil Icon" />
                </div>
              </template>
              <template #button-text> Submit </template>
            </BaseModal>
            <img :class="[selectedItem.includes('Health Insurance') ? '' : 'rotate-[270deg]']" :src="ChevronDownIcon" alt="Chevron Icon" />
          </div>
        </div>
        <div v-if="selectedItem.includes('Health Insurance')" class="flex w-full justify-between text-gray-5 font-[400] px-8">
          <div class="w-full whitespace-nowrap mt-4">
            <div class="w-full flex justify-between">
              <div class="w-full">MemberID:</div>
              <div>{{ patientStore?.patientData?.insurance.healthInsuranceMemberID }}</div>
            </div>
            <div class="w-full flex justify-between">
              <div class="w-full">Health Insurance:</div>
              {{ patientStore?.patientData?.insurance.healthInsuranceName }}
            </div>
            <div class="w-full flex justify-between whitespace-nowrap">
              <div class="w-full">Policy Holder:</div>
              {{ patientStore?.patientData?.insurance.healthInsurancePolicyHolderName }}
            </div>
            <div class="w-full flex justify-between">
              <div class="w-full">Group Number:</div>
              {{ patientStore?.patientData?.insurance.healthInsuranceGroupNumber }}
            </div>
          </div>
        </div>
      </div>

      <div
        @click="handleSelectedItem('Patient\'s current tasks')"
        class="text-gray-3 font-[500] w-full border-b-[.5px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col"
      >
        <div class="flex w-full justify-between px-8">
          <div class="text-lg text-gray-1">Patient's current tasks</div>
          <img :class="[selectedItem.includes('Patient\'s current tasks') ? '' : 'rotate-[270deg]']" :src="ChevronDownIcon" alt="Chevron Icon" />
        </div>
        <div v-if="selectedItem.includes('Patient\'s current tasks')" class="flex w-full justify-between text-gray-5 font-[400] flex-col mt-4 px-8">
          <div v-for="(task, idx) in tasksStore.taskForPatient" class="flex w-full justify-between bg-honeydew-bg5 p-4 my-2 rounded-md items-center shadow-sm">
            <div>
              {{ task.taskComments }}
            </div>
            <div class="flex">
              {{ task.taskType }}
            </div>
          </div>
        </div>
      </div>

      <div class="text-gray-3 font-[500] w-full border-b-[.5px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col">
        <div class="flex w-full justify-between px-8">
          <div class="text-lg">iPledge details</div>
          <div class="flex gap-x-2">
            <img :class="[!selectedItem.includes('iPledge details') ? '' : 'rotate-[270deg]']" :src="ChevronDownIcon" alt="Chevron Icon" class="opacity-0" />
          </div>
        </div>
        <!-- Patient Pregnancy Status -->
        <div v-if="!selectedItem.includes('iPledge details')" class="px-8 pt-[24px]">
          <div v-if="patientStore?.patientData?.patientSex === 'Female'" class="text-gray-3 font-[500] flex w-full justify-between mb-[32px] text-sm">
            <div class="text-honeydew-purple">PATIENT CAN GET PREGNANT</div>
          </div>
          <!-- Service Details -->
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div class="flex items-center gap-x-2">REMS number</div>
            <div class="flex justify-end h-10 items-center -mb-4">
              <div @click="isEditing = !isEditing" class="mx-2" v-if="!isEditing">{{ remsNumber || patientStore?.patientData?.patientREMsNumber }}</div>
              <input
                v-if="isEditing"
                v-model="remsNumber"
                type="text"
                class="border h-10 rounded-md mx-2 text-end w-1/2 text-lg border-[#E1E0E6]"
                :placeholder="patientStore?.patientData?.patientREMsNumber"
              />
              <div v-if="!isEditing" class="w-[32px] h-[32px] flex justify-center items-center border border-[#E1E0E6] rounded-[8px] cursor-pointer">
                <img @click="isEditing = !isEditing" :src="PencilIcon" alt="Pencil Icon" />
              </div>
              <img v-if="isEditing" @click="handleUpdateRemsNumber(remsNumber)" :src="CheckIcon" alt="Pencil Icon" />
            </div>
          </div>
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div>Date of enrollment</div>
            <div>{patientDateOfEnrollment}</div>
          </div>
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div>Last confirmation date</div>
            <div class="w-1/2 flex">
              <VueDatePicker
                :time-picker-inline="false"
                v-model="patientLastConfirmationDate"
                auto-apply
                :close-on-auto-apply="false"
                :hide-navigation="['time']"
              />
            </div>
          </div>
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div>Next confirmation date</div>
            <div class="w-1/2 flex">
              <VueDatePicker
                v-model="patientNextConfirmationDate"
                auto-apply
                :close-on-auto-apply="false"
                :hide-navigation="['time']"
                style="pointer-events: none"
                @click.stop
              />
            </div>
          </div>
          <!-- v-if="profileStore?.profileData?.userRole != 'patient'" -->
          <div
            class="text-[12px] h-[40px] w-5/12 flex justify-center items-center rounded-[60px] bg-[#EFEBFE] text-honeydew-purple uppercase cursor-pointer whitespace-nowrap"
          >
            <div class="mr-[6px]"></div>
            pause or stop
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <a href="https://schedule.nylas.com/pags-30min-4" target="_Blank">
          <BaseButton :state="!isPhotoUploaded ? 'idle' : 'disabled'" @click="router.push('/profile')" class="w-full mt-[32px] px-8"
            >Schedule Appointment</BaseButton
          >
        </a>
      </div>
    </div>

    <!-- To Do & Details list -->
    <div class="flex px-8 border-y border-[#F2F4F7] text-gray-3 gap-x-6">
      <div
        @click="toDoListOrDetailsSelected = 'To do'"
        class="flex cursor-pointer py-4"
        :class="[toDoListOrDetailsSelected === 'To do' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : '']"
      >
        To do
        <div class="bg-[#EFEBFE] w-[24px] h-[24px] rounded-full flex justify-center items-center text-honeydew-purple ml-[8px]">
          {{ tasksStore?.taskForPatient?.length }}
        </div>
      </div>
      <div
        @click="toDoListOrDetailsSelected = 'Care Team'"
        class="flex cursor-pointer py-4"
        :class="[toDoListOrDetailsSelected === 'Care Team' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : '']"
      >
        Care Team
      </div>
    </div>

    <!-- To do -->
    <div v-if="toDoListOrDetailsSelected === 'To do'" class="py-6 px-8 flex flex-col gap-y-4 justify-center items-center text-center">
      <div v-if="tasksStore?.taskForPatient?.length === 0" class="w-full flex flex-col">
        <div class="flex w-full justify-center mb-4">
          <div class="p-4 bg-[#f8f7fe] rounded-full flex justify-center items-center">
            <div class="p-4 bg-[#efeafd] rounded-full flex justify-center items-center">
              <img :src="SearchIcon" alt="Search Icon" />
            </div>
          </div>
        </div>

        <div class="text-[#403d47]">No tasks</div>
        <p class="text-[#6C6A7C] text-[14px]">Great job! You have completed all tasks for this patient.</p>
      </div>

      <div v-else class="w-full flex flex-col">
        <div v-for="(task, idx) in tasksStore.taskForPatient" class="flex w-full justify-between p-4 bg-[#f8f7fe] my-2 rounded-md items-center shadow-sm">
          <div class="w-full text-start">
            {{ task.taskComments }}
          </div>
          <div class="flex opacity-50 text-sm">
            {{ task.taskType }}
          </div>
        </div>
      </div>
    </div>

    <!-- Details list -->
    <div v-if="toDoListOrDetailsSelected === 'Care Team'" class="py-6 px-8 flex flex-col gap-y-4">
      <BaseAssignProvider :patientData="patientStore.patientData" :patientId="route?.params?.patientId" />
      <!-- <BaseAssignCoordinator :patientData="patientStore.patientData" :patientId="route?.params?.patientId" /> -->
    </div>
  </div>
</template>

<style scoped>
.boxShadow {
  box-shadow: 0px 1px 2px rgba(49, 51, 55, 0.05);
}

*:focus {
  text-decoration: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

input {
  font-weight: 400;
  font-size: 16px;
  text-align: start;
  padding: 0 8px 0 16px;
}

input::placeholder {
  font-weight: 400;
  font-size: 16px;
  text-align: start;
  padding: 0 8px 0 0px;
}
</style>
