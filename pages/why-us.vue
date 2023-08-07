<script setup lang="ts">
// IMPORTS ********************************************************************
import WhyUsLady1 from '@/assets/images/why-us-lady-1.png'
import WhyUsLady1Desktop from '@/assets/images/why-us-lady-1-desktop.png'
import DavidBeforeAcne from '@/assets/images/david-before-acne.png'
import DavidBeforeAcneDesktop from '@/assets/images/david-before-desktop.png'
import DavidAfterAcne from '@/assets/images/david-after-acne.png'
import DavidAfterAcneDesktop from '@/assets/images/david-after-desktop.png'
import DavidSignature from '@/assets/icons/david-signature.svg'
import Arrow from '@/assets/images/arrow.svg'
import JoelSpitzDesktop from '@/assets/images/joel-spitz-desktop.png'
import JoelSpitzMobile from '@/assets/images/joel-spitz-mobile.png'
import DavidDesktop from '@/assets/images/david-desktop.png'
import DavidMobile from '@/assets/images/david-mobile.png'
import JeffDesktop from '@/assets/images/jeff-desktop.png'
import JeffMobile from '@/assets/images/jeff-mobile.png'
import JulesDesktop from '@/assets/images/jules-desktop.png'
import JulesMobile from '@/assets/images/jules-mobile.png'
import JackieDesktop from '@/assets/images/jackie-desktop.png'
import JackieMobile from '@/assets/images/jackie-mobile.png'
import DeniceDesktop from '@/assets/images/denice-desktop.png'
import DeniceMobile from '@/assets/images/denice-mobile.png'
import TamDesktop from '@/assets/images/tam-desktop.png'
import TamMobile from '@/assets/images/tam-mobile.png'
</script>

