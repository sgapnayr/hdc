import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllTasks, getTaskByAssignee, getAllTasksByAssignee, getAllTasksByPatient } from '@/lib/endpoints'

export const useTasksStore = defineStore('tasks', () => {
  // STATE ****************************************************************
  const workouts = [
    {
      workoutId: 1,
      workoutName: 'Push Up',
      workoutReps: 10,
    },
  ]
})
