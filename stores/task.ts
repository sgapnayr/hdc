import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllTasks, getTaskByAssignee } from '@/lib/endpoints'

export const useTasksStore = defineStore('tasks', () => {
  // STATE ****************************************************************
  const allTasks = ref()
  const assigneeTasks = ref()

  // DATA ****************************************************************
  const taskData = [
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120005',
      taskPatientName: 'Emma Thompson',
      taskCareCoordinator: 'Michael Clark',
      taskStatus: 'In Progress',
      taskPriority: 'Low',
      taskType: 'Send blood slip',
      taskComments: 'Patient needs to provide a blood sample.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120006',
      taskPatientName: 'Jessica Adams',
      taskCareCoordinator: 'Michelle Smith',
      taskStatus: 'In Progress',
      taskPriority: 'High',
      taskType: 'New patient',
      taskComments: 'New patient scheduled for a visit.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120007',
      taskPatientName: 'Michael Johnson',
      taskCareCoordinator: 'Mary Brown',
      taskStatus: 'Completed',
      taskPriority: 'Medium',
      taskType: 'Accutane',
      taskComments: 'Patient is starting Accutane treatment.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120008',
      taskPatientName: 'Daniel Wilson',
      taskCareCoordinator: 'Jane Johnson',
      taskStatus: 'Completed',
      taskPriority: 'High',
      taskType: 'Documents needed',
      taskComments: "Patient's insurance documents required.",
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120009',
      taskPatientName: 'Sophia Davis',
      taskCareCoordinator: 'Mark Wilson',
      taskStatus: 'In Progress',
      taskPriority: 'Low',
      taskType: 'Submit Prescription',
      taskComments: "Please renew the patient's prescription.",
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120010',
      taskPatientName: 'Ryan Pagelion',
      taskCareCoordinator: 'Mahor Sr.',
      taskStatus: 'In Progress',
      taskPriority: 'Medium',
      taskType: 'New messages',
      taskComments: 'Patient has sent a new message.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120011',
      taskPatientName: 'John Doe',
      taskCareCoordinator: 'Mary Brown',
      taskStatus: 'In Progress',
      taskPriority: 'Low',
      taskType: 'Submit Prescription',
      taskComments: 'Please review the prescription.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120012',
      taskPatientName: 'Sarah Anderson',
      taskCareCoordinator: 'Michael Clark',
      taskStatus: 'In Progress',
      taskPriority: 'High',
      taskType: 'New messages',
      taskComments: 'Patient has sent a new message.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120013',
      taskPatientName: 'Emma Thompson',
      taskCareCoordinator: 'Michael Clark',
      taskStatus: 'Completed',
      taskPriority: 'Low',
      taskType: 'Send blood slip',
      taskComments: 'Patient needs to provide a blood sample.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120014',
      taskPatientName: 'Jessica Adams',
      taskCareCoordinator: 'Michelle Smith',
      taskStatus: 'Completed',
      taskPriority: 'High',
      taskType: 'New patient',
      taskComments: 'New patient scheduled for a visit.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120015',
      taskPatientName: 'Michael Johnson',
      taskCareCoordinator: 'Mary Brown',
      taskStatus: 'In Progress',
      taskPriority: 'Medium',
      taskType: 'Accutane',
      taskComments: 'Patient is starting Accutane treatment.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120016',
      taskPatientName: 'Daniel Wilson',
      taskCareCoordinator: 'Jane Johnson',
      taskStatus: 'In Progress',
      taskPriority: 'High',
      taskType: 'Documents needed',
      taskComments: "Patient's insurance documents required.",
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120017',
      taskPatientName: 'Sophia Davis',
      taskCareCoordinator: 'Mark Wilson',
      taskStatus: 'In Progress',
      taskPriority: 'Low',
      taskType: 'Submit Prescription',
      taskComments: "Please renew the patient's prescription.",
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120018',
      taskPatientName: 'Ryan Pagelion',
      taskCareCoordinator: 'Mahor Sr.',
      taskStatus: 'In Progress',
      taskPriority: 'Medium',
      taskType: 'New messages',
      taskComments: 'Patient has sent a new message.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120019',
      taskPatientName: 'John Doe',
      taskCareCoordinator: 'Mary Brown',
      taskStatus: 'In Progress',
      taskPriority: 'Low',
      taskType: 'Submit Prescription',
      taskComments: 'Please review the prescription.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120020',
      taskPatientName: 'Sarah Anderson',
      taskCareCoordinator: 'Michael Clark',
      taskStatus: 'In Progress',
      taskPriority: 'High',
      taskType: 'New messages',
      taskComments: 'Patient has sent a new message.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120021',
      taskPatientName: 'Emma Thompson',
      taskCareCoordinator: 'Michael Clark',
      taskStatus: 'Completed',
      taskPriority: 'Low',
      taskType: 'Send blood slip',
      taskComments: 'Patient needs to provide a blood sample.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120022',
      taskPatientName: 'Jessica Adams',
      taskCareCoordinator: 'Michelle Smith',
      taskStatus: 'Completed',
      taskPriority: 'High',
      taskType: 'New patient',
      taskComments: 'New patient scheduled for a visit.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120023',
      taskPatientName: 'Michael Johnson',
      taskCareCoordinator: 'Mary Brown',
      taskStatus: 'Completed',
      taskPriority: 'Medium',
      taskType: 'Accutane',
      taskComments: 'Patient is starting Accutane treatment.',
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120024',
      taskPatientName: 'Daniel Wilson',
      taskCareCoordinator: 'Jane Johnson',
      taskStatus: 'In Progress',
      taskPriority: 'High',
      taskType: 'Documents needed',
      taskComments: "Patient's insurance documents required.",
    },
    {
      taskId: '068d12b0-226f-11ee-be56-0242ac120025',
      taskPatientName: 'Sophia Davis',
      taskCareCoordinator: 'Mark Wilson',
      taskStatus: 'In Progress',
      taskPriority: 'Low',
      taskType: 'Submit Prescription',
      taskComments: "Please renew the patient's prescription.",
    },
  ]

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

  return { allTasks, setAllTasks, setAssigneeTasks, assigneeTasks, taskData }
})
