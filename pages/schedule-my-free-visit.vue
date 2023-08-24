<script setup lang="ts">
// IMPORTS ********************************************************************
import { useProfileStore } from '@/stores/profile'
import { useRouter } from 'vue-router'
import MedicalBackground from '@/assets/images/medical-background.svg'
import BackChevronIcon from '@/assets/icons/back-chevron-icon.svg'
import FaceFrontOutline from '@/assets/images/face-front-outline.svg'
import FaceLeftOutline from '@/assets/images/face-left-outline.svg'
import FaceRightOutline from '@/assets/images/face-right-outline.svg'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'logo',
  middleware: ['auth'],
})

// ROUTING **********************************************************************
const router = useRouter()

// STORE **********************************************************************
const profileStore = useProfileStore()

// STATE **********************************************************************
const currentQuestionIdx = ref<number>(17)
const currentSelectedAnswer = ref<string>()
const buttonLoadingState = ref<'idle' | 'loading' | 'failed' | 'success' | 'disabled'>('idle')
const isPhotoUploaded = ref(false)

// SIGN UP QUESTIONS ********************************************************************
const signUpQuestions = [
  { questionText: 'letsGetStarted' },
  {
    questionText: 'howLongHaveYouHadAcne',
    questionAnswers: [{ text: "I'm new to acne" }, { text: "I've had acne for months" }, { text: "I've had acne for years" }],
  },
  {
    questionText: 'doYouHaveDrySkin',
    questionAnswers: [{ text: 'Very dry' }, { text: 'Often dry' }, { text: 'Combination' }, { text: 'Often oily' }, { text: 'Very oily' }],
  },
  { questionText: 'doYouHaveSensitiveSkin', questionAnswers: [{ text: 'Very sensitive' }, { text: 'Somewhat sensitive' }, { text: 'Not really' }] },
  { questionText: 'sexAssignedAtBirth', questionAnswers: [{ text: 'Male' }, { text: 'Female' }] },
  { questionText: 'areYouPregnant', questionAnswers: [{ text: 'Yes' }, { text: 'No' }] },
  { questionText: 'doYouBreakOut', questionAnswers: [{ text: 'Yes' }, { text: 'No, I break out throughout the month' }, { text: "I don't menstruate" }] },
  { questionText: 'isYourMenstrualCycleRegular', questionAnswers: [{ text: 'Yes' }, { text: 'No' }] },
  { questionText: 'doYouTakeBirthControl', questionAnswers: [{ text: 'Yes' }, { text: 'No' }] },
  { questionText: 'doYouHaveHistoryOfPCOS', questionAnswers: [{ text: 'Yes' }, { text: 'No' }] },
  {
    questionText: 'whatKindOfProductsHaveYouTried',
    questionAnswers: [
      { text: 'Cleansers or moistruizers' },
      { text: 'Over the counter creams' },
      { text: 'Vitamins for acne' },
      { text: 'Prescription creams' },
      { text: 'Prescription pills' },
      { text: "I haven't tried any products" },
    ],
  },
  { questionText: 'whichNonPrescriptionsDoYouUse', questionAnswers: [{ text: 'inputField' }] },
  { questionText: 'areYouTakingOtherMedications', questionAnswers: [{ text: 'Yes' }, { text: 'No' }] },
  { questionText: 'doYouHaveAnyAllergies', questionAnswers: [{ text: 'Yes' }, { text: 'No' }] },
  {
    questionText: 'describeYourStressLevel',
    questionAnswers: [
      { text: 'Never stressed' },
      { text: 'Almost never stressed' },
      { text: 'Sometimes stressed' },
      { text: 'Fairly stressed' },
      { text: 'Very stressed' },
    ],
  },
  {
    questionText: 'describeYourSleep',
    questionAnswers: [{ text: '5 hours or less' }, { text: 'Between 6 or 7 hours' }, { text: '8+ hours' }],
  },
  {
    questionText: 'howOftenDoYouConsumeDairy',
    questionAnswers: [{ text: 'Never' }, { text: 'A few times a month' }, { text: 'A few times a week' }, { text: 'A few times a day' }],
  },
  {
    questionText: 'lastStepLetsSeeYourSkin',
    questionAnswers: [{ text: 'imageUpload' }],
  },
]

