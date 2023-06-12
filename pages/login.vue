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
async function confirmAccount(username: string, confirmationCode: string) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)
  } catch (error) {
    console.log('Error confirming account:', error)
  }
}

async function signIn(username: string, password: string) {
  loginButtonState.value = 'loading'
  try {
    await Auth.signIn(username, password)
    loginButtonState.value = 'success'
  } catch (error) {
    console.log('Error signing in:', error)
  }

  setTimeout(() => {
    loginButtonState.value = 'idle'
  })
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
    <!-- Sign Up -->
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp(signUpUsername, signUpPassword, signUpEmail)">
      <label for="sign-up-username">Username:</label>
      <input type="text" id="sign-up-username" v-model="signUpUsername" />
      <br />
      <label for="sign-up-password">Password:</label>
      <input type="password" id="sign-up-password" v-model="signUpPassword" />
      <br />
      <label for="sign-up-email">Email:</label>
      <input type="email" id="sign-up-email" v-model="signUpEmail" />
      <br />
      <button type="submit">Sign Up</button>
    </form>

    <!-- Confirm Account -->
    <h2>Confirm Account</h2>
    <form @submit.prevent="confirmAccount(signUpUsername, code)">
      <label for="confirm-username">Username:</label>
      <input type="text" id="confirm-username" v-model="signUpUsername" />
      <br />
      <label for="confirm-code">Confirmation Code:</label>
      <input type="text" id="confirm-code" v-model="code" />
      <br />
      <button type="submit">Confirm Account</button>
    </form>

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
    <form @submit.prevent="resetPassword(username, code, newPassword)">
      <label for="reset-password-username">Username:</label>
      <input type="text" id="reset-password-username" v-model="username" />
      <br />
      <label for="reset-password-code">Reset Code:</label>
      <input type="text" id="reset-password-code" v-model="code" />
      <br />
      <label for="reset-password-new">New Password:</label>
      <input type="password" id="reset-password-new" v-model="newPassword" />
      <br />
      <button type="submit">Reset Password</button>
    </form>
  </div>

  <div>
    <BaseWrapper>
      <h1 class="text-[32px] font-[700] leading-[40px] mt-[124px] text-gray-3">Welcome back</h1>
      <p class="text-gray-5 mt-[16px]">Please enter your details to log in</p>
      <BaseInput v-model="username" class="mt-[32px]" placeholder="Enter your email"></BaseInput>
      <BaseInput p-input-type="password" v-model="password" class="mt-[16px]" placeholder="Enter your password"></BaseInput>
      <NuxtLink to="/forgot-password" class="mt-[16px] text-honeydew-green text-[16px] font-[400] leading-[24px] w-full justify-end flex"
        >Forgot password?</NuxtLink
      >
      <BaseButton :state="loginButtonState" @click="signIn(username, password)" class="w-full mt-[32px]">Log In</BaseButton>
      <div class="mt-[32px] text-gray-5 text-[16px] font-[400] leading-[24px] flex justify-center items-center">
        Don't have an account?<NuxtLink to="/sign-up" class="text-honeydew-green font-[400] ml-1">Sign Up</NuxtLink>
      </div>
    </BaseWrapper>
  </div>
</template>
