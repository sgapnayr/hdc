<script setup lang="ts">
// IMPORTS ********************************************************************
import { useProfileStore } from '@/stores/profile'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'logo',
})

// STORE **********************************************************************
const profileStore = useProfileStore()

// STATE **********************************************************************
const currentQuestionIdx = ref<number>(5)
const currentSelectedAnswer = ref<string>()
const secondCurrentSelectedAnswer = ref<string>()
const thirdCurrentSelectedAnswer = ref<string | boolean>()

// DATA ********************************************************************
const signUpQuestions = [
  { questionText: 'Which best describes you?', questionAnswers: [{ text: "I'm signing up my child" }, { text: "I'm signing up myself" }] },
  { questionText: 'What is your zip code?', questionAnswers: [{ text: '1111' }] },
  { questionText: 'Great, what is your name?', questionAnswers: [{ text: 'Your Name' }] },
  { questionText: 'Okay, and what is your Date of Birth?', questionAnswers: [{ text: 'DOB' }] },
  { questionText: "Since you're under 18, we'll need your parent's contact info.", questionAnswers: [{ text: 'Okay' }] },
  { questionText: "Great news! You're eligible for Honeydew!", questionAnswers: [{ text: 'OKAY' }] },
]

// METHODS ********************************************************************
function handleSelectedQuestion(selectedAnswer: string) {
  currentSelectedAnswer.value = selectedAnswer
}

function handleAnswerSubmitValidation() {
  if (!currentSelectedAnswer.value) return

  if (currentQuestionIdx.value === 0) {
    if (!currentSelectedAnswer.value) return
    profileStore.signUpDescribeYouAnswer = currentSelectedAnswer.value
    currentQuestionIdx.value = 1
    currentSelectedAnswer.value = ''
    return
  }

  if (currentQuestionIdx.value === 1) {
    if (currentSelectedAnswer.value.length !== 5) return
    profileStore.signUpZipCode = currentSelectedAnswer.value
    currentQuestionIdx.value = 2
    currentSelectedAnswer.value = ''
    return
  }

  if (currentQuestionIdx.value === 2) {
    if (!currentSelectedAnswer.value) return
    profileStore.signUpName = currentSelectedAnswer.value
    currentQuestionIdx.value = 3
    currentSelectedAnswer.value = ''
    return
  }

  if (currentQuestionIdx.value === 3) {
    profileStore.signUpDOB = currentSelectedAnswer.value
    currentQuestionIdx.value = 4
    currentSelectedAnswer.value = ''
    return
  }

  if (currentQuestionIdx.value === 4) {
    profileStore.signUpMinorFullName = currentSelectedAnswer.value
    profileStore.signUpMinorEmailAddress = secondCurrentSelectedAnswer.value
    profileStore.signUpMinorPhoneNumber = thirdCurrentSelectedAnswer.value as string
    currentQuestionIdx.value = 5
    currentSelectedAnswer.value = ''
    secondCurrentSelectedAnswer.value = ''
    thirdCurrentSelectedAnswer.value = ''
    return
  }

  if (currentQuestionIdx.value === 5) {
    profileStore.signUpEmail = currentSelectedAnswer.value
    profileStore.signUpPassword = secondCurrentSelectedAnswer.value
    profileStore.signUpAgreement = thirdCurrentSelectedAnswer.value as boolean
    currentQuestionIdx.value = 6
    currentSelectedAnswer.value = ''
    secondCurrentSelectedAnswer.value = ''
    thirdCurrentSelectedAnswer.value = ''
    return
  }
}

function testState() {
  currentQuestionIdx.value -= 1
}
</script>

