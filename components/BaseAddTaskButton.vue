<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { createTask, searchPatientByName, assignTaskToEmployee } from '@/lib/endpoints'
import { useTasksStore } from '@/stores/task'
import { useProfileStore } from '@/stores/profile'
import { usePatientStore } from '@/stores/patient'
import { useEmployeeStore } from '~/stores/employees'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import debounce from 'lodash.debounce'

// STORE **********************************************************************
const tasksStore = useTasksStore()
const profileStore = useProfileStore()
const patientStore = usePatientStore()
const employeeStore = useEmployeeStore()

// STATE **********************************************************************
const selectedPatient = ref<{ patientName: string; patientID: string }>()
const addTaskButtonState = ref<'idle' | 'loading' | 'success' | 'failed' | 'disabled'>('idle')
const selectedPatientIdForNewTask = ref()
const selectedPatientForNewTask = ref()
const taskType = ref<string>('New patient')
const taskTypeMenuOpen = ref<boolean>(false)
const assignTaskTo = ref<any>('Task Pool')
const assignTaskToId = ref<string>()
const taskComments = ref<string>()
const customTaskType = ref<string>()
const employeeMenuOpen = ref<boolean>(false)
const patientMenuOpen = ref<boolean>(false)
const searchPatientName = ref()
const taskID = ref()

// MEMBER DATA ****************************************************************
const taskTypes = [
  { text: 'Submit Prescription' },
  { text: 'New messages' },
  { text: 'Send blood slip' },
  { text: 'Create blood slip' },
  { text: 'Call lab' },
  { text: 'Review blood work' },
  { text: 'Review pregnancy test' },
  { text: 'Enroll patient to iPledge' },
  { text: 'Sign iPledge consent forms' },
  { text: 'Confirm appointment' },
  { text: 'Post-visit follow-up' },
  { text: 'Contact no show' },
  { text: 'Initiate membership' },
  { text: 'Initiate accutane' },
  { text: 'Confirm forms of birth control' },
  { text: 'Submit pregnancy test' },
  { text: 'Get bloodwork done' },
  { text: 'View provider response to follow up' },
  { text: 'Schedule a call with your provider' },
  { text: 'Renew membership' },
]

// METHODS ********************************************************************
async function handleGetAllTasks() {
  fetchTasksByAssignee()
  tasksStore.getAllTasksFromGraphQL()
}

async function handleSubmitNewTask() {
  addTaskButtonState.value = 'loading'

  setTimeout(() => {
    createTask(selectedPatientIdForNewTask.value, taskType.value, taskComments.value)
      .then((res) => {
        taskID.value = res.taskId

        if (assignTaskTo.value !== 'Task Pool') {
          assignTaskToEmployee(taskID.value, assignTaskToId.value)
        }

        addTaskButtonState.value = 'success'
        handleGetAllTasks()
      })
      .catch((err) => console.log(err))
  }, 750)

  setTimeout(() => {
    selectedPatient.value = { patientName: '', patientID: '' }
    taskType.value = 'New patient'
    assignTaskTo.value = 'Low'
    taskComments.value = ''
    addTaskButtonState.value = 'idle'
  }, 1500)
}

function setTaskType(text: string) {
  taskType.value = text
}

function handleUseTask() {
  patientMenuOpen.value = false
  taskType.value = customTaskType.value
}

// DEBOUNCE *************************************************************
const patientList = ref([])
const patientsToShow = ref([])

patientsToShow.value = patientStore.allPatients

const debouncedFetch = debounce(() => {
  searchPatientByName(searchPatientName.value)
    .then((res) => {
      patientList.value = res.patients
      patientsToShow.value = patientList.value
    })
    .catch((err) => console.log(err))
}, 200)

watch(searchPatientName, (newValue) => {
  debouncedFetch()
})

watch(customTaskType, (newValue) => {
  setTaskType(customTaskType.value)
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

employeeStore.getAllEmployeesGraphQL()

const sortedEmployeeNames = computed(() => {
  const employeeNames = employeeStore.allEmployees.map((employee) => {
    return { name: employee.firstName + ' ' + employee.lastName, employeeId: employee.employeeId }
  })

  employeeNames.sort((a, b) => a.name.localeCompare(b.name))
  employeeNames.unshift({ name: 'Task Pool' })

  return employeeNames
})
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
              <div class="absolute left-0 top-12 w-full h-64 overflow-scroll no-scrollbars border-b-gray-2 rounded-b-[28px]">
                <div
                  class="px-2 w-full hover:bg-gray-2 bg-white h-[64px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center cursor-pointer"
                >
                  <input
                    @change="debounce"
                    v-model="searchPatientName"
                    placeholder="Search by patient name here..."
                    @click.stop
                    class="px-4 w-full bg-white h-[40px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center cursor-pointer rounded-[80px]"
                  />
                </div>
                <div
                  class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer"
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
            <div class="flex px-4">
              {{ taskType }}
            </div>
            <img :class="[taskTypeMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
            <div v-if="taskTypeMenuOpen">
              <div class="absolute left-0 top-12 w-full h-64 overflow-y-scroll no-scrollbars rounded-b-[28px] border border-gray-2">
                <div
                  class="px-2 w-full hover:bg-gray-2 bg-white h-[64px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center cursor-pointer"
                >
                  <input
                    @change="debounce"
                    v-model="customTaskType"
                    placeholder="Add Custom Task here..."
                    @click.stop
                    class="px-4 w-full bg-white h-[40px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center cursor-pointer rounded-[80px]"
                  />
                  <div class="text-black mx-2 opacity-20 hover:opacity-50 cursor-pointer text-sm" @click="handleUseTask">Select</div>
                </div>
                <div
                  class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer"
                  v-for="(task, idx) in taskTypes"
                  :key="idx"
                  :class="[taskTypes.length - 1 === idx ? 'rounded-b-[28px]' : '']"
                  @click="setTaskType(task.text)"
                >
                  <div class="flex">
                    <BaseTaskBadge :taskLabel="task?.text" :idx="idx" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Employee Drop Down -->
        <div :class="[employeeMenuOpen ? 'z-40' : 'z-0']">
          <h2 class="text-[12px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between uppercase">Assign To</h2>
          <div
            class="bg-white md:w-[518px] h-[48px] mb-[24px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 relative cursor-pointer"
            :class="[employeeMenuOpen ? 'rounded-t-[28px] z-40' : 'rounded-[80px]']"
            placeholder="Search by patient's name"
            type="text"
            @click="employeeMenuOpen = !employeeMenuOpen"
          >
            <div class="flex px-4">
              {{ assignTaskTo.name || 'Task Pool' }}
            </div>
            <img :class="[employeeMenuOpen ? 'rotate-180' : '']" :src="CaretIcon" alt="Caret Icon" class="right-4 absolute transition" />
            <div v-if="employeeMenuOpen">
              <div class="absolute left-0 top-12 w-full h-52 overflow-scroll no-scrollbars rounded-b-[28px]">
                <div
                  class="w-full hover:bg-gray-2 bg-white h-[48px] border border-gray-2 outline-none focus:ring-0 flex justify-between items-center px-2 cursor-pointer"
                  v-for="(employee, idx) in sortedEmployeeNames"
                  :key="idx"
                  :class="[sortedEmployeeNames.length - 1 === idx ? 'rounded-b-[28px]' : '']"
                  @click=";(assignTaskTo = employee), (assignTaskToId = employee.employeeId)"
                >
                  <div class="flex px-4">{{ employee.name }}</div>
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

<style>
.no-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.no-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}
</style>
