import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllTasks, getAllTasksByAssignee, getAllTasksByPatient } from '@/lib/endpoints'

export const useTasksStore = defineStore('tasks', () => {
  // STATE ****************************************************************
  const allTasks = ref([])
  const assigneeTasks = ref([])
  const taskForPatient = ref([])
  const nextToken = ref(null)
  const nextTokenForAssigneeTasks = ref(null)

  // GETTERS ****************************************************************
  async function getAllTasksFromGraphQL() {
    try {
      const response = await getAllTasks(nextToken.value)
      const mappedData = response.tasks.map(mapTaskToFrontend)

      const taskIdMap = new Map(allTasks.value.map((task) => [task.taskId, task]))

      for (const newTask of mappedData) {
        if (!taskIdMap.has(newTask.taskId)) {
          allTasks.value.push(newTask)
          taskIdMap.set(newTask.taskId, newTask)
        }
      }

      nextToken.value = response.nextToken
    } catch (error) {
      console.error('Error retrieving tasks:', error)
    }
  }

  async function getAllTasksFromGraphQLByAssignee(assigneeId: string, limit = 10) {
    try {
      const response = await getAllTasksByAssignee(assigneeId, limit, nextTokenForAssigneeTasks.value)
      const mappedData = response.tasks.map(mapTaskToFrontend)
      // Append new tasks or replace existing ones based on the presence of a nextToken
      if (nextTokenForAssigneeTasks.value) {
        assigneeTasks.value.push(...mappedData)
      } else {
        assigneeTasks.value = mappedData
      }
      nextTokenForAssigneeTasks.value = response.nextToken
    } catch (error) {
      console.error('Error retrieving tasks:', error)
    }
  }

  // Fetch more tasks for assignee
  async function loadMoreTasksByAssignee(assigneeId: string, limit = 10) {
    if (nextTokenForAssigneeTasks.value) {
      await getAllTasksFromGraphQLByAssignee(assigneeId, limit)
    }
  }

  async function getAllTasksFromGraphQLByPatient(patientId: string) {
    try {
      const response = await getAllTasksByPatient(patientId)
      console.log(response.tasks.map((task) => task.isPatientTask))
      const mappedData = response.tasks.map(mapTaskToMinimalFrontend)
      taskForPatient.value = mappedData
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  // HELPER FUNCTION TO MAP TASKS ********************************************
  function mapTaskToFrontend(task: any) {
    return {
      taskId: task.taskId,
      taskPatientFirstName: task.patientId?.patientProfile?.patientFirstName || '{patientFirstName}',
      taskPatientLastName: task.patientId?.patientProfile?.patientLastName || '{patientLastName}',
      taskCareCoordinator: '',
      taskStatus: task.status || '',
      taskPriority: task.priority || 'low',
      taskType: task.type || 'New patient',
      taskComments: task.description || '',
      taskAssignedAt: task.taskAssignedAt,
      taskDueAt: task.dueDate,
      isPatientTask: task.isPatientTask === null ? false : task.isPatientTask,
    }
  }

  function mapTaskToMinimalFrontend(task: any) {
    return {
      taskId: task.taskId,
      taskAssignedAt: task.taskAssignedAt,
      taskComments: task.description || '',
      taskCareCoordinator: '',
      taskStatus: task.status || '',
      taskPriority: task.priority || 'low',
      taskType: task.type || 'New patient',
      isPatientTask: task.isPatientTask === null ? false : task.isPatientTask,
    }
  }

  return {
    allTasks,
    nextToken,
    assigneeTasks,
    taskForPatient,
    getAllTasksFromGraphQL,
    getAllTasksFromGraphQLByAssignee,
    getAllTasksFromGraphQLByPatient,
    loadMoreTasksByAssignee,
  }
})
