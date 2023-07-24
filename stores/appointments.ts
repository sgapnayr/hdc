import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppointmentsStore = defineStore('appointments', () => {
  const allAppointments = ref([])

  async function getAllAppointments() {
    try {
      const response = await axios.get('http://localhost:3000/getAllEvents')
      allAppointments.value = response.data
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    }
  }

  return { allAppointments, getAllAppointments }
})
