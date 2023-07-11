<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import BlueIcon from '@/assets/icons/blue-icon.svg'
import CheckMarkGreen from '@/assets/icons/checkmark-green.svg'
import CrossRed from '@/assets/icons/cross-red.svg'
import Accutane1 from '@/assets/images/accutane-1.svg'
import Accutane2 from '@/assets/images/accutane-2.svg'
import Accutane3 from '@/assets/images/accutane-3.svg'
import Accutane4 from '@/assets/images/accutane-4.svg'
import Accutane5 from '@/assets/images/accutane-5.svg'
import Accutane6 from '@/assets/images/accutane-6.svg'

// STATE **********************************************************************
const slideSelected = ref<number>(1)

// METHODS **********************************************************************
function handleNext() {
  if (slideSelected.value !== 7) {
    slideSelected.value += 1
    return
  }
  slideSelected.value = 0
}
</script>

<template>
  <BaseModal v-if="slideSelected !== 7" :custom-header="true" :custom-buttons="true">
    <template #content>
      <div class="flex flex-col w-full max-w-[600px]">
        <!-- Card content -->
        <div v-if="slideSelected === 1" class="flex flex-col">
          <img :src="Accutane1" alt="Accutane 1" class="mb-6" />
          <div class="text-[24px] leading-[32px] font-[500] mb-4">Get started with Isotretinoin</div>
          <p class="text-[#6C6A7C] text-[16px]">Your provider has added isotretinoin, commonly known as accutane, to your treatmnet plan.</p>
        </div>

        <div v-if="slideSelected === 2" class="flex flex-col">
          <img :src="Accutane2" alt="Accutane 2" class="mb-6" />
          <div class="text-[24px] leading-[32px] font-[500] mb-4">Isotretinoin 101</div>
          <p class="text-[#6C6A7C] text-[16px]">Isotretinoin, commonly known as Accutane, is an oral retiniod medication (a derivative of Vitamin A).</p>
          <p class="text-[#6C6A7C] text-[16px]">
            It is the most effective medication against chronic or severe acne, with long-term results in most patients after about 5-6 months of proper use.
          </p>
        </div>

        <div v-if="slideSelected === 3" class="flex flex-col">
          <img :src="Accutane3" alt="Accutane 3" class="mb-6" />
          <div class="text-[24px] leading-[32px] font-[500]">What should I expect?</div>
          <div class="flex flex-col gap-y-4 mt-4">
            <p class="text-[#6C6A7C] text-[16px]"><span class="font-bold">1. Purging:</span> Your skin may get worse before it gets better</p>
            <p class="text-[#6C6A7C] text-[16px]">
              <span class="font-bold">2. Dryness:</span> Dryness can happen not only on your face but throughout your body, within the mucous membranes of your
              lips and eyes as well.
            </p>
            <div class="flex flex-col gap-y-1 text-[#6C6A7C] font-[400]">
              <p class="text-[#6C6A7C] text-[16px]"><span class="font-bold">3. Monthly iPledge requirements:</span></p>
              <div class="flex items-center justify-start">
                <div class="bg-[#60B257] w-[8px] h-[8px] rounded-full mr-[10px]"></div>
                Routine bloodwork
              </div>
              <div class="flex items-center justify-start">
                <div class="bg-[#60B257] w-[8px] h-[8px] rounded-full mr-[10px]"></div>
                Updates to your clinician
              </div>
              <div class="flex items-center justify-start">
                <div class="bg-[#60B257] w-[8px] h-[8px] rounded-full mr-[10px]"></div>
                Pregnancy tests and prevention, if applicable
              </div>
            </div>
          </div>
          <div class="bg-[#E2EBFD] p-5 flex gap-x-4 rounded-xl shadow-sm items-start mx-2 mt-6">
            <img :src="BlueIcon" alt="Blue Icon" />
            <p class="text-[#403E48] text-[16px]">
              You can access a more complete resource guide on isotretinoin <a class="text-[#5E83D4] cursor-pointer">here.</a>
            </p>
          </div>
        </div>

        <div v-if="slideSelected === 4" class="flex flex-col">
          <img :src="Accutane4" alt="Accutane 4" class="mb-6" />
          <div class="text-[24px] leading-[32px] font-[500]">Do's and Dont's on Isotretinoin</div>
          <div class="flex mt-4">
            <div class="flex gap-y-1 flex-col w-full">
              <div class="flex text-[#6C6A7C]">
                <img :src="CheckMarkGreen" alt="Checkmark Green" class="mr-[12px]" />
                Avoid sunlight / UV
              </div>
              <div class="flex text-[#6C6A7C]">
                <img :src="CheckMarkGreen" alt="Checkmark Green" class="mr-[12px]" />
                Limit alcohol use
              </div>
              <div class="flex text-[#6C6A7C]">
                <img :src="CheckMarkGreen" alt="Checkmark Green" class="mr-[12px]" />
                Report depressive thoughts
              </div>
              <div class="flex text-[#6C6A7C]">
                <img :src="CheckMarkGreen" alt="Checkmark Green" class="mr-[12px]" />
                Be careful while driving
              </div>
            </div>
            <div class="flex gap-y-1 flex-col w-full">
              <div class="flex text-[#6C6A7C]">
                <img :src="CrossRed" alt="Cross Red" class="mr-[12px]" />
                Do not get pregnant
              </div>
              <div class="flex text-[#6C6A7C]">
                <img :src="CrossRed" alt="Cross Red" class="mr-[12px]" />
                Do not donate blood
              </div>
              <div class="flex text-[#6C6A7C]">
                <img :src="CrossRed" alt="Cross Red" class="mr-[12px]" />
                Do not breastfeed
              </div>
              <div class="flex text-[#6C6A7C]">
                <img :src="CrossRed" alt="Cross Red" class="mr-[12px]" />
                Do not have cosmetic procedures
              </div>
            </div>
          </div>
        </div>

        <div v-if="slideSelected === 5" class="flex flex-col">
          <img :src="Accutane5" alt="Accutane 5" class="mb-6" />
          <div class="text-[24px] leading-[32px] font-[500] mb-4">Pricing</div>
          <p class="text-[#6C6A7C] text-[16px] font-[400]">
            Accutane management is an add-on of <span class="font-bold">$25/month.</span> This covers all extra support including iPledge compliance, blood work
            reviews, and symptom management.
          </p>
          <p class="text-[#6C6A7C] text-[16px] mt-8">
            The actual medication can be covered by your insurance. If you are paying with cash, we will find you the best price.
          </p>
        </div>

        <div v-if="slideSelected === 6" class="flex flex-col">
          <img :src="Accutane6" alt="Accutane 6" class="mb-6" />
          <div class="text-[24px] leading-[32px] font-[500] mb-4">Next steps</div>
          <div class="flex flex-col gap-y-1 text-[#6C6A7C] font-[400]">
            <div class="flex items-center justify-start">
              <div class="bg-[#60B257] w-[8px] h-[8px] rounded-full mr-[10px]"></div>
              Sign iPledge consent forms (to be sent to you via email)
            </div>
            <div class="flex items-center justify-start">
              <div class="bg-[#60B257] w-[8px] h-[8px] rounded-full mr-[10px]"></div>
              Complete pregnancy test
            </div>
            <div class="flex items-center justify-start">
              <div class="bg-[#60B257] w-[8px] h-[8px] rounded-full mr-[10px]"></div>
              Confirm your forms of birth control
            </div>
            <div class="flex items-center justify-start">
              <div class="bg-[#60B257] w-[8px] h-[8px] rounded-full mr-[10px]"></div>
              Get your baseline blood test done (a lab order will be sent to you via email)
            </div>
          </div>
        </div>

        <!-- Lower Card -->
        <div class="flex w-full justify-between mt-[64px]">
          <!-- Dot Compoennt -->
          <div class="flex gap-x-2">
            <div
              @click="slideSelected = 1"
              :class="[slideSelected === 1 ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === 1 ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
            <div
              @click="slideSelected = 2"
              :class="[slideSelected === 2 ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === 2 ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
            <div
              @click="slideSelected = 3"
              :class="[slideSelected === 3 ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === 3 ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
            <div
              @click="slideSelected = 4"
              :class="[slideSelected === 4 ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === 4 ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
            <div
              @click="slideSelected = 5"
              :class="[slideSelected === 5 ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === 5 ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
            <div
              @click="slideSelected = 6"
              :class="[slideSelected === 6 ? 'bg-[#EEEBFC]' : 'bg-none']"
              class="w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"
            >
              <div :class="[slideSelected === 6 ? 'bg-honeydew-purple' : 'bg-gray-1']" class="w-[8px] h-[8px] rounded-full"></div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-x-4">
            <div
              v-if="slideSelected > 1"
              @click="slideSelected -= 1"
              class="bg-[#EFEBFE] text-honeydew-purple h-[40px] w-[80px] rounded-[80px] flex justify-center items-center cursor-pointer transition active:scale-90"
            >
              Back
            </div>
            <div
              @click="handleNext"
              class="bg-[#5E39F5] text-white h-[40px] w-[80px] rounded-[80px] flex justify-center items-center cursor-pointer transition active:scale-90"
            >
              {{ slideSelected === 6 ? 'Close' : 'Next' }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
