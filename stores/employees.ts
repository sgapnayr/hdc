import { defineStore } from 'pinia'
import { getEmployees } from '@/lib/endpoints'

export const useEmployeeStore = defineStore('employees', () => {
  const allEmployees = ref()

  async function getAllEmployeesGraphQL() {
    const response = await getEmployees()
    allEmployees.value = response
  }

  return { allEmployees, getAllEmployeesGraphQL }
})
