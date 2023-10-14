import { defineStore } from 'pinia'
import { getMedications, getTreatmentPlans } from '~/lib/endpoints'

export const useMedicationStore = defineStore('medication', () => {
  const medicationData = ref()
  const treatmentData = ref()
  const selectedPatientTreatmentPlan = ref()
  const selectedTreatmentGroupState = ref()

  // GETTERS ****************************************************************
  async function getMedicationsFromGraphQL() {
    try {
      const response = await getMedications()
      const mappedData = response.medications.map((medication: any) => {
        const frontendMedication = {
          medicationId: medication.medicationId,
          medicationName: medication.name,
          medicationStrength: medication.strength,
          medicationInstructions: medication.instructions,
          medicationSpecialInstructions: medication.specialInstructions,
          medicationRefills: medication.refills,
          medicationRefillExpirationInDays: medication.refillsExpirationRate,
        }
        return frontendMedication
      })
      medicationData.value = mappedData
    } catch (err) {
      console.log(err)
    }
  }

  async function getTreatmentPlansFromGraphQL() {
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
    getMedicationsFromGraphQL,
    getTreatmentPlansFromGraphQL,
    selectedPatientTreatmentPlan,
    selectedTreatmentGroupState,
  }
})
