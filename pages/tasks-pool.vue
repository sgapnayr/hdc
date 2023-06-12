<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import GroupDoctors from '@/assets/images/group-doctors.svg'
import BaseWrapper from '~/components/BaseWrapper.vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import ClaimIcon from '@/assets/icons/claim-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { createTask, assignTask, getPatient } from '@/lib/endpoints'
import { useTasksStore } from '@/stores/task'
import { usePatientStore } from '~/stores/patient'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'captured',
  middleware: ['auth'],
  loading: '@/components/Loading.vue',
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

// STORES **********************************************************************
const tasksStore = useTasksStore()
const patientStore = usePatientStore()

// STATE **********************************************************************
const tabSelected = ref<'Active Patients' | 'Inactive Patients'>('Active Patients')
const selectedChip = ref({ text: 'All', amount: 10 })
const selectedPatient = ref<{ patientName: string; patientID: string }>()
const selectedPatientID = ref<string>()
const patientMenuOpen = ref<boolean>(false)
const taskType = ref<'Submit Prescription' | 'New messages' | 'Send blood slip' | 'New patient' | 'Accutane' | 'Documents needed'>('New patient')
const taskTypeMenuOpen = ref<boolean>(false)
const taskPriority = ref<'Low' | 'Medium' | 'High'>('Medium')
const taskPriorityMenuOpen = ref<boolean>(false)
const taskComments = ref<string>()

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
    categories: [{ text: "Patient's Full name" }, { text: 'Priority' }, { text: 'Task Type' }, { text: 'Comments' }, { text: 'Actions' }],
  },
]

const taskTypes = [
  { text: 'Submit Prescription' },
  { text: 'New messages' },
  { text: 'Send blood slip' },
  { text: 'New patient' },
  { text: 'Accutane' },
  { text: 'Documents needed' },
]

const taskPriorities = [{ text: 'Low' as 'Low' }, { text: 'Medium' as 'Medium' }, { text: 'High' as 'High' }]

// COMPUTED METHODS ****************************************************************
const handleChipData = computed(() => {
  return categoryChips.filter((chip) => chip.group === tabSelected.value)
})

// METHODS ****************************************************************
function handleSelectingChip(chip: any) {
  selectedChip.value = chip
}

function handleSelectedPatient(patientName: string, patientID: string) {
  selectedPatient.value = { patientName, patientID }
  selectedPatientID.value = patientID
}

function handleSubmitNewTask() {
  const query = {
    patientId: selectedPatientID,
    assigneeId: 'YOUR_ASSIGNEE_ID',
    dueDate: '2023-06-10T00:00:00Z',
    description: taskComments,
    status: 'YOUR_STATUS',
    priority: taskPriority,
    type: taskType,
  }
  createTask(query)

  selectedPatient.value = { patientName: '', patientID: '' }
  taskType.value = 'New patient'
  taskPriority.value = 'Low'
  taskComments.value = ''
}

// INIT ****************************************************************
patientStore.getAllPatients()
tasksStore.setAllTasks()
tasksStore.setAssigneeTasks()
</script>

