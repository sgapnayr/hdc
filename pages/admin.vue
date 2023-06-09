<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import GroupDoctors from '@/assets/images/group-doctors.svg'
import BaseWrapper from '~/components/BaseWrapper.vue'
import SearchIcon from '@/assets/icons/search-icon.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import ArchiveIcon from '@/assets/icons/archive-icon.svg'
import EyeIcon from '@/assets/icons/eye-icon.svg'
import ChatIcon from '@/assets/icons/chat-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { getPatients, getPatient } from '@/lib/endpoints'
import { Patient, Patients } from '@/types/patient-types'
import { usePatientStore } from '@/stores/patient'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

// STORES **********************************************************************
const patientStore = usePatientStore()

// ROUTER **********************************************************************
const user = useAuthenticator()

onMounted(() => {
  const unmountWatcher = watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })

  onBeforeUnmount(() => {
    unmountWatcher()
  })
})

// TYPES **********************************************************************
interface Chip {
  text: string
  amount: number
}

interface CategoryChips {
  group: string
  chips: Chip[]
}

interface TableHeaderCategory {
  role: string
  categories: { text: string }[]
}

// STATE **********************************************************************
const tabSelected = ref<'Active Patients' | 'Inactive Patients'>('Active Patients')
const selectedChip = ref<Chip>({ text: 'All', amount: 10 })
const selectedPatient = ref<Patient>()
const patientList = ref<Patients>()
const pageSize = ref(7)
const currentPage = ref(0)
const showNoMedicalMessage = ref(false)
const showAccutaneMessage = ref(false)
const showNewMessageMessage = ref(false)
const hoveredIdx = ref()

const tableHeaderCategories: TableHeaderCategory[] = [
  {
    role: 'admin', // Change for admin, care coord. etc
    categories: [
      { text: 'Full name' },
      { text: 'Date of birth' },
      { text: 'Date of service' },
      { text: 'Next follow-up' },
      { text: 'Provider' },
      { text: 'Care coord.' },
      { text: 'Actions' },
    ],
  },
]

const patientData = patientStore.patientDataForAdminPage

// COMPUTED METHODS ****************************************************************
const handleChipData = computed(() => {
  return categoryChips.filter((chip) => chip.group === tabSelected.value)
})

const filterByActiveOrInactive = computed(() => {
  if (tabSelected.value === 'Active Patients') {
    selectedChip.value = { text: 'All', amount: 0 } // Set selected chip to 'All' for Active Patients
    return patientData.filter((patient) => !patient.currentPatientStatus.includes('Inactive'))
  } else {
    selectedChip.value = { text: 'All', amount: 0 } // Set selected chip to 'All' for Inactive Patients
    return patientData.filter((patient) => patient.currentPatientStatus.includes('Inactive'))
  }
})

const filterBySelectedChip = computed(() => {
  if (selectedChip.value.text === 'All') {
    return filterByActiveOrInactive.value
  } else if (selectedChip.value.text === 'New patients') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('New Patient'))
  } else if (selectedChip.value.text === 'Follow-up visits') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Follow Up'))
  } else if (selectedChip.value.text === 'New messages') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('New Message'))
  } else if (selectedChip.value.text === 'Accutane') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Accutane'))
  } else if (selectedChip.value.text === 'Inactive membership') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Inactive'))
  } else if (selectedChip.value.text === 'No shows') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('No Shows'))
  } else if (selectedChip.value.text === 'Cancelled') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Cancelled'))
  } else if (selectedChip.value.text === 'Archived') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Archived'))
  } else if (selectedChip.value.text === 'Unscheduled accounts') {
    return filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Unscheduled'))
  }

  return [] // Return an empty array if no matching chip is found
})

const totalPages = computed(() => {
  return Math.ceil(filterBySelectedChip.value.length / pageSize.value)
})

const pagesData = computed(() => {
  let start = currentPage.value * pageSize.value
  let end = (currentPage.value + 1) * pageSize.value

  return filterBySelectedChip.value.slice(start, end)
})

