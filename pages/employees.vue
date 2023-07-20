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
import { getEmployees, createEmployee, getPatients, getEmployee, updateEmployee } from '@/lib/endpoints'
import { Employees, Employee } from '@/types/employee-types'
import { Patient, Patients } from '@/types/patient-types'
import { useEmployeeStore } from '~/stores/employees'
import { vMaska } from 'maska'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
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

// STORES **********************************************************************
const employeeStore = useEmployeeStore()

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
  group: string
  categories: { text: string }[]
}

// STATE **********************************************************************
const tabSelected = ref<'Providers' | 'Admin' | 'Coordinators' | 'Other'>('Providers')
const selectedChip = ref<Chip>({ text: 'Active', amount: 10 })
const selectedEmployeeInput = ref<Employee>()
const employeesList = ref<Employees>()
const patientList = ref<Patients | any>()
const patientTestId = ref<Patient | undefined>()

const newEmployeeFirstName = ref()
const newEmployeeLastName = ref()
const newEmployeeEmail = ref()
const newEmployeePhoneNumber = ref()
const newEmployeeType = ref<'Provider' | 'Admin' | string>('Provider')
const employeeMenuOpen = ref(false)

const updateEmployeeFirstName = ref()
const updateEmployeeLastName = ref()
const updateEmployeeEmail = ref()
const updateEmployeePhoneNumber = ref()
const updateEmployeeType = ref<'Provider' | 'Admin' | string>()
const updateEmployeeMenuOpen = ref(false)

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
    group: 'Coordinators',
    chips: [
      { text: 'Active', amount: 10 },
      { text: 'Archived', amount: 13 },
    ],
  },
  {
    group: 'Admin',
    chips: [],
  },
]

const tableHeaderCategories: TableHeaderCategory[] = [
  {
    group: 'Providers',
    categories: [{ text: 'Full name' }, { text: 'Email' }, { text: 'Phone' }, { text: 'Actions' }],
  },
  {
    group: 'Admin',
    categories: [{ text: 'Full name' }, { text: 'Email' }, { text: 'Phone' }, { text: 'Actions' }],
  },
  {
    group: 'Coordinators',
    categories: [{ text: 'Full name' }, { text: 'Email' }, { text: 'Phone' }, { text: 'Actions' }],
  },
  {
    group: 'Other',
    categories: [{ text: 'Full name' }, { text: 'Email' }, { text: 'Phone' }, { text: 'Actions' }],
  },
]

// COMPUTED METHODS ****************************************************************
const employeeData = computed(() => {
  return employeeStore.allEmployees
})

const handleChipData = computed(() => {
  return categoryChips.filter((chip) => chip.group === tabSelected.value)
})

const handleCategoryData = computed(() => {
  return tableHeaderCategories.filter((category) => category.group === tabSelected.value)
})

const filterByEmployeeType = computed(() => {
  if (tabSelected.value === 'Providers') {
    return employeeData?.value?.filter((employee: any) => employee?.role?.toLowerCase()?.includes('provider'))
  } else if (tabSelected.value === 'Admin') {
    return employeeData?.value?.filter((employee: any) => employee?.role?.toLowerCase()?.includes('admin'))
  } else if (tabSelected.value === 'Other') {
    return employeeData?.value?.filter((employee: any) => employee?.role?.toLowerCase()?.includes('other'))
  } else {
    return employeeData?.value?.filter((employee: any) => employee?.role?.toLowerCase()?.includes('coordinator'))
  }
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
  } catch (error) {
    console.error('Error retrieving patient:', error)
  }
}

async function handleCreateEmployee() {
  await createEmployee(
    newEmployeeFirstName.value,
    newEmployeeLastName.value,
    newEmployeeEmail.value,
    newEmployeePhoneNumber.value,
    newEmployeeType.value,
    '12345'
  )
  employeeStore.getAllEmployeesGraphQL()
}

async function handleUpdateEmployee(employeeId: string) {
  console.log(employeeId)
  console.log(updateEmployeeFirstName.value)
  await updateEmployee(
    updateEmployeeFirstName.value,
    updateEmployeeLastName.value,
    updateEmployeeEmail.value,
    updateEmployeePhoneNumber.value,
    updateEmployeeType.value,
    employeeId
  )
  employeeStore.getAllEmployeesGraphQL()
}

async function handleArchiveEmployee(employeeId: string) {
  console.log(employeeId)
}