// METHODS ********************************************************************
function handleSelectedQuestion(selectedAnswer: string) {
  currentSelectedAnswer.value = selectedAnswer
}

// VALIDATION ********************************************************************
async function handleAnswerSubmitValidation() {
  if (!currentSelectedAnswer.value) return

  // Medical Background
  if (currentQuestionIdx.value === 0) {
    currentQuestionIdx.value = 1
    currentSelectedAnswer.value = ''
    return
  }

  // How long have you had acne
  if (currentQuestionIdx.value === 1) {
    profileStore.howLongHaveYouHadAcne = currentSelectedAnswer.value as "I'm new to acne" | "I've had acne for months" | "I've had acne for years"
    currentQuestionIdx.value = 2
    currentSelectedAnswer.value = ''
    return
  }

  // Do you have dry skin?
  if (currentQuestionIdx.value === 2) {
    if (!currentSelectedAnswer.value) return
    profileStore.doYouHaveDrySkin = currentSelectedAnswer.value as 'Very dry' | 'Often dry' | 'Combination' | 'Often oily' | 'Very oily'
    currentQuestionIdx.value = 3
    currentSelectedAnswer.value = ''
    return
  }

  // Do you have sensitive skin?
  if (currentQuestionIdx.value === 3) {
    profileStore.doYouHaveSensitiveSkin = currentSelectedAnswer.value as 'Very sensitive' | 'Somewhat sensitive' | 'Not really'
    currentQuestionIdx.value = 4
    currentSelectedAnswer.value = ''
    return
  }

  // What is your sex assigned at birth?
  if (currentQuestionIdx.value === 4) {
    profileStore.sexAssignedAtBirth = currentSelectedAnswer.value as 'Male' | 'Female'
    if (currentSelectedAnswer.value === 'Female') {
      currentQuestionIdx.value = 5
    } else if (currentSelectedAnswer.value === 'Male') {
      currentQuestionIdx.value = 10
    }
    currentSelectedAnswer.value = ''
    return
  }

  // Are you pregnant?
  if (currentQuestionIdx.value === 5) {
    profileStore.areYouPregnant = currentSelectedAnswer.value as 'Yes' | 'No'
    currentQuestionIdx.value = 6
    currentSelectedAnswer.value = ''
    return
  }

  // Do you break out during or leading up to your menstrual cycle specifically?
  if (currentQuestionIdx.value === 6) {
    profileStore.doYouBreakOut = currentSelectedAnswer.value as 'Yes' | 'No, I break out throughout the month' | "I don't menstruate"
    currentQuestionIdx.value = 7
    currentSelectedAnswer.value = ''
    return
  }

  // Do you break out during or leading up to your menstrual cycle specifically?
  if (currentQuestionIdx.value === 7) {
    profileStore.isYourMenstrualCycleRegular = currentSelectedAnswer.value as 'Yes' | 'No'
    currentQuestionIdx.value = 8
    currentSelectedAnswer.value = ''
    return
  }

  // Do you take birth control?
  if (currentQuestionIdx.value === 8) {
    profileStore.doYouTakeBirthControl = currentSelectedAnswer.value as 'Yes' | 'No'
    currentQuestionIdx.value = 9
    currentSelectedAnswer.value = ''
    return
  }

  // Do you have history with PCOS?
  if (currentQuestionIdx.value === 9) {
    profileStore.doYouHaveHistoryOfPCOS = currentSelectedAnswer.value as 'Yes' | 'No'
    currentQuestionIdx.value = 10
    currentSelectedAnswer.value = ''
    return
  }

  // What kind of products have you tried for acne in the past?
  if (currentQuestionIdx.value === 10) {
    profileStore.whatKindOfProductsHaveYouTried = currentSelectedAnswer.value as
      | 'Cleansers or moistruizers'
      | 'Over the counter creams'
      | 'Vitamins for acne'
      | 'Prescription creams'
      | 'Prescription pills'
      | "I haven't tried any products"
    currentQuestionIdx.value = 11
    currentSelectedAnswer.value = ''
    return
  }

  // Which non-prescriptions do you use?
  if (currentQuestionIdx.value === 11) {
    profileStore.whichNonPrescriptionsDoYouUse = currentSelectedAnswer.value
    currentQuestionIdx.value = 12
    currentSelectedAnswer.value = ''
    return
  }

  // Are you taking any other medications/pills for any other medical condition?
  if (currentQuestionIdx.value === 12) {
    profileStore.areYouTakingOtherMedications = currentSelectedAnswer.value as 'Yes' | 'No'
    currentQuestionIdx.value = 13
    currentSelectedAnswer.value = ''
    return
  }

  // Do you have any allergies to perscription medications or ingredients?
  if (currentQuestionIdx.value === 13) {
    profileStore.doYouHaveAnyAllergies = currentSelectedAnswer.value as 'Yes' | 'No'
    currentQuestionIdx.value = 14
    currentSelectedAnswer.value = ''
    return
  }

  // In the past month, how would you describe your stress level?
  if (currentQuestionIdx.value === 14) {
    profileStore.describeYourStressLevel = currentSelectedAnswer.value as
      | 'Never stressed'
      | 'Almost never stressed'
      | 'Sometimes stressed'
      | 'Fairly stressed'
      | 'Very stressed'
    currentQuestionIdx.value = 15
    currentSelectedAnswer.value = ''
    return
  }

  // In the past month, how would you describe your sleep?
  if (currentQuestionIdx.value === 15) {
    profileStore.describeYourSleep = currentSelectedAnswer.value as '5 hours or less' | 'Between 6 or 7 hours' | '8+ hours'
    currentQuestionIdx.value = 16
    currentSelectedAnswer.value = ''
    return
  }

  // How often do you consume dairy?
  if (currentQuestionIdx.value === 16) {
    profileStore.howOftenDoYouConsumeDairy = currentSelectedAnswer.value as 'Never' | 'A few times a month' | ' A few times a week' | 'A few times a day'
    currentQuestionIdx.value = 17
    profileStore.saveScheduleVisitData()
    currentSelectedAnswer.value = ''
    return
  }

  // Image Upload?
  if (currentQuestionIdx.value === 17) {
    profileStore.lastStepLetsSeeYourSkin = currentSelectedAnswer.value
    currentQuestionIdx.value = 0
    currentSelectedAnswer.value = ''
    router.push('/profile')
    return
  }
}
</script>

