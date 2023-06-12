import { defineStore } from 'pinia'
import { getMyProfile, getPatients, getPatient } from '@/lib/endpoints'

export const usePatientStore = defineStore('patient', () => {
  const allPatients = ref()

  // SETTERS ****************************************************************
  async function getAllPatients() {
    try {
      const response = await getPatients()
      allPatients.value = response
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }
  return { allPatients, getAllPatients }
})