<template>
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Summary Top -->
      <div class="flex gap-x-6">
        <!-- General tasks pool -->
        <div class="bg-white p-8 rounded-[16px] flex justify-between relative w-full">
          <div class="w-full">
            <h1 class="text-[32px] font-[500]">General tasks pool</h1>
            <div class="flex gap-x-6 mt-[32px]">
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F0F5FE] text-[#4768AE]">
                <div class="text-[32px] font-[500] leading-[40px]">{{ tasksStore.assigneeTasks?.length }}</div>
                In progress
              </div>
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F3FAF2] text-[#3A6A34]">
                <div class="text-[32px] font-[500] leading-[40px]">{{ tasksStore.allTasks?.length }}</div>
                Issued
              </div>
            </div>
          </div>
          <img class="absolute bottom-0 right-8" :src="GroupDoctors" alt="Group of Doctors" />
        </div>
      </div>

      <!-- Add New Task Button & Modal -->
      <div class="w-full flex justify-start mt-4">
        <BaseModal @action-click="handleSubmitNewTask">
          <template #button>
            <div
              class="text-[12px] h-[40px] w-[188px] flex justify-center items-center rounded-[60px] mr-[16px] uppercase cursor-pointer bg-honeydew-purple text-white"
            >
              <div class="mr-[6px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3.5V12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.5 8H3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              Add new task
            </div>
          </template>
          <template #header> Add new task </template>
          <template #content>
            <!-- Patient Name Drop Down -->
            <div>
              <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Patient's Name</h2>
              <div
                class="bg-white w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4 relative cursor-pointer"
                :class="[patientMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
                placeholder="Search by patient's name"
                type="text"
                @click="patientMenuOpen = !patientMenuOpen"
              >
                <div>{{ selectedPatient?.patientName || selectedPatient?.patientID || 'Select Patient' }}</div>
                <img :class="[patientMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
                <div v-if="patientMenuOpen">
                  <div class="absolute left-0 top-12 w-full">
                    <div
                      class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4 cursor-pointer shadow-md"
                      v-for="(patient, idx) in patientStore.allPatients.patients"
                      :key="idx"
                      :class="[patientStore.allPatients.patients.length - 1 === idx ? 'rounded-b-[28px]' : '']"
                      @click="handleSelectedPatient(patient.patientProfile.name || patient.patientProfile.patientLastName, patient.patientId)"
                    >
                      {{ patient.patientProfile.name || patient.patientProfile.patientLastName || patient.patientId }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Task Type Drop Down -->
            <div :class="[taskTypeMenuOpen ? 'z-40' : 'z-0']">
              <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Type</h2>
              <div
                class="bg-white w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
                :class="[taskTypeMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
                placeholder="Search by patient's name"
                type="text"
                @click="taskTypeMenuOpen = !taskTypeMenuOpen"
              >
                <div
                  class="px-4 py-1 rounded-[24px]"
                  :class="[
                    taskType === 'Submit Prescription'
                      ? 'bg-[#F0F5FE] text-[#5E83D4]'
                      : taskType === 'New messages'
                      ? 'bg-[#EEF7EE] text-[#3A6A34]'
                      : taskType === 'Send blood slip'
                      ? 'bg-[#FFF7E5] text-[#996600]'
                      : taskType === 'New patient'
                      ? 'bg-[#F0F5FE] text-[#5E83D4]'
                      : taskType === 'Accutane'
                      ? 'bg-[#EEF7EE] text-[#3A6A34]'
                      : taskType === 'Documents needed'
                      ? 'bg-[#FFF7E5] text-[#996600]'
                      : '',
                  ]"
                >
                  {{ taskType || 'Select Task' }}
                </div>
                <img :class="[taskTypeMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
                <div v-if="taskTypeMenuOpen">
                  <div class="absolute left-0 top-12 w-full">
                    <div
                      class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer shadow-md"
                      v-for="(task, idx) in taskTypes"
                      :key="idx"
                      :class="[taskTypes.length - 1 === idx ? 'rounded-b-[28px]' : '']"
                      @click="
                        taskType = task.text as 'Submit Prescription' | 'New messages' | 'Send blood slip' | 'New patient' | 'Accutane' | 'Documents needed'
                      "
                    >
                      <div
                        class="px-4 py-1 rounded-[24px]"
                        :class="[
                          task.text === 'Submit Prescription'
                            ? 'bg-[#F0F5FE] text-[#5E83D4]'
                            : task.text === 'New messages'
                            ? 'bg-[#EEF7EE] text-[#3A6A34]'
                            : task.text === 'Send blood slip'
                            ? 'bg-[#FFF7E5] text-[#996600]'
                            : task.text === 'New patient'
                            ? 'bg-[#F0F5FE] text-[#5E83D4]'
                            : task.text === 'Accutane'
                            ? 'bg-[#EEF7EE] text-[#3A6A34]'
                            : task.text === 'Documents needed'
                            ? 'bg-[#FFF7E5] text-[#996600]'
                            : '',
                        ]"
                      >
                        {{ task.text }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Priority Drop Down -->
            <div :class="[taskPriorityMenuOpen ? 'z-40' : 'z-0']">
              <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Type</h2>
              <div
                class="bg-white w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
                :class="[taskPriorityMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
                placeholder="Search by patient's name"
                type="text"
                @click="taskPriorityMenuOpen = !taskPriorityMenuOpen"
              >
                <div
                  class="px-4 py-1 rounded-[24px]"
                  :class="[
                    taskPriority === 'Low'
                      ? 'bg-[#F0F5FE] text-[#5E83D4]'
                      : taskPriority === 'Medium'
                      ? 'bg-[#EEF7EE] text-[#3A6A34]'
                      : taskPriority === 'High'
                      ? 'bg-[#FFF7E5] text-[#996600]'
                      : '',
                  ]"
                >
                  {{ taskPriority || 'Select Priority' }}
                </div>
                <img :class="[taskPriorityMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
                <div v-if="taskPriorityMenuOpen">
                  <div class="absolute left-0 top-12 w-full">
                    <div
                      class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer shadow-md"
                      v-for="(priority, idx) in taskPriorities"
                      :key="idx"
                      :class="[taskPriorities.length - 1 === idx ? 'rounded-b-[28px]' : '']"
                      @click="taskPriority = priority.text"
                    >
                      <div
                        class="px-4 py-1 rounded-[24px]"
                        :class="[
                          priority.text === 'Low'
                            ? 'bg-[#F0F5FE] text-[#5E83D4]'
                            : priority.text === 'Medium'
                            ? 'bg-[#EEF7EE] text-[#3A6A34]'
                            : priority.text === 'High'
                            ? 'bg-[#FFF7E5] text-[#996600]'
                            : '',
                        ]"
                      >
                        {{ priority.text || 'Low' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Comments</h2>
              <input
                class="bg-white w-[518px] h-[48px] mb-[10px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
                placeholder="Briefly describe the task"
                type="text"
                v-model="taskComments"
              />
            </div>
            <div class="w-full border-b mt-[24px] border-[#F2F4F7]"></div>
          </template>
          <template #button-text @click="handleSubmitNewTask"> Submit New Task </template>
        </BaseModal>
      </div>
      <!-- Assigned To Me Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full mt-[16px] flex-col">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Active Patients' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Active Patients'"
          >
            Assigned to me
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
          <div
            v-for="(task, idx) in tasksStore.assigneeTasks"
            :key="idx"
            :class="[idx === task.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-5 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 items-center"
          >
            <div>{{ task.patientId?.patientProfile?.patientFirstName }} {{ task.patientId?.patientProfile?.patientLastName }}</div>
            <div>
              {{ task.taskAssignedAt }}
            </div>
            <div>
              {{ task.description }}
            </div>
            <div class="flex">
              <div
                class="px-4 py-2 rounded-[24px]"
                :class="[
                  task.type === 'Submit Prescription'
                    ? 'bg-[#F0F5FE] text-[#5E83D4]'
                    : task.type === 'New messages'
                    ? 'bg-[#EEF7EE] text-[#3A6A34]'
                    : task.type === 'Send blood slip'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : task.type === 'New patient'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : task.type === 'Accutane'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : task.type === 'Documents needed'
                    ? 'bg-[#F0F5FE] text-[#5E83D4]'
                    : '',
                ]"
              >
                {{ task.description }}
              </div>
            </div>
            <div class="w-full flex justify-end">asdf</div>
          </div>
        </div>
      </div>

      <!-- General Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full mt-[32px] flex-col">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Active Patients' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Active Patients'"
          >
            General
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

          <!-- General  -->
          <div
            v-for="(task, idx) in tasksStore.allTasks"
            :key="idx"
            :class="[idx === task.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-5 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 items-center"
          >
            <div>{{ task.patientId?.patientProfile?.patientFirstName }} {{ task.patientId?.patientProfile?.patientLastName }}</div>
            <div></div>
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
                    : task.taskType === 'New patient'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : task.taskType === 'Accutane'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : task.taskType === 'Documents needed'
                    ? 'bg-[#F0F5FE] text-[#5E83D4]'
                    : '',
                ]"
              >
                {{ task.description }}
              </div>
            </div>
            <div>
              {{ task.comments || '-' }}
            </div>

            <div class="w-full flex justify-end gap-x-3">
              <div class="transition active:scale-90" @click="assignTask(task.taskId)">
                <img v-if="tabSelected === 'Active Patients'" class="cursor-pointer" :src="ClaimIcon" alt="Claim Icon" />
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
