<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import ChevronIcon from '@/assets/icons/chevron-icon.svg'
import ChevronDownIcon from '@/assets/icons/chevron-down-icon.svg'
import PencilIcon from '@/assets/icons/pencil-icon.svg'
import PaperIcon from '@/assets/icons/paper-icon.svg'
import PhoneIcon from '@/assets/icons/phone-icon.svg'
import EmailIcon from '@/assets/icons/email-icon.svg'
import AlertIcon from '@/assets/icons/alert-icon.svg'
import NotesImage from '@/assets/images/notes-image.png'
import { useProfileStore } from '@/stores/profile'
import { usePatientStore } from '~/stores/patient'
import { useTasksStore } from '@/stores/task'
import { BaseInput } from '~/.nuxt/components'
import { useRoute } from 'vue-router'

// PROPS *********************************************************************
defineProps<{
  patientData: any
}>()

// ROUTER *********************************************************************
const route = useRoute()

// STORES *********************************************************************
const profileStore = useProfileStore()
const tasksStore = useTasksStore()
const patientStore = usePatientStore()

// STATE *********************************************************************
const toDoListOrDetailsSelected = ref<'To do' | 'Details'>('To do')
const selectedItem = ref<string[]>([])
const healthInsuranceName = ref()
const healthInsuranceMemberId = ref()
const healthInsurancePolicyHolder = ref()
const healthInsuranceGroupNumber = ref()
const PATIENT_ID = route.params.patientId as string

// METHODS *********************************************************************
function handleSelectedItem(selectedItemVal: string) {
  if (selectedItem.value.includes(selectedItemVal)) {
    selectedItem.value = selectedItem.value.filter((item) => item !== selectedItemVal)
  } else {
    selectedItem.value.push(selectedItemVal)
  }
}

function handleUpdateInsurance() {
  patientStore.updateInsuranceGraphQL(
    PATIENT_ID,
    healthInsuranceGroupNumber.value,
    healthInsuranceMemberId.value,
    healthInsuranceName.value,
    healthInsurancePolicyHolder.value
  )
}

tasksStore.getAllTasksFromGraphQLByPatient(PATIENT_ID)
</script>

