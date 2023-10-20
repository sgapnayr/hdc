<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref, computed } from 'vue'
import BaseWrapper from '~/components/BaseWrapper.vue'
import PencilIcon from '@/assets/icons/pencil-icon.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import PlusIcon from '@/assets/icons/plus-circle.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { Patient, Patients } from '@/types/patient-types'
import { useMedicationStore } from '@/stores/medications'
import { createMedication, createTreatmentPlan, updateMedication } from '~/lib/endpoints'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'in-app',
  middleware: ['auth'],
})

// STORE **********************************************************************
const medicationsStore = useMedicationStore()

// ROUTER **********************************************************************
const user = useAuthenticator()

onMounted(() => {
  const unmountWatcher = watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })

  onBeforeUnmount(() => {
    unmountWatcher()
  })
})

// TYPES **********************************************************************
interface TableHeaderCategory {
  role: string
  categories: { text: string }[]
}

type TimeSelection = 'Morning' | 'Evening'

// STATE **********************************************************************
const tabSelected = ref<'Medicine' | 'Treatment Plans'>('Medicine')
const patientList = ref()

const newMedicationName = ref()
const newMedicationStrength = ref()
const newMedicationSize = ref()
const newMedicationInstructions = ref<TimeSelection[]>([])
const newMedicationSpecialInstructions = ref()
const newMedicationRefills = ref()
const newMedicationRefillExpirationInDays = ref()

const newTreatmentPlanName = ref()
const treatmentGroups = ref([''])

// MEMBER DATA ****************************************************************
const tableHeaderCategories: TableHeaderCategory[] = [
  {
    role: 'admin', // Change for admin, care coord. etc
    categories: [
      { text: 'Treatment' },
      { text: 'Instructions' },
      { text: 'Special Instructions' },
      { text: 'Refills' },
      { text: 'Refill Expiration Rate (days)' },
      { text: 'Actions' },
    ],
  },
]

// METHODS ****************************************************************
const inputsValid = computed(() => {
  return (
    !newMedicationName.value ||
    !newMedicationStrength.value ||
    !newMedicationSpecialInstructions.value ||
    !newMedicationRefills.value ||
    !newMedicationRefillExpirationInDays.value ||
    newMedicationInstructions.value.length === 0
  )
})

async function handleCreateMedicine() {
  if (!inputsValid) return

  const instructionsString = newMedicationInstructions.value.join(', ')

  await createMedication(
    newMedicationName.value,
    newMedicationStrength.value,
    newMedicationSpecialInstructions.value,
    newMedicationRefills.value,
    newMedicationRefillExpirationInDays.value,
    instructionsString
  )

  newMedicationName.value = ''
  newMedicationStrength.value = ''
  newMedicationSpecialInstructions.value = ''
  newMedicationRefills.value = ''
  newMedicationRefillExpirationInDays.value = ''

  medicationsStore.getMedicationsFromGraphQL()
}

async function updateMedicine(medicationId: string) {
  if (!inputsValid) return

  const instructionsString = newMedicationInstructions.value.join(', ')

  await updateMedication(
    medicationId,
    newMedicationName.value
    // newMedicationStrength.value,
    // newMedicationSpecialInstructions.value,
    // newMedicationRefills.value,
    // newMedicationRefillExpirationInDays.value,
    // instructionsString
  )

  newMedicationName.value = ''
  newMedicationStrength.value = ''
  newMedicationSpecialInstructions.value = ''
  newMedicationRefills.value = ''
  newMedicationRefillExpirationInDays.value = ''

  medicationsStore.getMedicationsFromGraphQL()
}

async function handleCreateTreatmentPlan() {
  if (!inputsValid) return
  const planName = toRaw(newTreatmentPlanName.value)
  const groupArray = medArr.value
  let topArray = []
  for (let i = 0; i < groupArray.length; i++) {
    topArray.push({ medicationsIds: toRaw(groupArray[i]) })
  }
  let finalObject = { groups: topArray }
  finalObject.treatmentName = planName
  console.log('called to create new treatment plan', finalObject)
  chesterTreatmentGroupPayload.value = { treatmentGroup: newTreatmentPlanName, medArr }
  await createTreatmentPlan(finalObject)
}

