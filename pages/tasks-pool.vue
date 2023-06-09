<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import BaseWrapper from '~/components/BaseWrapper.vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import ClaimIcon from '@/assets/icons/claim-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { createTask, getAllTasks } from '@/lib/endpoints'
import { useTasksStore } from '@/stores/task'
import { usePatientStore } from '~/stores/patient'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
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
const tabSelected = ref<'Assigned to me' | 'General'>('Assigned to me')
const selectedChip = ref({ text: 'All', amount: 10 })
const selectedPatient = ref<{ patientName: string; patientID: string }>()
const selectedPatientID = ref<string>()
const patientMenuOpen = ref<boolean>(false)
const taskType = ref<'Submit Prescription' | 'New messages' | 'Send blood slip' | 'New patient' | 'Accutane' | 'Documents needed'>('New patient')
const taskTypeMenuOpen = ref<boolean>(false)
const taskPriority = ref<'Low' | 'Medium' | 'High'>('Medium')
const taskPriorityMenuOpen = ref<boolean>(false)
const taskComments = ref<string>()
const allTasks = ref()
const pageSize = ref(7)
const currentPage = ref(0)

// MEMBER DATA ****************************************************************
const categoryChips = [
  {
    group: 'Assigned to me',
    chips: [
      { text: 'All', amount: 10 },
      { text: 'New treatment plans', amount: 10 },
      { text: 'New messages', amount: 10 },
    ],
  },
  {
    group: 'General',
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
    categories: [
      { text: "Patient's Full name" },
      { text: 'Care Coordinator' },
      { text: 'Priority' },
      { text: 'Task Type' },
      { text: 'Comments' },
      { text: 'Actions' },
    ],
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

const taskData = tasksStore.taskData
const filterByAssignedToMeOrGeneral = computed(() => {
  if (tabSelected.value === 'Assigned to me') {
    selectedChip.value = { text: 'All', amount: 0 } // Set selected chip to 'All' for Active Patients
    return taskData.filter((task) => !task.taskStatus.includes('Inactive'))
  } else {
    selectedChip.value = { text: 'All', amount: 0 } // Set selected chip to 'All' for Inactive Patients
    return taskData.filter((task) => task.taskStatus.includes('Inactive'))
  }
})

const totalPages = computed(() => {
  return Math.ceil(taskData.length / pageSize.value)
})

const pagesData = computed(() => {
  let start = currentPage.value * pageSize.value
  let end = (currentPage.value + 1) * pageSize.value

  return taskData.slice(start, end)
})

// METHODS ****************************************************************
function handleGetAllTasks() {}
getAllTasks().then((response) => {
  allTasks.value = response.data
})

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
handleGetAllTasks()
</script>

<template>
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Summary Top -->
      <div class="w-full">
        <div class="flex justify-between w-full">
          <div class="text-[32px] font-[500] text-[#403E48]">General Tasks Pool</div>
          <div class="flex">
            <!-- Add New Task Button & Modal -->
            <div class="w-full flex justify-start">
              <BaseModal @action-click="handleSubmitNewTask">
                <template #button>
                  <div
                    class="text-[12px] h-[40px] w-[188px] flex justify-center items-center rounded-[60px] mr-[16px] uppercase cursor-pointer bg-[#EEEBFC] text-honeydew-purple"
                  >
                    <div class="mr-[6px]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.5V12.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.5 8H3.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                              taskType = task.text as
                                | 'Submit Prescription'
                                | 'New messages'
                                | 'Send blood slip'
                                | 'New patient'
                                | 'Accutane'
                                | 'Documents needed'
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
          </div>
        </div>
        <div class="text-[16px] font-[400] text-[#403E48]">Edit tasks, add a new tasks, remove tasks, etc.</div>
      </div>

      <div class="flex gap-x-6">
        <!-- General tasks pool -->
        <div class="bg-white p-8 rounded-[16px] flex justify-between relative mt-[32px] shadow-sm">
          <div class="w-full">
            <div class="flex gap-x-6">
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#FEF0F5] text-[#AE4768] relative">
                <div class="text-[32px] font-[500] leading-[40px]">
                  {{ tasksStore.taskData.filter((task) => task.taskStatus.includes('Completed')).length }}
                </div>
                Completed
                <div class="top-4 absolute right-4 h-2 w-2 bg-[#AE4768] rounded-full" />
              </div>
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F0F5FE] text-[#4768AE] relative">
                <div class="text-[32px] font-[500] leading-[40px]">
                  {{ tasksStore.taskData.filter((task) => task.taskStatus.includes('In Progress')).length }}
                </div>
                In progress
                <div class="top-4 absolute right-4 h-2 w-2 bg-[#4768AE] rounded-full" />
              </div>
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F3FAF2] text-[#3A6A34] relative">
                <div class="text-[32px] font-[500] leading-[40px]">{{ tasksStore.taskData.length }}</div>
                Issued
                <div class="top-4 absolute right-4 h-2 w-2 bg-[#3A6A34] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full min-w-[1244px] mt-[32px] flex-col shadow-sm">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div
            :class="[tabSelected === 'Assigned to me' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'Assigned to me'"
          >
            Assigned to me
          </div>
          <div
            :class="[tabSelected === 'General' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
            class="h-full py-4 cursor-pointer"
            @click="tabSelected = 'General'"
          >
            General
          </div>
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
              class="grid grid-cols-7 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
            >
              <div
                v-for="(category, jdx) in tableHeaderCategory.categories"
                :key="jdx"
                :class="[category.text.includes('Full name') ? 'col-span-2' : 'col-span-1']"
              >
                <div :class="[category.text === 'Actions' ? 'w-full flex justify-end' : '']">
                  {{ category.text }}
                </div>
              </div>
            </div>
          </div>

          <!-- Table Body -->
          <NuxtLink
            v-for="(task, idx) in pagesData"
            :key="idx"
            :class="[idx === tasksStore.taskData.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-7 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 relative"
          >
            <div class="col-span-2 flex gap-x-2 items-center">
              {{ task.taskPatientName }}
            </div>
            <div>
              {{ task.taskCareCoordinator }}
            </div>
            <div>
              {{ task.taskPriority }}
            </div>
            <div class="flex">
              <div
                class="px-4 py-1 rounded-[24px]"
                :class="[
                  task.taskType === 'Submit Prescription'
                    ? 'bg-[#F0F5FE] text-[#5E83D4]'
                    : task.taskType === 'New messages'
                    ? 'bg-[#EEF7EE] text-[#3A6A34]'
                    : task.taskType === 'Send blood slip'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : task.taskType === 'New patient'
                    ? 'bg-[#F0F5FE] text-[#5E83D4]'
                    : task.taskType === 'Accutane'
                    ? 'bg-[#EEF7EE] text-[#3A6A34]'
                    : task.taskType === 'Documents needed'
                    ? 'bg-[#FFF7E5] text-[#996600]'
                    : '',
                ]"
              >
                {{ task.taskType }}
              </div>
            </div>
            <div>
              {{ task.taskComments }}
            </div>

            <div class="w-full flex justify-end gap-x-3">
              <BaseModal v-if="tabSelected === 'Assigned to me'">
                <template #button>
                  <img class="cursor-pointer" :src="DeleteIcon" alt="Delete Icon" />
                </template>
                <template #content>
                  <div class="flex flex-col p-8">
                    <div class="text-[24px] font-[500] leading-[32px]">Delete patient?</div>
                    <div class="mt-[16px] text-[16px] font-[400] flex flex-col">
                      <div>
                        Delete
                        <!-- <span class="font-[500]">{{ selectedPatient?.fullName }}</span> -->
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

              <BaseModal v-if="tabSelected === 'General'">
                <template #button>
                  <img class="cursor-pointer" :src="ClaimIcon" alt="Claim Icon" />
                </template>
                <template #content>
                  <div class="flex flex-col p-8">
                    <div class="text-[24px] font-[500] leading-[32px]">Delete patient?</div>
                    <div class="mt-[16px] text-[16px] font-[400] flex flex-col">
                      <div>
                        Delete
                        <!-- <span class="font-[500]">{{ selectedPatient?.fullName }}</span> -->
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
