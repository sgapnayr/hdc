<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useProfileStore } from '~/stores/profile'
import CaretIcon from '@/assets/icons/caret-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'captured',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const router = useRouter()
const user = useAuthenticator()

onMounted(() => {
  watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })
})

// STORE **********************************************************************
const profileStore = useProfileStore()

// STATE *********************************************************************
const treatmentHistoryOrDocumentsSelected = ref<'Treatment History' | 'Documents'>('Treatment History')
const isOpen = ref<any[]>([])
const isSelected = ref('Treatment History')

// METHODS *********************************************************************
function handleOpen(idx: string) {
  if (!isOpen.value.includes(idx)) {
    isOpen.value.push(idx)
  } else {
    const deleteIdx = isOpen.value.indexOf(idx)
    isOpen.value.splice(deleteIdx, 1)
  }
}

function handleSelected(selectedVal: string) {
  isSelected.value = selectedVal
}


</script>

<template>
  <BaseWrapper>
    <div class="flex py-8 gap-x-6">
      <!-- Left Side -->
      <BasePatientViewHistoryCard />

      <!-- Right Side (Treatment history & Documents) -->
      <div class="w-1/2 rounded-[8px] flex flex-col">
        <div class="bg-white flex px-8 gap-x-6">
          <div
            @click="treatmentHistoryOrDocumentsSelected = 'Treatment History'"
            class="py-6 cursor-pointer"
            :class="[treatmentHistoryOrDocumentsSelected === 'Treatment History' ? 'text-honeydew-purple border-b-2 border-b-honeydew-purple' : '']"
          >
            Treatment History
          </div>
          <div
            @click="treatmentHistoryOrDocumentsSelected = 'Documents'"
            class="py-6 cursor-pointer"
            :class="[treatmentHistoryOrDocumentsSelected === 'Documents' ? 'text-honeydew-purple border-b-2 border-b-honeydew-purple' : '']"
          >
            Documents
          </div>
        </div>

        <!-- Treatment History -->
        <div v-if="treatmentHistoryOrDocumentsSelected === 'Treatment History'" class="p-8">
          <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Medical background</h1>
          <div v-for="(data, idx) in profileStore.profileData" :key="idx" class="w-full rounded-lg mt-[32px]">
            <div class="mb-[32px]" v-for="(medicalItem, jdx) in data.medicalBackground" :key="jdx">
              <div @click="handleOpen(medicalItem.title)" class="flex justify-start cursor-pointer text-[18px] font-[500] mb-[16px]">
                <div class="transition flex justify-center items-center mr-[12px]" :class="[isOpen.includes(medicalItem.title) ? '' : '-rotate-90']">
                  <img :src="CaretIcon" alt="Caret Icon" />
                </div>
                {{ medicalItem.title }}
              </div>
              <div
                v-for="(itemDesc, kdx) in medicalItem.content"
                :key="kdx"
                :class="[isOpen.includes(medicalItem.title) ? '' : 'hidden']"
                class="flex w-full justify-between mb-[16px]"
              >
                <div class="w-1/2 text-gray-5 font-[400]">
                  {{ itemDesc.name }}
                </div>
                <div class="w-1/2 flex justify-start text-gray-5 font-[400]">
                  {{ itemDesc.value }}
                </div>
              </div>
            </div>

            <!-- End Of Treatment History -->
          </div>
        </div>

        <!-- Documents -->
        <div v-if="treatmentHistoryOrDocumentsSelected === 'Documents'" class="p-8">
          <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Documents</h1>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>
