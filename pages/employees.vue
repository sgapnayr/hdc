<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import BaseWrapper from '~/components/BaseWrapper.vue'
import SearchIcon from '@/assets/icons/search-icon.svg'
import ClockIcon from '@/assets/icons/clock-icon.svg'
import ReportIcon from '@/assets/icons/report-icon.svg'
import OptionsIcon from '@/assets/icons/options-icon.svg'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { getEmployees, createEmployee, getPatients } from '@/lib/endpoints'
import { Employees, Employee } from '@/types/employee-types'
import { Patient, Patients } from '@/types/patient-types'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'captured',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const user = useAuthenticator()

onMounted(() => {
  watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })
})

// TYPES **********************************************************************
interface EmployeeInput {
  employeeId: string
  firstName?: String
  lastName?: String
  email?: String
  role?: String
  phone?: String
  address?: String
  timezone?: String
  licenseType?: String
  licenseNumber?: String
  licenseExpirationDate?: String
  licenseState?: String
  npi?: String
  isActive?: Boolean
}

interface Chip {
  text: string
  amount: number
}

interface CategoryChips {
  group: string
  chips: Chip[]
}

interface TableHeaderCategory {
  group: string
  categories: { text: string }[]
}

// STATE **********************************************************************
const tabSelected = ref<'Providers' | 'Care Coordinators' | 'Enrollment Coordinators'>('Providers')
const selectedChip = ref<Chip>({ text: 'Active', amount: 10 })
const selectedEmployeeInput = ref<Employee>()
const employeesList = ref<Employees>()
const patientList = ref<Patients | any>()
const patientTestId = ref<Patient | undefined>()

// MEMBER DATA ****************************************************************
const categoryChips: CategoryChips[] = [
  {
    group: 'Providers',
    chips: [
      { text: 'Active', amount: 32 },
      { text: 'Archived', amount: 10 },
    ],
  },
  {
    group: 'Care Coordinators',
    chips: [
      { text: 'Active', amount: 1 },
      { text: 'Archived', amount: 4 },
    ],
  },
  {
    group: 'Enrollment Coordinators',
    chips: [
      { text: 'Active', amount: 10 },
      { text: 'Archived', amount: 13 },
    ],
  },
]