<template>
  <!-- Back Chevron Icon -->
  {{ profileStore.scheduleVisitDataArr }}
  <div
    @click="
      currentQuestionIdx === 10 && profileStore.sexAssignedAtBirth === 'Male'
        ? (currentQuestionIdx = 4)
        : currentQuestionIdx === 0
        ? router.push('/profile')
        : (currentQuestionIdx -= 1)
    "
    class="absolute top-0 left-0 w-1/12 h-[80px] flex justify-start items-center cursor-pointer"
  >
    <img class="ml-[16px]" :src="BackChevronIcon" alt="Back Chevron Icon" />
  </div>
  <div v-for="(signUpQuestion, idx) in signUpQuestions" :key="idx">
    <div v-if="currentQuestionIdx === idx">
      <div class="mt-[72px] text-honeydew-green">
        {{ currentQuestionIdx + 1 }} of
        {{ signUpQuestions.length }}
      </div>

      <!-- Start Medical Background -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 0">
        <img :src="MedicalBackground" alt="Medical Background" />
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Let's fill in your medical background</h1>
        <p class="mb-[32px] font-[400] text-gray-5">Don't worry -- we'll make this quick!</p>
        <BaseButton @click="currentQuestionIdx = 1" class="w-full mt-[16px]">Okay, Let's Go</BaseButton>
      </div>

      <!-- How Long Have You Had Acne Question -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 1">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">How long have you had acne?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Do you have dry skin? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 2">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Do you have dry skin?</h1>

        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Do you have sensitive skin? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 3">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Do you have sensitive skin?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- What is your sex? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 4">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">What is your sex assigned at birth?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Are you pregnant? -->
      <div v-if="currentQuestionIdx === 5">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Are you pregnant?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Do you break out during or leading up to your menstrual cycle specifically? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 6">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Do you break out during or leading up to your menstrual cycle specifically?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Do you break out during or leading up to your menstrual cycle specifically? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 7">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Is your menstrual cycle regular?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Do you take birth control? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 8">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Do you take birth control?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Do you have a history of PCOS (Polystic Ovarian Syndrome)? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 9">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Do you have a history of PCOS (Polystic Ovarian Syndrome)?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- What kind of products have you tried for acne in the past? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 10">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">What kind of products have you tried for acne in the past?</h1>
        <p class="mb-[32px] font-[400] text-gray-5">You can select multiple options from the list</p>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Which non-prescription products do you use on your skin? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 11">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Which non-prescription products do you use on your skin?</h1>
        <p class="mb-[32px] font-[400] text-gray-5">E.g. washes, cleansers, masks, creams, ets. Please include the brand and product name if you can.</p>
        <BaseInput v-model="currentSelectedAnswer" type="text" class="w-full" />
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Which non-prescription products do you use on your skin? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 12">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Are you taking any other medications/pills for any other medical condition?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Do you have any allergies to perscription medications or ingredients? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 13">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Do you have any allergies to perscription medications or ingredients?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- In the past month, how would you describe your stress level? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 14">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">In the past month, how would you describe your stress level?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- In the past month, how would you describe your sleep? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 15">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">In the past month, how would you describe your sleep?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- How often do you consume dairy? -->
      <div class="text-center w-[390px]" v-if="currentQuestionIdx === 16">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">How often do you consume dairy?</h1>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px] border border-gray-2"
          >
            <div
              class="border rounded-full w-[20px] h-[20px] border-gray-2 ml-[22px] mr-[16px] flex justify-center items-center"
              :class="[currentSelectedAnswer === questionAnswer.text ? 'bg-honeydew-green' : '']"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            <div class="text-gray-3">
              {{ questionAnswer.text }}
            </div>
          </div>
        </div>
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Last step! Let’s see your skin -->
      <div class="text-center w-[390px] md:w-full" v-if="currentQuestionIdx === 17">
        <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Last step! Let's see your skin</h1>
        <p class="mb-[32px] font-[400] text-gray-5">Take or upload photos of your skin from three profiles.</p>

        <div class="flex gap-x-6 flex-wrap items-center justify-center">
          <BaseImageUpload
            @photo-uploaded="isPhotoUploaded = true"
            buttonText="Left profile"
            describedImage="The left side of your face"
            :image-URL="FaceLeftOutline"
          />
          <BaseImageUpload
            @photo-uploaded="isPhotoUploaded = true"
            buttonText="Front profile"
            describedImage="The front of your face"
            :image-URL="FaceFrontOutline"
          />
          <BaseImageUpload
            @photo-uploaded="isPhotoUploaded = true"
            buttonText="Right profile"
            describedImage="The right side of your face"
            :image-URL="FaceRightOutline"
          />
        </div>

        <div class="w-full flex justify-center items-center">
          <a :href="'/view-history' + profileStore.patientData.patientId">
            <BaseButton :state="!isPhotoUploaded ? 'idle' : 'disabled'" @click="uploadPhoto()" class="w-full max-w-[290px] mt-[32px] px-8"
              >Submit Photos</BaseButton
            >
          </a>
          <a href="https://schedule.nylas.com/ryan-paglione-30min" target="_Blank">
            <BaseButton :state="!isPhotoUploaded ? 'idle' : 'disabled'" @click="router.push('/profile')" class="w-full max-w-[290px] mt-[32px] px-8"
              >Schedule Appointment</BaseButton
            >
          </a>
        </div>
      </div>

      <!-- End -->
    </div>
  </div>
</template>
