import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'

// EMPLOYEES **********************************************************************
export const getEmployees = async () => {
  console.log('Endpoint called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getEmployees {
          employees {
            email
            employeeId
            firstName
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getEmployees
}

export const getEmployee = async () => {
  console.log('Endpoint called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getEmployee {
          email
          employeeId
          firstName
          lastName
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result)
  return result.data.getEmployee
}

export const createEmployee = async () => {
  let employeeInput = {
    employeeId: 'myID',
    firstName: 'firstname',
    lastName: 'String',
    email: 'String',
    role: 'String',
    phone: 'String',
    address: 'String',
    timezone: 'String',
    licenseType: 'String',
    licenseNumber: 'String',
    licenseExpirationDate: 'String',
    licenseState: 'String',
    npi: 'String',
    isActive: true,
  }
  console.log('Endpoint called!: ', employeeInput)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($employeeInput: EmployeeInput!) {
        createEmployee(employee: $employeeInput) {
          email
          createdAt
          isActive
          lastName
          address
          employeeId
        }
      }
    `,
    variables: {
      employeeInput,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result)
  return result.data.createEmployee
}

const editMyProfile = async (newProfile) => {
  const result = await API.graphql({
    query: gql`
      mutation editMyProfile($newProfile: ProfileInput!) {
        editMyProfile(newProfile: $newProfile) {
          backgroundImageUrl
          createdAt
          id
          imageUrl
          name
          screenName
          title
        }
      }
    `,
    variables: {
      newProfile,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.editMyProfile
}

// TASKS **********************************************************************
export const createTask = async (taskInput) => {
  console.log('Endpoint called!: ', taskInput)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($taskInput: TaskInput!) {
        createTask(newTask: $taskInput) {
          taskId
          assigneeId {
            email
            employeeId
            type
            priority
            description
            patientId
          }
          patientId {
            patientId
            phone
          }
        }
      }
    `,
    variables: {
      taskInput,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result)
  return result.data.createTask
}

// DONE
export const assignTask = async (taskId) => {
  console.log('Endpoint called!: ', taskId)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($taskId: String!) {
        assignTask(taskId: $taskId) {
          assigneeId {
            email
          }
          patientId {
            patientId
            phone
            status
          }
        }
      }
    `,
    variables: {
      taskId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result)
  return result.data.assignTask
}

export const getTask = async () => {
  console.log('Endpoint called!: ', employeeInput)
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getTask(taskId: "01H21E9M6TWAHN2C77HAY94GHX") {
          updatedAt
          type
          taskId
          status
          priority
          patientId {
            patientId
          }
          createdAt
          assigneeId {
            employeeId
          }
        }
      }
    `,
    variables: {
      employeeInput,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result)
  return result.data.createEmployee
}

// DONE
export const getAllTasks = async () => {
  console.log('Endpoint called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getAllTasks {
          tasks {
            assigneeId {
              employeeId
              firstName
              lastName
            }
            patientId {
              patientProfile {
                patientFirstName
                patientLastName
              }
            }
            type
            taskId
            status
            taskAssignedAt
          }
          nextToken
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getAllTasks
}

// Needs work
export const getTaskByPatient = async () => {
  console.log('Endpoint called!: ', employeeInput)
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getTasksByPatient(patientId: "c8d558de-424e-4f50-8720-be5c99290851", limit: 10) {
          nextToken
          tasks {
            assigneeId {
              employeeId
            }
            description
            patientId {
              patientId
            }
            priority
            status
            type
            updatedAt
          }
        }
      }
    `,
    variables: {
      employeeInput,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.createEmployee
}

// DONE
export const getTaskByAssignee = async (assigneeId = null) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getTasksByAssignee(limit: 10) {
          tasks {
            description
            status
            priority
            type
            taskAssignedAt
            patientId {
              patientId
            }
          }
        }
      }
    `,
    variables: {
      assigneeId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getTasksByAssignee
}

// APPOINTMENTS **********************************************************************
export const createAppointment = async (endTime, startTime, service, status, note) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($endTime: AWSDateTime!, $startTime: AWSDateTime!, $service: String, $status: String, $note: String) {
        createAppointment(newAppointment: { endTime: $endTime, startTime: $startTime, service: $service, status: $status, note: $note }) {
          appointmentId
          createdAt
          endTime
          note
        }
      }
    `,
    variables: {
      endTime,
      startTime,
      service,
      status,
      note,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data
}

// PATIENTS **********************************************************************
export const getPatients = async () => {
  console.log('Endpoint called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getPatients(limit: 20) {
          patients {
            patientId
            patientProfile {
              name
              patientLastName
            }
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result)
  return result.data.getPatients
}

export const getPatient = async (patientId) => {
  console.log('Patient called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: ID!) {
        getPatient(patientId: $patientId) {
          // Specify the fields you want to retrieve
          // Example: name, age, address
        }
      }
    `,
    variables: {
      patientId: patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log(result)
  return result.data.getPatient
}

// PROFILE **********************************************************************
export const getMyProfile = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getMyProfile {
          name
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getMyProfile
}

// PATIENTS **********************************************************************