const totalNewPatients = computed(() => {
  return patientData.filter((patient) => patient.currentPatientStatus.includes('New Patient')).length
})

const totalFollowUps = computed(() => {
  return patientData.filter((patient) => patient.currentPatientStatus.includes('Follow Up')).length
})

const totalNewMessages = computed(() => {
  return patientData.filter((patient) => patient.currentPatientStatus.includes('New Message')).length
})

// METHODS ****************************************************************
function handleSelectingChip(chip: Chip) {
  selectedChip.value = chip
}

function handleSelectedPatient(patient: Patient) {
  selectedPatient.value = patient
}

async function getPatientsInit() {
  try {
    const response = await getPatients()
    patientList.value = response
  } catch (error) {
    console.error('Error retrieving patient:', error)
  }
}

// MEMBER DATA ****************************************************************
const categoryChips: CategoryChips[] = [
  {
    group: 'Active Patients',
    chips: [
      { text: 'All', amount: patientData.filter((patient) => !patient.currentPatientStatus.includes('Inactive')).length },
      {
        text: 'New patients',
        amount: filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('New Patient')).length,
      },
      { text: 'Follow-up visits', amount: filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Follow Up')).length },
      { text: 'New messages', amount: filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('New Message')).length },
      { text: 'Accutane', amount: filterByActiveOrInactive.value.filter((patient) => patient.currentPatientStatus.includes('Accutane')).length },
    ],
  },
  {
    group: 'Inactive Patients',
    chips: [
      { text: 'All', amount: patientData.filter((patient) => patient.currentPatientStatus.includes('Inactive')).length },
      {
        text: 'Inactive membership',
        amount: patientData
          .filter((patient) => patient.currentPatientStatus.includes('Inactive'))
          .filter((patient) => patient.currentPatientStatus.includes('Inactive')).length,
      },
      {
        text: 'No shows',
        amount: patientData
          .filter((patient) => patient.currentPatientStatus.includes('Inactive'))
          .filter((patient) => patient.currentPatientStatus.includes('No Shows')).length,
      },
      {
        text: 'Cancelled',
        amount: patientData
          .filter((patient) => patient.currentPatientStatus.includes('Inactive'))
          .filter((patient) => patient.currentPatientStatus.includes('Cancelled')).length,
      },
      {
        text: 'Archived',
        amount: patientData
          .filter((patient) => patient.currentPatientStatus.includes('Inactive'))
          .filter((patient) => patient.currentPatientStatus.includes('Archived')).length,
      },
      {
        text: 'Unscheduled accounts',
        amount: patientData
          .filter((patient) => patient.currentPatientStatus.includes('Inactive'))
          .filter((patient) => patient.currentPatientStatus.includes('Unscheduled')).length,
      },
    ],
  },
]

// WATCH ****************************************************************
watch(
  () => selectedChip.value,
  (newValue) => {
    currentPage.value = 0
  }
)

// INIT ****************************************************************
getPatientsInit()
</script>

