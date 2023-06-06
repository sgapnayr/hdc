<!-- 
Base Input is a well rounded component, in which we can easily pass labels into the slot... like such
  <BaseInput>Insert Label Here<BaseInput>

We can use this in the parent component very easily, like such...
  <BaseInput v-model="yourVariableHere">Insert Label Here<BaseInput>

We can pass form validation messages... heres what that may look like in the parent

  1) Import validation
  import useVuelidate from '@vuelidate/core'
  import { required, sameAs } from '@vuelidate/validators'

  2) Set up validation in your script

  VALIDATION **********************************************************************
  const data = computed(() => {
    return {
      firstName: profileStore.localProfile.firstName,
      addressCityOrZipCode: appointmentStore.centerPoint,
      overEighteen: profileStore.overEighteen
    }
  })

  const rules = {
    firstName: { required },
    addressCityOrZipCode: { required },
    overEighteen: { required, sameAs: sameAs(true) }
  }

  const v$ = useVuelidate(rules, data)

  const validationMessage = computed(() => (field: string) => {
    const fieldValue = v$.value[field]
    if (fieldValue?.$invalid) {
      return fieldValue?.$errors.map((error: {$message: string}) => error.$message)[0]
    }
  })

  3) Set up your template with our component and attributes
  <template>
    <BaseInput
      p-input-type="text"
      v-model="profileStore.firstName" // Whatever you need to v-model
      class="mt-[32px]" // Whatever classes you need
      placeholder="First Name" // Whatever placeholder you need
      :validation-message="validationMessage('firstName')" // Here is how to set up validation
      @blur="v$.firstName.$touch" // You need to 'blur' for validation to work (i.e. when you click off the input)
    >
      What's your first name?
    </BaseInput>
  </template>

Also we have access to the password being visible or invisible, we can also choose for this inputType to be a 'phone-number' and that will
auto format your code into a phone number format...

(Use all of these attributes in conjunction with eachother)

Enjoy!

-->

<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import EyeIcon from '@/assets/icons/eye-icon.svg'
import { vMaska } from 'maska'

// EMITS ****************************************************************
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): string
  (event: 'blur'): boolean
}>()

// PROPS ****************************************************************
const props = withDefaults(
  defineProps<{
    modelValue?: string
    pInputType: 'text' | 'password' | 'phone-number'
    placeholder?: string
    validationMessage?: string
  }>(),
  {
    pInputType: 'text',
    placeholder: 'Enter Here...',
    validationMessage: '',
  }
)

// STATE ****************************************************************
const isPasswordHidden = ref<boolean>(true)
const inputType = ref<'password' | 'text' | 'phone-number'>(props.pInputType)

// METHODS ****************************************************************
function toggleInputField() {
  if (inputType.value === 'password') {
    inputType.value = 'text'
    isPasswordHidden.value = false
    return
  }
  isPasswordHidden.value = true
  inputType.value = 'password'
}
</script>

<template>
  <div>
    <div class="mb-[10px] whitespace-nowrap text-[14px] md:text-[19px]">
      <slot> </slot>
    </div>
    <div class="w-[370px] h-[60px] rounded-[60px] outline-none bg-white flex justify-between items-center border border-gray-2">
      <input
        v-if="pInputType === 'text' || 'password'"
        :value="modelValue"
        @blur="emit('blur')"
        class="ml-4 outline-none bg-none w-11/12 h-9"
        :type="inputType"
        :placeholder="placeholder"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <input
        v-if="pInputType === 'phone-number'"
        v-maska
        :data-maska="['+' + '1' + ' (###) ###-####']"
        :value="modelValue"
        @blur="emit('blur')"
        class="ml-4 outline-none"
        :type="inputType"
        :placeholder="placeholder"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <img
        @click="toggleInputField"
        v-if="pInputType === 'password'"
        :class="isPasswordHidden ? 'opacity-20' : ''"
        class="w-[30px] mr-6 cursor-pointer"
        :src="EyeIcon"
        alt="Eye Icon"
      />
    </div>
    <div v-if="validationMessage" class="text-red text-sm absolute">
      {{ validationMessage }}
    </div>
  </div>
</template>

<style scoped>
input::placeholder,
input {
  font-weight: 300;
  font-size: 16px;
  text-align: start;
  display: flex;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