async function handleGetEmployee(employeeId: string) {
  console.log(employeeId)
  console.log(employeeId)
}

getPatientsInit()
employeeStore.getAllEmployeesGraphQL()
</script>

<template>
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Manage Team Top -->
      <div class="w-full">
        <div class="flex justify-between w-full">
          <div class="text-[32px] font-[500] text-[#403E48]">Manage Honeydew Team</div>
          <div class="flex">
            <!-- Add Time Off -->
            <!-- <BaseModal>
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
            </BaseModal> -->

            <!-- New Team Member -->
            <BaseModal @action-click="handleCreateEmployee">
              <template #header>
                <h1>Create an Employee</h1>
              </template>
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
                  new team member
                </div>
              </template>

              <template #content>
                <div>
                  <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Employee Type</h2>
                  <div :class="[employeeMenuOpen ? 'z-40' : 'z-0']">
                    <div
                      class="bg-white w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
                      :class="[employeeMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
                      placeholder="Search by patient's name"
                      type="text"
                      @click="employeeMenuOpen = !employeeMenuOpen"
                    >
                      <div class="px-4 py-1 rounded-[24px]">
                        {{ newEmployeeType }}
                      </div>
                      <img :class="[employeeMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
                      <div v-if="employeeMenuOpen">
                        <div class="absolute left-0 top-12 w-full">
                          <div
                            class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer shadow-md"
                            v-for="(employeeType, idx) in ['Provider', 'Coordinator', 'Admin', 'Other']"
                            :key="idx"
                            :class="[3 === idx ? 'rounded-b-[28px]' : '']"
                            @click="newEmployeeType = employeeType"
                          >
                            <div class="px-4 py-1 rounded-[24px]">
                              {{ employeeType }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex w-full gap-x-6">
                  <div class="w-full">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">First Name</h2>
                    <input
                      class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                      placeholder="John"
                      type="text"
                      v-model="newEmployeeFirstName"
                    />
                  </div>
                  <div class="w-full">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Last Name</h2>
                    <input
                      class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                      placeholder="Smith"
                      type="text"
                      v-model="newEmployeeLastName"
                    />
                  </div>
                </div>
                <div class="w-full">
                  <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Phone Number</h2>
                  <input
                    v-maska
                    :data-maska="['+' + '1' + ' (###) ###-####']"
                    v-model="newEmployeePhoneNumber"
                    class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                <div class="w-full">
                  <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Email</h2>
                  <input
                    class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                    placeholder="john@example.com"
                    type="text"
                    v-model="newEmployeeEmail"
                  />
                </div>
                <div class="w-full border-b mt-[24px] border-[#F2F4F7]"></div>
              </template>
              <template #button-text> Create Employee </template>
            </BaseModal>
          </div>
        </div>
        <div class="text-[16px] font-[400] text-[#403E48]">Edit details, add a new team member, remove employees etc.</div>
      </div>

      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full mt-[32px] flex-col shadow-sm min-w-[1244px]">
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
            :class="[tabSelected === 'Coordinators' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Coordinators'"
          >
            Coordinators
          </div>
          <div
            :class="[tabSelected === 'Admin' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Admin'"
          >
            Admin
          </div>
          <div
            :class="[tabSelected === 'Other' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Other'"
          >
            Other
          </div>
        </div>
        <!-- Search -->
        <div class="bg-honeydew-bg2 w-full h-[48px] mt-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start">
          <img class="ml-4 mr-2" :src="SearchIcon" alt="Search Icon" />
          <input class="bg-honeydew-bg2 outline-none focus:ring-0 w-11/12" placeholder="Search by employee's name" type="text" />
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

        <div class="bg-white">
          <!-- Table Header -->
          <div class="mt-[24px]">
            <div
              v-for="(tableHeaderCategory, idx) in handleCategoryData"
              :key="idx"
              :class="[tabSelected === 'Providers' ? 'grid-cols-4' : 'grid-cols-4']"
              class="grid text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
            >
              <div v-for="(category, jdx) in tableHeaderCategory.categories" :key="jdx" :class="[category.text === 'Full name' ? 'col-span-1' : 'col-span-1']">
                <div :class="category.text === 'Actions' ? 'w-full flex justify-end' : ''">
                  {{ category.text }}
                </div>
              </div>
            </div>
          </div>

          <!-- Patients Table -->
          <BaseLoader v-if="!filterByEmployeeType" />

          <!-- Table Employees -->
          <div
            v-for="(employee, idx) in filterByEmployeeType"
            :key="idx"
            :class="[tabSelected === 'Providers' ? 'grid-cols-4' : 'grid-cols-4', idx === filterByEmployeeType.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
          >
            <div>
              {{ employee.firstName }} {{ employee.lastName }}
              <span class="opacity-30 ml-2 text-xs">{{ employee?.employeeId?.slice(0, 10) + '...' }}</span>
            </div>
            <div>
              {{ employee.email }}
            </div>
            <div>
              {{ employee.phone }}
              {{ employee.isActive }}
            </div>
            <div class="w-full flex justify-end items-center gap-x-2">
              <BaseModal @action-click="handleArchiveEmployee(employee.employeeId)">
                <template #header> Confirm Archive Employee </template>
                <template #button>
                  <img :src="ReportIcon" alt="Report Icon" class="cursor-pointer transition active:scale-90" />
                </template>
                <template #content>
                  <div class="text-[16px] font-normal p-4 w-full max-w-[490px]">
                    Are you sure you want to archive this employee?
                    <div class="flex flex-col my-4 gap-y-2">
                      <span v-if="employee.firstName" class="font-normal text-[14px] opacity-50">Name: {{ employee.firstName + ' ' + employee.lastName }}</span>
                      <span class="font-normal text-[14px] opacity-50">Email: {{ employee.email }}</span>
                      <span class="font-normal text-[14px] opacity-50">Role: {{ employee.role }}</span>
                      <span class="font-normal text-[14px] opacity-50">Employee ID: {{ employee.employeeId }}</span>
                    </div>
                  </div>
                </template>
                <template #button-text> Confirm</template>
              </BaseModal>

              <!-- Update Team Member -->
              <BaseModal @action-click="handleUpdateEmployee(employee?.employeeId)">
                <template #header>
                  <h1>Update Employee</h1>
                </template>

                <template #button>
                  <img @click="handleGetEmployee(employee.employeeId)" :src="OptionsIcon" alt="Options" class="cursor-pointer transition active:scale-90" />
                </template>

                <template #content>
                  <div>
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Employee Type</h2>
                    <div :class="[updateEmployeeMenuOpen ? 'z-40' : 'z-0']">
                      <div
                        class="bg-white w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
                        :class="[updateEmployeeMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
                        placeholder="Search by patient's name"
                        type="text"
                        @click="updateEmployeeMenuOpen = !updateEmployeeMenuOpen"
                      >
                        <div class="px-4 py-1 rounded-[24px]">{{ updateEmployeeType || employee.role }}</div>
                        <img :class="[updateEmployeeMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
                        <div v-if="updateEmployeeMenuOpen">
                          <div class="absolute left-0 top-12 w-full">
                            <div
                              class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer shadow-md"
                              v-for="(employeeType, idx) in ['Provider', 'Coordinator', 'Admin', 'Other']"
                              :key="idx"
                              :class="[3 === idx ? 'rounded-b-[28px]' : '']"
                              @click="updateEmployeeType = employeeType"
                            >
                              <div class="px-4 py-1 rounded-[24px]">
                                {{ employeeType }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex w-full gap-x-6">
                    <div class="w-full">
                      <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">First Name</h2>
                      <input
                        class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                        :placeholder="employee.firstName"
                        type="text"
                        v-model="updateEmployeeFirstName"
                      />
                    </div>
                    <div class="w-full">
                      <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Last Name</h2>
                      <input
                        class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                        :placeholder="employee.lastName"
                        type="text"
                        v-model="updateEmployeeLastName"
                      />
                    </div>
                  </div>
                  <div class="w-full">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Phone Number</h2>
                    <input
                      v-maska
                      :data-maska="['+' + '1' + ' (###) ###-####']"
                      v-model="updateEmployeePhoneNumber"
                      class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                      :placeholder="employee.phone"
                    />
                  </div>
                  <div class="w-full">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Email</h2>
                    <input
                      class="bg-white w-full h-[48px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                      :placeholder="employee.email"
                      type="text"
                      v-model="updateEmployeeEmail"
                    />
                  </div>
                  <div class="w-full border-b mt-[24px] border-[#F2F4F7]"></div>
                </template>
                <template #button-text> Save Updates </template>
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