<template>
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Summary Top -->
      <div class="bg-white p-8 rounded-[16px] flex justify-between w-full relative shadow-sm">
        <div class="w-full">
          <h1 class="text-[24px] md:text-[32px] font-[500]">Hi, {adminName}!</h1>
          <div class="flex gap-x-6 mt-[32px] text-[12px] md:text-[16px]">
            <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#FEF0F5] text-[#AE4768] relative">
              <div class="text-[24px] md:text-[32px] font-[500] leading-[40px]">{{ totalNewPatients }}</div>
              New Patients
              <div class="top-4 absolute right-4 h-2 w-2 bg-[#AE4768] rounded-full" />
            </div>
            <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F0F5FE] text-[#4768AE] relative">
              <div class="text-[24px] md:text-[32px] font-[500] leading-[40px]">{{ totalFollowUps }}</div>
              Follow-ups
              <div class="top-4 absolute right-4 h-2 w-2 bg-[#4768AE] rounded-full" />
            </div>
            <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F3FAF2] text-[#3A6A34] relative">
              <div class="text-[24px] md:text-[32px] font-[500] leading-[40px]">{{ totalNewMessages }}</div>
              New Messages
              <div class="top-4 absolute right-4 h-2 w-2 bg-[#3A6A34] rounded-full" />
            </div>
          </div>
        </div>
        <img class="absolute bottom-0 right-8 lg:flex hidden" :src="GroupDoctors" alt="Group of Doctors" />
      </div>

      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full min-w-[1244px] mt-[32px] flex-col shadow-sm">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Active Patients' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Active Patients'"
          >
            Your Active Patients
          </div>
          <div
            :class="[tabSelected === 'Inactive Patients' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Inactive Patients'"
          >
            Your Inactive Patients
          </div>
        </div>
        <!-- Search -->
        <div class="bg-honeydew-bg2 w-full h-[48px] mt-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start">
          <img class="ml-4 mr-2" :src="SearchIcon" alt="Search Icon" />
          <input class="bg-honeydew-bg2 outline-none focus:ring-0 w-[80%]" placeholder="Search by patient's name" type="text" />
        </div>
        <!-- Chips -->
        <div class="mt-[24px] flex-wrap">
          <div v-for="(categoryChip, idx) in handleChipData" :key="idx" class="flex flex-wrap">
            <div @click="() => handleSelectingChip(chip)" v-for="(chip, jdx) in categoryChip.chips" :key="jdx">
              <div
                :class="[selectedChip?.text === chip.text ? 'bg-[#EEEBFC] text-honeydew-purple' : 'bg-honeydew-bg2']"
                class="rounded-[20px] p-2 px-4 flex items-center justify-between mr-2 cursor-pointer whitespace-nowrap mb-2"
                v-if="chip.text"
              >
                {{ chip.text }}
                <div class="h-1 w-1 bg-black mx-2 rounded-full"></div>
                {{ chip.amount }}
              </div>
            </div>
          </div>
        </div>
        <!-- Patients Table -->
        <div class="bg-white">
          <!-- Table Header -->
          <div class="mt-[24px]">
            <div
              v-for="(tableHeaderCategory, idx) in tableHeaderCategories"
              :key="idx"
              class="grid grid-cols-8 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
            >
              <div v-for="(category, jdx) in tableHeaderCategory.categories" :key="jdx" :class="[category.text === 'Full name' ? 'col-span-2' : 'col-span-1']">
                <div :class="category.text === 'Actions' ? 'w-full flex justify-end' : ''">
                  {{ category.text }}
                </div>
              </div>
            </div>
            {{ patientList?.patients }}
          </div>

          <!-- Table Body -->
          <NuxtLink
            v-for="(patient, idx) in pagesData"
            :key="idx"
            :class="[
              idx === patientData.length - 1 ? 'rounded-b-[16px]' : '',
              patient.currentPatientStatus.includes('New Patient') ? 'bg-[#FEF0F5]' : '',
              patient.currentPatientStatus.includes('Follow Up') ? 'bg-[#F0F5FE]' : '',
              patient.currentPatientStatus.includes('New Message') ? 'bg-[#F3FAF2]' : '',
            ]"
            @mouseenter="hoveredIdx = idx"
            @mouseleave="hoveredIdx = null"
            class="grid grid-cols-8 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 relative"
            :to="`/view-history/${patient.patientId}`"
          >
            <div
              @mouseenter="showNewMessageMessage = true"
              @mouseleave="showNewMessageMessage = false"
              v-if="patient.currentPatientStatus.includes('New Message')"
              class="absolute items-center -left-4 top-4 flex justify-center text-[10px]"
            >
              <div v-if="showNewMessageMessage && hoveredIdx === idx" class="absolute bg-[#403E48] text-white rounded-md -top-8 font-semibold px-2 py-1">
                New Message
              </div>
              <div class="bg-white shadow-md p-1 rounded-md">
                <img :src="ChatIcon" alt="New Message Icon" class="h-5 w-5" />
              </div>
            </div>
            <div class="col-span-2 flex gap-x-2 items-center">
              {{ patient.patientName }}
              <div
                @mouseenter="showNoMedicalMessage = true"
                @mouseleave="showNoMedicalMessage = false"
                v-if="patient.patientMedicaBackground"
                class="text-[10px] bg-[#D35F84] text-white shadow-md w-4 h-4 flex justify-center items-center font-bold rounded-[80px]"
              >
                <div v-if="showNoMedicalMessage && hoveredIdx === idx" class="absolute bg-[#403E48] text-white rounded-md -top-2 font-semibold px-2 py-1">
                  No medical background
                </div>
                !
              </div>
              <div
                @mouseenter="showAccutaneMessage = true"
                @mouseleave="showAccutaneMessage = false"
                v-if="patient.currentPatientStatus.includes('Accutane')"
                class="text-[10px] shadow-md bg-[#ffdc99] px-2 py-[2px] rounded-[80px] flex justify-center items-center"
              >
                <div v-if="showAccutaneMessage && hoveredIdx === idx" class="absolute bg-[#403E48] text-white rounded-md -top-2 font-semibold px-2 py-1">
                  Accutane Patient
                </div>
                Accutane
              </div>
            </div>
            <div>{{ patient.patientDOB ? patient.patientDOB : '-' }}</div>
            <div>{{ patient.patientDateOfService ? patient.patientDateOfService : '-' }}</div>
            <div>
              {{ patient.patientNextFollowUp ? patient.patientNextFollowUp : '-' }}
            </div>
            <div>
              {{ patient.patientProviderAssigned ? patient.patientProviderAssigned : '-' }}
            </div>
            <div>
              {{ patient.patientCareCoordinatorAssigned ? patient.patientCareCoordinatorAssigned : '-' }}
            </div>

            <div class="w-full flex justify-end gap-x-3">
              <img v-if="tabSelected === 'Active Patients'" class="cursor-pointer" :src="EyeIcon" alt="Eye Icon" />
              <img v-if="tabSelected === 'Active Patients'" class="cursor-pointer" :src="ArchiveIcon" alt="Archive Icon" />

              <BaseModal v-if="tabSelected === 'Inactive Patients'">
                <template #button>
                  <img @click="handleSelectedPatient(patient)" class="cursor-pointer" :src="DeleteIcon" alt="Delete Icon" />
                </template>
                <template #content>
                  <div class="flex flex-col p-8">
                    <div class="text-[24px] font-[500] leading-[32px]">Delete patient?</div>
                    <div class="mt-[16px] text-[16px] font-[400] flex flex-col">
                      <div>
                        Delete
                        <span class="font-[500]">{{ selectedPatient?.fullName }}</span>
                        from the system. <br />
                      </div>
                      <div>
                        You will not be able to restore patient's data after <br />
                        submitting the action.
                      </div>
                    </div>
                  </div>
                  <div class="p-6 h-[88px] w-full flex justify-end border-t border-honeydew-bg2">
                    <div class="flex">
                      <div class="h-[40px] w-[96px] flex justify-center items-center rounded-[60px] bg-[#EFEBFE] text-honeydew-purple mr-[16px]">Cancel</div>
                      <div class="h-[40px] w-[96px] flex justify-center items-center rounded-[60px] bg-honeydew-purple text-white">Delete</div>
                    </div>
                  </div>
                </template>
              </BaseModal>
            </div>
          </NuxtLink>

          <!-- Pagination -->
          <BasePagination
            v-if="totalPages > 1"
            class="mx-4"
            @page-forward="currentPage < totalPages - 1 ? (currentPage += 1) : ''"
            @page-back="currentPage > 0 ? (currentPage -= 1) : ''"
            @skip-to="(val) => (currentPage = val)"
            :currentPageProps="currentPage"
            :totalPages="totalPages"
          />
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>

<style scoped>
*:focus {
  text-decoration: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

input::placeholder,
input {
  font-weight: 400;
  font-size: 16px;
  text-align: start;
}

.modal-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1; /* Adjust the z-index value as needed */
}
</style>