<template>
  <BaseChatBot />
  <div class="flex flex-col">
    <div class="bg-[#F7F9FE] pb-8">
      <BaseWrapper>
        <!-- Heading Text -->
        <div class="mt-[64px]">
          <h1 class="text-[32px] font-[700] leading-[40px] text-[#403E48]">
            We're a team of credentialed, experienced <span class="text-honeydew-green">leaders.</span>
          </h1>
          <p class="mt-[16px] text-[16px] text-[#6C6A7C] font-[400] leading-[24px]">
            Clearing acne is what we do. We're on a mission to make acne care more effective and accessible to everyone, so you never have to worry about
            putting off your skin care.
          </p>
          <!-- Cards -->
          <div class="mt-[40px] gap-y-6 flex flex-col relative md:flex-row gap-x-8">
            <div class="bg-white p-6 rounded-[16px] shadow-sm w-full">
              <div class="text-[#5E39F5] text-[56px] font-[400] leading-[56px]">90%+</div>
              <div class="text-[18px] font-[700] leading-[27px] my-4 text-[#403E48]">See results</div>
              <div class="text-[16px] font-[400] leading-[24px] my-4 text-[#6C6A7C]">
                We use an evidence-based approach and track progress with photos and patient-reported outcomes.
              </div>
            </div>
            <div class="bg-white p-6 rounded-[16px] shadow-sm w-full">
              <div class="text-[#5E39F5] text-[56px] font-[400] leading-[56px]">35+</div>
              <div class="text-[18px] font-[700] leading-[27px] my-4 text-[#403E48]">Years of experience</div>
              <div class="text-[16px] font-[400] leading-[24px] my-4 text-[#6C6A7C]">
                We built this platform on the backbone of real patient experiences dealing with acne, and real dermatologist experiences successfully treating
                it.
              </div>
            </div>
            <div class="bg-white p-6 rounded-[16px] shadow-sm w-full">
              <div class="text-[#5E39F5] text-[56px] font-[400] leading-[56px]">100k+</div>
              <div class="text-[18px] font-[700] leading-[27px] my-4 text-[#403E48]">Acne cases treated</div>
              <div class="text-[16px] font-[400] leading-[24px] my-4 text-[#6C6A7C]">
                We carefully vet all of our providers to make sure your skin is in good hands. Each Honeydew clinician has treated thousands of cases of acne.
              </div>
            </div>
          </div>
        </div>
      </BaseWrapper>
    </div>

    <div class="w-full bg-white px-6 py-20 flex flex-col items-center justify-center xl:flex-row md:items-start gap-x-8">
      <div class="w-full flex flex-col justify-center items-center md:items-start">
        <div class="flex gap-x-4">
          <img class="flex md:hidden" :src="DavidBeforeAcne" alt="Honeydew CEO before treatment" />
          <img class="hidden md:flex" :src="DavidBeforeAcneDesktop" alt="Honeydew CEO before treatment" />
          <div class="bg-[#FAF9FF] rounded-[16px] p-5 w-[156px] md:w-[250px] h-[156px] md:h-[250px] text-[#403E48] text-[16px] font-[400]">
            Message from Honeydew's CEO
          </div>
        </div>
        <div class="flex gap-x-4">
          <div class="bg-[#FAF9FF] rounded-[16px] p-5 w-[156px] md:w-[250px] h-[156px] md:h-[250px] text-[#403E48] text-[16px] font-[400]">
            <img :src="Arrow" alt="Honeydew CEO before treatment" />
          </div>
          <img class="flex md:hidden" :src="DavidAfterAcne" alt="Honeydew CEO after treatment" />
          <img class="hidden md:flex" :src="DavidAfterAcneDesktop" alt="Honeydew CEO after treatment" />
        </div>
      </div>

      <div class="flex flex-col w-full mt-8 xl:mt-0">
        <div class="bg-white px-6 md:px-0">
          <h1 class="text-[24px] font-[700] leading-[40px] text-[#403E48]">We've been there.</h1>
          <p class="mt-[16px] text-[16px] text-[#6C6A7C] font-[400] leading-[24px]">
            I know the struggle firsthand. That was me on the left. Acne sucks, and so did treating it. After years of in-person visits, I started Honeydew with
            my dermatologist to build a better way. And I've never had more control of my skin. We're on a mission to make our process accessible to everyone.
            Read our story here.
          </p>
        </div>

        <div class="w-full text-start mt-[40px]">
          <img :src="DavidSignature" alt="David Signature" />
          <h1 class="text-[24px] font-[700] leading-[40px] text-[#403E48] mt-[24px]">David Futoran</h1>
          <p class="text-[16px] text-[#6C6A7C] font-[400] leading-[24px]">Co-Founder & CEO</p>
        </div>
      </div>
    </div>

    <div class="bg-white px-6 text-center">
      <h1 class="text-[24px] font-[700] leading-[40px] text-[#403E48] w-full md:text-start">Meet our team.</h1>
      <p class="mt-[16px] text-[16px] text-[#6C6A7C] font-[400] leading-[24px] w-full md:text-start">
        We're driven to make a difference in your life everyday.
      </p>
      <div class="flex flex-wrap gap-x-8 gap-y-8 mt-[80px] mb-16">
        <BaseEmployeeBio
          :desktop-image="JoelSpitzDesktop"
          :mobile-image="JoelSpitzMobile"
          employee-name="Joel Spitz, MD"
          employee-position="Co-Founder & Medical Director"
          employee-graduated-from="Princeton / Columbia College of Physicians and Surgeons"
        />
        <BaseEmployeeBio
          :desktop-image="DavidDesktop"
          :mobile-image="DavidMobile"
          employee-name="David Futoran"
          employee-position="Co-Founder & CEO"
          employee-graduated-from="University of Pennsylvania / Wharton"
        />
        <BaseEmployeeBio
          :desktop-image="JeffDesktop"
          :mobile-image="JeffMobile"
          employee-name="Jeff Nadler"
          employee-position="Technology Advisor"
          employee-graduated-from="CIO @ Teladoc Health"
        />
        <BaseEmployeeBio
          :desktop-image="JulesDesktop"
          :mobile-image="JulesMobile"
          employee-name="Jules Lipoff, MD"
          employee-position="Telemedicine Advisor"
          employee-graduated-from="American Academy of Dermatology"
        />
        <BaseEmployeeBio
          :desktop-image="JackieDesktop"
          :mobile-image="JackieMobile"
          employee-name="Jackie Spitz"
          employee-position="Care coordinator"
          employee-graduated-from="Princeton / Columbia College of Physicians and Surgeons"
        />
        <BaseEmployeeBio
          :desktop-image="DeniceDesktop"
          :mobile-image="DeniceMobile"
          employee-name="Denice Baghai"
          employee-position="Care coordinator"
          employee-graduated-from="Princeton / Columbia College of Physicians and Surgeons"
        />
        <BaseEmployeeBio
          :desktop-image="TamDesktop"
          :mobile-image="TamMobile"
          employee-name="Tamazine Davison"
          employee-position="VP of Operations"
          employee-graduated-from="Princeton / Columbia College of Physicians and Surgeons"
        />
      </div>
    </div>

    <BaseWrapper>
      <BaseCallToAction
        :image-path-desktop="WhyUsLady1Desktop"
        :image-path="WhyUsLady1"
        alt-text="Why Us Lady 1"
        button-text="TRY IT FOR FREE"
        large-text="Join those who say no to acne."
        logo-color="green"
      />
    </BaseWrapper>
  </div>
</template>
