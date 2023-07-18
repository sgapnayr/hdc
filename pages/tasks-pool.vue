<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import BaseWrapper from '~/components/BaseWrapper.vue'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import ClaimIcon from '@/assets/icons/claim-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { createTask, getAllTasks } from '@/lib/endpoints'
import { useTasksStore } from '@/stores/task'
import { useProfileStore } from '@/stores/profile'
import { usePatientStore } from '@/stores/patient'
import { assignTask, getPatient } from '@/lib/endpoints'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
  loading: '@/components/Loading.vue',
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
const tasksStore = useTasksStore()
const profileStore = useProfileStore()
const patientStore = usePatientStore()

// STATE **********************************************************************
const selectedAssignedToMeChip = ref({ text: 'All', amount: 10 })
const selectedGeneralChip = ref({ text: 'All', amount: 10 })
const selectedPatient = ref<{ patientName: string; patientID: string }>()
const taskType = ref<'Submit Prescription' | 'New messages' | 'Send blood slip' | 'New patient' | 'Accutane' | 'Documents needed'>('New patient')
const taskTypeMenuOpen = ref<boolean>(false)
const taskPriority = ref<'Low' | 'Medium' | 'High'>('Medium')
const taskPriorityMenuOpen = ref<boolean>(false)
const patientMenuOpen = ref<boolean>(false)
const selectedPatientIdForNewTask = ref()
const selectedPatientForNewTask = ref()
const taskComments = ref<string>()
const taskName = ref<string>()
const allTasks = ref()
const pageSize = ref(3)
const generalPageSize = ref(10)
const currentPage = ref(0)
const assigneeTablecurrentPage = ref(0)
const showTaskAssignedMessage = ref(false)
const hoveredIdx = ref()
const claimTaskButtonState = ref<'idle' | 'loading' | 'success' | 'failed' | 'disabled'>('idle')
const addTaskButtonState = ref<'idle' | 'loading' | 'success' | 'failed' | 'disabled'>('idle')

// DATA ****************************************************************
const numberOfTaskAssignedToMe = computed(() => {
  return tasksStore?.assigneeTasks?.length
})

const numberOfLowPriorityTasksAssginedToMe = computed(() => {
  return tasksStore?.assigneeTasks?.filter((task: any) => task?.taskPriority === 'low' || task?.taskPriority === 'Low').length
})

const numberOfMediumPriorityTasksAssginedToMe = computed(() => {
  return tasksStore?.assigneeTasks?.filter((task: any) => task?.taskPriority === 'medium' || task?.taskPriority === 'Medium').length
})

const numberOfHighPriorityTasksAssginedToMe = computed(() => {
  return tasksStore?.assigneeTasks?.filter((task: any) => task?.taskPriority === 'high' || task?.taskPriority === 'High').length
})

const numberOfTasks = computed(() => {
  return tasksStore.allTasks?.length
})

const numberOfAssignedTasks = computed(() => {
  return tasksStore?.allTasks?.filter((task: any) => task.taskStatus !== 'ASSIGNED').length
})

const numberOfUnassignedTasks = computed(() => {
  return tasksStore?.allTasks?.filter((task: any) => task.taskStatus === 'ASSIGNED').length
})

const numberOfLowPriorityTasks = computed(() => {
  return tasksStore?.allTasks?.filter((task: any) => task?.taskPriority === 'low' || task?.taskPriority === 'Low').length
})

const numberOfMediumPriorityTasks = computed(() => {
  return tasksStore?.allTasks?.filter((task: any) => task?.taskPriority === 'medium' || task?.taskPriority === 'Medium').length
})

const numberOfHighPriorityTasks = computed(() => {
  return tasksStore?.allTasks?.filter((task: any) => task?.taskPriority === 'high' || task?.taskPriority === 'High').length
})

