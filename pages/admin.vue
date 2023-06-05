<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed, reactive } from 'vue'
import GroupDoctors from '@/assets/images/group-doctors.svg'
import BaseWrapper from '~/components/BaseWrapper.vue'
import BellIcon from '@/assets/icons/bell-icon.svg'
import SearchIcon from '@/assets/icons/search-icon.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import ArchiveIcon from '@/assets/icons/archive-icon.svg'
import EyeIcon from '@/assets/icons/eye-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { getPatients, getPatient } from '@/lib/endpoints'
import { Patient, Patients } from '@/types/patient-types'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'captured',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const router = useRouter()
const user = useAuthenticator()
const loadingPageExists = ref(true)

function showPageForFiveSeconds() {
  loadingPageExists.value = true
  setTimeout(() => {
    loadingPageExists.value = false
  }, 2000)
}

onMounted(() => {
  const unmountWatcher = watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })

  showPageForFiveSeconds()

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

// MEMBER DATA ****************************************************************
const categoryChips: CategoryChips[] = [
  {
    group: 'Active Patients',
    chips: [
      { text: 'All', amount: 10 },
      { text: 'New patients', amount: 10 },
      { text: 'Follow-up visits', amount: 10 },
      { text: 'New messages', amount: 10 },
    ],
  },
  {
    group: 'Inactive Patients',
    chips: [
      { text: 'All', amount: 10 },
      { text: 'Inactive membership', amount: 10 },
      { text: 'Follow-No shows', amount: 10 },
      { text: 'Canceled', amount: 10 },
      { text: 'Archived', amount: 10 },
    ],
  },
]

const tableHeaderCategories: TableHeaderCategory[] = [
  {
    role: 'admin', // Change for admin, care coord. etc
    categories: [
      { text: 'Full name' },
      { text: 'Date of birth' },
      { text: 'Acne category' },
      { text: 'Date of service' },
      { text: 'Next follow-up' },
      { text: 'Provider' },
      { text: 'Care coord.' },
      { text: 'Actions' },
    ],
  },
]

const testPatients: Patient[] = [
  {
    fullName: 'Ryan Pagelion',
    dateOfBirth: 'Apr 3rd, 1995',
    acneCategory: 'Mild acne',
    dateOfService: 'Jun 6, 6:36 pm',
    nextFollowUp: '',
    provider: 'Dr. Joel',
    careCoordinator: 'Mahor Sr.',
  },
  {
    fullName: 'Jessica Smith',
    dateOfBirth: 'Jan 15th, 1988',
    acneCategory: 'Severe acne',
    dateOfService: 'May 20, 10:15 am',
    nextFollowUp: 'Jun 10, 3:00 pm',
    provider: 'Dr. Emily',
    careCoordinator: 'Lisa Thompson',
  },
]

// COMPUTED METHODS ****************************************************************
const handleChipData = computed(() => {
  return categoryChips.filter((chip) => chip.group === tabSelected.value)
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

getPatientsInit()
</script>

<template>
  <Loading v-if="loadingPageExists" />
  <div v-else class="w-full py-8">
    <BaseWrapper>
      <!-- Summary Top -->
      <div class="bg-white p-8 rounded-[16px] flex justify-between w-full relative">
        <div class="w-full">
          <h1 class="text-[32px] font-[500]">Hi, Admin</h1>
          <div class="flex gap-x-6 mt-[32px]">
            <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#FEF0F5] text-[#AE4768] relative">
              <div class="text-[32px] font-[500] leading-[40px]">3</div>
              New Patients
              <img l :src="BellIcon" alt="Bell Icon" class="top-4 absolute right-4" />
            </div>
            <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F0F5FE] text-[#4768AE]">
              <div class="text-[32px] font-[500] leading-[40px]">3</div>
              Follow-ups
            </div>
            <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F3FAF2] text-[#3A6A34]">
              <div class="text-[32px] font-[500] leading-[40px]">3</div>
              New Messages
            </div>
          </div>
        </div>
        <img class="absolute bottom-0 right-8" :src="GroupDoctors" alt="Group of Doctors" />
      </div>

      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full mt-[32px] flex-col">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Active Patients' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Active Patients'"
          >
            Active Patients
          </div>
          <div
            :class="[tabSelected === 'Inactive Patients' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Inactive Patients'"
          >
            Inactive Patients
          </div>
        </div>
        <!-- Search -->
        <div class="bg-honeydew-bg2 w-full h-[48px] mt-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start">
          <img class="ml-4 mr-2" :src="SearchIcon" alt="Search Icon" />
          <input class="bg-honeydew-bg2 outline-none focus:ring-0 w-full" placeholder="Search by patient's name" type="text" />
        </div>
        <!-- Chips -->
        <div class="mt-[24px]">
          <div v-for="(categoryChip, idx) in handleChipData" :key="idx" class="flex">
            <div @click="() => handleSelectingChip(chip)" v-for="(chip, jdx) in categoryChip.chips" :key="jdx">
              <div
                :class="[selectedChip?.text === chip.text ? 'bg-[#EEEBFC] text-honeydew-purple' : 'bg-honeydew-bg2']"
                class="rounded-[20px] p-2 px-4 flex items-center justify-between mr-2 cursor-pointer"
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
              class="grid grid-cols-9 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
            >
              <div v-for="(category, jdx) in tableHeaderCategory.categories" :key="jdx" :class="[category.text === 'Full name' ? 'col-span-2' : 'col-span-1']">
                <div :class="category.text === 'Actions' ? 'w-full flex justify-end' : ''">
                  {{ category.text }}
                </div>
              </div>
            </div>
          </div>
          <!-- Table Patients -->
          {{ patientList?.patients[0]?.patientId }}
          <button @click="getPatient(patientList?.patients[0]?.patientId as string)">getPatient</button>
          <div
            v-for="(patient, idx) in testPatients"
            :key="idx"
            :class="[idx === testPatients.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-9 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
          >
            <div class="col-span-2">
              {{ patient.fullName ? patient.fullName : '-' }}
            </div>
            <div>
              {{ patient.dateOfBirth ? patient.dateOfBirth : '-' }}
            </div>
            <div>
              {{ patient.acneCategory ? patient.acneCategory : '-' }}
            </div>
            <div>
              {{ patient.dateOfService ? patient.dateOfService : '-' }}
            </div>
            <div>
              {{ patient.nextFollowUp ? patient.nextFollowUp : '-' }}
            </div>
            <div>
              {{ patient.provider ? patient.provider : '-' }}
            </div>
            <div>
              {{ patient.careCoordinator ? patient.careCoordinator : '-' }}
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
          </div>
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
