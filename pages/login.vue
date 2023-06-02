<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'

// LAYOUT **********************************************************************
const auth = useAuthenticator()
definePageMeta({
  layout: 'logo',
})

// STATE **********************************************************************
const email = ref<string>('')
const password = ref<string>('')

// METHODS ********************************************************************
function handleLogin() {
  console.log('LOGIN')
}
</script>

<template>
  <div>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
    {{ auth.route }}
  </div>

  <div>
    <BaseWrapper>
      <h1 class="text-[32px] font-[700] leading-[40px] mt-[124px] text-gray-3">Welcome back</h1>
      <p class="text-gray-5 mt-[16px]">Please enter your details to log in</p>
      <BaseInput v-model="email" class="mt-[32px]" placeholder="Enter your email"></BaseInput>
      <BaseInput p-input-type="password" v-model="password" class="mt-[16px]" placeholder="Enter your password"></BaseInput>
      <div class="mt-[16px] text-honeydew-green text-[16px] font-[500] leading-[24px] w-full justify-end flex">Forgot password?</div>
      <BaseButton state="idle" @click="handleLogin" class="w-full mt-[32px]">Log In</BaseButton>
      <NuxtLink to="/admin">Admin</NuxtLink>
      <div class="mt-[32px] text-gray-5 text-[16px] font-[400] leading-[24px] flex justify-center items-center">
        Don't have an account? <span class="text-honeydew-green font-[500]">Sign Up</span>
      </div>
    </BaseWrapper>
  </div>
</template>