// MEMBER DATA ****************************************************************
const assignedToMeChips = [
  { text: 'All', amount: numberOfTaskAssignedToMe },
  { text: 'Low', amount: numberOfLowPriorityTasksAssginedToMe },
  { text: 'Medium', amount: numberOfMediumPriorityTasksAssginedToMe },
  { text: 'High', amount: numberOfHighPriorityTasksAssginedToMe },
]

const generalChips = [
  { text: 'All', amount: numberOfTasks },
  { text: 'Assigned', amount: numberOfAssignedTasks },
  { text: 'Unassigned', amount: numberOfUnassignedTasks },
  { text: 'Low', amount: numberOfLowPriorityTasks },
  { text: 'Medium', amount: numberOfMediumPriorityTasks },
  { text: 'High', amount: numberOfHighPriorityTasks },
]

const tableHeaderCategories = [
  {
    role: 'admin', // Change for admin, care coord. etc
    categories: [{ text: "Patient's Full name" }, { text: 'Status' }, { text: 'Priority' }, { text: 'Task Type' }, { text: 'Comments' }, { text: 'Actions' }],
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

const totalPagesForGeneralTable = computed(() => {
  return Math.ceil(filterGeneralTaskByChips?.value?.length / generalPageSize.value)
})

const filterGeneralTaskByChips = computed(() => {
  if (selectedGeneralChip.value.text === 'All') {
    return tasksStore?.allTasks
  } else if (selectedGeneralChip.value.text === 'Unassigned') {
    return tasksStore?.allTasks?.filter((task: any) => task.taskStatus !== 'ASSIGNED')
  } else if (selectedGeneralChip.value.text === 'Assigned') {
    return tasksStore?.allTasks?.filter((task: any) => task.taskStatus === 'ASSIGNED')
  } else if (selectedGeneralChip.value.text === 'Low') {
    return tasksStore?.allTasks?.filter((task: any) => task?.taskPriority === 'low' || task?.taskPriority === 'Low')
  } else if (selectedGeneralChip.value.text === 'Medium') {
    return tasksStore?.allTasks?.filter((task: any) => task?.taskPriority === 'medium' || task?.taskPriority === 'Medium')
  } else if (selectedGeneralChip.value.text === 'High') {
    return tasksStore?.allTasks?.filter((task: any) => task?.taskPriority === 'high' || task?.taskPriority === 'High')
  }
})

const generalPages = computed(() => {
  let start = currentPage.value * generalPageSize.value
  let end = (currentPage.value + 1) * generalPageSize.value

  return filterGeneralTaskByChips?.value?.slice(start, end)
})

const totalPagesForAssigneeTable = computed(() => {
  return Math.ceil(filterAsigneeTaskByChips?.value?.length / pageSize.value)
})

const filterAsigneeTaskByChips = computed(() => {
  if (selectedAssignedToMeChip.value.text === 'All') {
    return tasksStore?.assigneeTasks
  } else if (selectedAssignedToMeChip.value.text === 'Low') {
    return tasksStore?.assigneeTasks?.filter((task: any) => task?.taskPriority === 'low' || task?.taskPriority === 'Low')
  } else if (selectedAssignedToMeChip.value.text === 'Medium') {
    return tasksStore?.assigneeTasks?.filter((task: any) => task?.taskPriority === 'medium' || task?.taskPriority === 'Medium')
  } else if (selectedAssignedToMeChip.value.text === 'High') {
    return tasksStore?.assigneeTasks?.filter((task: any) => task?.taskPriority === 'high' || task?.taskPriority === 'High')
  }
})

const assigneePages = computed(() => {
  let start = assigneeTablecurrentPage.value * pageSize.value
  let end = (assigneeTablecurrentPage.value + 1) * pageSize.value

  return filterAsigneeTaskByChips?.value?.slice(start, end)
})

// METHODS ****************************************************************
async function handleGetAllTasks() {
  fetchTasksByAssignee()
  tasksStore.getAllTasksFromGraphQL()
}

function handleSubmitNewTask() {
  addTaskButtonState.value = 'loading'

  setTimeout(() => {
    createTask(selectedPatientIdForNewTask.value, taskType.value, taskPriority.value, taskComments.value)
    addTaskButtonState.value = 'success'
    handleGetAllTasks()
  }, 750)

  setTimeout(() => {
    selectedPatient.value = { patientName: '', patientID: '' }
    taskType.value = 'New patient'
    taskPriority.value = 'Low'
    taskComments.value = ''
    addTaskButtonState.value = 'idle'
  }, 1500)
}

async function handleAssignTask(taskId: string) {
  claimTaskButtonState.value = 'loading'

  setTimeout(() => {
    assignTask(taskId)
    claimTaskButtonState.value = 'success'
  }, 750)

  setTimeout(() => {
    selectedPatient.value = { patientName: '', patientID: '' }
    taskType.value = 'New patient'
    taskPriority.value = 'Low'
    taskComments.value = ''
    claimTaskButtonState.value = 'idle'
    handleGetAllTasks()
  }, 1500)
}

// INIT ****************************************************************
async function fetchTasksByAssignee() {
  if (!profileStore?.profileData?.patientId) {
    setTimeout(() => {
      fetchTasksByAssignee()
    }, 500)
  } else {
    await tasksStore.getAllTasksFromGraphQLByAssignee(profileStore?.profileData?.patientId)
  }
}

profileStore.setMyProfile()
patientStore.getPatientsFromGraphQL()
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
                  <div :class="[patientMenuOpen ? 'z-40' : 'z-0']">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Patient's Name</h2>
                    <div
                      class="bg-white w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
                      :class="[patientMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
                      placeholder="Search by patient's name"
                      type="text"
                      @click="patientMenuOpen = !patientMenuOpen"
                    >
                      <div class="px-4 py-1 rounded-[24px]">
                        {{ selectedPatientForNewTask || 'Patient Name' }} <span class="opacity-30 ml-2 text-xs">{{ selectedPatientIdForNewTask || '' }}</span>
                      </div>
                      <img :class="[patientMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
                      <div v-if="patientMenuOpen">
                        <div class="absolute left-0 top-12 w-full">
                          <div
                            class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer shadow-md"
                            v-for="(patient, idx) in patientStore.allPatients"
                            :key="idx"
                            :class="[patientStore.allPatients.length - 1 === idx ? 'rounded-b-[28px]' : '']"
                            @click=";(selectedPatientIdForNewTask = patient.patientId), (selectedPatientForNewTask = patient.patientName)"
                          >
                            <div class="px-4 py-1 rounded-[24px]">
                              {{ patient.patientName }} <span class="opacity-30 ml-2 text-xs">{{ patient.patientId }}</span>
                            </div>
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
                      <div class="flex">
                        <BaseTaskBadge :taskLabel="taskType" />
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
                            <div class="flex">
                              <BaseTaskBadge :taskLabel="task?.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Priority Drop Down -->
                  <div :class="[taskPriorityMenuOpen ? 'z-40' : 'z-0']">
                    <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Priority</h2>
                    <div
                      class="bg-white w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
                      :class="[taskPriorityMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
                      placeholder="Search by patient's name"
                      type="text"
                      @click="taskPriorityMenuOpen = !taskPriorityMenuOpen"
                    >
                      <div class="flex">
                        <BaseTaskBadge :taskLabel="taskPriority" />
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
                            <div class="flex">
                              <BaseTaskBadge :taskLabel="priority?.text" />
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
                  {{ tasksStore?.assigneeTasks?.length || '-' }}
                </div>
                My tasks
                <div class="top-4 absolute right-4 h-3 w-3 opacity-50 bg-[#AE4768] rounded-full" />
              </div>
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F0F5FE] text-[#4768AE] relative">
                <div class="text-[32px] font-[500] leading-[40px]">{{ tasksStore?.allTasks?.length || '-' }}</div>
                Issued
                <div class="top-4 absolute right-4 h-3 w-3 opacity-50 bg-[#4768AE] rounded-full" />
              </div>
              <div class="flex flex-col w-[180px] h-[136px] justify-center items-center rounded-[16px] bg-[#F3FAF2] text-[#3A6A34] relative">
                <div class="text-[32px] font-[500] leading-[40px]">-</div>
                Completed
                <div class="top-4 absolute right-4 h-3 w-3 opacity-50 bg-[#3A6A34] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full min-w-[1244px] mt-[32px] flex-col shadow-sm">
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div class="h-full py-4 cursor-pointer border-b-2 border-b-honeydew-purple text-honeydew-purple">Assigned to me</div>
        </div>

        <!-- Chips -->
        <div class="mt-[24px] flex-wrap flex">
          <div v-for="(categoryChip, idx) in assignedToMeChips" :key="idx" class="flex flex-wrap" @click="selectedAssignedToMeChip.text = categoryChip.text">
            <div
              :class="[selectedAssignedToMeChip?.text === categoryChip.text ? 'bg-[#EEEBFC] text-honeydew-purple' : 'bg-honeydew-bg2']"
              class="rounded-[20px] p-2 px-4 flex items-center justify-between mr-2 cursor-pointer whitespace-nowrap mb-2"
              v-if="categoryChip.text"
            >
              {{ categoryChip.text }}

              <div class="h-1 w-1 bg-black mx-2 rounded-full"></div>
              {{ categoryChip.amount }}
            </div>
          </div>
        </div>
        <!-- Assigned to me Table -->
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
          <BaseLoader v-if="!assigneePages" />

          <NuxtLink
            v-for="(task, idx) in assigneePages"
            :key="idx"
            :class="[idx === assigneePages.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-7 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 relative"
          >
            <div class="col-span-2 flex gap-x-2 items-center">
              {{ task.taskPatienFirstName + ' ' + task.taskPatienLastName }}
            </div>
            <div>
              {{ task.taskStatus }}
            </div>
            <div class="flex">
              <BaseTaskBadge :taskLabel="task?.taskPriority" />
            </div>
            <div class="flex">
              <BaseTaskBadge :taskLabel="task?.taskType" />
            </div>
            <div>
              {{ task.taskComments }}
            </div>
            <div v-if="task.taskAssignedAt" class="w-full flex justify-end gap-x-3">
              <BaseTimer :taskAssignedAt="task.taskAssignedAt" :key="task.taskAssignedAt" />
            </div>
          </NuxtLink>

          <!-- Pagination -->
          <BasePagination
            v-if="totalPagesForAssigneeTable > 1"
            class="mx-4"
            @page-forward="assigneeTablecurrentPage < totalPagesForAssigneeTable - 1 ? (assigneeTablecurrentPage += 1) : ''"
            @page-back="assigneeTablecurrentPage > 0 ? (assigneeTablecurrentPage -= 1) : ''"
            @skip-to="(val) => (assigneeTablecurrentPage = val)"
            :currentPageProps="assigneeTablecurrentPage"
            :totalPages="totalPagesForAssigneeTable"
          />
        </div>
      </div>
      <!-- Table -->
      <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full min-w-[1244px] mt-[32px] flex-col shadow-sm">
        <!-- Tabs -->
        <div class="flex text-[16px] font-[400] gap-x-8">
          <div class="h-full py-4 cursor-pointer border-b-2 border-b-honeydew-purple text-honeydew-purple">General</div>
        </div>

        <!-- Chips -->
        <div class="mt-[24px] flex-wrap flex">
          <div v-for="(categoryChip, idx) in generalChips" :key="idx" class="flex flex-wrap" @click="selectedGeneralChip.text = categoryChip.text">
            <div
              :class="[selectedGeneralChip?.text === categoryChip.text ? 'bg-[#EEEBFC] text-honeydew-purple' : 'bg-honeydew-bg2']"
              class="rounded-[20px] p-2 px-4 flex items-center justify-between mr-2 cursor-pointer whitespace-nowrap mb-2"
              v-if="categoryChip.text"
            >
              {{ categoryChip.text }}
              <div class="h-1 w-1 bg-black mx-2 rounded-full"></div>
              {{ categoryChip.amount }}
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
          <BaseLoader v-if="!generalPages" />

          <NuxtLink
            v-for="(task, idx) in generalPages"
            :key="idx"
            :class="[idx === generalPages.length - 1 ? 'rounded-b-[16px]' : '']"
            class="grid grid-cols-7 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 relative"
            @mouseenter="hoveredIdx = idx"
            @mouseleave="hoveredIdx = null"
          >
            <div class="col-span-2 flex gap-x-2 items-center">
              {{ task.taskPatienFirstName + ' ' + task.taskPatienLastName }}
            </div>
            <div>
              {{ task.taskStatus }}
            </div>
            <div class="flex">
              <BaseTaskBadge :taskLabel="task?.taskPriority" />
            </div>
            <div class="flex">
              <BaseTaskBadge :taskLabel="task?.taskType" />
            </div>
            <div class="flex">
              {{ task.taskComments.length > 40 ? task.taskComments.slice(0, 40) + '...' : task.taskComments }}
            </div>

            <div v-if="task.taskStatus === 'ASSIGNED'" class="w-full flex justify-end relative">
              <div
                v-if="showTaskAssignedMessage && hoveredIdx === idx"
                class="absolute bg-[#403E48] text-white rounded-md -top-8 font-semibold px-2 py-1 text-[14px]"
              >
                This task has already been assigned
              </div>
              <div
                @mouseenter="showTaskAssignedMessage = true"
                @mouseleave="showTaskAssignedMessage = false"
                class="text-[10px] bg-[#D35F84] text-white shadow-md w-4 h-4 items-center font-bold rounded-[80px] justify-center relative text-center"
              >
                !
              </div>
            </div>

            <div v-if="task.taskStatus !== 'ASSIGNED' && claimTaskButtonState === 'idle'" class="w-full flex justify-end gap-x-3 items-center">
              <BaseModal :button-state="claimTaskButtonState" @action-click="handleAssignTask(task.taskId)">
                <template #button>
                  <img class="cursor-pointer" :src="ClaimIcon" alt="Claim Icon" />
                </template>
                <template #header>
                  <div>Confirmation</div>
                </template>
                <template #content>
                  <div class="text-[16px] font-normal p-4">
                    Are you sure you want to claim task?
                    <div class="flex flex-col my-4 gap-y-2">
                      <span v-if="task.taskPatienFirstName" class="font-normal text-[14px] opacity-50"
                        >Name: {{ task.taskPatienFirstName + ' ' + task.taskPatienLastName }}</span
                      >

                      <div v-if="task.taskPriority" class="flex">
                        <span class="font-normal text-[14px] opacity-50 flex items-center">Type:</span>
                        <div class="flex">
                          <BaseTaskBadge :taskLabel="task?.taskType" />
                        </div>
                      </div>
                      <div v-if="task.taskPriority" class="flex">
                        <span class="font-normal text-[14px] opacity-50 flex items-center">Priority:</span>
                        <BaseTaskBadge :taskLabel="task?.taskPriority" />
                      </div>
                      <span v-if="task.taskComments" class="font-normal text-[14px] opacity-50">Description: {{ task.taskComments }}</span>
                    </div>
                  </div>
                </template>
              </BaseModal>
            </div>
          </NuxtLink>

          <!-- Pagination -->
          <BasePagination
            v-if="totalPagesForGeneralTable > 1"
            class="mx-4"
            @page-forward="currentPage < totalPagesForGeneralTable - 1 ? (currentPage += 1) : ''"
            @page-back="currentPage > 0 ? (currentPage -= 1) : ''"
            @skip-to="(val) => (currentPage = val)"
            :currentPageProps="currentPage"
            :totalPages="totalPagesForGeneralTable"
          />
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>
