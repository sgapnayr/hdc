<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LadyWithGift from '@/assets/images/lady-with-gift.svg'
import DoctorWithClipboard from '@/assets/images/doctor-with-clipboard.svg'
import MyTreatmentPlan from '@/assets/images/my-treatment-plan.svg'
import ViewMyProgress from '@/assets/images/view-my-progress.svg'
import BuyProducts from '@/assets/images/buy-products.svg'
import ChatWithCareTeam from '@/assets/images/chat-with-care-team.svg'
import LockIcon from '@/assets/icons/lock-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { useProfileStore } from '@/stores/profile'
import { useAppointmentsStore } from '~/stores/appointments'
import BaseAccutane from '~/components/BaseAccutane.vue'
import ChevronIcon2 from '@/assets/icons/chevron-down-icon.svg'
import type { Appointment } from '@/types/appointment-types'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
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

// TYPES **********************************************************************
interface Treatment {
  treatmentName: string
  isPrescription: boolean
  treatmentInstructions: string
  morningNightOrBoth: 'morning' | 'night' | 'both'
}

// STORES **********************************************************************
const profileStore = useProfileStore()
const appointmentsStore = useAppointmentsStore()

// STATE **********************************************************************
const profileData = ref<string>('')

// Computed function to get patient appointments filtered by email
const getPatientAppointments = computed(() => {
  const patientEmail = 'ryanpaglionework@gmail.com' // Replace with the patient's email you want to filter

  return appointmentsStore.allAppointments.filter((appointment: any) => {
    const participants = appointment.participants
    for (const participant of participants) {
      if (participant.email === patientEmail) {
        return true
      }
    }
    return false
  })
}) as Appointment | any

// DUMMY DATA **********************************************************************
const treatments: Treatment[] = [
  {
    treatmentName: 'Aspirin',
    isPrescription: true,
    treatmentInstructions: 'Take in the morning with food',
    morningNightOrBoth: 'morning',
  },
  {
    treatmentName: 'Ibuprofen',
    isPrescription: true,
    treatmentInstructions: 'Take twice daily, in the morning and evening',
    morningNightOrBoth: 'both',
  },
  {
    treatmentName: 'Vitamin C',
    isPrescription: false,
    treatmentInstructions: 'Take in the morning on an empty stomach',
    morningNightOrBoth: 'morning',
  },
  {
    treatmentName: 'Antibiotic',
    isPrescription: true,

    treatmentInstructions: 'Take with food, either in the morning or at night',
    morningNightOrBoth: 'both',
  },
]

// METHODS **********************************************************************
profileStore.setMyProfile()
// patientStore.getPatientFromGraphQL(route.params.patientId as string).then((patient) => {
//   patientData.value = patient
// })
// tasksStore.getAllTasksFromGraphQLByPatient(route.params.patientId as string)
appointmentsStore.getAllAppointments()

function formatDate(unixTimestamp: any) {
  const date = new Date(unixTimestamp * 1000)
  return date.toLocaleString()
}
</script>