<template>
  <button @click="testState">Back</button>
  <br />
  Describe you: {{ profileStore.signUpDescribeYouAnswer }}
  <br />
  Zippy: {{ profileStore.signUpZipCode }}
  <br />
  Name: {{ profileStore.signUpName }}
  <br />
  DOB: {{ profileStore.signUpDOB }}
  <br />
  Minor Name: {{ profileStore.signUpMinorFullName }}
  <br />
  Minor Email: {{ profileStore.signUpMinorEmailAddress }}
  <br />
  Minor Number: {{ profileStore.signUpMinorPhoneNumber }}
  <br />
  Agreement: {{ profileStore.signUpAgreement }}
  <br />
  Answer: {{ currentSelectedAnswer }}

  <div v-for="(signUpQuestion, idx) in signUpQuestions" :key="idx">
    <div class="w-[390px]" v-if="currentQuestionIdx === idx">
      <div class="mt-[72px] text-honeydew-green">{{ currentQuestionIdx + 1 }} of {{ signUpQuestions.length }}</div>
      <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">{{ signUpQuestion.questionText }}</h1>

      <!-- First Question -->
      <div v-if="currentQuestionIdx === 0">
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

      <!-- Second Question -->
      <div v-if="currentQuestionIdx === 1">
        <BaseInput v-model="currentSelectedAnswer" type="text" class="w-full" />
        <BaseButton
          :state="currentSelectedAnswer && currentSelectedAnswer.length > 4 && currentSelectedAnswer.length < 6 ? 'idle' : 'disabled'"
          @click="handleAnswerSubmitValidation"
          class="w-full mt-[16px]"
          >Continue</BaseButton
        >
        <p class="text-red text-sm" v-if="currentSelectedAnswer && currentSelectedAnswer.length > 5">Zip code should be 5 digits</p>
      </div>

      <!-- Third Question -->
      <div v-if="currentQuestionIdx === 2">
        <p class="mb-[32px] font-[400] text-gray-5">Please, enter your full name</p>
        <BaseInput v-model="currentSelectedAnswer" type="text" class="w-full" />
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Forth Question -->
      <div v-if="currentQuestionIdx === 3">
        <p class="mb-[32px] font-[400] text-gray-5">We cannot provide service without an accurate Date of Birth</p>
        <BaseInput :placeholder="'MM-DD-YYYY'" v-model="currentSelectedAnswer" p-input-type="date" class="w-full" />
        <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
      </div>

      <!-- Under 18 Question -->
      <div v-if="currentQuestionIdx === 4">
        <p class="mb-[32px] font-[400] text-gray-5">
          Please enter your parent or guardian's contact information below, and have them be present for the initial consultation to provide consent.
        </p>
        <BaseInput :placeholder="'Full Name'" v-model="currentSelectedAnswer" class="w-full" />
        <BaseInput :placeholder="'Email address'" v-model="secondCurrentSelectedAnswer" class="w-full" />
        <BaseInput :p-input-type="'phone-number'" v-model="(thirdCurrentSelectedAnswer as string)" class="w-full" />
        <BaseButton
          :state="currentSelectedAnswer && secondCurrentSelectedAnswer && thirdCurrentSelectedAnswer ? 'idle' : 'disabled'"
          @click="handleAnswerSubmitValidation"
          class="w-full mt-[16px]"
          >Continue</BaseButton
        >
      </div>

      <!-- Great News! Question -->
      <div v-if="currentQuestionIdx === 5">
        <p class="mb-[32px] font-[400] text-gray-5">Create your account to get started and schedule your initial consultation.</p>
        <BaseInput :placeholder="'jane@example.com'" v-model="currentSelectedAnswer" p-input-type="text" class="w-full" />
        <BaseInput :placeholder="'Password'" v-model="secondCurrentSelectedAnswer" p-input-type="password" class="w-full" />
        <BaseCheckBox @checkbox-selected="thirdCurrentSelectedAnswer = !thirdCurrentSelectedAnswer" class="mt-[32px]">
          I agree with Terms of Service, Privacy Policy, and Telehealth Consent
        </BaseCheckBox>
        <BaseButton
          :state="currentSelectedAnswer && secondCurrentSelectedAnswer && thirdCurrentSelectedAnswer ? 'idle' : 'disabled'"
          @click="handleAnswerSubmitValidation"
          class="w-full mt-[16px]"
          >Continue</BaseButton
        >
      </div>
    </div>
  </div>
</template>
