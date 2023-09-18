<script setup lang="ts">
// IMPORTS ********************************************************************
import { vMaska } from 'maska'
import { useProfileStore } from '@/stores/profile'
import { Auth } from 'aws-amplify'
import { useRouter } from 'vue-router'
import VerifyEmail from '@/assets/images/verify-email.svg'
import VerifyEmailSuccess from '@/assets/images/verify-email-success.svg'
import { updatePatient } from '@/lib/endpoints'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'logo',
})

// ROUTING **********************************************************************
const router = useRouter()

// STORE **********************************************************************
const profileStore = useProfileStore()

// STATE **********************************************************************
const currentQuestionIdx = ref<number>(0)
const currentSelectedAnswer = ref<string>()
const secondCurrentSelectedAnswer = ref<string>()
const thirdCurrentSelectedAnswer = ref<string | boolean>()
const fourthCurrentSelectedAnswer = ref<string | boolean>()
const buttonLoadingState = ref<'idle' | 'loading' | 'failed' | 'success' | 'disabled'>('idle')
const isSigningUpChild = ref<boolean>(false)

// SIGN UP QUESTIONS ********************************************************************
const signUpQuestions = [
  { questionText: 'Which best describes you?', questionAnswers: [{ text: "I'm signing up my child" }, { text: "I'm signing up myself" }] },
  { questionText: 'What is your zip code?', questionAnswers: [{ text: '1111' }] },
  { questionText: 'Great, what is your name?', questionAnswers: [{ text: 'Your Name' }] },
  { questionText: 'Okay, and what is your Date of Birth?', questionAnswers: [{ text: 'DOB' }] },
  { questionText: "Since you're under 18, we'll need your parent's contact info.", questionAnswers: [{ text: 'Okay' }] },
  { questionText: "Great news! You're eligible for Honeydew!", questionAnswers: [{ text: 'OKAY' }] },
  // { questionText: 'Email', questionAnswers: [{ text: 'Email' }] },
]

// METHODS ********************************************************************
function handleSelectedQuestion(selectedAnswer: string) {
  currentSelectedAnswer.value = selectedAnswer
}

async function handleAnswerSubmitValidation() {
  if (!currentSelectedAnswer.value) return

  // Which Best Describes You Validation
  if (currentQuestionIdx.value === 0) {
    if (!currentSelectedAnswer.value) return
    profileStore.signUpDescribeYouAnswer = currentSelectedAnswer.value
    if (currentSelectedAnswer.value === "I'm signing up myself") {
      isSigningUpChild.value = false
      currentQuestionIdx.value = 1
    } else {
      isSigningUpChild.value = true
      currentQuestionIdx.value = 2
    }
    currentSelectedAnswer.value = ''
    return
  }

  // Zip Code Validation
  if (currentQuestionIdx.value === 1) {
    if (currentSelectedAnswer.value.length !== 5) return
    profileStore.signUpZipCode = currentSelectedAnswer.value
    currentQuestionIdx.value = 2
    currentSelectedAnswer.value = ''
    return
  }

  // Name Validation
  if (currentQuestionIdx.value === 2) {
    if (!currentSelectedAnswer.value) return
    profileStore.signUpName = currentSelectedAnswer.value
    currentQuestionIdx.value = 3
    currentSelectedAnswer.value = ''
    return
  }

  // DOB Validation
  if (currentQuestionIdx.value === 3) {
    await checkOver18(currentSelectedAnswer.value)
    profileStore.signUpDOB = currentSelectedAnswer.value
    currentQuestionIdx.value = 4
    currentSelectedAnswer.value = ''
    return
  }

  // Under 18 Validation
  if (currentQuestionIdx.value === 4 && !profileStore.overEighteen) {
    profileStore.signUpName = currentSelectedAnswer.value
    profileStore.signUpEmail = secondCurrentSelectedAnswer.value
    profileStore.signUpPassword = thirdCurrentSelectedAnswer.value as string
    profileStore.signUpPhoneNumber = fourthCurrentSelectedAnswer.value as string
    signUp(profileStore.signUpEmail as string, profileStore.signUpPassword as string, profileStore.signUpEmail as string)
    currentQuestionIdx.value = 5
    currentSelectedAnswer.value = ''
    secondCurrentSelectedAnswer.value = ''
    thirdCurrentSelectedAnswer.value = ''
    fourthCurrentSelectedAnswer.value = ''
    return
  }

  // Over 18 Validation
  if (currentQuestionIdx.value === 4 && profileStore.overEighteen) {
    profileStore.signUpEmail = currentSelectedAnswer.value
    profileStore.signUpPassword = secondCurrentSelectedAnswer.value
    profileStore.signUpAgreement = thirdCurrentSelectedAnswer.value as boolean
    signUp(profileStore.signUpEmail as string, profileStore.signUpPassword as string, profileStore.signUpEmail as string)
    currentQuestionIdx.value = 5
    currentSelectedAnswer.value = ''
    secondCurrentSelectedAnswer.value = ''
    thirdCurrentSelectedAnswer.value = ''
    return
  }

  // Confirm Email Validation
  if (currentQuestionIdx.value === 5) {
    profileStore.signUpConfirmationCode = currentSelectedAnswer.value
    await confirmAccount(profileStore.signUpEmail as string, profileStore.signUpConfirmationCode as string)
    currentSelectedAnswer.value = ''
    currentQuestionIdx.value = 0
    return
  }

  // Credit Card Question
  if (currentQuestionIdx.value === 6) {
    profileStore.creditCardNumber = currentSelectedAnswer.value
    profileStore.creditCardHolder = secondCurrentSelectedAnswer.value
    profileStore.creditCardExpiration = thirdCurrentSelectedAnswer.value as string
    profileStore.creditCardCVV = fourthCurrentSelectedAnswer.value as string
    currentQuestionIdx.value = 0
    // router.push('/admin')
    currentSelectedAnswer.value = ''
    secondCurrentSelectedAnswer.value = ''
    thirdCurrentSelectedAnswer.value = ''
    fourthCurrentSelectedAnswer.value = ''
    return
  }
}