const toggleTime = (time: TimeSelection, isSelected: boolean): void => {
  if (isSelected) {
    newMedicationInstructions.value.push(time)
  } else {
    const index = newMedicationInstructions.value.indexOf(time)
    if (index !== -1) {
      newMedicationInstructions.value.splice(index, 1)
    }
  }
}

async function handleDeleteMedicine(medicationId: string) {
  // axios.delete("CHESTER_ENDPOINT/" + medicationId) // PAYLOAD FOR CHESTER MEDICINE DELETE
  // or GRAPH_QL delete mutation needs to be configured
  // SEE deleteMedication endpoint in endpoints.js
  // await deleteMedication(medicationId)
}

medicationsStore.getMedicationsFromGraphQL()
medicationsStore.getTreatmentPlansFromGraphQL()

// PAYLOAD FOR CHESTER
const medArr = ref([])
const chesterTreatmentGroupPayload = ref()

function getMedicationsArr(medicationObject: { id: number; medicationId: string; jdx: number }, idx: number) {
  const { id, medicationId, jdx } = medicationObject

  if (!medArr.value[idx]) {
    medArr.value[idx] = []
  }

  medArr.value[idx].push(medicationId)
  console.log(medArr.value)
}

function clearMedicationArr() {
  medArr.value = []
}
</script>

