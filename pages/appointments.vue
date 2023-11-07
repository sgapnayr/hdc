<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { getMyAppointments, getPatientName, getEmployeeName, getAppointmentsByProvider } from '@/lib/endpoints'
import { formatLegibleDate } from '@/utils/helpers'
import { useProfileStore } from '../stores/profile'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

// STATE *********************************************************************
const appointments = ref([])
const nextToken = ref(null)
const shouldFetchMore = ref(true)
const isLoading = ref(false)

// STORES ****************************************************************
const profileStore = useProfileStore()

// MEMBER DATA ****************************************************************
const tableHeaderCategories = [
  {
    role: '',
    categories: [{ text: 'Service' }, { text: 'Patient Name' }, { text: 'Provider Name' }, { text: 'Meeting Link' }, { text: 'Note' }, { text: 'Start Time' }],
  },
]

// METHODS ********************************************************************
const checkScrollEnd = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (shouldFetchMore.value && !isLoading.value) {
      fetchAppointments()
    }
  }
}

const fetchAppointments = async () => {
  isLoading.value = true

  const res = await getAppointmentsByProvider(profileStore.profileData.patientId, nextToken.value)

  const enrichedAppointments = await Promise.all(
    res.appointments.map(async (appointment) => {
      const patient = await getPatientName(appointment.patientId)

      let providerName = 'N/A'
      if (appointment.providerId) {
        const employee = await getEmployeeName(appointment.providerId)
        providerName = `${employee.firstName} ${employee.lastName}`
      }

      return {
        ...appointment,
        patientName: patient.name || 'N/A',
        providerName: providerName || 'N/A',
      }
    })
  )

  appointments.value = [...appointments.value, ...enrichedAppointments]

  nextToken.value = res.nextToken

  shouldFetchMore.value = res.appointments.length >= 5 && res.nextToken

  isLoading.value = false
}

// INITIALIZATION *************************************************************
onMounted(() => {
  window.addEventListener('scroll', checkScrollEnd)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollEnd)
})

fetchAppointments()
</script>

<template>
  <BaseWrapper>
    <div class="flex py-8 pb-24 gap-x-6 flex-col">
      <div class="text-[32px] font-[500] text-[#403E48]">Appointments</div>
      <div class="text-[16px] font-[400] text-[#403E48]">Observe details of appointments, etc.</div>
      <!-- Table -->
      <div class="table-container">
        <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full flex-col mt-[32px] shadow-sm min-w-[1244px]">
          <!-- Tabs -->
          <div class="flex text-[16px] font-[400] gap-x-8">
            <div
              :class="'border-b-2 border-b-honeydew-purple text-honeydew-purple'"
              class="h-full py-4 cursor-pointer"
              @click="tabSelected = 'Treatment Plans'"
            >
              Appointments
            </div>
          </div>

          <!-- Appointments Table -->
          <div class="bg-white">
            <!-- Table Header -->
            <div class="mt-[24px]">
              <div
                v-for="(tableHeaderCategory, idx) in tableHeaderCategories"
                :key="idx"
                class="grid grid-cols-6 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
              >
                <div
                  v-for="(category, jdx) in tableHeaderCategory.categories"
                  :key="jdx"
                  :class="[category.text === 'Full name' ? 'col-span-2' : 'col-span-1']"
                >
                  <div :class="[category.text === 'Actions' ? 'w-full flex justify-end' : '']">
                    {{ category.text }}
                  </div>
                </div>
              </div>
              {{ patientList?.patients }}
            </div>

            <div class="text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2 w-full">
              <span v-if="appointments.length === 0" class="w-full text-center text-sm opacity-50 py-8">This provider has no appointments.</span>
            </div>
            <!-- Table Appointments -->
            <div
              v-for="(appointment, idx) in appointments"
              :key="idx"
              :class="[idx === appointments.length - 1 ? 'rounded-b-[16px]' : '']"
              class="grid grid-cols-6 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
            >
              <div class="whitespace-pre-wrap w-1/2 flex items-center">
                {{ appointment.service || '-' }}
              </div>
              <div class="whitespace-pre-wrap w-1/2 flex items-center">
                {{ appointment.patientName || appointment.patientId || '-' }}
              </div>
              <div class="whitespace-pre-wrap w-1/2 flex items-center">
                {{ appointment.providerName || appointment.providerId || '-' }}
              </div>
              <div class="whitespace-pre-wrap w-1/2 flex items-center">
                {{ appointment.meetingLink || '-' }}
              </div>
              <div class="whitespace-pre-wrap w-1/2 flex items-center">
                {{ appointment.note || '-' }}
              </div>
              <div class="whitespace-pre-wrap w-1/2 flex items-center">
                {{ formatLegibleDate(appointment.startTime) || '-' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="shouldFetchMore && !isLoading" class="flex justify-center mt-4">
        <button class="bg-honeydew-purple hover:opacity-50 transition-all cursor-pointer text-white px-4 py-2 rounded" @click="fetchAppointments">
          Load More
        </button>
      </div>

      <div v-if="isLoading" class="text-center">
        <BaseLoader />
      </div>
    </div>
  </BaseWrapper>
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

.table-container {
  overflow-x: auto; /* Enable horizontal scrolling */
}

.no-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.no-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}
</style>