<template>
  <div>
    <h2>Patient's Appointments</h2>
    <ul v-if="getPatientAppointments.length">
      <li v-for="appointment in getPatientAppointments" :key="appointment?.id">
        <p><strong>Title:</strong> {{ appointment?.title }}</p>
        <p><strong>Date:</strong> {{ formatDate(appointment?.when.start_time) }}</p>
      </li>
    </ul>
    <p v-else>No appointments found for the patient.</p>
  </div>
  <div class="flex flex-col py-8">
    <BaseNylas />
    <BaseWrapper>
      <!-- Upper cards -->
      <div class="flex gap-x-6 lg:flex-row flex-col gap-y-6 lg:min-w-[1244px]">
        <!-- Hi, Profile! -->
        <div class="bg-white w-full rounded-[16px] p-8 flex justify-between shadow-sm">
          <div class="flex flex-col justify-between w-1/2">
            <div class="flex flex-col">
              <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Hi, {{ profileStore.signUpName ? profileStore.signUpName : '...' }}!</h1>
              <p class="text-gray-5 mt-[16px] w-3/4">Welcome to your patient portal</p>
            </div>
            <!-- To do list items -->
            <div class="flex justify-start items-start flex-col gap-y-4">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center w-full">
                  <div class="w-5 h-5 bg-honeydew-bg2 border border-[#F2F4F7] rounded-full mr-2"></div>
                  <div class="w-full opacity-50 cursor-pointer" @click="profileStore.handleModal">Submit pregnancy test</div>
                </div>
                <img class="rotate-[270deg]" :src="ChevronIcon2" alt="Chevron Icon 2" />
              </div>
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center w-full">
                  <div class="w-5 h-5 bg-honeydew-bg2 border border-[#F2F4F7] rounded-full mr-2"></div>
                  <BaseAccutane />
                </div>
                <img class="rotate-[270deg]" :src="ChevronIcon2" alt="Chevron Icon 2" />
              </div>
            </div>
          </div>
          <div class="w-[286px] h-[396px] rounded-[16px] px-8 pt-8 bg-honeydew-bg4 relative z-0">
            <h1 class="text-[16px] font-[500] leading-[40px] text-gray-3">Refer a friend</h1>
            <p class="text-gray-5 mt-[12px] text-[14px]">$25 in-site credit for you and your friend when they sign up using your referral link!</p>
            <div class="mt-[16px] text-honeydew-green text-[12px] font-[700] leading-[24px] w-full flex uppercase">Copy Link</div>
            <div class="w-full flex justify-center pt-[32px] absolute bottom-0 left-0 right-0">
              <img :src="LadyWithGift" alt="Lady With Gift" />
            </div>
          </div>
        </div>
        <!-- You haven't scheduled... -->
        <div class="bg-white w-full rounded-[16px] p-8 flex justify-between shadow-sm">
          <div class="flex flex-col justify-between w-1/2">
            <div class="flex flex-col">
              <h1 class="text-[24px] font-[500] leading-[40px] text-gray-3">You haven't scheduled your initial visit yet</h1>
              <p class="text-gray-5 mt-[16px] w-3/4">Complete the sign up process and select a time for your initial visit.</p>
            </div>
            <div>
              <NuxtLink
                to="/schedule-my-free-visit"
                class="bg-honeydew-purple h-[48px] px-6 justify-center text-white items-center flex rounded-[60px] font-[500] text-[12px] leading-[24px] cursor-pointer uppercase whitespace-nowrap w-[190px]"
              >
                schedule my free visit
              </NuxtLink>
            </div>
          </div>
          <div class="w-[286px] h-[396px] rounded-[16px] px-8 pt-8 bg-honeydew-bg4 relative">
            <h1 class="text-[16px] font-[500] leading-[40px] text-gray-3">How do follow-ups work?</h1>
            <p class="text-gray-5 mt-[12px] text-[14px]">
              Answer a few key questions and submitting new photos of your skin. Your provider will review your submission and outline next steps.
            </p>
            <div class="w-full flex justify-center pt-[32px] absolute bottom-0 left-0 right-0">
              <img :src="DoctorWithClipboard" alt="Doctor with Clipboard" />
            </div>
          </div>
        </div>
      </div>

      <!-- Lower cards -->
      <div class="flex gap-x-6 mt-[24px] lg:flex-row flex-col gap-y-6">
        <!-- My treatment plan -->
        <div class="w-full flex justify-center items-center bg-white rounded-[16px] p-5 flex-col shadow-sm min-w-[290px]">
          <img :src="MyTreatmentPlan" alt="My Treatment Plan" class="w-full" />
          <div>
            <h1 class="text-[16px] font-[500] leading-[40px] text-gray-3 mt-[20px]">My treatment plan</h1>
            <p class="text-gray-5 mt-[8px] text-[14px]">View the latest plan your provider recommended for you.</p>
            <!-- Modal -->
            <BaseModal @action-click="router.push('/view-history/1')">
              <template #button>
                <button
                  class="bg-honeydew-purple h-[40px] px-6 justify-center text-white items-center flex rounded-[60px] font-[500] text-[12px] leading-[24px] cursor-pointer uppercase whitespace-nowrap mt-[16px]"
                >
                  View
                </button>
              </template>
              <template #header>My Treatment Plan</template>
              <template #content>
                <div>
                  <p class="text-[14px] font-[400] text-[#667085] mb-[16px]">
                    Your treatment plan was updated on {date} by your care coordinator {care coordinator}
                  </p>
                  <BaseTreatment
                    :treatmentName="treatment.treatmentName"
                    :is-prescription="treatment.isPrescription"
                    :treatment-instructions="treatment.treatmentInstructions"
                    :morning-night-or-both="treatment.morningNightOrBoth"
                    v-for="(treatment, idx) in treatments"
                    :key="idx"
                    class="rounded-8"
                  />
                  <div class="bg-white w-full mt-[16px] p-4 flex">
                    <div class="flex justify-center items-start mr-[16px]">{icon}</div>
                    <div>
                      <div class="flex gap-x-3">
                        <div>{providerName}</div>
                        <div>Provider</div>
                      </div>
                      <div>{providerBio}</div>
                    </div>
                  </div>
                </div>
              </template>
              <template #button-text> View History </template>
            </BaseModal>
          </div>
        </div>

        <!-- View my progress -->
        <div class="w-full flex justify-center items-center bg-white rounded-[16px] p-5 flex-col shadow-sm min-w-[290px]">
          <img :src="ViewMyProgress" alt="View My Progress" class="w-full" />
          <div>
            <h1 class="text-[16px] font-[500] leading-[40px] text-gray-3 flex gap-x-1 mt-[20px]">
              View my progress
              <img :src="LockIcon" alt="Lock Icon" />
            </h1>
            <p class="text-gray-5 mt-[8px] text-[14px]">See the stacked photos from my visit submissions.</p>
            <button
              :class="[profileStore.isPatientMember ? 'bg-honeydew-purple cursor-pointer' : 'bg-gray-1 cursor-not-allowed']"
              class="h-[40px] px-6 justify-center text-white items-center flex rounded-[60px] font-[500] text-[12px] leading-[24px] uppercase whitespace-nowrap mt-[16px]"
            >
              View
            </button>
          </div>
        </div>

        <!-- Buy products -->
        <div class="w-full flex justify-center items-center bg-white rounded-[16px] p-5 flex-col shadow-sm min-w-[290px]">
          <img :src="BuyProducts" alt="My Treatment Plan" class="w-full" />
          <div>
            <h1 class="text-[16px] font-[500] leading-[40px] text-gray-3 mt-[20px]">Buy products</h1>
            <p class="text-gray-5 mt-[8px] text-[14px]">Honeydew-vetted products shipped directly to you.</p>
            <button
              @click="router.push('/stripe')"
              class="bg-honeydew-purple cursor-pointer h-[40px] px-6 justify-center text-white items-center flex rounded-[60px] font-[500] text-[12px] leading-[24px] uppercase whitespace-nowrap mt-[16px]"
            >
              Order
            </button>
          </div>
        </div>

        <!-- Chat with care team -->
        <div class="w-full flex justify-center items-center bg-white rounded-[16px] p-5 flex-col shadow-sm min-w-[290px]">
          <img :src="ChatWithCareTeam" alt="My Treatment Plan" class="w-full" />
          <div>
            <h1 class="text-[16px] font-[500] leading-[40px] text-gray-3 flex gap-x-1 mt-[20px]">
              Chat with care team
              <img :src="LockIcon" alt="Lock Icon" />
            </h1>
            <p class="text-gray-5 mt-[8px] text-[14px]">Ongoing support within 24 hours. Refills, skin questions, etc.</p>
            <button
              :class="[profileStore.isPatientMember ? 'bg-honeydew-purple cursor-pointer' : 'bg-gray-1 cursor-not-allowed']"
              class="h-[40px] px-6 justify-center items-center flex rounded-[60px] font-[500] text-[12px] leading-[24px] text-white uppercase whitespace-nowrap mt-[16px]"
            >
              Open Chat
            </button>
          </div>
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>