const tableHeaderCategories: TableHeaderCategory[] = [
  {
    group: 'Providers',
    categories: [
      { text: 'Full name' },
      { text: 'Timezone' },
      { text: 'Email' },
      { text: 'Phone' },
      { text: 'License Type' },
      { text: 'License States' },
      { text: 'NPI' },
      { text: 'Actions' },
    ],
  },
  {
    group: 'Care Coordinators',
    categories: [{ text: 'Full name' }, { text: 'Email' }, { text: 'Phone' }, { text: 'Actions' }],
  },
  {
    group: 'Enrollment Coordinators',
    categories: [{ text: 'Full name' }, { text: 'Email' }, { text: 'Phone' }, { text: 'Actions' }],
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

const handleCategoryData = computed(() => {
  return tableHeaderCategories.filter((category) => category.group === tabSelected.value)
})

// METHODS ****************************************************************
function handleSelectingChip(chip: Chip) {
  selectedChip.value = chip
}

function handleSelectedPatient(employee: Employee) {
  selectedEmployeeInput.value = employee
}

async function getPatientsInit() {
  try {
    const response = await getPatients()
    patientList.value = response
    patientTestId.value = patientList?.patients[0]?.patientId
  } catch (error) {
    console.error('Error retrieving patient:', error)
  }
}

getPatientsInit()

async function getEmployeesInit() {
  try {
    const response = await getEmployees()
    employeesList.value = response
  } catch (error) {
    console.error('Error retrieving employees:', error)
  }
}

getEmployeesInit()
</script>

<template>
  <div @click="createEmployee">createEmployee</div>
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Manage Team Top -->
      <div class="w-full">
        <div class="flex justify-between w-full">
          <div class="text-[32px] font-[500]">Manage Honeydew Team</div>
          <div class="flex">
            <!-- Add Time Off -->
            <BaseModal>
              <template #button>
                <div
                  class="text-[12px] h-[40px] w-[188px] flex justify-center items-center rounded-[60px] bg-[#EFEBFE] text-honeydew-purple mr-[16px] uppercase cursor-pointer"
                >
                  <div class="mr-[6px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.5V12.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12.5 8H3.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  Add time off
                </div>
              </template>
              <template #header> Add time off </template>
              <template #content>
                <div>
                  <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Employee's Name</h2>
                  <div
                    class="bg-white w-[518px] h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                    placeholder="Search by patient's name"
                    type="text"
                  >
                    <div>{employees}</div>
                    <img :src="CaretIcon" alt="Caret Icon" />
                  </div>
                </div>
                <div class="flex w-full gap-x-6">
                  <div class="w-full">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">From</h2>
                    <input
                      class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                      placeholder="Search by patient's name"
                      type="date"
                    />
                  </div>
                  <div class="w-full">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">From</h2>
                    <input
                      class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                      placeholder="Search by patient's name"
                      type="date"
                    />
                  </div>
                </div>
                <div>
                  <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">What to do with tasks</h2>
                  <div
                    class="bg-white w-[518px] h-[48px] mb-[10px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                    placeholder="Search by patient's name"
                    type="text"
                  >
                    <div>{employees}</div>
                    <img :src="CaretIcon" alt="Caret Icon" />
                  </div>
                  <p class="text-[13px] font-[400] text-[#6C6A7C] px-4">Choose an instruction of what to do while an employee is off</p>
                </div>
                <div class="w-full border-b mt-[24px] border-[#F2F4F7]"></div>
              </template>
              <template #button-text> Submit & Add Time Off </template>
            </BaseModal>

            <!-- New Team Member -->
            <BaseModal>
              <template #button>
                <div
                  class="text-[12px] h-[40px] w-[188px] flex justify-center items-center rounded-[60px] bg-honeydew-purple text-white uppercase cursor-pointer"
                >
                  <div class="mr-[6px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.5V12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12.5 8H3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  new team member
                </div>
              </template>
              <template #button-text> Save Updates </template>
            </BaseModal>
          </div>
        </div>
        <div class="text-[16px] font-[400]">Edit details, add a new team member, remove employees etc.</div>
      </div>

      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full mt-[32px] flex-col">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Providers' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Providers'"
          >
            Providers
          </div>
          <div
            :class="[tabSelected === 'Care Coordinators' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Care Coordinators'"
          >
            Care Coordinators
          </div>
          <div
            :class="[tabSelected === 'Enrollment Coordinators' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Enrollment Coordinators'"
          >
            Enrollment Coordinators
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
              v-for="(tableHeaderCategory, idx) in handleCategoryData"
              :key="idx"
              :class="[tabSelected === 'Providers' ? 'grid-cols-9' : 'grid-cols-4']"
              class="grid text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
            >
              <div v-for="(category, jdx) in tableHeaderCategory.categories" :key="jdx" :class="[category.text === 'Full name' ? 'col-span-1' : 'col-span-1']">
                <div :class="category.text === 'Actions' ? 'w-full flex justify-end' : ''">
                  {{ category.text }}
                </div>
              </div>
            </div>
          </div>
          <!-- Table Employees -->
          <div
            v-for="(employee, idx) in employeesList?.employees"
            :key="idx"
            :class="[tabSelected === 'Providers' ? 'grid-cols-9' : 'grid-cols-4', idx === testPatients.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
          >
            <div>
              {{ employee.firstName }}
            </div>
            <div>
              {{ employee.email }}
            </div>
            <div>
              {{ employee.firstName }}
            </div>

            <div class="w-full flex justify-end gap-x-3">
              <img :src="ClockIcon" alt="Clock Icon" class="cursor-pointer" />
              <img :src="ReportIcon" alt="Reports Icon" class="cursor-pointer" />
              <img :src="OptionsIcon" alt="Options Icon" class="cursor-pointer" />

              <!-- <BaseModal v-if="tabSelected === 'Inactive Patients'">
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
              </BaseModal> -->
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
