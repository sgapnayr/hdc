import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllTasks, getTaskByAssignee, getAllTasksByAssignee, getAllTasksByPatient } from '@/lib/endpoints'

export const useTasksStore = defineStore('tasks', () => {
  // STATE ****************************************************************
  const allTasks = ref()
  const assigneeTasks = ref()
  const taskForPatient = ref()

  // GETTERS ****************************************************************
  async function getAllTasksFromGraphQL() {
    try {
      const response = await getAllTasks()
      const mappedData = response.tasks.map((task: any) => {
        const frontendTask = {
          taskId: task.taskId,
          taskPatienFirstName: task.patientId?.patientProfile?.patientFirstName || '{patientFirstName}', // Use the patientLastName as the patient's name
          taskPatienLastName: task.patientId?.patientProfile?.patientLastName || '{patientLastName}', // Use the patientLastName as the patient's name
          taskCareCoordinator: '', // This field is not available in the backend response, set as an empty string
          taskStatus: task.status || '', // Use the status field as the task status
          taskPriority: task.priority || 'low', // This field is not available in the backend response, set as an empty string
          taskType: task.type || 'New patient', // Use the type field as the task type
          taskComments: task.description || '', // This field is not available in the backend response, set as an empty string
          taskAssignedAt: task.taskAssignedAt, // This field is not available in the backend response
          taskDueAt: task.dueDate,
        }
        return frontendTask
      })
      allTasks.value = mappedData
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  async function getAllTasksFromGraphQLByAssignee(assigneeId: string) {
    try {
      const response = await getAllTasksByAssignee(assigneeId)
      const mappedData = response.tasks.map((task: any) => {
        const frontendTask = {
          taskId: task.taskId,
          taskPatienFirstName: task.patientId?.patientProfile?.patientFirstName || '{patientFirstName}', // Use the patientLastName as the patient's name
          taskPatienLastName: task.patientId?.patientProfile?.patientLastName || '{patientLastName}', // Use the patientLastName as the patient's name
          taskCareCoordinator: '', // This field is not available in the backend response, set as an empty string
          taskStatus: task.status || '', // Use the status field as the task status
          taskPriority: task.priority || 'low', // This field is not available in the backend response, set as an empty string
          taskType: task.type || 'New patient', // Use the type field as the task type
          taskComments: task.description || '', // This field is not available in the backend response, set as an empty string
          taskAssignedAt: task.taskAssignedAt, // This field is not available in the backend response
          taskDueAt: task.dueDate,
        }
        return frontendTask
      })
      assigneeTasks.value = mappedData
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  async function getAllTasksFromGraphQLByPatient(patientId: string) {
    try {
      const response = await getAllTasksByPatient(patientId)
      const mappedData = response.tasks.map((task: any) => {
        const frontendTask = {
          taskId: task.taskId,
          taskAssignedAt: task.taskAssignedAt, // This field is not available in the backend response
          taskComments: task.description || '', // This field is not available in the backend response, set as an empty string
          taskCareCoordinator: '', // This field is not available in the backend response, set as an empty string
          taskStatus: task.status || '', // Use the status field as the task status
          taskPriority: task.priority || 'low', // This field is not available in the backend response, set as an empty string
          taskType: task.type || 'New patient', // Use the type field as the task type
        }
        return frontendTask
      })
      taskForPatient.value = mappedData
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  return { allTasks, getAllTasksFromGraphQL, getAllTasksFromGraphQLByAssignee, assigneeTasks, getAllTasksFromGraphQLByPatient, taskForPatient }
})
