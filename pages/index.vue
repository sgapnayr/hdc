<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import LadyOnPhoneMobile from '@/assets/images/lady-on-phone-mobile.svg'
import LadyOnPhoneDesktop from '@/assets/images/lady-on-phone-desktop.svg'
import LadyDoctorMobile from '@/assets/images/lady-doctor-mobile.svg'
import LadyDoctorDesktop from '@/assets/images/lady-doctor-desktop.svg'
import GreenLineIcon from '@/assets/icons/green-line-icon.svg'
import MeetYourProviderCard from '@/assets/images/meet-your-provider-card.svg'
import GetTreatmentCard from '@/assets/images/get-treatment-card.svg'
import TrackYourProgressCard from '@/assets/images/track-your-progress-card.svg'
import AskAnythingCard from '@/assets/images/ask-anything-card.svg'
import Arrow1 from '@/assets/icons/arrow1.svg'
import Arrow2 from '@/assets/icons/arrow2.svg'
import Arrow3 from '@/assets/icons/arrow3.svg'
import ExpertCare from '@/assets/images/expert-care.svg'
import AccessPrescriptions from '@/assets/images/access-prescriptions.svg'
import DoItBetterOnline from '@/assets/images/do-it-better-online.svg'
import TestimonyImage1 from '@/assets/images/testimony-1-image-1.svg'
import TestimonyImage2 from '@/assets/images/testimony-1-image-2.svg'
import TestimonyImage3 from '@/assets/images/testimony-1-image-3.svg'
import TestimonyImage4 from '@/assets/images/testimony-1-image-4.svg'
import Testimony2Image1 from '@/assets/images/testimony-2-image-1.svg'
import Testimony2Image2 from '@/assets/images/testimony-2-image-2.svg'
import Testimony2ImageArrow from '@/assets/images/testimony-2-image-arrow.svg'
import Testimony2ImageNoArrow from '@/assets/images/testimony-2-image-no-arrow.svg'
import Testimony3Image1 from '@/assets/images/testimony-3-image-1.svg'
import Testimony3Image2 from '@/assets/images/testimony-3-image-2.svg'
import Testimony3Image3 from '@/assets/images/testimony-3-image-3.svg'
import Testimony3Image4 from '@/assets/images/testimony-3-image-4.svg'
import GiantQuotes from '@/assets/icons/quotes.svg'
import StarIcon from '@/assets/icons/star.svg'
import { useLandingPageStore } from '@/stores/landing-page'

// STATE **********************************************************************
const slideSelected = ref<'1' | '2' | '3'>('1')

// STORES **********************************************************************
const landingPageStore = useLandingPageStore()

// METHODS **********************************************************************
function changeSlide() {
  slideSelected.value = '1'
  setTimeout(() => {
    slideSelected.value = '2'
  }, 4000)
  setTimeout(() => {
    slideSelected.value = '3'
  }, 8000)
  setTimeout(() => {
    changeSlide()
  }, 12000)
}
changeSlide()

landingPageStore.handleFirstVisitCouponVisible()
</script>