<template>
  <div class="w-full py-8">
    <BaseWrapper>
      <!-- Manage Team Top -->
      <div class="w-full">
        <div class="flex justify-between w-full flex-col md:flex-row">
          <div class="text-[32px] font-[500] text-[#403E48]">Medications</div>
          <div class="flex mb-4 md:mb-auto">
            <!-- Create New Buttons -->
            <div v-if="tabSelected === 'Medicine'" class="flex">
              <BaseModal :button-state="inputsValid ? 'disabled' : ''" @action-click="handleCreateMedicine" :custom-header="true">
                <template #button>
                  <div
                    class="text-[12px] h-[40px] flex justify-center items-center rounded-[60px] bg-[#EEEBFC] text-honeydew-purple uppercase cursor-pointer mt-[16px] text-center whitespace-nowrap px-4"
                  >
                    <div class="mr-[6px]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.5V12.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.5 8H3.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    Create New Medicine
                  </div>
                </template>
                <template #content>
                  <div class="md:w-[500px] grow">
                    <div class="mb-4 text-[16px]">Add New Medication</div>
                    <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Name</p>
                    <input
                      v-model="newMedicationName"
                      class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                      placeholder="Absorica Micronized"
                    />
                    <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Strength</p>
                    <input
                      v-model="newMedicationStrength"
                      class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                      placeholder="16mg"
                    />
                    <!-- <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Size</p>
                    <input
                      v-model="newMedicationSize"
                      class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                      placeholder="60 capsules"
                    /> -->
                    <div class="flex flex-col gap-y-4 my-6">
                      <BaseCheckBox @checkbox-selected="(val) => toggleTime('Morning', val)"> Morning</BaseCheckBox>
                      <BaseCheckBox @checkbox-selected="(val) => toggleTime('Evening', val)"> Evening</BaseCheckBox>
                    </div>
                    <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">SPECIAL INSTRUCTIONS</p>
                    <input
                      v-model="newMedicationSpecialInstructions"
                      class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                      placeholder="Take one in the morning and one at night"
                    />
                    <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">REFILL COUNT</p>
                    <input
                      v-model="newMedicationRefills"
                      class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                      placeholder="1"
                      type="number"
                    />
                    <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">REFILL EXPIRATION RATE (DAYS)</p>
                    <input
                      v-model="newMedicationRefillExpirationInDays"
                      class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                      placeholder="45"
                      type="number"
                    />
                  </div>
                </template>
              </BaseModal>
            </div>

            <div v-if="tabSelected === 'Treatment Plans'" class="flex">
              <BaseModal @modal-closing="clearMedicationArr" @action-click="handleCreateTreatmentPlan" :custom-header="true">
                <template #button>
                  <div
                    class="text-[12px] h-[40px] flex justify-center items-center rounded-[60px] bg-[#EEEBFC] text-honeydew-purple uppercase cursor-pointer mt-[16px] text-center whitespace-nowrap px-4"
                  >
                    <div class="mr-[6px]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.5V12.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.5 8H3.5" stroke="#5E39F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    Create New Treatment Plan
                  </div>
                </template>
                <template #content>
                  <div class="md:w-[400px] overflow-scroll no-scrollbars">
                    <div class="mb-4 text-[16px]">Add New Plan</div>
                    <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Name</p>
                    <input v-model="newTreatmentPlanName" class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4 mb-4" />
                    <div class="overflow-scroll h-96 no-scrollbars">
                      <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Groups</p>
                      <div v-for="(group, idx) in treatmentGroups" :key="idx">
                        <BaseInputGroup
                          :treatmentGroups="treatmentGroups"
                          :idx="idx"
                          @add-group="treatmentGroups.push('')"
                          @remove-group="treatmentGroups.splice(idx, 1)"
                          @medications-id-arr="(medicationsIdArr) => getMedicationsArr(medicationsIdArr, idx)"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </BaseModal>
            </div>
          </div>
        </div>
        <div class="text-[16px] font-[400] text-[#403E48]">Edit details, add a new medication, remove medication, etc.</div>
      </div>

      <!-- Table -->
      <div class="table-container">
        <div class="bg-white px-8 pb-8 rounded-[16px] flex justify-between w-full flex-col mt-[32px] shadow-sm min-w-[1244px]">
          <!-- Tabs -->
          <div class="flex text-[16px] font-[400] gap-x-8">
            <div
              :class="[tabSelected === 'Medicine' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
              class="h-full py-4 cursor-pointer"
              @click="tabSelected = 'Medicine'"
            >
              Medicine
            </div>
            <div
              :class="[tabSelected === 'Treatment Plans' ? 'border-b-2 border-b-honeydew-purple text-honeydew-purple' : 'border-b-2 border-b-white']"
              class="h-full py-4 cursor-pointer"
              @click="tabSelected = 'Treatment Plans'"
            >
              Treatment Plans
            </div>
          </div>

          <!-- Medicine Table -->
          <div v-if="tabSelected === 'Medicine'" class="bg-white">
            <!-- Table Header -->
            <div class="mt-[24px]">
              <div
                v-for="(tableHeaderCategory, idx) in tableHeaderCategories"
                :key="idx"
                class="grid grid-cols-6 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full"
              >
                <div
                  v-for="(category, jdx) in tableHeaderCategory.categories"
                  :key="jdx"
                  :class="[category.text === 'Full name' ? 'col-span-2' : 'col-span-1']"
                >
                  <div :class="[category.text === 'Actions' ? 'w-full flex justify-end' : '']">
                    {{ category.text }}
                  </div>
                </div>
              </div>
              {{ patientList?.patients }}
            </div>

            <!-- Table Medicine -->
            <div
              v-for="(medication, idx) in medicationsStore.medicationData"
              :key="idx"
              :class="[idx === medicationsStore.medicationData.length - 1 ? 'rounded-b-[16px]' : '']"
              class="grid grid-cols-6 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
            >
              <div class="whitespace-pre-wrap w-1/2 flex items-center">
                {{ medication.medicationName || '-' }}
                <span class="opacity-30 ml-1 text-xs">{{ medication.medicationStrength ? `(${medication.medicationStrength}mg)` : '' }}</span>
              </div>
              <div class="whitespace-pre-wrap w-1/2">{{ medication.medicationInstructions || '-' }}</div>
              <div class="whitespace-pre-wrap w-1/2">{{ medication.medicationSpecialInstructions || '-' }}</div>
              <div>{{ medication.medicationRefills || '-' }}</div>
              <div>{{ medication.medicationRefillExpirationInDays || '-' }}</div>
              <div class="w-full flex justify-end gap-x-3">
                <BaseModal :button-state="inputsValid ? 'disabled' : ''" @action-click="updateMedicine(medication.medicationId)" :custom-header="true">
                  <template #button>
                    <img class="cursor-pointer" :src="PencilIcon" alt="Pencil Icon" />
                  </template>
                  <template #content>
                    <div class="md:w-[500px] grow">
                      <div class="mb-4 text-[16px]">Update Medication</div>
                      <p class="mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Name</p>
                      <input
                        v-model="newMedicationName"
                        class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                        :placeholder="medication.medicationName"
                      />
                      <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">Strength</p>
                      <input
                        v-model="newMedicationStrength"
                        class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                        :placeholder="medication.medicationStrength"
                      />
                      <div class="flex flex-col gap-y-4 my-6">
                        <BaseCheckBox @checkbox-selected="(val) => toggleTime('Morning', val)"> Morning</BaseCheckBox>
                        <BaseCheckBox @checkbox-selected="(val) => toggleTime('Evening', val)"> Evening</BaseCheckBox>
                      </div>
                      <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">SPECIAL INSTRUCTIONS</p>
                      <input
                        v-model="newMedicationSpecialInstructions"
                        class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                        :placeholder="medication.medicationSpecialInstructions"
                      />
                      <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">REFILL COUNT</p>
                      <input
                        v-model="newMedicationRefills"
                        class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                        :placeholder="medication.medicationRefills"
                        type="number"
                      />
                      <p class="mt-4 mb-[8px] px-4 uppercase text-[12px] text-[#403E48]">REFILL EXPIRATION RATE (DAYS)</p>
                      <input
                        v-model="newMedicationRefillExpirationInDays"
                        class="border border-[#E1E0E6] bg-[#F9F9FA] rounded-[80px] h-[44px] w-full px-4"
                        :placeholder="medication.newMedicationRefillExpirationInDays"
                        type="number"
                      />
                    </div>
                  </template>
                </BaseModal>
                <BaseModal @action-click="handleDeleteMedicine(medication.medicationId)">
                  <template #button>
                    <img class="cursor-pointer" :src="DeleteIcon" alt="Delete Icon" />
                  </template>
                  <template #content> Are you sure? </template>
                </BaseModal>
              </div>
            </div>
          </div>

          <!-- Treatment Plans Table -->
          <div v-if="tabSelected === 'Treatment Plans'" class="bg-white">
            <!-- Table Header -->
            <div class="mt-[24px]">
              <div class="grid grid-cols-3 text-[12px] px-[24px] py-[16px] border rounded-t-[16px] border-honeydew-bg2 font-[500] text-gray-5 uppercase w-full">
                <div>Name</div>
                <div>Medicine</div>
                <div class="w-full text-end">Actions</div>
              </div>
              {{ patientList?.patients }}
            </div>
            <!-- Table Medicine -->
            <div
              v-for="(treatment, idx) in medicationsStore.treatmentData"
              :key="idx"
              :class="[idx === medicationsStore.treatmentData.length - 1 ? 'rounded-b-[16px]' : '']"
              class="grid grid-cols-3 text-[14px] py-[20px] px-[24px] whitespace-nowrap hover:bg-honeydew-bg2 cursor-pointer border-b border-x border-honeydew-bg2"
            >
              <div>{{ treatment.treatmentName }}</div>
              <div>
                <div
                  v-for="(group, jdx) in treatment.treatmentGroups"
                  :key="jdx"
                  class="flex flex-col whitespace-pre-wrap py-2"
                  :class="jdx === treatment.treatmentGroups.length - 1 ? '' : 'border-b'"
                >
                  <div v-for="(medicines, kdx) in group" :key="kdx" class="flex-wrap flex">
                    <div v-for="(medicine, ldx) in medicines">{{ medicine.name }} {{ ldx !== medicines.length - 1 ? ' | ' : '' }}</div>
                  </div>
                </div>
              </div>
              <div class="w-full flex justify-end gap-x-3">
                <BaseModal>
                  <template #button>
                    <img class="cursor-pointer" :src="PencilIcon" alt="Pencil Icon" />
                  </template>
                </BaseModal>
                <BaseModal>
                  <template #button>
                    <img class="cursor-pointer" :src="DeleteIcon" alt="Delete Icon" />
                  </template>
                  <template #content> Are you sure? </template>
                </BaseModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  </div>
</template>

<style scoped>
*:focus {
  text-decoration: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

input::placeholder,
input {
  font-weight: 400;
  font-size: 16px;
  text-align: start;
}

.modal-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1; /* Adjust the z-index value as needed */
}

.table-container {
  overflow-x: auto; /* Enable horizontal scrolling */
}

.no-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.no-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}
</style>
