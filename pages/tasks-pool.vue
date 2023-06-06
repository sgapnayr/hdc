<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import GroupDoctors from '@/assets/images/group-doctors.svg'
import BaseWrapper from '~/components/BaseWrapper.vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import ArchiveIcon from '@/assets/icons/archive-icon.svg'
import EyeIcon from '@/assets/icons/eye-icon.svg'
import Clipboard from '@/assets/images/clipboard.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { getAllTasks } from '@/lib/endpoints'
import { useTasksStore } from '@/stores/task'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'captured',
  middleware: ['auth'],
  loading: '@/components/Loading.vue', // Specify the path to your loading component
})

// ROUTER **********************************************************************
const router = useRouter()
const user = useAuthenticator()

onMounted(() => {
  watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })
})

// STOREs **********************************************************************
const tasksStore = useTasksStore()

// STATE **********************************************************************
const tabSelected = ref<'Active Patients' | 'Inactive Patients'>('Active Patients')
const selectedChip = ref({ text: 'All', amount: 10 })
const selectedPatient = ref()

// MEMBER DATA ****************************************************************
const categoryChips = [
  {
    group: 'Active Patients',
    chips: [
      { text: 'All', amount: 10 },
      { text: 'New treatment plans', amount: 10 },
      { text: 'New messages', amount: 10 },
    ],
  },
  {
    group: 'Inactive Patients',
    chips: [
      { text: 'All', amount: 10 },
      { text: 'New treatment plans', amount: 10 },
      { text: 'New messages', amount: 10 },
    ],
  },
]

const tableHeaderCategories = [
  {
    role: 'admin', // Change for admin, care coord. etc
    categories: [{ text: "Patient's Full name" }, { text: 'Care coordinator' }, { text: 'Task Type' }, { text: 'Comments' }, { text: 'Actions' }],
  },
]

const testPatients = [
  {
    fullName: 'Ryan Pagelion',
    careCoordinator: 'Dr. Yahor',
    taskType: 'Submit Prescription',
    comments: 'New treatment plan should be submitted',
  },
  {
    fullName: 'Ryan Pagelion',
    careCoordinator: 'Dr. Yahor',
    taskType: 'New messages',
    comments: 'New treatment plan should be submitted',
  },
  {
    fullName: 'Ryan Pagelion',
    careCoordinator: 'Dr. Yahor',
    taskType: 'Send blood slip',
    comments: 'New treatment plan should be submitted',
  },
]

// COMPUTED METHODS ****************************************************************
const handleChipData = computed(() => {
  return categoryChips.filter((chip) => chip.group === tabSelected.value)
})

// METHODS ****************************************************************
function handleSelectingChip(chip: any) {
  selectedChip.value = chip
}

function handleSelectedPatient(patient: any) {
  selectedPatient.value = patient
}

function helloChester() {
  let arr = ['1', '2']

  for (let i = 0; i < arr.length; i++) {
    const newNum = arr[i]
    console.log(newNum)
  }
  console.log('This is my array of functon')
}
helloChester()

tasksStore.setAllTasks()
</script>

<template>
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Summary Top -->
      <div class="flex gap-x-6">
        <!-- General tasks pool -->
        <div class="bg-white p-8 rounded-[16px] flex justify-between w-3/4 relative">
          <div class="w-full">
            <h1 class="text-[32px] font-[500]">General tasks pool</h1>
            <div class="flex gap-x-6 mt-[32px]">
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F0F5FE] text-[#4768AE]">
                <div class="text-[32px] font-[500] leading-[40px]">{taskInProgress}</div>
                In progress
              </div>
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F3FAF2] text-[#3A6A34]">
                <div class="text-[32px] font-[500] leading-[40px]">{tasksClaimed}</div>
                Issued
              </div>
            </div>
          </div>
          <img class="absolute bottom-0 right-8" :src="GroupDoctors" alt="Group of Doctors" />
        </div>

        <!-- Helped patients this week -->
        <div class="bg-white flex justify-center items-center w-1/4 rounded-[12px] p-4">
          <div class="flex flex-col bg-[#FBFBFE] justify-center items-center h-full w-full rounded-[12px]">
            <img :src="Clipboard" alt="Clipboard" />
            <div class="text-[32px] font-[500] text-gray-5 my-1">{patientsHelped}</div>
            <div class="text-[16px] font-[500] text-gray-5">Helped patients this week</div>
          </div>
        </div>
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
              class="grid grid-cols-5 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
            >
              <div v-for="(category, jdx) in tableHeaderCategory.categories" :key="jdx" :class="[category.text === 'Full name' ? 'col-span-2' : 'col-span-1']">
                <div :class="category.text === 'Actions' ? 'w-full flex justify-end' : ''">
                  {{ category.text }}
                </div>
              </div>
            </div>
          </div>
          <!-- Table Patients -->
          {{ tasksStore.allTasks }}
          <div
            v-for="(task, idx) in tasksStore.allTasks"
            :key="idx"
            :class="[idx === testPatients.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-5 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 items-center"
          >
            <div>
              {{ task.patientId }}
            </div>
            <div>
              {{ task.careCoordinator || '-' }}
            </div>
            <div class="flex">
              <div
                class="px-4 py-2 rounded-[24px]"
                :class="[
                  task.taskType === 'Submit Prescription'
                    ? 'bg-[#F0F5FE] text-[#5E83D4]'
                    : task.taskType === 'New messages'
                    ? 'bg-[#EEF7EE] text-[#3A6A34]'
                    : task.taskType === 'Send blood slip'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : '',
                ]"
              >
                {{ task.taskType || '-' }}
              </div>
            </div>
            <div>
              {{ task.comments || '-' }}
            </div>

            <div class="w-full flex justify-end gap-x-3">
              <div>
                <img v-if="tabSelected === 'Active Patients'" class="cursor-pointer" :src="EyeIcon" alt="Eye Icon" />
              </div>
              <div>
                <img v-if="tabSelected === 'Active Patients'" class="cursor-pointer" :src="ArchiveIcon" alt="Archive Icon" />
              </div>

              <BaseModal v-if="tabSelected === 'Inactive Patients'">
                <template #button>
                  <img @click="handleSelectedPatient(task)" class="cursor-pointer" :src="DeleteIcon" alt="Delete Icon" />
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
