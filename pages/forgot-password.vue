<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { Auth } from 'aws-amplify'
import BackChevronIcon from '@/assets/icons/back-chevron-icon.svg'
import { useProfileStore } from '~/stores/profile'
import { useRouter } from 'vue-router'
import VerifyEmail from '@/assets/images/verify-email.svg'
import VerifyEmailSuccess from '@/assets/images/verify-email-success.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'logo',
})

// ROUTER **********************************************************************
const router = useRouter()
const auth = useAuthenticator()

// STORES *********************************************************************
const profileStore = useProfileStore()

// STATE ****************************************************************
const currentQuestionIdx = ref<number>(0)
const currentSelectedAnswer = ref<string>()
const thirdCurrentSelectedAnswer = ref<string>()
const username = ref()
const secondCurrentSelectedAnswer = ref<string>(username.value)
const buttonLoadingState = ref<'idle' | 'loading' | 'failed' | 'success' | 'disabled'>('idle')

// METHODS ********************************************************************
async function handleAnswerSubmitValidation() {
  if (!currentSelectedAnswer.value) return

  // Which Best Describes You Validation
  if (currentQuestionIdx.value === 1) {
    if (!currentSelectedAnswer.value) return
    currentQuestionIdx.value = 1
    resetPassword(currentSelectedAnswer.value, thirdCurrentSelectedAnswer.value as string, secondCurrentSelectedAnswer.value as string)
    currentSelectedAnswer.value = ''
    return
  }
}

async function resetPassword(username: string, confirmationCode: string, newPassword: string) {
  buttonLoadingState.value = 'loading'
  try {
    await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword)
    buttonLoadingState.value = 'success'

    setTimeout(() => {
      buttonLoadingState.value = 'idle'
      console.log('SUCCESS')
      router.push('/login')
    }, 1000)
  } catch (error) {
    console.log('Error confirming account:', error)
    buttonLoadingState.value = 'failed'
    console.log('FAUILED')

    setTimeout(() => {
      buttonLoadingState.value = 'idle'
    }, 1000)
  }
}

async function forgotPassword(username: string) {
  buttonLoadingState.value = 'loading'
  try {
    await Auth.forgotPassword(username)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    setTimeout(() => {
      buttonLoadingState.value = 'idle'
      currentQuestionIdx.value = 1
    }, 1000)
  } catch (error) {
    console.log('Error requesting password reset:', error)

    setTimeout(() => {
      buttonLoadingState.value = 'idle'
      currentQuestionIdx.value = 1
    }, 1000)
  }
}

// INITIALIZATION *************************************************************
</script>

<template>
  <div>
    <BaseWrapper>
      <div class="w-[390px] mt-[16px] lg:mt-[72px]">
        <!-- Back Chevron Icon -->
        <NuxtLink to="/login" class="absolute top-0 left-0 w-1/12 h-[80px] flex justify-start items-center">
          <img class="ml-[16px]" :src="BackChevronIcon" alt="Back Chevron Icon" />
        </NuxtLink>

        <!-- Forgot password -->
        <div v-if="currentQuestionIdx === 0">
          <h1 class="text-[32px] font-[700] leading-[40px] mt-[124px] text-gray-3">Forgot password?</h1>
          <p class="text-gray-5 mt-[16px]">Please enter your email to recover password</p>
          <BaseInput
            v-model="username"
            class="mt-[32px]"
            :placeholder="profileStore.signUpEmail ? profileStore.signUpEmail : 'Enter your email...'"
          ></BaseInput>
          <BaseButton :state="buttonLoadingState" @click="forgotPassword(username)" class="w-full mt-[32px]">Continue</BaseButton>
          <div class="mt-[32px] text-gray-5 text-[16px] font-[400] leading-[24px] flex justify-center items-center">
            Don't have an account?<span class="text-honeydew-green font-[400] ml-1">Sign Up</span>
          </div>
        </div>

        <!-- Verify Email -->
        <div v-if="currentQuestionIdx === 1">
          <div class="flex w-full justify-center items-center">
            <img v-if="buttonLoadingState !== 'success'" :src="VerifyEmail" alt="Verify Email" />
            <img v-if="buttonLoadingState === 'success'" :src="VerifyEmailSuccess" alt="Verify Email" />
          </div>
          <h1 class="text-[32px] w-full text-center font-[700] leading-[40px] my-[32px]">Success!</h1>
          <p class="mb-[32px] font-[400] text-gray-5">
            We've sent a verification email to {{ username }}. Please, verify your email address <span class="underline">by entering the code</span> sent to
            your email and <span class="underline">setting a new password</span>.
          </p>
          <BaseInput
            v-model="secondCurrentSelectedAnswer"
            p-input-type="password"
            placeholder="Enter your new password here..."
            type="password"
            class="w-full"
          />
          <BaseInput v-model="thirdCurrentSelectedAnswer" p-input-type="verify" placeholder="Enter verification code here..." type="text" class="w-full" />
          <BaseButton :state="buttonLoadingState" @click="handleAnswerSubmitValidation" class="w-full mt-[16px]">Continue</BaseButton>
          <div class="mt-[32px] text-gray-5 text-[16px] font-[400] leading-[24px] flex justify-center items-center">
            Didn't get the email?
            <div @function="forgotPassword(username)" class="text-honeydew-green font-[400] ml-1 cursor-pointer transition active:scale-90">Send it again</div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>