function checkOver18(birthday: string): boolean {
  // Convert birthday string to a Date object
  const birthDate = new Date(birthday)

  // Calculate the current year
  const currentYear = new Date().getFullYear()

  // Get the birth year from the birthday
  const birthYear = birthDate.getFullYear()

  // Calculate the age
  const age = currentYear - birthYear

  // Check if the age is over 18
  if (age >= 18) {
    return (profileStore.overEighteen = true)
  } else {
    return (profileStore.overEighteen = false)
  }
}

async function confirmAccount(username: string, confirmationCode: string) {
  buttonLoadingState.value = 'loading'
  try {
    await Auth.confirmSignUp(username, confirmationCode)
    buttonLoadingState.value = 'success'

    await signIn(profileStore.signUpEmail as string, profileStore.signUpPassword as string)
    setTimeout(() => {
      buttonLoadingState.value = 'idle'
      currentQuestionIdx.value = 6
    }, 1000)

    await profileStore.setMyProfile()
    console.log(profileStore.profileData.patientId)
    updatePatient(profileStore.profileData.patientId, profileStore.signUpPhoneNumber, profileStore.signUpEmail)
    router.push('/profiles/' + profileStore.profileData.patientId)
  } catch (error) {
    console.log('Error confirming account:', error)
    buttonLoadingState.value = 'failed'

    setTimeout(() => {
      buttonLoadingState.value = 'idle'
    }, 1000)
  }
}

async function signIn(username: string, password: string) {
  try {
    await Auth.signIn(username, password)
  } catch (error) {
    console.log('Error signing in:', error)
  }
}

async function signUp(username: string, password: string, email: string) {
  try {
    await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
  } catch (error) {
    console.log('Error signing up:', error)
  }
}

watch(
  () => currentSelectedAnswer.value,
  (newVal) => {
    if (currentQuestionIdx.value === 5 && currentSelectedAnswer.value?.length === 6) {
      handleAnswerSubmitValidation()
    }
  }
)
</script>

