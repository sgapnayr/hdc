<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { vMaska } from 'maska'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'logo',
})

// STATE **********************************************************************
const test = ref()
const currentQuestionIdx = ref<number>(0)
const currentSelectedAnswer = ref<string>()

// VALIDATION *********************************************************************
const data = computed(() => {
  return {
    currentSelectedAnswer,
  }
})

const rules = {
  currentSelectedAnswer: { required },
}

const v$ = useVuelidate(rules, data)

const validationMessage = computed(() => (field: string) => {
  const fieldValue = v$.value[field]
  if (fieldValue?.$invalid) {
    return fieldValue?.$errors.map((error: { $message: string }) => error.$message)[0]
  }
})

// DATA ********************************************************************
const signUpQuestions = [
  { questionText: 'Which best describes you?', questionAnswers: [{ text: "I'm signing up my child" }, { text: "I'm signing up myself" }] },
  { questionText: 'What is your zip code?', questionAnswers: [{ text: '1111' }] },
  { questionText: 'Great, what is your name?', questionAnswers: [{ text: 'Your Name' }] },
  { questionText: 'Okay, and what is your Date of Birth?', questionAnswers: [{ text: 'DOB' }] },
  { questionText: "Since you're under 18, we'll need your parent's contact info.", questionAnswers: [{ text: 'Okay' }] },
  { questionText: "Great news! You're eligible for Honeydew!", questionAnswers: [{ text: 'OKAY' }] },
]

// COMPONENTS ********************************************************************
const orderedComponentNames = [{}, {}]

// METHODS ********************************************************************
function handleSelectedQuestion(selectedAnswer: string) {
  currentSelectedAnswer.value = selectedAnswer
}

// If the user isn't already at the last component in the flow: Move forward.
function next() {
  currentQuestionIdx.value = currentQuestionIdx.value <= orderedComponentNames.length - 1 ? currentQuestionIdx.value + 1 : currentQuestionIdx.value
}

// If the user isn't at the first component of the flow: Move back.
function back() {
  currentQuestionIdx.value = currentQuestionIdx.value > 0 ? currentQuestionIdx.value - 1 : currentQuestionIdx.value
}

// INITIALIZATION *************************************************************
</script>

<template>
  <div v-for="(signUpQuestion, idx) in signUpQuestions" :key="idx">
    <div class="w-[390px]" v-if="currentQuestionIdx === idx">
      <div class="mt-[72px] text-honeydew-green">{{ currentQuestionIdx + 1 }} of {{ signUpQuestions.length }}</div>
      <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">{{ signUpQuestion.questionText }}</h1>

      <!-- If Answers are cards -->
      <div>
        <div v-for="(questionAnswer, jdx) in signUpQuestion.questionAnswers" @click="handleSelectedQuestion(questionAnswer.text)">
          <div
            @click="currentSelectedAnswer = questionAnswer.text"
            class="w-full h-[60px] rounded-[60px] outline-none bg-white flex justify-start items-center cursor-pointer mb-[16px]"
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
      </div>

      <!-- If Answers are input -->

      <!-- <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="canProgress" class="w-full mt-[16px]">Continue</BaseButton> -->
    </div>
  </div>
</template>
