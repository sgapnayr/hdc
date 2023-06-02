<script setup lang="ts">
// IMPORTS ********************************************************************
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

// MEMBER DATA ****************************************************************
const data = reactive({
  email: '',
})

// VALIDATION ****************************************************************
const rules = {
  email: { required, email },
}

const v$ = useVuelidate(rules, data)

// METHODS ****************************************************************
function handleTest() {
  console.log('Test s')
}
</script>

<template>
  <div>
    <BaseButton />
  </div>
</template>
