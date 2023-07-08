<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
import { Auth } from 'aws-amplify'
import { password } from 'iron-webcrypto'

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

// STATE **********************************************************************
const username = ref()
const password = ref()

const signUpPassword = ref()
const signUpUsername = ref()
const signUpEmail = ref()
const newPassword = ref()
const code = ref()

const loginButtonState = ref<'idle' | 'loading' | 'success' | 'failed' | 'disabled'>('idle')

// METHODS ********************************************************************
async function signIn(username: string, password: string) {
  loginButtonState.value = 'loading'
  try {
    await Auth.signIn(username, password)
    loginButtonState.value = 'success'
  } catch (error) {
    console.log('Error signing in:', error)
    loginButtonState.value = 'failed'
  }

  setTimeout(() => {
    loginButtonState.value = 'idle'
  }, 1000)
}

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
</script>

<template>
  <div>
    <BaseWrapper>
      <h1 class="text-[32px] font-[700] leading-[40px] mt-[72px] text-center md:text-start md:mt-[124px] text-gray-3">Welcome back</h1>
      <p class="text-gray-5 mt-[16px] text-center md:text-start">Please enter your details to log in</p>
      <BaseInput v-model="username" class="mt-[32px]" placeholder="Enter your email"></BaseInput>
      <BaseInput p-input-type="password" v-model="password" class="mt-[16px]" placeholder="Enter your password"></BaseInput>
      <NuxtLink to="/forgot-password" class="mt-[16px] text-honeydew-green text-[16px] font-[400] leading-[24px] w-full justify-end flex px-4"
        >Forgot password?</NuxtLink
      >
      <BaseButton :state="loginButtonState" @click="signIn(username, password)" class="w-full mt-[32px]">Log In</BaseButton>
      <div class="mt-[32px] text-gray-5 text-[16px] font-[400] leading-[24px] flex justify-center items-center">
        Don't have an account?<NuxtLink to="/sign-up" class="text-honeydew-green font-[400] ml-1">Sign Up</NuxtLink>
      </div>
    </BaseWrapper>
  </div>
</template>
