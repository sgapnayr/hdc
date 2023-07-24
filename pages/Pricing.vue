<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import Save17 from '@/assets/images/save-17.svg'
import CheckmarkCircle from '@/assets/icons/checkmark-circle.svg'
import PlusCircle from '@/assets/icons/plus-circle.svg'
import PillBottle from '@/assets/icons/pill-bottle.svg'
import ClockPurple from '@/assets/icons/clock-purple.svg'
import SmilePurple from '@/assets/icons/smile-purple.svg'
import PricingGuy1 from '@/assets/images/pricing-guy-1.png'
import PricingGuy1Mobile from '@/assets/images/pricing-guy-1-mobile.png'

// STATE ********************************************************************
const membershipSelected = ref('yearly')
</script>

<template>
  <BaseChatBot />
  <div class="flex flex-col w-full">
    <BaseWrapper>
      <div class="bg-[#F7F9FE]">
        <!-- Heading Text -->
        <div class="mt-[64px]">
          <h1 class="text-[32px] font-[700] leading-[40px] text-[#403E48]">
            Pricing that lets you focus on getting <br />
            better.
          </h1>
          <p class="mt-[16px] text-[16px] text-[#6C6A7C] font-[400] leading-[24px]">
            As a meClockPurplember, you don't have to worry about paying every time you need us.
          </p>
        </div>

        <!-- Memebership Block -->
        <div class="bg-white rounded-2xl w-full py-6 px-4 flex flex-col mt-[32px]">
          <div class="flex gap-x-4">
            <div
              :class="[
                membershipSelected === 'yearly' ? 'border border-[#5E39F5] boxShadow outline-[#eeebfc] outline-2 ring-[#eeebfc]' : 'border border-[#F7F9FE]',
              ]"
              @click="membershipSelected = 'yearly'"
              class="bg-[#FBFBFE] p-4 rounded-[16px] flex flex-col justify-center items-center py-8 w-full"
            >
              <div class="text-[28px] font-[700] text-[#403E48]">$280.00</div>
              <div class="text-[14px] font-[400]">YEARLY</div>
            </div>
            <div
              :class="[
                membershipSelected === 'monthly' ? 'border border-[#5E39F5] boxShadow outline-[#eeebfc] outline-2 ring-[#eeebfc]' : 'border border-[#F7F9FE]',
              ]"
              @click="membershipSelected = 'monthly'"
              class="bg-[#FBFBFE] p-4 rounded-[16px] flex flex-col justify-center items-center py-8 w-full"
            >
              <div class="text-[28px] font-[700] text-[#403E48]">$34.95</div>
              <div class="text-[14px] font-[400]">MONTHLY</div>
              <div class="text-[12px] font-[400]">(3-month min.)</div>
            </div>
          </div>

          <div class="mt-[16px] px-2">
            <img :src="Save17" alt="Save 17%" />
          </div>

          <div class="mt-[24px] text-center">
            <h1 class="text-[24px] font-[700] leading-[40px] text-[#403E48]">Membership includes</h1>
            <div class="mt-[32px] flex flex-col gap-y-6">
              <div class="text-[16px] font-[400] leading-[22px] flex gap-x-5">
                <img :src="CheckmarkCircle" alt="Checkmark Circle" />
                <p>All Honeydew clinician consultations</p>
              </div>
              <div class="text-[16px] font-[400] leading-[22px] flex gap-x-5">
                <img :src="CheckmarkCircle" alt="Checkmark Circle" />
                <p>Prescription management</p>
              </div>
              <div class="text-[16px] font-[400] leading-[22px] flex gap-x-5">
                <img :src="CheckmarkCircle" alt="Checkmark Circle" />
                <p>Progress tracking</p>
              </div>
              <div class="text-[16px] font-[400] leading-[22px] flex gap-x-5">
                <img :src="CheckmarkCircle" alt="Checkmark Circle" />
                <p class="text-start">Ongoing support from your dedicated care team</p>
              </div>
            </div>
          </div>

          <div class="mt-[32px] text-center">
            <h1 class="text-[24px] font-[700] leading-[40px] text-[#403E48]">Add-ons</h1>
            <div class="mt-[32px] flex flex-col gap-y-6">
              <div class="text-[16px] font-[400] leading-[22px] flex gap-x-5">
                <img :src="PlusCircle" alt="Plus Circle" />
                <p class="text-start">$25/month extra for Accutane management, if prescribed</p>
              </div>
            </div>
          </div>

          <div class="w-full flex justify-center items-center">
            <div
              class="flex items-center justify-center gap-[10px] w-full max-w-[380px] h-[56px] px-[32px] py-[15px] flex-shrink-0 rounded-[60px] bg-[#5e39f5] text-white mt-[40px]"
            >
              GET STARTED
            </div>
          </div>

          <p class="mt-[40px] text-[13px] font-[400] text-center text-[#6C6A7C]">
            Medications are not included in the price of membership. They are prescribed to outside pharmacies and may be covered by insurance.
          </p>
        </div>
      </div>
    </BaseWrapper>

    <!-- How You Save -->
    <div class="text-center bg-white mt-[48px] py-12 px-6">
      <BaseWrapper>
        <div class="flex flex-col w-full">
          <h1 class="text-[24px] font-[700] leading-[40px] text-[#403E48]">How you save.</h1>
          <p class="mt-4 text-[16px] font-[400] text-center text-[#6C6A7C]">
            We connect you with highly specialized medical professionals who have a proven track record of trating acne.
          </p>

          <div class="mt-[40px] bg-[#FAF9FF] w-full rounded-[20px] p-6 text-start">
            <img :src="PillBottle" alt="Pill Bottle" class="mb-6" />
            <div class="text-[18px] font-[700] leading-[24px]">On medication costs</div>
            <div class="text-[16px] font-[400] leading-[24px] mt-[8px]">
              We help you get insurance-covered medications and special discounts. Our customers save as much as $600/year on medication.
            </div>
          </div>

          <div class="mt-[40px] bg-[#FAF9FF] w-full rounded-[20px] p-6 text-start">
            <img :src="ClockPurple" alt="Clock Purple" class="mb-6" />
            <div class="text-[18px] font-[700] leading-[24px]">Your time</div>
            <div class="text-[16px] font-[400] leading-[24px] mt-[8px]">
              Honeydew saves you an average of 10 hours/year by eliminating travel and waiting rooms. What's your time worth?
            </div>
          </div>

          <div class="mt-[40px] bg-[#FAF9FF] w-full rounded-[20px] p-6 text-start">
            <img :src="SmilePurple" alt="Smile Purple" class="mb-6" />
            <div class="text-[18px] font-[700] leading-[24px]">Your skin</div>
            <div class="text-[16px] font-[400] leading-[24px] mt-[8px]">
              The average wait time for a dermatologist appointment is over 33 days. Honeydew will get you ongoing, expert care right when you need it.
            </div>
          </div>

          <BaseCallToAction
            alt-text="Pricing Guy 1"
            :image-path="PricingGuy1Mobile"
            button-text="TRY IT FOR FREE"
            large-text="Schedule your free consultation today."
          />
          <BaseCurrentlyAvailableIn />
        </div>
      </BaseWrapper>
    </div>
  </div>
</template>

<style scoped>
.boxShadow {
  box-shadow: 1px 1px 10px #eeebfc;
}
</style>
