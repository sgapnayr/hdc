import { defineStore } from 'pinia'
import { getMedications, getTreatmentPlans } from '~/lib/endpoints'

export const useMedicationStore = defineStore('medication', () => {
  const medicationData = ref([])
  const treatmentData = ref()
  const selectedPatientTreatmentPlan = ref()
  const selectedTreatmentGroupState = ref()
  const nextToken = ref(null)

  // HELPER FUNCTIONS ********************************************************
  function mapMedicationData(medications: any[]) {
    return medications.map((medication) => ({
      medicationId: medication.medicationId,
      medicationName: medication.name,
      medicationStrength: medication.strength,
      medicationInstructions: medication.instructions,
      medicationSpecialInstructions: medication.specialInstructions,
      medicationRefills: medication.refills,
      medicationRefillExpirationInDays: medication.refillsExpirationRate,
    }))
  }

  // GETTERS *****************************************************************
  async function fetchMedications() {
    try {
      const response = await getMedications(nextToken.value)
      const mappedData = mapMedicationData(response.medications)
      medicationData.value = [...medicationData.value, ...mappedData]
      nextToken.value = response.nextToken
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchTreatmentPlans() {
    try {
      const response = await getTreatmentPlans()
      treatmentData.value = response
    } catch (err) {
      console.log('error getting treatment plans: ', err)
    }
  }

  return {
    medicationData,
    treatmentData,
    nextToken,
    fetchMedications,
    fetchTreatmentPlans,
    selectedPatientTreatmentPlan,
    selectedTreatmentGroupState,
  }
})
