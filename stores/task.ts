import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllTasks, getTaskByAssignee } from '@/lib/endpoints'
import { useProfileStore } from './profile'

export const useTasksStore = defineStore('tasks', () => {
  // STORE ****************************************************************
  const profileStore = useProfileStore()

  // STATE ****************************************************************
  const allTasks = ref()
  const assigneeTasks = ref()

  // SETTERS ****************************************************************
  async function setAllTasks() {
    try {
      const response = await getAllTasks()
      allTasks.value = response.tasks
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  async function setAssigneeTasks() {
    try {
      const response = await getTaskByAssignee()
      assigneeTasks.value = response.tasks
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  return { allTasks, setAllTasks, setAssigneeTasks, assigneeTasks }
})
