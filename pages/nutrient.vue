<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'

definePageMeta({
  layout: 'blank',
})

// TYPE **********************************************************************
interface RecommendedSolutions {
  foodsYouCanEat?: string[]
  workoutsYouCanDo?: string[]
}

interface NutrientCategory {
  nutrientCategory: string
  description: string
  nutrientTestResult: number
  nutrientTestUnit: string
  optimalNutrientLevel: string
  recommendedSolutions: RecommendedSolutions
}

interface ReportData {
  name: string
  reportingData: string
  reportingNutritionist: string
  nutrientCategories: NutrientCategory[]
}

// DATA **********************************************************************
const NutrientReport = {
  name: 'Ryan Pags',
  reportingData: '10-12-2022',
  reportingNutritionist: 'John Smith',
  nutrientCategories: [
    {
      nutrientCategory: 'Fiber',
      description: 'Fiber is an essential nutrient that aids in digestion.',
      nutrientTestResult: 10,
      nutrientTestUnit: 'g',
      optimalNutrientLevel: '25-30',
      recommendedSolutions: [
        {
          foodsYouCanEat: ['Fruits', 'Vegetables', 'Whole Grains'],
        },
        {
          workoutsYouCanDo: ['Cardio exercises', 'Yoga'],
        },
      ],
    },
    {
      nutrientCategory: 'Protein',
      description: 'Protein is important for muscle growth and repair.',
      nutrientTestResult: 20,
      nutrientTestUnit: 'g',
      optimalNutrientLevel: '50-60',
      recommendedSolutions: [
        {
          foodsYouCanEat: ['Lean meats', 'Fish', 'Legumes'],
        },
        {
          workoutsYouCanDo: ['Strength training', 'Resistance exercises'],
        },
      ],
    },
    {
      nutrientCategory: 'Carbohydrates',
      description: 'Carbohydrates provide energy for the body.',
      nutrientTestResult: 50,
      nutrientTestUnit: 'g',
      optimalNutrientLevel: '150-200',
      recommendedSolutions: [
        {
          foodsYouCanEat: ['Whole grains', 'Fruits', 'Vegetables'],
        },
        {
          workoutsYouCanDo: ['Aerobic exercises', 'Cycling'],
        },
      ],
    },
    {
      nutrientCategory: 'Fat',
      description: 'Fat is an essential nutrient for body functions and energy storage.',
      nutrientTestResult: 30,
      nutrientTestUnit: 'g',
      optimalNutrientLevel: '40-50',
      recommendedSolutions: [
        {
          foodsYouCanEat: ['Avocado', 'Nuts', 'Olive oil'],
        },
        {
          workoutsYouCanDo: ['High-intensity interval training (HIIT)', 'Weightlifting'],
        },
      ],
    },
  ],
}

const credentials = [
  { username: 'ryan', password: '123', role: 'customer' },
  { username: 'bryan', password: '456', role: 'admin' },
]

// STATE **********************************************************************
const NutrientReportCopy = ref<ReportData>()
const selectedNutrientCategory = ref<string>('All')
const isAuthenticated = ref(false)
const usernameInput = ref<string>('')
const passwordInput = ref<string>()
const buttonLoadingState = ref<'idle' | 'loading' | 'failed' | 'success' | 'disabled'>('idle')

// METHODS **********************************************************************
const filteredNutrientData = computed(() => {
  if (!NutrientReportCopy.value) return

  return selectedNutrientCategory.value === 'All'
    ? NutrientReportCopy.value
    : {
        ...NutrientReportCopy.value,
        nutrientCategories: NutrientReportCopy.value.nutrientCategories.filter(
          (category: NutrientCategory) => category.nutrientCategory === selectedNutrientCategory.value
        ),
      }
})

const NutrientDataWithAllCategory = computed(() => {
  if (!NutrientReportCopy.value) return

  const nutrientCategories = [
    { nutrientCategory: 'All', nutrientTestResult: 0, nutrientTestUnit: '', optimalNutrientLevel: '', recommendedSolutions: [] },
    ...NutrientReportCopy.value.nutrientCategories,
  ]

  return { ...NutrientReportCopy.value, nutrientCategories: nutrientCategories }
})

const passwordHasher = computed(() => {
  const randomCharacters = '!@#$%^&*()_+-={}[]:";\'<>?,./|\\`~'

  // Define the legend to map digits to other characters
  const legend = {
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
  }

  return credentials.map((user) => {
    let scrambledPassword = ''

    // Scramble the password by randomly shuffling its characters
    const passwordCharacters = user.password.split('')
    while (passwordCharacters.length > 0) {
      const randomIndex = Math.floor(Math.random() * passwordCharacters.length)
      scrambledPassword += passwordCharacters.splice(randomIndex, 1)[0]
    }

    // Add random characters to the scrambled password
    const numRandomCharacters = Math.floor(Math.random() * 5) + 5
    for (let i = 0; i < numRandomCharacters; i++) {
      const randomCharIndex = Math.floor(Math.random() * randomCharacters.length)
      scrambledPassword += randomCharacters[randomCharIndex]
    }

    // Scramble the real password within the random new characters
    const realPasswordIndex = Math.floor(Math.random() * scrambledPassword.length)
    scrambledPassword = scrambledPassword.slice(0, realPasswordIndex) + user.password + scrambledPassword.slice(realPasswordIndex)

    // Map specific digits to other characters based on the legend
    for (const digit in legend) {
      scrambledPassword = scrambledPassword.replace(new RegExp(digit, 'g'), legend[digit])
    }

    return { ...user, password: scrambledPassword }
  })
})