<template>
  <BaseWrapper>
    <div class="flex flex-col justify-center items-center" v-for="(signUpQuestion, idx) in signUpQuestions" :key="idx">
      <div class="max-w-[390px]" v-if="currentQuestionIdx === idx">
        <div class="mt-[32px] md:mt-[72px] text-honeydew-green">
          {{ currentQuestionIdx + 1 }} of
          {{ signUpQuestions.length }}
        </div>

        <!-- Which Best Describes You Question -->
        <div v-if="currentQuestionIdx === 0">
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Which best describes you?</h1>
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

        <!-- Zip Code Question -->
        <div v-if="currentQuestionIdx === 1">
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">What is your zip code?</h1>
          <BaseInput v-model="currentSelectedAnswer" type="text" p-input-type="zip-code" class="w-full" />
          <BaseButton
            :state="currentSelectedAnswer && currentSelectedAnswer.length > 4 && currentSelectedAnswer.length < 6 ? 'idle' : 'disabled'"
            @click="handleAnswerSubmitValidation"
            class="w-full mt-[16px]"
            >Continue</BaseButton
          >
          <p class="text-red text-sm" v-if="currentSelectedAnswer && currentSelectedAnswer.length > 5">Zip code should be 4 or 5 digits</p>
        </div>

        <!-- What Is Your Name Question -->
        <div v-if="currentQuestionIdx === 2">
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">
            Great, what is your
            <span v-if="isSigningUpChild">child's</span>
            full name?
          </h1>
          <p class="mb-[32px] font-[400] text-gray-5 w-full text-start">Please, enter your full name</p>
          <BaseInput v-model="currentSelectedAnswer" type="text" />
          <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
        </div>

        <!-- Date Of Birth Question -->
        <div v-if="currentQuestionIdx === 3">
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Okay, and what is your Date of Birth?</h1>
          <p class="mb-[32px] font-[400] text-gray-5">We cannot provide service without an accurate Date of Birth</p>
          <BaseInput :placeholder="'MM-DD-YYYY'" v-model="currentSelectedAnswer" p-input-type="date" class="w-full" />
          <BaseButton :state="currentSelectedAnswer ? 'idle' : 'disabled'" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
        </div>

        <!-- Under 18 Question -->
        <div v-if="currentQuestionIdx === 4 && !profileStore.overEighteen">
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Since you're under 18, we'll need your parent's contact info.</h1>
          <p class="mb-[32px] font-[400] text-gray-5">
            Please enter your parent or guardian's contact information below, and have them be present for the initial consultation to provide consent.
          </p>
          <BaseInput :placeholder="'Full Name'" v-model="currentSelectedAnswer" class="w-full" />
          <BaseInput :placeholder="'Email address'" v-model="secondCurrentSelectedAnswer" class="w-full" />
          <!-- <BaseInput :placeholder="'Password'" p-input-type="password" v-model="(thirdCurrentSelectedAnswer as string)" class="w-full" /> -->
          <!-- <BaseInput :placeholder="'+1 (123) 456-7890'" :p-input-type="'phone-number'" v-model="(fourthCurrentSelectedAnswer as string)" class="w-full" /> -->
          <BaseButton
            :state="currentSelectedAnswer && secondCurrentSelectedAnswer && thirdCurrentSelectedAnswer ? 'idle' : 'disabled'"
            @click="handleAnswerSubmitValidation"
            class="w-full mt-[16px]"
            >Continue</BaseButton
          >
        </div>

        <!-- Over 18, Great News! Question -->
        <div v-if="currentQuestionIdx === 4 && profileStore.overEighteen">
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Great news! You're eligible for Honeydew!</h1>
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

        <!-- Verify Email -->
        <div v-if="currentQuestionIdx === 5">
          <div class="flex w-full justify-center items-center">
            <TheTransitionWrapper>
              <img v-if="buttonLoadingState !== 'success'" :src="VerifyEmail" alt="Verify Email" />
            </TheTransitionWrapper>
            <TheTransitionWrapper>
              <img v-if="buttonLoadingState === 'success'" :src="VerifyEmailSuccess" alt="Verify Email" />
            </TheTransitionWrapper>
          </div>
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Verify your email</h1>
          <p class="mb-[32px] font-[400] text-gray-5">
            We've sent a verification email to {{ profileStore.signUpEmail }}. Please, verify your email address
            <span class="underline">by entering the code</span> sent to your email before you continue with your free visit.
          </p>
          <BaseInput v-model="currentSelectedAnswer" p-input-type="verify" type="text" class="w-full" />
          <BaseButton :state="buttonLoadingState" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
          <BaseButton @click="router.push('/profile')" class="w-full mt-[16px]">Skip For Now</BaseButton>
        </div>

        <!-- Add Payment Question -->
        <div v-if="currentQuestionIdx === 6">
          <h1 class="text-[32px] font-[700] leading-[40px] my-[32px]">Add payment information to complete your profile</h1>
          <p class="mb-[32px] font-[400] text-gray-5">
            Don't worry, you will not be charged. You can have your initial consultation for FREE before deciding if you want to sign up.
          </p>
          <BaseInput v-model="currentSelectedAnswer" placeholder="0000 0000 0000 0000" p-input-type="card-number" class="w-full" />
          <BaseInput :placeholder="'Card holder name'" v-model="secondCurrentSelectedAnswer" p-input-type="text" class="w-full" />
          <div class="flex gap-x-2 mt-4">
            <div class="h-[60px] rounded-[60px] outline-none bg-white flex justify-between items-center border border-gray-2">
              <input v-maska :data-maska="['##/##']" v-model="thirdCurrentSelectedAnswer" class="ml-4 outline-none w-10/12" :placeholder="'MM/YY'" />
            </div>
            <div class="h-[60px] rounded-[60px] outline-none bg-white flex justify-between items-center border border-gray-2">
              <input v-maska :data-maska="['####']" v-model="fourthCurrentSelectedAnswer" class="ml-4 outline-none w-10/12" :placeholder="'CVV'" />
            </div>
          </div>
          <BaseButton
            :state="currentSelectedAnswer && secondCurrentSelectedAnswer && thirdCurrentSelectedAnswer ? 'idle' : 'disabled'"
            @click="handleAnswerSubmitValidation"
            class="w-full mt-[16px]"
            >schedule my free visit</BaseButton
          >
          <BaseButton @click="router.push('/profile')" class="w-full mt-[16px]">Skip For Now</BaseButton>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>
