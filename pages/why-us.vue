<script setup lang="ts">
// IMPORTS ********************************************************************
import WhyUsLady1 from '@/assets/images/why-us-lady-1.png'
import DavidBeforeAcne from '@/assets/images/david-before-acne.png'
import DavidAfterAcne from '@/assets/images/david-after-acne.png'
import DavidSignature from '@/assets/icons/david-signature.svg'
import Arrow from '@/assets/images/arrow.svg'
</script>

<template>
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
          <div class="mt-[40px] gap-y-6 flex flex-col relative">
            <div class="bg-white p-6 rounded-[16px] shadow-sm">
              <div class="text-[#5E39F5] text-[56px] font-[400] leading-[56px]">90%+</div>
              <div class="text-[18px] font-[700] leading-[27px] my-4 text-[#403E48]">See results</div>
              <div class="text-[16px] font-[400] leading-[24px] my-4 text-[#6C6A7C]">
                We use an evidence-based approach and track progress with photos and patient-reported outcomes.
              </div>
            </div>
            <div class="bg-white p-6 rounded-[16px] shadow-sm">
              <div class="text-[#5E39F5] text-[56px] font-[400] leading-[56px]">35+</div>
              <div class="text-[18px] font-[700] leading-[27px] my-4 text-[#403E48]">Years of experience</div>
              <div class="text-[16px] font-[400] leading-[24px] my-4 text-[#6C6A7C]">
                We built this platform on the backbone of real patient experiences dealing with acne, and real dermatologist experiences successfully treating
                it.
              </div>
            </div>
            <div class="bg-white p-6 rounded-[16px] shadow-sm">
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

    <div class="w-full bg-white px-6 py-20 flex flex-col items-center justify-center gap-y-4">
      <div class="flex gap-x-4">
        <img :src="DavidBeforeAcne" alt="Honeydew CEO before treatment" />
        <div class="bg-[#FAF9FF] rounded-[16px] p-5 w-[156px] h-[156px] text-[#403E48] text-[16px] font-[400]">Message from Honeydew's CEO</div>
      </div>
      <div class="flex gap-x-4">
        <div class="bg-[#FAF9FF] rounded-[16px] p-5 w-[156px] h-[156px] text-[#403E48] text-[16px] font-[400]">
          <img :src="Arrow" alt="Honeydew CEO before treatment" />
        </div>
        <img :src="DavidAfterAcne" alt="Honeydew CEO after treatment" />
      </div>

      <div class="bg-white px-6">
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

      <div class="bg-white px-6 mt-[80px] text-center">
        <h1 class="text-[24px] font-[700] leading-[40px] text-[#403E48]">Meet our team.</h1>
        <p class="mt-[16px] text-[16px] text-[#6C6A7C] font-[400] leading-[24px]">We're driven to make a difference in your life everyday.</p>
      </div>
    </div>

    <BaseWrapper>
      <BaseCallToAction :image-path="WhyUsLady1" alt-text="Why Us Lady 1" button-text="TRY IT FOR FREE" large-text="Join those who say no to acne." />
      <BaseCurrentlyAvailableIn />
    </BaseWrapper>
  </div>
</template>