function comparePasswords(userInput: string, storedPassword: string) {
  console.log(userInput)
  console.log(storedPassword)
  // Implement the logic to compare the user-provided password with the stored hashed password
  // You may use a suitable password hashing algorithm for comparison

  // Placeholder comparison logic (Replace this with a secure password hashing and comparison algorithm)
  return userInput === storedPassword
}

function checkPassword() {
  const userInput = passwordInput.value || ''
  const storedPasswords = passwordHasher.value.map((user) => user.password)

  for (const password of storedPasswords) {
    if (comparePasswords(userInput, password)) {
      isAuthenticated.value = true
      console.log('Password is correct. User is authenticated.')
      return
    }
  }

  isAuthenticated.value = false
  console.log('Password is incorrect. User authentication failed.')
}

function handleAuthLogin() {
  comparePasswords(usernameInput.value as string, credentials[0].password)
  buttonLoadingState.value = 'loading'

  if (usernameInput.value === 'ryan' && passwordInput.value === '123') {
    setTimeout(() => {
      buttonLoadingState.value = 'success'
    }, 2000)

    setTimeout(() => {
      buttonLoadingState.value = 'idle'
      return (isAuthenticated.value = true)
    }, 4000)
  } else {
    setTimeout(() => {
      buttonLoadingState.value = 'failed'
      return (isAuthenticated.value = false)
    }, 2000)
  }
  setTimeout(() => {
    buttonLoadingState.value = 'idle'
  }, 4000)
}

function handleLogout() {
  isAuthenticated.value = false
}

function init() {
  NutrientReportCopy.value = { ...NutrientReport } as ReportData
}

init()
</script>

<template>
  <div v-if="!isAuthenticated" class="flex w-full p-10 text-center justify-center items-center flex-col">
    Login Page
    <input type="text" class="bg-gray-1 p-3 rounded-xl m-2" v-model="usernameInput" />
    <input type="password" class="bg-gray-1 p-3 rounded-xl" v-model="passwordInput" />
    <button
      :disabled="!usernameInput || !passwordInput"
      :class="[
        !usernameInput || !passwordInput ? 'bg-gray-1 cursor-not-allowed' : '',
        buttonLoadingState === 'idle' && usernameInput && passwordInput ? '' : '',
        buttonLoadingState === 'disabled' ? 'bg-gray-1' : '',
      ]"
      @click="handleAuthLogin"
      class="p-2 rounded-[80px] w-[100px] text-white cursor-pointer transition active:scale-90 my-2 bg-red"
    >
      {{ buttonLoadingState === 'loading' ? 'Loading...' : buttonLoadingState === 'success' ? 'Sucess' : buttonLoadingState === 'failed' ? 'Failed' : 'Login' }}
    </button>

    <div class="flex flex-col">
      <div>LOCK 1: {{ 'ryan' === usernameInput ? 'TRUE' : 'FALASE' }}</div>
      <div>LOCK 2: {{ '123' === passwordInput ? 'TRUE' : 'FALASE' }}</div>
    </div>
  </div>

  <button @click="checkPassword">checkPassword</button>
  {{ passwordHasher }}
  {{ passwordInput }}
  <div v-if="isAuthenticated">
    <div class="p-4 flex justify-between">
      <div class="opacity-50">
        <div>
          {{ NutrientReport.name }}
        </div>
        <div>
          {{ NutrientReport.reportingData }}
        </div>
      </div>
      <button @click="handleLogout" class="p-2 bg-red rounded-[80px] w-[100px] text-white cursor-pointer transition active:scale-90 my-2">Sign Out</button>
    </div>
    <!-- Categories -->
    <div class="flex justify-center items-center py-4">
      <div class="flex w-auto">
        <div
          v-for="(category, idx) in NutrientDataWithAllCategory?.nutrientCategories"
          :key="idx"
          class="px-3 py-1 m-2 cursor-pointer w-[90px] rounded-[80px] flex justify-center items-center"
          :class="[selectedNutrientCategory === category.nutrientCategory ? 'bg-red text-white' : 'bg-white text-red']"
          @click="selectedNutrientCategory = category.nutrientCategory"
        >
          {{ category.nutrientCategory }}
        </div>
      </div>
    </div>

    <!-- Component -->
    <div v-for="(NutrientData, idx) in filteredNutrientData?.nutrientCategories" :key="idx" class="bg-gray-4 m-4 text-white p-10 rounded-xl shadow-md">
      <div class="flex font-bold text-[32px] items-center">
        {{ NutrientData.nutrientCategory }}
        <div class="flex text-sm ml-3 items-center">
          <div>
            {{ NutrientData.nutrientTestResult }}
          </div>
          <div>
            {{ NutrientData.nutrientTestUnit }}
          </div>
        </div>
      </div>
      {{ NutrientData.description }}
      <div v-for="(solution, idx) in NutrientData.recommendedSolutions" :key="idx" class="opacity-50 text-sm">
        {{ solution }}
      </div>
    </div>
  </div>
</template>
