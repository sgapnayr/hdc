<script setup lang="ts">
// IMPORTS ********************************************************************
import HoneydewLogo from '@/assets/images/honeydew-logo.svg'
import HoneydewIcon from '@/assets/icons/honeydew-icon.svg'
import TwitterIcon from '@/assets/icons/twitter.svg'
import InstagramIcon from '@/assets/icons/instagram.svg'
import FacebookIcon from '@/assets/icons/facebook.svg'
import HippaImage from '@/assets/images/hippa.svg'
import CertificationImage from '@/assets/images/certification.svg'

// MEMBER DATA ********************************************************************
const date = new Date()
</script>

<template>
  <!-- <div class="flex flex-col bg-honeydew-bg4 w-full justify-start">
    <BaseWrapper>
      <div class="hidden lg:flex flex-col">
        <div class="w-full justify-between mt-[72px] flex">
          <div class="w-full">
            <div class="w-full">
              <NuxtLink to="/home" class="flex w-full">
                <img class="w-[40px] md:w-auto mr-[16px]" :src="HoneydewIcon" alt="Honeydew Icon" />
                <img class="w-[148px] md:w-auto" :src="HoneydewLogo" alt="Honeydew Logo" />
              </NuxtLink>
              <div class="flex gap-x-6 mt-[48px]">
                <img class="w-[18px]" :src="TwitterIcon" alt="Twitter Icon" />
                <img class="w-[18px]" :src="InstagramIcon" alt="Instagram Icon" />
                <img class="w-[18px]" :src="FacebookIcon" alt="Facebook Icon" />
              </div>
            </div>
          </div>
          <div class="w-full justify-center grid xl:grid-cols-2 lg:grid-cols-1 text-gray-5 font-[400]">
            <NuxtLink>Why Us</NuxtLink>
            <NuxtLink>info@honeydewcare.com</NuxtLink>
            <NuxtLink>Pricing</NuxtLink>
            <NuxtLink>+1 (833) 801-8010</NuxtLink>
            <NuxtLink>FAQ</NuxtLink>
          </div>
          <div class="flex w-full justify-end">
            <img class="w-[148px] md:w-auto mr-[48px]" :src="HippaImage" alt="Hippa Compliance" />
            <img class="w-[148px] md:w-auto" :src="CertificationImage" alt="Certification" />
          </div>
        </div>
        <div class="bg-honeydew-bg4 justify-start items-end ml-[80px] mb-[24px] mt-[64px] text-gray-1">
          &copy; {{ date.getFullYear() }} Honeydew Health, Inc. All rights reserved.
        </div>
      </div>
    </BaseWrapper>

    <BaseWrapper>
      <div class="lg:hidden flex flex-col">
        <div class="w-full mt-[72px] flex items-center">
          <NuxtLink to="/" class="flex w-full justify-center items-center">
            <img class="w-[40px] md:w-auto mr-[16px]" :src="HoneydewIcon" alt="Honeydew Icon" />
            <img class="w-[148px] md:w-auto" :src="HoneydewLogo" alt="Honeydew Logo" />
          </NuxtLink>
        </div>
        <div class="w-full justify-center flex-wrap flex text-gray-5 font-[400] gap-x-8 gap-y-8 my-[36px]">
          <NuxtLink to="/why-us">Why Us</NuxtLink>
          <NuxtLink to="/pricing">Pricing</NuxtLink>
          <NuxtLink to="/faq">FAQ</NuxtLink>
          <NuxtLink class="hidden md:flex">info@honeydewcare.com</NuxtLink>
          <NuxtLink class="hidden md:flex">+1 (833) 801-8010</NuxtLink>
          <div class="flex flex-col items-center justify-center gap-y-8 md:hidden">
            <NuxtLink>info@honeydewcare.com</NuxtLink>
            <NuxtLink>+1 (833) 801-8010</NuxtLink>
          </div>
        </div>
        <div class="flex w-full justify-center">
          <img class="w-[148px] md:w-auto mr-[24px] scale-90" :src="HippaImage" alt="Hippa Compliance" />
          <img class="w-[148px] md:w-auto scale-90" :src="CertificationImage" alt="Certification" />
        </div>
        <div class="flex gap-x-8 justify-center mt-[98px]">
          <img class="w-[20px]" :src="TwitterIcon" alt="Twitter Icon" />
          <img class="w-[20px]" :src="InstagramIcon" alt="Instagram Icon" />
          <img class="w-[20px]" :src="FacebookIcon" alt="Facebook Icon" />
        </div>
        <div class="bg-honeydew-bg4 flex justify-center items-end mb-[24px] mt-[32px] text-gray-1">
          &copy; {{ date.getFullYear() }} Honeydew Health, Inc. All rights reserved.
        </div>
      </div>
    </BaseWrapper>
  </div> -->
</template>
