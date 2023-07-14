<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import BaseWrapper from '~/components/BaseWrapper.vue'
import ArchiveIcon from '@/assets/icons/archive-icon.svg'
import EyeIcon from '@/assets/icons/eye-icon.svg'
import PlusIcon from '@/assets/icons/plus-circle.svg'
import PencilIcon from '@/assets/icons/pencil-icon.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { getPatients, getPatient } from '@/lib/endpoints'
import { Patient, Patients } from '@/types/patient-types'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

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
const tabSelected = ref<'Medicine' | 'Treatment Plans'>('Medicine')
const selectedChip = ref<Chip>({ text: 'All', amount: 10 })
const selectedPatient = ref<Patient>()
const patientList = ref<Patients>()
const newMedicationName = ref()

// MEMBER DATA ****************************************************************

const tableHeaderCategories: TableHeaderCategory[] = [
  {
    role: 'admin', // Change for admin, care coord. etc
    categories: [
      { text: 'Treatment' },
      { text: 'Instructions' },
      { text: 'Special Instructions' },
      { text: 'Refills' },
      { text: 'Refill Expiration Rate (days)' },
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
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Manage Team Top -->
      <div class="w-full">
        <div class="flex justify-between w-full">
          <div class="text-[32px] font-[500]">Medication</div>
          <div class="flex">
            <!-- Create New Buttons -->
            <div v-if="tabSelected === 'Medicine'" class="flex">
              <BaseModal :custom-header="true">
                <template #button>
                  <div
                    class="text-[12px] h-[40px] flex justify-center items-center rounded-[60px] bg-[#EEEBFC] text-honeydew-purple uppercase cursor-pointer mt-[16px] text-center whitespace-nowrap px-4"
                  >
                    Create New Medicine
                  </div>
                </template>
                <template #content>
                  <div class="mb-4 text-[16px]">Add New Medication</div>
                  <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Name</p>
                  <input v-model="newMedicationName" class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4" />
                  <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Strength</p>
                  <input v-model="newMedicationName" class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4" />
                  <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Size</p>
                  <input v-model="newMedicationName" class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4" />
                </template>
              </BaseModal>
            </div>

            <div v-if="tabSelected === 'Treatment Plans'" class="flex">
              <BaseModal :custom-header="true">
                <template #button>
                  <div
                    class="text-[12px] h-[40px] flex justify-center items-center rounded-[60px] bg-[#EEEBFC] text-honeydew-purple uppercase cursor-pointer mt-[16px] text-center whitespace-nowrap px-4"
                  >
                    Create New Treatment Plan
                  </div>
                </template>
                <template #content>
                  <div class="mb-4 text-[16px]">Add New Medication</div>
                  <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Name</p>
                  <input v-model="newMedicationName" class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4" />
                  <div class="mb-[8px] mt-4 flex w-full justify-between items-center">
                    <p class="px-4 uppercase text-[12px] text-[#403E48]">Groups</p>
                    <img :src="PlusIcon" alt="Plus Icon" class="opacity-50 px-4 cursor-pointer" />
                  </div>
                </template>
              </BaseModal>
            </div>
          </div>
        </div>
        <div class="text-[16px] font-[400]">Edit details, add a new medication, remove medication, etc.</div>
      </div>

      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full flex-col mt-[32px] shadow-sm">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Medicine' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Medicine'"
          >
            Medicine
          </div>
          <div
            :class="[tabSelected === 'Treatment Plans' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Treatment Plans'"
          >
            Treatment Plans
          </div>
        </div>

        <!-- Medicine Table -->
        <div v-if="tabSelected === 'Medicine'" class="bg-white">
          <!-- Table Header -->
          <div class="mt-[24px]">
            <div
              v-for="(tableHeaderCategory, idx) in tableHeaderCategories"
              :key="idx"
              class="grid grid-cols-6 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
            >
              <div v-for="(category, jdx) in tableHeaderCategory.categories" :key="jdx" :class="[category.text === 'Full name' ? 'col-span-2' : 'col-span-1']">
                <div :class="category.text === 'Actions' ? 'w-full flex justify-end' : ''">
                  {{ category.text }}
                </div>
              </div>
            </div>
            {{ patientList?.patients }}
          </div>

          <!-- Table Medicine -->
          <div
            v-for="(patient, idx) in testPatients"
            :key="idx"
            :class="[idx === testPatients.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-6 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
          >
            <div>{treatmentName}</div>
            <div>{medicineInstructions}</div>
            <div>{medicineSpecialInstructions}</div>
            <div>{medicineRefills}</div>
            <div>{medicineRefillExpirationDate}</div>
            <div class="w-full flex justify-end gap-x-3">
              <BaseModal>
                <template #button>
                  <img class="cursor-pointer" :src="PencilIcon" alt="Pencil Icon" />
                </template>
                <template #content> MEDICAL </template>
              </BaseModal>
              <BaseModal>
                <template #button>
                  <img class="cursor-pointer" :src="DeleteIcon" alt="Delete Icon" />
                </template>
                <template #content> Are you sure? </template>
              </BaseModal>
            </div>
          </div>
        </div>

        <!-- Treatment Plans Table -->
        <div v-if="tabSelected === 'Treatment Plans'" class="bg-white">
          <!-- Table Header -->
          <div class="mt-[24px]">
            <div class="grid grid-cols-3 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full">
              <div>Name</div>
              <div>Medicine</div>
              <div class="w-full text-end">Actions</div>
            </div>
            {{ patientList?.patients }}
          </div>
          <!-- Table Medicine -->
          <div
            v-for="(patient, idx) in testPatients"
            :key="idx"
            :class="[idx === testPatients.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-3 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
          >
            <div>{treatmentName}</div>
            <div>{medicineDetails}</div>
            <div class="w-full flex justify-end gap-x-3">
              <BaseModal>
                <template #button>
                  <img class="cursor-pointer" :src="PencilIcon" alt="Pencil Icon" />
                </template>
              </BaseModal>
              <BaseModal>
                <template #button>
                  <img class="cursor-pointer" :src="DeleteIcon" alt="Delete Icon" />
                </template>
                <template #content> Are you sure? </template>
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