<template>
  <div class="flex flex-col w-full">
    <BaseModalCoupon :trigger-open="landingPageStore.firstVisitCouponVisible" v-if="landingPageStore.firstVisitCouponVisible">
      <template #button>
        <div class="invisible absolute">.</div>
      </template>
      <template #content> </template>
    </BaseModalCoupon>
    <!-- Acne Care That Works For You -->
    <div class="flex flex-col w-full items-center bg-honeydew-bg3">
      <BaseWrapper>
        <div class="w-full flex justify-center items-center flex-col md:flex-row-reverse">
          <div class="flex flex-row md:flex-col w-full justify-center items-center mt-[48px] md:my-[48px] gap-x-6 md:gap-y-6">
            <img class="rounded-[18px] w-[90%] ml-6 flex md:hidden" :src="LadyOnPhoneMobile" alt="Lady on Phone" />
            <img class="rounded-[18px] ml-6 hidden md:flex" :src="LadyOnPhoneDesktop" alt="Lady on Phone" />
            <img class="rounded-[18px] w-[90%] mr-6 flex md:hidden" :src="LadyDoctorMobile" alt="Lady Doctor" />
            <img class="rounded-[18px] ml-6 hidden md:flex" :src="LadyDoctorDesktop" alt="Lady Doctor" />
          </div>
          <div class="flex items-start flex-col">
            <h1 class="font-[700] text-[34px] md:text-[56px] leading-[42px] md:leading-[70px] mt-[56px] mx-[24px] mb-[40px]">
              Acne care that works
              <span class="relative justify-start items-end w-full">
                for you.
                <img class="absolute right-0 w-[216px] mt-1" :src="GreenLineIcon" alt="Green Line Icon" />
              </span>
            </h1>
            <p class="font-[400] text-[20px] leading-[30px] mx-[24px] mt-[24px] text-gray-1 text-md">
              Licensed experts, prescription medication, and ongoing support. At home, on your schedule.
            </p>
            <div class="w-full md:w-auto flex justify-start items-center flex-col md:ml-[24px]">
              <NuxtLink to="/sign-up">
                <BaseButton class="mt-[24px] w-[328px]">Start Free Online Visit</BaseButton>
              </NuxtLink>
              <!-- <BaseCurrentlyAvailableIn /> -->
            </div>
          </div>
        </div>
      </BaseWrapper>
    </div>

    <!-- The Process -->
    <div class="hidden md:flex flex-col w-full items-center bg-white pb-[196px]">
      <BaseWrapper>
        <div class="mx-[24px] mb-[124px] w-full">
          <p class="font-[700] text-[32px] leading-[42px] mt-[120px]">The process</p>
          <p class="font-[400] text-[20px] leading-[30px] text-gray-1 mt-[16px] lg:w-1/2 w-1/3">
            We use an evidence-based approach to track your skin progress and refine your plan.
          </p>
        </div>
        <div class="grid grid-cols-4 w-full justify-center items-center relative top-8">
          <div class="absolute w-full flex justify-center items-center">
            <img class="bottom-40 absolute rounded-[18px] hidden md:flex scale-90" :src="Arrow1" alt="Arrow" />
          </div>
          <div class="absolute w-full flex justify-center items-center">
            <img class="left-52 top-40 absolute rounded-[18px] hidden md:flex scale-90" :src="Arrow2" alt="Arrow" />
          </div>
          <div class="absolute w-full flex justify-center items-center">
            <img class="right-64 top-32 absolute rounded-[18px] hidden md:flex scale-90" :src="Arrow3" alt="Arrow" />
          </div>

          <img class="rounded-[18px] hidden md:flex" :src="MeetYourProviderCard" alt="Meet Your Provider" />
          <img class="rounded-[18px] hidden md:flex" :src="GetTreatmentCard" alt="Get Treatment" />
          <img class="rounded-[18px] hidden md:flex" :src="TrackYourProgressCard" alt="Track Your Progress" />
          <img class="rounded-[18px] hidden md:flex" :src="AskAnythingCard" alt="Ask Anything" />
        </div>
      </BaseWrapper>
    </div>

    <!-- We Focus On Getting You Better -->
    <div class="flex flex-col bg-honeydew-bg5">
      <BaseWrapper>
        <div class="my-[48px] md:my-[120px] w-full flex justify-center items-center font-[700] text-[32px] leading-[40px]">We focus on getting you better</div>
        <div class="flex flex-col lg:flex-row mb-[48px] md:mb-[100px] justify-between items-center">
          <img class="rounded-[18px] w-[572px]" :src="ExpertCare" alt="Expert Care" />
          <div class="lg:w-1/2 my-8 lg:ml-10">
            <div class="text-honeydew-green font-[500] text-[16px] leading-[20px] mt-[16px] lg:mt-[0px]">Expert care</div>
            <div class="mt-[24px] text-[24px] md:text-[32px] font-[700]">Work with our expert care team to take control of your skin</div>
            <p class="mt-[24px] font-[400] text-[20px] leading-[30px]">
              Honeydew clinicians are highly specialized medical professionals with a proven track record of treating acne. Our providers include
              board-certified dermatologists, nurse practitioners, and physician assistants.
            </p>
            <p class="mt-[24px] font-[400] text-[20px] leading-[30px]">
              Read about our founding <span class="text-honeydew-purple cursor-pointer">medical director</span>
            </p>
          </div>
        </div>
        <div class="flex flex-col-reverse lg:flex-row mb-[48px] md:mb-[100px] items-center">
          <div class="lg:w-1/2 my-8 lg:mr-10">
            <div class="text-honeydew-green font-[500] text-[16px] leading-[20px] mt-[16px] lg:mt-[0px]">Clinically-proven treatments</div>
            <div class="mt-[24px] text-[24px] md:text-[32px] font-[700]">Access prescriptions that are right for you</div>
            <p class="mt-[24px] font-[400] text-[20px] leading-[30px]">
              Your provider will work with you to build a comprehennsive treatment plan. It may include prescription creams, oral medication, and various
              over-the-counter products.
            </p>
            <p class="mt-[24px] font-[400] text-[20px] leading-[30px]">And yes, you can use insurance to foot the bill.</p>
          </div>
          <img class="rounded-[18px] w-[572px]" :src="AccessPrescriptions" alt="Access Prescriptions" />
        </div>
        <div class="flex flex-col lg:flex-row mb-[48px] md:mb-[100px] justify-between items-center">
          <img class="rounded-[18px] w-[572px]" :src="DoItBetterOnline" alt="Expert Care" />
          <div class="lg:w-1/2 my-8 lg:ml-10">
            <div class="text-honeydew-green font-[500] text-[16px] leading-[20px] mt-[16px] lg:mt-[0px]">Evidence-based approach</div>
            <div class="mt-[24px] text-[24px] md:text-[32px] font-[700]">Do it better online</div>
            <p class="mt-[24px] font-[400] text-[20px] leading-[30px]">
              Use our online tools to connect with your care team, track your progress, and get fast support.
            </p>
            <p class="mt-[24px] font-[400] text-[20px] leading-[30px]">By making it easier to stay on top of your acne care, we improve results.</p>
          </div>
        </div>
      </BaseWrapper>
    </div>

    <!-- Real People. Real Results -->
    <div class="flex flex-col bg-white">
      <BaseWrapper>
        <div class="relative">
          <!-- Slide 1 -->
          <div class="h-full" v-if="slideSelected === '1'">
            <p class="font-[700] text-[32px] leading-[42px] mt-[48px] lg:mt-[120px] w-full flex justify-center">Real People. Real Results.</p>
            <div class="flex flex-col-reverse lg:flex-row justify-center items-center text-center lg:text-start">
              <div class="mx-[24px] lg:mt-[48px] mb-[124px] w-full">
                <div class="flex justify-center items-center lg:items-start flex-col w-full">
                  <img :src="GiantQuotes" alt="Quotes" class="md:mb-[16px]" />
                  <p class="font-[400] text-[20px] leading-[30px] text-gray-3 mt-[48px] w-full lg:w-10/12 text-start">
                    I've suffered with acne for about 15 years and <span class="font-[600]">this is the first time I'm actually seeing progress.</span> I never
                    thought my skin could look how healthy it does now. The monthly follow ups are wonderful, as they help you stay on track.”
                  </p>
                  <p class="font-[500] text-[18px] leading-[30px] text-gray-3 mt-[16px]">Verified Honeydew Customer</p>
                </div>
                <div class="flex mt-[18px] gap-x-3 items-center justify-center lg:justify-start">
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                </div>
              </div>
              <div class="mb-[48px] md:mb-[124px] w-full mt-[120px] grid grid-cols-2">
                <img class="rounded-[20px] w-full pr-[8px]" :src="TestimonyImage1" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pl-[8px]" :src="TestimonyImage2" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pr-[8px]" :src="TestimonyImage3" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pl-[8px]" :src="TestimonyImage4" alt="Testimony-image" />
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="h-full" v-if="slideSelected === '2'">
            <p class="font-[700] text-[32px] leading-[42px] mt-[48px] lg:mt-[120px] w-full flex justify-center">The patient feedback.</p>
            <div class="flex flex-col-reverse lg:flex-row justify-center items-center text-center lg:text-start">
              <div class="mx-[24px] lg:mt-[48px] mb-[124px] w-full">
                <div class="flex justify-center items-center lg:items-start flex-col w-full">
                  <img :src="GiantQuotes" alt="Quotes" class="md:mb-[16px]" />
                  <p class="font-[400] text-[20px] leading-[30px] text-gray-3 mt-[48px] w-full lg:w-9/12 text-start">
                    I used to wait 4 months to see a dermatologist in person. Never again. Now I have immediate access to my care team, I can track my progress,
                    and I don't have to go anywhere.”
                  </p>
                  <p class="font-[500] text-[18px] leading-[30px] text-gray-3 mt-[16px]">Honeydew's Co-Founder</p>
                </div>
                <div class="flex mt-[18px] gap-x-3 items-center justify-center lg:justify-start">
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                </div>
              </div>
              <div class="mb-[48px] md:mb-[124px] w-full mt-[120px] grid grid-cols-2 pb-2 pt-2">
                <img class="rounded-[20px] w-full pr-[8px] mb-[16px]" :src="Testimony2ImageArrow" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pl-[8px] mb-[16px]" :src="Testimony2Image2" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pr-[8px]" :src="Testimony2Image1" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pl-[8px]" :src="Testimony2ImageNoArrow" alt="Testimony-image" />
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="h-full" v-if="slideSelected === '3'">
            <p class="font-[700] text-[32px] leading-[42px] mt-[48px] lg:mt-[120px] w-full flex justify-center">The patient feedback.</p>
            <div class="flex flex-col-reverse lg:flex-row justify-center items-center text-center lg:text-start">
              <div class="mx-[24px] lg:mt-[48px] mb-[124px] w-full">
                <div class="flex justify-center items-center lg:items-start flex-col w-full">
                  <img :src="GiantQuotes" alt="Quotes" class="md:mb-[16px]" />
                  <p class="font-[400] text-[20px] leading-[30px] text-gray-3 mt-[48px] w-full lg:w-10/12 text-start">
                    Using Honeydew to help clear my skin has been life changing. As a full time student and teacher, being able to receive such amazing support
                    without ever going into an office made dealing with my acne a lot easier. I am so so thankful for Honeydew, Accutane, and the whole team!!
                  </p>
                  <p class="font-[500] text-[18px] leading-[30px] text-gray-3 mt-[16px]">Verified Honeydew Customer</p>
                </div>
                <div class="flex mt-[18px] gap-x-3 items-center justify-center lg:justify-start">
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                  <img :src="StarIcon" alt="Star Icon" />
                </div>
              </div>
              <div class="mb-[48px] md:mb-[124px] w-full mt-[120px] grid grid-cols-2">
                <img class="rounded-[20px] w-full pr-[8px]" :src="Testimony3Image1" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pl-[8px]" :src="Testimony3Image2" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pr-[8px]" :src="Testimony3Image3" alt="Testimony-image" />
                <img class="rounded-[20px] w-full pl-[8px]" :src="Testimony3Image4" alt="Testimony-image" />
              </div>
            </div>
          </div>

          <!-- Dot Compoennt -->
          <div class="flex gap-x-3 -mt-[72px] md:-mt-[64px] pb-[64px] justify-center lg:justify-start lg:ml-[32px]">
            <div
              @click="slideSelected = '1'"
              :class="[slideSelected === '1' ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === '1' ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
            <div
              @click="slideSelected = '2'"
              :class="[slideSelected === '2' ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === '2' ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
            <div
              @click="slideSelected = '3'"
              :class="[slideSelected === '3' ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === '3' ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
          </div>
        </div>
      </BaseWrapper>

      <!-- Pricing that lets you focus on getting better -->
      <div class="bg-honeydew-bg6 w-full">
        <BaseWrapper>
          <div class="justify-center items-center flex-col flex">
            <p class="font-[700] text-[32px] leading-[42px] mt-[48px] lg:mt-[120px] w-full flex justify-center">
              Pricing that lets you focus on getting better
            </p>
            <p class="font-[400] text-[20px] leading-[30px] text-gray-1 mt-[16px]">
              We use an evidence-based approach to track your skin progress and refine your plan.
            </p>
          </div>
        </BaseWrapper>
      </div>
      <!-- End -->
    </div>
  </div>
</template>