<template>
  <div class="bg-white md:w-1/2 rounded-[8px] shadow-sm">
    <!-- Padding Wrapper -->
    <div class="p-8">
      <!-- Patient Photo -->
      <div class="flex w-full justify-between">
        <img class="w-[90px]" :src="NotesImage" alt="Notes image" />
        <div class="flex gap-x-[12px]">
          <div
            @click="profileStore.handlePatientDetailsForm"
            class="w-[32px] h-[32px] flex justify-center items-center border border-[#E1E0E6] rounded-[8px] cursor-pointer"
          >
            <img :src="PencilIcon" alt="Pencil Icon" />
          </div>
          <NuxtLink
            :to="'/pdf-page/' + route.params.patientId"
            class="w-[32px] h-[32px] flex justify-center items-center border border-[#E1E0E6] rounded-[8px] cursor-pointer"
          >
            <img :src="PaperIcon" alt="Paper Icon" />
          </NuxtLink>
        </div>
      </div>

      <!-- Patient Info -->
      <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3 mt-[32px]">
        {{ patientData?.patientName }}
      </h1>
      <div class="mt-[8px] w-3/4 flex flex-wrap items-center">
        <p class="text-[16px] text-gray-5 font-[400]">{{ patientData?.patientSex }}</p>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <p class="text-[16px] text-gray-5 font-[400]">Age {{ patientData?.patientAge }}</p>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <p class="text-[16px] text-gray-5 font-[400]">{{ patientData?.patientDOB }}</p>
      </div>
      <div class="text-[16px] font-[400] mt-[8px] text-gray-5 flex items-center">
        <div class="text-">H: {{ patientData?.patientHeight }}</div>
        <div class="mx-2 h-1 w-1 flex justify-center items-center bg-gray-5 p-[1px] rounded-full"></div>
        <div class="text-">W: {{ patientData?.patientWeight }}lbs</div>
      </div>
      <div class="text-[16px] font-[400] mt-[32px] text-gray-3 flex flex-col items-start gap-y-6">
        <div class="flex items-center gap-x-[14px]">
          <img :src="PhoneIcon" alt="Phone Icon" />
          <div>{{ patientData?.patientPhoneNumber }}</div>
        </div>
        <div class="flex items-center gap-x-[14px]">
          <img :src="EmailIcon" alt="Email Icon" />
          <div>{{ patientData?.patientEmail }}</div>
        </div>
      </div>
    </div>

    <!-- Patient Allergies -->
    <div v-if="profileStore.doYouHaveAnyAllergies" class="bg-honeydew-orange w-full py-6 px-8 flex gap-x-2 text-gray-3 font-[400]">
      <img :src="AlertIcon" alt="Alert Icon" />
      <div>Patient has allergies: {{ profileStore.doYouHaveAnyAllergies || '-' }}</div>
    </div>

    <!-- Padding Wrapper -->
    <div class="pb-6">
      <div
        @click="handleSelectedItem('Shipping Address')"
        class="text-gray-3 font-[500] w-full border-b-[.5px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col"
      >
        <div class="px-8">
          <div class="flex w-full justify-between">
            <div>Shipping address</div>
            <img :class="[selectedItem.includes('Shipping Address') ? '' : 'rotate-[270deg]']" :src="ChevronDownIcon" alt="Chevron Icon" />
          </div>
          <div v-if="selectedItem.includes('Shipping Address')" class="flex w-full justify-between text-gray-5 font-[400]">
            <div>{{ patientData?.patientAddress }} {{ patientData?.patientCity }} {{ patientData?.patientState }} {{ patientData?.patientZipCode }}</div>
          </div>
        </div>
      </div>

      <div
        @click="handleSelectedItem('Health Insurance')"
        class="text-gray-3 font-[500] w-full border-b-[.5px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col"
      >
        <div class="flex w-full justify-between items-center px-8">
          <div>Health Insurance</div>
          <div class="flex gap-x-2">
            <BaseModal @action-click="handleUpdateInsurance">
              <template #header>
                <div>Payment information</div>
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
          <div class="w-3/4 whitespace-nowrap">
            <div class="w-full flex justify-between">
              <div class="w-full">MemberID:</div>
              <div>{{ patientData?.patientInsuranceMemberID }}</div>
            </div>
            <div class="w-full flex justify-between">
              <div class="w-full">Health Insurance:</div>
              {{ patientData?.patientHealthInsurance }}
            </div>
            <div class="w-full flex justify-between whitespace-nowrap">
              <div class="w-full">Policy Holder:</div>
              {{ patientData?.patientInsurancePolicyHolderName }}
            </div>
            <div class="w-full flex justify-between">
              <div class="w-full">Group Number:</div>
              {{ patientData?.patientInsuranceGroupNumber }}
            </div>
          </div>
        </div>
      </div>

      <div
        @click="handleSelectedItem('Patient\'s current tasks')"
        class="text-gray-3 font-[500] w-full border-b-[.5px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col"
      >
        <div class="flex w-full justify-between px-8">
          <div>Patient's current tasks</div>
          <img :class="[selectedItem.includes('Patient\'s current tasks') ? '' : 'rotate-[270deg]']" :src="ChevronDownIcon" alt="Chevron Icon" />
        </div>
        <div v-if="selectedItem.includes('Patient\'s current tasks')" class="flex w-full justify-between text-gray-5 font-[400] flex-col mt-4 px-8">
          <div v-for="(task, idx) in tasksStore.taskForPatient" class="flex w-full justify-between bg-honeydew-bg5 p-4 my-2 rounded-md items-center shadow-sm">
            <div>
              {{ task.taskComments }}
            </div>
            <div class="flex">
              <div
                class="px-4 py-1 rounded-[24px] shadow-sm"
                :class="[
                  task?.taskPriority === 'low'
                    ? 'bg-[#F0F5FE] text-[#5E83D4]'
                    : task?.taskPriority === 'medium'
                    ? 'bg-[#EEF7EE] text-[#3A6A34]'
                    : task?.taskPriority === 'high'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : task?.taskPriority === 'High'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : '',
                ]"
              >
                {{ task?.taskPriority }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        @click="handleSelectedItem('iPledge details')"
        class="text-gray-3 font-[500] w-full border-b-[.5px] border-[#E1E0E6] py-5 cursor-pointer flex flex-col"
      >
        <div class="flex w-full justify-between px-8">
          <div>iPledge details</div>
          <img :class="[selectedItem.includes('iPledge details') ? '' : 'rotate-[270deg]']" :src="ChevronDownIcon" alt="Chevron Icon" />
        </div>
        <!-- Patient Pregnancy Status -->
        <div v-if="selectedItem.includes('iPledge details')" class="px-8">
          <div class="mt-[24px] mb-[16px] text-gray-3 font-[500]">{patientCanOrCannotGetPregnant}</div>
          <!-- Service Details -->
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div>REMS number</div>
            <div>{remsNumber}</div>
          </div>
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div>Date of enrollment</div>
            <div>{patientDateOfEnrollment}</div>
          </div>
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div>Last confirmation date</div>
            <div>{patientLastConfirmationDate}</div>
          </div>
          <div class="flex w-full justify-between mb-[32px] text-gray-5 font-[400]">
            <div>Next confirmation date</div>
            <div>{patientNextConfirmationDate}</div>
          </div>
          <div class="text-[12px] h-[40px] w-1/4 flex justify-center items-center rounded-[60px] bg-[#EFEBFE] text-honeydew-purple uppercase cursor-pointer">
            <div class="mr-[6px]"></div>
            pause or stop
          </div>
        </div>
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
        <div class="bg-[#EFEBFE] w-[24px] h-[24px] rounded-full flex justify-center items-center text-honeydew-purple ml-[8px]">3</div>
      </div>
      <div
        @click="toDoListOrDetailsSelected = 'Details'"
        class="flex cursor-pointer py-4"
        :class="[toDoListOrDetailsSelected === 'Details' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : '']"
      >
        Details
      </div>
    </div>

    <!-- Details list -->
    <div v-if="toDoListOrDetailsSelected === 'Details'" class="py-6 px-8 flex flex-col gap-y-4">
      <!-- Fan tabs -->
      <div class="p-4 bg-[#FCFCFD] rounded-[12px] border border-[#F2F4F7] flex justify-between cursor-pointer boxShadow">
        <div>Parent's contact information</div>
        <img :src="ChevronDownIcon" alt="Chevron Down Icon" />
      </div>
      <div class="p-4 bg-[#FCFCFD] rounded-[12px] border border-[#F2F4F7] flex justify-between cursor-pointer boxShadow">
        <div>Shipping address</div>
        <img :src="ChevronDownIcon" alt="Chevron Down Icon" />
      </div>
      <div class="p-4 bg-[#FCFCFD] rounded-[12px] border border-[#F2F4F7] flex justify-between cursor-pointer boxShadow">
        <div>Health insurance</div>
        <img :src="ChevronDownIcon" alt="Chevron Down Icon" />
      </div>
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

input::placeholder,
input {
  font-weight: 400;
  font-size: 12px;
  text-align: start;
  padding: 0 0 0 8px;
}
</style>
