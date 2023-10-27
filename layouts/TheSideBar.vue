<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import HoneyDewIcon from '@/assets/icons/honeydew-icon.svg'
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { Auth } from 'aws-amplify'
import WavingLady from '@/assets/images/waving-lady.svg'
import { useProfileStore } from '~/stores/profile'

// ROUTER **********************************************************************
const route = useRoute()
const router = useRouter()
const isModalOpen = ref(false)
const modalExists = ref(false)

// STORE *************************************************************
const profileStore = useProfileStore()

// METHODS *************************************************************
function handlePregnancyModal() {
  modalExists.value = true
  setTimeout(() => {
    isModalOpen.value = true
  }, 1)
}

async function signOut() {
  try {
    await Auth.signOut()
    navigateTo('/')
  } catch (error) {
    console.log('Error signing out:', error)
  }
}

const mouseHover = ref(false)

async function handleNavigation(routePath: string) {
  router.push(routePath)
}

await profileStore?.setMyProfile()
</script>

<template>
  <div
    @mouseover="mouseHover = true"
    @mouseleave="mouseHover = false"
    :class="mouseHover ? 'w-[250px]' : 'w-[80px]'"
    class="bg-white flex flex-col items-start h-screen justify-start shadow-md transition-all cursor-pointer"
  >
    <div class="w-[80px] bg-white flex flex-col items-center h-screen justify-start">
      <div class="relative flex items-center justify-center">
        <img
          :src="HoneydewLogo"
          alt="Honey Dew Logo"
          :class="mouseHover ? 'opacity-100' : 'opacity-0'"
          class="mb-[36px] mt-[28px] absolute left-24 scale-[300%] transition-all"
        />
        <img :src="HoneyDewIcon" alt="Honey Dew Icon" class="mb-[36px] mt-[28px]" />
      </div>
      <div class="gap-y-[14px] flex flex-col z-0">
        <!-- Admin Icon -->
        <div
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] text-[8px] relative"
          :class="[route.path === '/admin' ? 'bg-[#EEEBFC] text-honeydew-purple' : 'hover:bg-[#EEEBFC]']"
          @click="handleNavigation('/admin')"
          v-if="profileStore?.profileData?.userRole != 'patient'"
        >
          <div
            :class="[route.path === '/admin' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
            class="absolute text-xl left-16 -z-10 transition-all"
          >
            Admin
          </div>
          <svg class="scale-125" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              :class="[route.path.includes('/admin') ? 'showIcon' : '']"
              d="M14.25 7.875H13.625V4.75C13.625 3.75544 13.2299 2.80161 12.5266 2.09835C11.8234 1.39509 10.8696 1 9.875 1C8.88044 1 7.92661 1.39509 7.22335 2.09835C6.52009 2.80161 6.125 3.75544 6.125 4.75V7.875H5.5C4.83718 7.87572 4.20172 8.13935 3.73303 8.60803C3.26435 9.07671 3.00072 9.71218 3 10.375V15.8754C3.00072 16.5382 3.26435 17.1737 3.73303 17.6423C4.20172 18.111 4.83718 18.3746 5.5 18.3754H14.25C14.9128 18.3746 15.5483 18.111 16.017 17.6423C16.4856 17.1737 16.7493 16.5382 16.75 15.8754V10.375C16.7493 9.71218 16.4856 9.07671 16.017 8.60803C15.5483 8.13935 14.9128 7.87572 14.25 7.875ZM12.375 7.875H7.375V4.75C7.375 4.08696 7.63839 3.45107 8.10723 2.98223C8.57607 2.51339 9.21196 2.25 9.875 2.25C10.538 2.25 11.1739 2.51339 11.6428 2.98223C12.1116 3.45107 12.375 4.08696 12.375 4.75V7.875Z"
              fill="#A09DB1"
            />
            <path
              d="M10.75 13.7993C11.1984 13.54 11.5 13.0552 11.5 12.5C11.5 11.6716 10.8284 11 10 11C9.17157 11 8.5 11.6716 8.5 12.5C8.5 13.0552 8.80165 13.54 9.25 13.7993V14.75C9.25 15.1642 9.58579 15.5 10 15.5C10.4142 15.5 10.75 15.1642 10.75 14.75V13.7993Z"
              fill="white"
            />
          </svg>
        </div>

        <!-- Home Icon -->
        <div
          @click="handleNavigation('/view-history/' + profileStore?.profileData?.patientId)"
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] text-[8px] relative"
          :class="[route.path.includes('/view-history') ? 'bg-[#EEEBFC]' : 'hover:bg-[#EEEBFC]']"
          v-if="profileStore?.profileData?.userRole == 'patient'"
        >
          <div
            :class="[route.path === '/view-history' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
            class="absolute text-xl left-16 -z-10 transition-all"
          >
            Dashboard
          </div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              :class="[route.path.includes('/view-history') ? 'showIcon' : '']"
              class="cursor-pointer"
              d="
        M24.2614 16.7479C24.1916 16.6811 24.0988 16.6439 24.0022 16.6439C23.9056 16.6439 23.8128 16.6811 23.743 16.7479L15.1133 24.9918C15.0766 25.0268 15.0475 25.069 15.0276 25.1156C15.0077 25.1623 14.9974 25.2125 14.9975 25.2632L14.9961 33.0004C14.9961 33.3982 15.1541 33.7797 15.4354 34.061C15.7167 34.3423 16.0983 34.5004 16.4961 34.5004H21.0008C21.1997 34.5004 21.3905 34.4214 21.5311 34.2807C21.6718 34.1401 21.7508 33.9493 21.7508 33.7504V27.3754C21.7508 27.2759 21.7903 27.1805 21.8606 27.1102C21.9309 27.0399 22.0263 27.0004 22.1258 27.0004H25.8758C25.9752 27.0004 26.0706 27.0399 26.1409 27.1102C26.2113 27.1805 26.2508 27.2759 26.2508 27.3754V33.7504C26.2508 33.9493 26.3298 34.1401 26.4705 34.2807C26.6111 34.4214 26.8019 34.5004 27.0008 34.5004H31.5036C31.9014 34.5004 32.2829 34.3423 32.5643 34.061C32.8456 33.7797 33.0036 33.3982 33.0036 33.0004V25.2632C33.0037 25.2125 32.9934 25.1623 32.9735 25.1156C32.9536 25.069 32.9245 25.0268 32.8878 24.9918L24.2614 16.7479Z
        M35.0114 23.4445L31.5052 20.0902V15C31.5052 14.8011 31.4262 14.6103 31.2855 14.4697C31.1449 14.329 30.9541 14.25 30.7552 14.25H28.5052C28.3063 14.25 28.1155 14.329 27.9748 14.4697C27.8342 14.6103 27.7552 14.8011 27.7552 15V16.5L25.0402 13.9041C24.7861 13.6472 24.4083 13.5 24 13.5C23.5931 13.5 23.2163 13.6472 22.9622 13.9045L12.9919 23.4436C12.7003 23.7249 12.6638 24.1875 12.9291 24.4922C12.9957 24.5691 13.0773 24.6317 13.1688 24.676C13.2604 24.7204 13.36 24.7457 13.4617 24.7503C13.5633 24.755 13.6649 24.7389 13.7601 24.7031C13.8553 24.6672 13.9423 24.6124 14.0156 24.5419L23.7422 15.2475C23.812 15.1807 23.9048 15.1435 24.0014 15.1435C24.098 15.1435 24.1909 15.1807 24.2606 15.2475L33.9881 24.5419C34.1314 24.6793 34.3234 24.7543 34.5219 24.7504C34.7204 24.7466 34.9092 24.6642 35.0471 24.5213C35.3349 24.2231 35.311 23.7309 35.0114 23.4445Z
      "
              fill="#A09DB1"
            />
          </svg>
        </div>

        <!-- File Icon -->
        <div
          @click="handleNavigation('/tasks-pool')"
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] text-[8px] relative"
          :class="[route.path === '/tasks-pool' ? 'bg-[#EEEBFC]' : 'hover:bg-[#EEEBFC]']"
          v-if="profileStore?.profileData?.userRole != 'patient'"
        >
          <div
            :class="[route.path === '/tasks-pool' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
            class="absolute text-xl left-16 -z-10 transition-all"
          >
            Tasks
          </div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              :class="[route.path === '/tasks-pool' ? 'showIcon' : 'icon']"
              class="icon cursor-pointer"
              d="
        M29.25 16.5H18.75C18.5511 16.5 18.3603 16.421 18.2197 16.2803C18.079 16.1397 18 15.9489 18 15.75C18 15.5511 18.079 15.3603 18.2197 15.2197C18.3603 15.079 18.5511 15 18.75 15H29.25C29.4489 15 29.6397 15.079 29.7803 15.2197C29.921 15.3603 30 15.5511 30 15.75C30 15.9489 29.921 16.1397 29.7803 16.2803C29.6397 16.421 29.4489 16.5 29.25 16.5Z
        M30.75 18.75H17.25C17.0511 18.75 16.8603 18.671 16.7197 18.5303C16.579 18.3897 16.5 18.1989 16.5 18C16.5 17.8011 16.579 17.6103 16.7197 17.4697C16.8603 17.329 17.0511 17.25 17.25 17.25H30.75C30.9489 17.25 31.1397 17.329 31.2803 17.4697C31.421 17.6103 31.5 17.8011 31.5 18C31.5 18.1989 31.421 18.3897 31.2803 18.5303C31.1397 18.671 30.9489 18.75 30.75 18.75Z
        M31.6467 33H16.3533C15.7956 32.9994 15.261 32.7776 14.8667 32.3833C14.4724 31.989 14.2506 31.4544 14.25 30.8967V21.6033C14.2506 21.0456 14.4724 20.511 14.8667 20.1167C15.261 19.7224 15.7956 19.5006 16.3533 19.5H31.6467C32.2044 19.5006 32.739 19.7224 33.1333 20.1167C33.5276 20.511 33.7494 21.0456 33.75 21.6033V30.8967C33.7494 31.4544 33.5276 31.989 33.1333 32.3833C32.739 32.7776 32.2044 32.9994 31.6467 33Z
      "
              fill="#A09DB1"
            />
          </svg>
        </div>

        <!-- Patient Icon -->
        <div
          @click="handleNavigation('/profiles/' + profileStore?.profileData?.patientId)"
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition"
          :class="[route.path.includes('/profiles') || route.path === '/view-history' ? 'bg-[#EEEBFC]' : 'hover:bg-[#EEEBFC]']"
          v-if="profileStore?.profileData?.userRole == 'patient'"
        >
          <div
            :class="[route.path === '/profiles' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
            class="absolute text-xl left-16 -z-10 transition-all"
          >
            Profile
          </div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              class="icon cursor-pointer"
              :class="[route.path.includes('/profile') || route.path === '/view-history' ? 'showIcon' : 'icon']"
              d="M24 13C17.9347 13 13 17.9347 13 24C13 30.0653 17.9347 35 24 35C30.0653 35 35 30.0653 35 24C35 17.9347 30.0653 13 24 13ZM21.3441 19.178C22.0142 18.4677 22.9571 18.0769 24 18.0769C25.0429 18.0769 25.9774 18.4704 26.65 19.1843C27.3317 19.9078 27.6633 20.8798 27.585 21.9248C27.4285 24 25.8208 25.6923 24 25.6923C22.1792 25.6923 20.5683 24 20.415 21.9243C20.3372 20.8708 20.6683 19.8956 21.3441 19.178ZM24 33.3077C22.7575 33.3085 21.5274 33.0598 20.3828 32.5763C19.2381 32.0929 18.2023 31.3845 17.3365 30.4932C17.8324 29.7861 18.4641 29.1849 19.1949 28.7247C20.5429 27.8606 22.249 27.3846 24 27.3846C25.751 27.3846 27.4571 27.8606 28.8035 28.7247C29.5349 29.1847 30.1672 29.7859 30.6635 30.4932C29.7978 31.3846 28.7619 32.093 27.6173 32.5765C26.4727 33.06 25.2426 33.3086 24 33.3077Z"
              fill="#A09DB1"
            />
          </svg>
        </div>

        <!-- Medications Icon -->
        <div
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] relative"
          :class="[route.path === '/medications' ? 'bg-[#EEEBFC] text-honeydew-purple' : 'hover:bg-[#EEEBFC]']"
          @click="handleNavigation('/medications')"
          v-if="profileStore?.profileData?.userRole != 'patient'"
        >
          <div
            :class="[route.path === '/medications' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
            class="absolute text-xl left-16 -z-10 transition-all"
          >
            Medication
          </div>
          DX
        </div>

        <!-- Appointments Icon -->
        <div
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] text-xs relative"
          :class="[route.path === '/appointments' ? 'bg-[#EEEBFC] text-honeydew-purple' : 'hover:bg-[#EEEBFC]']"
          @click="handleNavigation('/appointments')"
          v-if="profileStore?.profileData?.userRole != 'patient'"
        >
          <div
            :class="[route.path === '/appointments' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
            class="absolute text-xl left-16 -z-10 transition-all"
          >
            Appointments
          </div>
          APTS
        </div>

        <!-- Question Icon -->
        <BaseModal :customHeader="true" :customButtons="true">
          <template #button>
            <div
              class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] text-xs relative"
              :class="[route.path === '/help' ? 'bg-[#EEEBFC]' : 'hover:bg-[#EEEBFC]']"
            >
              <div
                :class="[route.path === '/help' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
                class="absolute text-xl left-16 -z-10 transition-all"
              >
                Help
              </div>
              <svg class="scale-75" @click="handlePregnancyModal" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  class="cursor-pointer"
                  d="M11.9999 2.99994C7.03113 2.99994 2.99988 7.03119 2.99988 11.9999C2.99988 16.9687 7.03113 20.9999 11.9999 20.9999C16.9686 20.9999 20.9999 16.9687 20.9999 11.9999C20.9999 7.03119 16.9686 2.99994 11.9999 2.99994ZM12.4892 17.1562H11.0732C11.0413 17.1561 11.0108 17.1433 10.9883 17.1207C10.9658 17.0982 10.9532 17.0676 10.9532 17.0357V15.6201C10.9532 15.5882 10.9658 15.5577 10.9883 15.5351C11.0108 15.5125 11.0413 15.4997 11.0732 15.4996H12.4892C12.5211 15.4997 12.5516 15.5125 12.5741 15.5351C12.5966 15.5577 12.6092 15.5882 12.6092 15.6201V17.0357C12.6092 17.0676 12.5966 17.0982 12.5741 17.1207C12.5516 17.1433 12.5211 17.1561 12.4892 17.1562ZM13.2861 12.5156C12.5263 13.0256 12.4217 13.4929 12.4217 13.9218V14.4374C12.4217 14.4747 12.4069 14.5105 12.3806 14.5369C12.3542 14.5632 12.3184 14.5781 12.2811 14.5781H11.2499C11.2126 14.5781 11.1768 14.5632 11.1504 14.5369C11.1241 14.5105 11.1093 14.4747 11.1093 14.4374V13.9218C11.1093 12.8948 11.5817 12.0782 12.5539 11.4252C13.4577 10.8187 13.9686 10.4343 13.9686 9.58916C13.9686 9.01447 13.6405 8.57806 12.9613 8.25509C12.8014 8.17916 12.4457 8.10509 12.0078 8.11025C11.4585 8.11728 11.0319 8.24853 10.7033 8.51291C10.0836 9.01166 10.0311 9.55494 10.0311 9.56244C10.0054 9.72178 9.99223 9.8829 9.99175 10.0443C9.99175 10.0816 9.97693 10.1174 9.95056 10.1437C9.92419 10.1701 9.88842 10.1849 9.85113 10.1849H8.85503C8.82012 10.1851 8.78639 10.1723 8.7604 10.149C8.73441 10.1257 8.71801 10.0936 8.71441 10.0588C8.69753 9.87165 8.69894 9.68326 8.71863 9.49634C8.72894 9.38244 8.803 8.35634 9.87972 7.49009C10.438 7.04103 11.1482 6.80759 11.9891 6.79728C12.5844 6.79025 13.1436 6.89103 13.5228 7.07009C14.6577 7.60962 15.2811 8.50447 15.2811 9.58916C15.2811 11.1749 14.2213 11.887 13.2861 12.5156Z"
                  fill="#A09DB1"
                />
              </svg>
            </div>
          </template>
          <template #content>
            <div class="relative w-full items-center justify-center">
              <img :src="WavingLady" alt="Waving Lady" class="w-full" />
            </div>
            <div class="bg-white mt-[24px] px-2">
              <div class="text-[20px] font-[500] leading-[24px] text-gray-3">Have questions?</div>
              <div class="text-[16px] mt-[8px] font-[400] leading-[24px] text-gray-3">Contact Honeydew's team 8am-10pm EST</div>
              <p class="uppercase mt-4 text-sm">Call Us</p>
              <p class="text-honeydew-green font-semibold">
                <a href="tel:516-210-5600">516-210-5600</a>
              </p>
              <p class="uppercase mt-4 text-sm">Email Us</p>
              <p class="text-honeydew-green font-semibold">
                <a href="mailto:info@honeydewcare.com">info@honeydewcare.com</a>
              </p>
            </div>
          </template>
        </BaseModal>

        <!-- Users Icon -->
        <div
          @click="handleNavigation('/employees')"
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] text-xs relative"
          :class="[route.path === '/employees' ? 'bg-[#EEEBFC]' : 'hover:bg-[#EEEBFC]']"
          v-if="profileStore?.profileData?.userRole != 'patient'"
        >
          <div
            :class="[route.path === '/employees' ? 'text-black' : 'text-gray-1', mouseHover ? 'opacity-100 text-semibold' : 'opacity-0']"
            class="absolute text-xl left-16 -z-10 transition-all"
          >
            Employees
          </div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              class="cursor-pointer"
              :class="[route.path === '/employees' ? 'showIcon' : 'icon']"
              d="
        M27.7498 24C26.7861 24 25.8542 23.5697 25.1248 22.7888C24.4156 22.027 23.9825 21.0113 23.9061 19.9294C23.8245 18.7753 24.1766 17.7141 24.897 16.9406C25.6175 16.1672 26.6248 15.75 27.7498 15.75C28.8669 15.75 29.877 16.1747 30.5952 16.9462C31.3203 17.7253 31.6733 18.7847 31.5917 19.9289C31.5134 21.0122 31.0808 22.0275 30.373 22.7883C29.6455 23.5697 28.7141 24 27.7498 24Z
        M33.9302 32.25H21.5716C21.3729 32.2511 21.1766 32.2065 20.9979 32.1198C20.8191 32.0331 20.6626 31.9065 20.5404 31.7498C20.4108 31.58 20.3213 31.383 20.2786 31.1736C20.2359 30.9643 20.2411 30.748 20.2938 30.5409C20.6885 28.9561 21.6663 27.6417 23.1213 26.7403C24.4127 25.9406 26.0566 25.5 27.7507 25.5C29.478 25.5 31.0788 25.9219 32.3777 26.7211C33.836 27.6178 34.8152 28.9397 35.208 30.5438C35.2601 30.751 35.2648 30.9673 35.2216 31.1765C35.1784 31.3857 35.0885 31.5825 34.9587 31.7522C34.8366 31.9082 34.6805 32.0341 34.5022 32.1204C34.3239 32.2067 34.1283 32.251 33.9302 32.25Z
        M18.8899 24.1875C17.2404 24.1875 15.7901 22.6538 15.6556 20.7689C15.589 19.8033 15.8899 18.9103 16.4993 18.2555C17.1021 17.6072 17.9524 17.25 18.8899 17.25C19.8274 17.25 20.6712 17.6091 21.2773 18.2611C21.8914 18.9211 22.1914 19.8122 22.121 20.7698C21.9865 22.6542 20.5367 24.1875 18.8899 24.1875Z
        M21.9684 25.661C21.1439 25.2578 20.0737 25.0563 18.891 25.0563C17.5101 25.0563 16.169 25.4163 15.1143 26.0697C13.9185 26.8117 13.1142 27.8922 12.7893 29.1968C12.7418 29.3844 12.7373 29.5804 12.7762 29.77C12.8151 29.9596 12.8963 30.138 13.0139 30.2918C13.1254 30.4349 13.2683 30.5506 13.4315 30.63C13.5948 30.7093 13.7741 30.7501 13.9556 30.7493H19.1587C19.2465 30.7492 19.3315 30.7184 19.399 30.6621C19.4664 30.6059 19.5119 30.5277 19.5276 30.4413C19.5328 30.4118 19.5393 30.3822 19.5468 30.3532C19.9443 28.7566 20.8757 27.4075 22.252 26.4241C22.3026 26.3876 22.3433 26.3391 22.3704 26.2829C22.3975 26.2267 22.4102 26.1646 22.4073 26.1023C22.4044 26.0399 22.3859 25.9793 22.3536 25.9259C22.3214 25.8725 22.2763 25.828 22.2224 25.7964C22.1489 25.7533 22.0645 25.7078 21.9684 25.661Z
      "
              fill="#A09DB1"
            />
          </svg>
        </div>

        <!-- Logout Icon -->
        <div
          @click="signOut"
          class="w-[48px] h-[48px] hover:bg-[#EEEBFC] rounded-full cursor-pointer active:scale-90 transition flex justify-center items-center text-[#A09DB1] text-xs relative"
          :class="[route.path === '/login' ? 'bg-[#EEEBFC]' : 'hover:bg-[#EEEBFC]']"
        >
          <div :class="mouseHover ? 'opacity-100 text-semibold' : 'opacity-0'" class="absolute text-xl left-16 text-gray-1 -z-10 transition-all">Logout</div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              class="cursor-pointer"
              :class="[route.path === '/login' ? 'showIcon' : 'icon']"
              d="
        M19.5 24C19.5 23.8011 19.579 23.6103 19.7197 23.4697C19.8603 23.329 20.0511 23.25 20.25 23.25H27V18.375C27 16.875 25.4161 15.75 24 15.75H16.875C16.179 15.7507 15.5118 16.0275 15.0197 16.5197C14.5275 17.0118 14.2507 17.679 14.25 18.375V29.625C14.2507 30.321 14.5275 30.9882 15.0197 31.4803C15.5118 31.9725 16.179 32.2493 16.875 32.25H24.375C25.071 32.2493 25.7382 31.9725 26.2303 31.4803C26.7225 30.9882 26.9993 30.321 27 29.625V24.75H20.25C20.0511 24.75 19.8603 24.671 19.7197 24.5303C19.579 24.3897 19.5 24.1989 19.5 24Z
      M33.5302 23.4694L29.7802 19.7194C29.6384 19.5847 29.4495 19.5107 29.254 19.5132C29.0584 19.5157 28.8715 19.5946 28.7332 19.7329C28.5949 19.8712 28.5161 20.058 28.5136 20.2536C28.5111 20.4492 28.5851 20.638 28.7198 20.7798L31.1892 23.2496H27V24.7496H31.1892L28.7198 27.2194C28.6473 27.2884 28.5892 27.3712 28.5492 27.4629C28.5091 27.5546 28.4878 27.6535 28.4865 27.7536C28.4852 27.8537 28.504 27.953 28.5417 28.0457C28.5794 28.1385 28.6353 28.2227 28.7061 28.2935C28.7769 28.3643 28.8611 28.4202 28.9539 28.4579C29.0466 28.4956 29.1459 28.5144 29.246 28.5131C29.3461 28.5118 29.445 28.4905 29.5367 28.4504C29.6284 28.4104 29.7112 28.3523 29.7802 28.2797L33.5302 24.5298C33.6707 24.3891 33.7497 24.1984 33.7497 23.9996C33.7497 23.8008 33.6707 23.6101 33.5302 23.4694Z
      "
              fill="#A09DB1"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
.myElementSibling:hover {
  background-color: blue;
}

.background:hover,
.icon ~ .background,
.icon:hover ~ .background {
  opacity: 1;
  cursor: pointer;
}

.showIcon {
  fill: #5e39f5;
}

.background {
  opacity: 0;
}
</style>
