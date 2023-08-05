<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import FAQJSON from '@/assets/json/faq.json'
import ChevronIcon from '@/assets/icons/chevron-down-icon.svg'
import QuestionMarkCircle from '@/assets/icons/question-mark-circle.svg'
import FAQGuy1 from '@/assets/images/faq-guy-1.png'
import { useLandingPageStore } from '@/stores/landing-page'

// STORE ********************************************************************
const landingPageStore = useLandingPageStore()

// STATE ****************************************************************
const selectedCategory = ref<string>('Medical Consultation')
const selectedCard = ref<string[]>([])

// COMPUTED ****************************************************************
const availableCards = computed(() => {
  return selectedCategory.value === 'All' ? FAQJSON.categories : FAQJSON.categories.filter((category) => category.category === selectedCategory.value)
})

// METHODS ****************************************************************
function handelCardSelect(cardHeader: string) {
  if (selectedCard.value.includes(cardHeader)) {
    const deleteIdx = selectedCard.value.indexOf(cardHeader)
    selectedCard.value.splice(deleteIdx, 1)
    return
  }
  selectedCard.value.push(cardHeader)
}
</script>

<template>
  <BaseChatBot />
  <div class="bg-[#F7F9FE]">
    <BaseWrapper>
      <!-- Heading Text -->
      <div class="mt-[64px]">
        <h1 class="text-[32px] font-[700] leading-[40px] text-[#403E48] md:w-1/2">Frequently asked questions.</h1>
        <!-- Category Chips -->
        <div class="flex flex-wrap mt-[40px] md:hidden">
          <div
            v-for="(category, idx) in FAQJSON.categories"
            class="px-4 py-2 m-2 rounded-[80px] text-[16px] font-[500] cursor-pointer transition active:scale-90"
            :class="[selectedCategory === category.category ? 'text-[#5E39F5] bg-[#EEEBFC]' : 'hover:opacity-50 bg-white']"
            @click="selectedCategory = category.category"
          >
            {{ category.category }}
          </div>
        </div>
      </div>
    </BaseWrapper>

    <!-- Question Cards -->
    <div class="bg-white mt-[40px] py-6 flex flex-col justify-center items-center md:max-w-[1175px] md:w-full">
      <BaseWrapper>
        <div class="md:flex gap-x-8 justify-start items-start bg-blue">
          <div class="md:flex md:flex-col flex-wrap mt-[40px] md:mt-auto hidden items-start bg-red">
            <div
              v-for="(category, idx) in FAQJSON.categories"
              class="px-4 py-2 m-2 rounded-[80px] text-[16px] font-[500] cursor-pointer transition active:scale-90"
              :class="[selectedCategory === category.category ? 'text-[#5E39F5] bg-[#EEEBFC]' : 'hover:opacity-50 bg-white']"
              @click="selectedCategory = category.category"
            >
              {{ category.category }}
            </div>
          </div>
          <div class="max-w-[390px] w-full" v-for="(questionCard, idx) in availableCards">
            <div
              v-for="(question, jdx) in questionCard.questions"
              class="p-4 bg-[#FBFBFE] mb-4 rounded-[16px] border border-[#F2F4F7] text-[16px] font-[700] text-[#403E48] cursor-pointer transition-all py-4"
              @click="handelCardSelect(question.header)"
            >
              <div class="w-full flex justify-between">
                <div class="w-11/12 flex">
                  <img :src="QuestionMarkCircle" alt="Question Mark Circle" class="mr-2 hidden md:flex" />
                  {{ question.header }}
                </div>
                <img :src="ChevronIcon" alt="Chevron Icon" class="transition" :class="[selectedCard.includes(question.header) ? 'rotate-180' : '']" />
              </div>
              <div v-if="selectedCard.includes(question.header)" class="mt-[24px] text-[14px] text-[#A09DB1]">
                {{ question.description }}
              </div>
            </div>
          </div>
        </div>
        <BaseCallToAction
          class="flex md:hidden"
          alt-text="FAQ Guy 1"
          :image-path="FAQGuy1"
          button-text="TRY IT FOR FREE"
          large-text="Join those who say no to acne."
        />
        <BaseCurrentlyAvailableIn class="flex md:hidden" />
      </BaseWrapper>
    </div>
  </div>
</template>
