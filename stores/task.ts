import { defineStore } from 'pinia'
import { getAllTasks } from '@/lib/endpoints'

export const useTasksStore = defineStore('tasks', () => {
  const allTasks = ref()

  // SETTERS ****************************************************************
  async function setAllTasks() {
    try {
      const response = await getAllTasks()
      allTasks.value = response.tasks
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  return { allTasks, setAllTasks }
})
