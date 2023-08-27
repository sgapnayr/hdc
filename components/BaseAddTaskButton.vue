<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { createTask, searchPatientByName } from '@/lib/endpoints'
import { useTasksStore } from '@/stores/task'
import { useProfileStore } from '@/stores/profile'
import { usePatientStore } from '@/stores/patient'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import debounce from 'lodash.debounce'

// STORE **********************************************************************
const tasksStore = useTasksStore()
const profileStore = useProfileStore()
const patientStore = usePatientStore()

// STATE **********************************************************************
const selectedPatient = ref<{ patientName: string; patientID: string }>()
const addTaskButtonState = ref<'idle' | 'loading' | 'success' | 'failed' | 'disabled'>('idle')
const selectedPatientIdForNewTask = ref()
const selectedPatientForNewTask = ref()
const taskType = ref<'Submit Prescription' | 'New messages' | 'Send blood slip' | 'New patient' | 'Accutane' | 'Documents needed'>('New patient')
const taskTypeMenuOpen = ref<boolean>(false)
const taskPriority = ref<'Low' | 'Medium' | 'High'>('Medium')
const taskComments = ref<string>()
const taskPriorityMenuOpen = ref<boolean>(false)
const patientMenuOpen = ref<boolean>(false)
const searchPatientName = ref()

// MEMBER DATA ****************************************************************
const taskPriorities = [{ text: 'Low' as 'Low' }, { text: 'Medium' as 'Medium' }, { text: 'High' as 'High' }]

const taskTypes = [
  { text: 'Submit Prescription' },
  { text: 'New messages' },
  { text: 'Send blood slip' },
  { text: 'New patient' },
  { text: 'Accutane' },
  { text: 'Documents needed' },
]

// METHODS ********************************************************************
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

// DEBOUNCE *************************************************************
const patientList = ref([])
const patientsToShow = ref([])

const debouncedFetch = debounce(() => {
  searchPatientByName(searchPatientName.value)
    .then((res) => {
      patientList.value = res.patients
      patientsToShow.value = patientList.value
    })
    .catch((err) => console.log(err))
}, 200)

watch(searchPatientName, (newValue) => {
  if (newValue === '') {
    patientsToShow.value = patientStore.allPatients
  } else {
    debouncedFetch()
  }
})

// INITIALIZATION *************************************************************
async function fetchTasksByAssignee() {
  if (!profileStore?.profileData?.patientId) {
    setTimeout(() => {
      fetchTasksByAssignee()
    }, 500)
  } else {
    await tasksStore.getAllTasksFromGraphQLByAssignee(profileStore?.profileData?.patientId)
  }
}
</script>

<template>
  <div class="w-full flex my-4">
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
            class="bg-white md:w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
            :class="[patientMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
            placeholder="Search by patient's name"
            type="text"
            @click.stop="patientMenuOpen = !patientMenuOpen"
          >
            <div class="px-4 py-1 rounded-[24px]">
              {{ selectedPatientForNewTask || 'Patient Name' }} <span class="opacity-30 ml-2 text-xs">{{ selectedPatientIdForNewTask || '' }}</span>
            </div>
            <img :class="[patientMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
            <div v-if="patientMenuOpen">
              <div class="absolute left-0 top-12 w-full">
                <div
                  class="px-2 w-full hover:bg-gray-2 bg-white h-[64px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center cursor-pointer shadow-md"
                >
                  <input
                    @change="debounce"
                    v-model="searchPatientName"
                    placeholder="Search by patient name here..."
                    @click.stop
                    class="px-4 w-full hover:bg-gray-2 bg-white h-[36px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center cursor-pointer shadow-md rounded-[80px]"
                  />
                </div>
                <div
                  class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer shadow-md"
                  v-for="(patient, idx) in patientsToShow"
                  :key="idx"
                  :class="[patientsToShow.length - 1 === idx ? 'rounded-b-[28px]' : '']"
                  @click=";(selectedPatientIdForNewTask = patient.patientId), (selectedPatientForNewTask = patient.patientName)"
                >
                  <div class="px-4 py-1 rounded-[24px]">
                    {{ patient.patientName || patient.name }} <span class="opacity-30 ml-2 text-xs">{{ patient.patientId }}</span>
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
            class="bg-white md:w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
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
                  @click="taskType = task.text as 'Submit Prescription' | 'New messages' | 'Send blood slip' | 'New patient' | 'Accutane' | 'Documents needed'"
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
            class="bg-white md:w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
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
            class="bg-white md:w-[518px] h-[48px] mb-[10px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-4"
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
</template>
