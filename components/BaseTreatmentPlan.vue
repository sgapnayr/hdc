<script setup lang="ts">
// TODO: Update Base Select Medicine needs an ID so I can delete the correct one
// TODO: Update Base Select Medicine need to store proper one in URL params to maintain state
// TODO: Save Changes needs to be an update endpoint

// IMPORTS ********************************************************************
import 'v-calendar/style.css'
import Datepicker from 'vuejs3-datepicker'
import { ref } from 'vue'
import { useMedicationStore } from '@/stores/medications'
import { useRouter, useRoute } from 'vue-router'
import DeleteIcon from '../assets/icons/delete-icon.svg'
import { getPatientTreatmentPlanId } from '@/lib/endpoints'









// STORES *********************************************************************
const medicationStore = useMedicationStore()

// COMPUTED ********************************************************************
const treatmentNames = computed(() => {
  return medicationStore?.treatmentData?.map((treatment) => treatment.treatmentName)
})

const selectedTreatmentGroupObj = computed(() => {
  return medicationStore?.treatmentData?.filter((treatmentGroup) => treatmentGroup.treatmentName == selectedTreatmentGroup.value)
})

const defaultTreatmentPlan = computed(() => {
  return medicationStore?.treatmentData?.map((treatmentGroup) => treatmentGroup.treatmentName)[0]
})

const selectedTreatmentGroupId = computed(() => {
  return medicationStore?.treatmentData?.map((treatmentGroup) => {
    return { treatmentName: treatmentGroup.treatmentName, treatmentId: treatmentGroup.treatmentId }
  })
})

// FUNCTIONS ********************************************************************
const updateSelectedTreatmentGroup = (val) => {
  addedTreatments.value = []
  selectedTreatmentGroup.value = val
  router.push({ query: { selectedTreatmentGroup: val } })

  medicationStore.selectedPatientTreatmentPlan = selectedTreatmentGroupId?.value?.filter(
    (group) => group.treatmentName == selectedTreatmentGroup.value
  )[0].treatmentId
}

const addTreatment = (treatment) => {
  addedTreatments.value.push({ treatment: treatment, id: Math.random() })
  updateUrl()
}

const updateUrl = () => {
  const addedTreatmentsStr = JSON.stringify(addedTreatments.value)
  router.push({ query: { ...router.currentRoute.value.query, addedTreatments: addedTreatmentsStr } })
}

function updatedSpecialInstruction(val: boolean, treatmentId: string) {
  return val, treatmentId
}

// STATE ********************************************************************
const patientCurrentTreatmentPlan = ref()
const selectedTreatmentGroup = ref(medicationStore?.treatmentData?.map((treatmentGroup) => treatmentGroup.treatmentName)[0])
const router = useRouter()
const route = useRoute()
const addedTreatments = ref([])

// INITIALIZATION *************************************************************
onMounted(() => {
  medicationStore.getMedicationsFromGraphQL()
  medicationStore.getTreatmentPlansFromGraphQL()
  getPatientTreatmentPlanId(route.params.patientId as string)
    .then((res) => (patientCurrentTreatmentPlan.value = res.data))
    .catch((err) => console.error(err))

  if (route.query.selectedTreatmentGroup) {
    selectedTreatmentGroup.value = route.query.selectedTreatmentGroup as string
  }

  const urlAddedTreatments = route.query.addedTreatments
  if (urlAddedTreatments) {
    try {
      addedTreatments.value = JSON.parse(urlAddedTreatments as string)
    } catch (error) {
      console.error('Error parsing addedTreatments from URL', error)
    }
  }
})
</script>

<template>
  <div class="mt-8 no-scrollbars">
    <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3">Update treatment plan</h1>
    <div class="mt-4 flex gap-x-4 z-10">
      <BaseDropDown @selected-option="updateSelectedTreatmentGroup" :options="treatmentNames" titleText="Treatment Plan" />
    </div>
    <div class="table-container">
      <div class="flex flex-col my-4 rounded-2xl shadow-sm no-scrollbars min-w-[1024px]">
        <div class="grid grid-cols-12 bg-[#F2F4F7] p-6">
          <div class="col-span-3">Treatment</div>
          <div class="col-span-2">Instructions</div>
          <div class="col-span-3">Special Instructions</div>
          <div class="col-span-1">Refills</div>
          <div class="col-span-2">Expiration</div>
          <div class="col-span-1">Action</div>
        </div>
        <div v-for="(treatmentGroup, idx) in selectedTreatmentGroupObj" class="w-full z-0">
          <div v-for="(treatment, idx) in treatmentGroup.treatmentGroups" class="w-full">
            <div
              v-for="(medicine, idx) in treatment.treatmentMedicines"
              class="w-full grid grid-cols-12 bg-white p-6 border-b border-b-gray-2 hover:bg-gray-2 items-center"
            >
              <div class="col-span-3">{{ medicine.name }}</div>
              <div class="col-span-2">{{ medicine.instructions }}</div>
              <div class="col-span-3 flex">
                <BaseCheckBox
                  @checkbox-selected="(val) => updatedSpecialInstruction(val, treatmentGroup.treatmentId)"
                  :isChecked="medicine.specialInstructions.split(',')[0]"
                  >AM</BaseCheckBox
                >
                <BaseCheckBox
                  @checkbox-selected="(val) => updatedSpecialInstruction(val, treatmentGroup.treatmentId)"
                  :isChecked="medicine.specialInstructions.split(',').length > 1"
                  >PM</BaseCheckBox
                >
              </div>
              <div class="col-span-1">{{ medicine.refills }}</div>
              <div class="col-span-2">{{ medicine.refillsExpirationRate }}</div>
              <div class="col-span-1">
                <img :src="DeleteIcon" alt="Delete Icon" />
              </div>
            </div>
          </div>
        </div>
        <div v-for="(medicine, idx) in addedTreatments" class="w-full grid grid-cols-12 bg-white p-6 border-b border-b-gray-2 items-center">
          <BaseSelectMedicineDropdown :key="idx" @remove-item="addedTreatments.splice(idx, 1)" :medicineData="medicationStore.medicationData" />
        </div>
      </div>
    </div>
    <div @click="addTreatment('')" class="flex text-honeydew-purple cursor-pointer hover:opacity-50 transition active:opacity-0">+ ADD TREATMENT</div>

    <div class="my-8 flex w-full gap-x-16">
      <div class="w-full">
        <h2 class="text-[24px] font-[500] leading-[40px] text-gray-3">Add message to patient</h2>
        <div class="w-full bg-white my-4 p-6 h-[168px] shadow-sm">
          <textarea class="w-full h-full outline-none focus:outline-none focus:ring-0 rounded" placeholder="Enter message here..."></textarea>
        </div>
      </div>
      <div class="w-full">
        <h2 class="text-[24px] font-[500] leading-[40px] text-gray-3 mb-4">Choose the follow-up date</h2>
        <datepicker :inline="true"></datepicker>
      </div>
    </div>
  </div>
</template>

<style>
.table-container {
  overflow-x: auto; /* Enable horizontal scrolling */
}
</style>
