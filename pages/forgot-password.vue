<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { Auth } from 'aws-amplify'
import BackChevronIcon from '@/assets/icons/back-chevron-icon.svg'

// LAYOUT **********************************************************************
const user = useAuthenticator()
definePageMeta({
  layout: 'logo',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
onMounted(() => {
  watchEffect(() => {
    if (user.authStatus === 'authenticated') {
      navigateTo('/admin')
    }
  })
})

// EMITS **********************************************************************

// STORES *********************************************************************

// STATE ****************************************************************
const username = ref()
const newPassword = ref()
const verificationCode = ref()
const submitButtonState = ref<'idle' | 'loading' | 'success' | 'failed' | 'disabled'>('idle')

// MEMBER DATA ****************************************************************

// METHODS ********************************************************************
async function resetPassword(username: string, confirmationCode: string, newPassword: string) {
  try {
    await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword)
  } catch (error) {
    console.log('Error resetting password:', error)
  }
}

async function forgotPassword(username: string) {
  try {
    await Auth.forgotPassword(username)
  } catch (error) {
    console.log('Error requesting password reset:', error)
  }
}

// INITIALIZATION *************************************************************
</script>

<template>
  <div class="flex flex-col">
    <!-- Forgot Password -->
    <h2>Forgot Password</h2>
    <form @submit.prevent="forgotPassword(username)">
      <label for="forgot-password-username">Username:</label>
      <input type="text" id="forgot-password-username" v-model="username" />
      <br />
      <button type="submit">Request Password Reset</button>
    </form>
    <!-- Reset Password -->
    <h2>Reset Password</h2>
    <form @submit.prevent="resetPassword(username, verificationCode, newPassword)">
      <label for="reset-password-username">Username:</label>
      <input type="text" id="reset-password-username" v-model="username" />
      <br />
      <label for="reset-password-code">Reset Code:</label>
      <input type="text" id="reset-password-code" v-model="verificationCode" />
      <br />
      <label for="reset-password-new">New Password:</label>
      <input type="password" id="reset-password-new" v-model="newPassword" />
      <br />
      <button type="submit">Reset Password</button>
    </form>
  </div>

  <div>
    <BaseWrapper>
      <!-- Back Chevron Icon -->
      <NuxtLink to="/login" class="absolute top-0 left-0 w-1/12 h-[80px] flex justify-start items-center">
        <img class="ml-[16px]" :src="BackChevronIcon" alt="Back Chevron Icon" />
      </NuxtLink>
      <h1 class="text-[32px] font-[700] leading-[40px] mt-[124px] text-gray-3">Forgot password?</h1>
      <p class="text-gray-5 mt-[16px]">Please enter your email to recover password</p>
      <BaseInput v-model="username" class="mt-[32px]" placeholder="Enter your email"></BaseInput>
      <BaseButton :state="submitButtonState" @click="resetPassword(username, verificationCode, newPassword)" class="w-full mt-[32px]">Continue</BaseButton>
      <div class="mt-[32px] text-gray-5 text-[16px] font-[400] leading-[24px] flex justify-center items-center">
        Don't have an account?<span class="text-honeydew-green font-[400] ml-1">Sign Up</span>
      </div>
    </BaseWrapper>
  </div>
</template>
