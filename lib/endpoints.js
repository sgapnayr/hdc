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
// DONE JUST NEED TO ADD MORE PARAMS
export const createTask = async (patientId, priority, description) => {
  console.log('Endpoint called!: ', patientId, priority)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: ID!, $priority: String!, $description: String!) {
        createTask(newTask: { patientId: $patientId, priority: $priority, description: $description }) {
          description
          priority
        }
      }
    `,
    variables: {
      patientId,
      priority,
      description,
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
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getAllTasks(limit: 100) {
          tasks {
            type
            taskId
            updatedAt
            taskAssignedBy
            status
            priority
            dueDate
            description
            taskAssignedAt
            patientId {
              patientProfile {
                patientFirstName
                patientLastName
              }
            }
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getAllTasks
}

// DONE/ALMOST DONE IF NEED MORE DATA
export const getAllTasksByAssignee = async (assigneeId) => {
  const result = await API.graphql({
    query: gql`
      query GetTasksByAssignee($assigneeId: String!) {
        getTasksByAssignee(assigneeId: $assigneeId) {
          tasks {
            type
            taskId
            updatedAt
            taskAssignedBy
            status
            priority
            dueDate
            description
            taskAssignedAt
            assigneeId {
              firstName
              lastName
            }
            patientId {
              patientProfile {
                patientFirstName
                patientLastName
              }
            }
          }
        }
      }
    `,
    variables: {
      assigneeId: assigneeId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getTasksByAssignee
}

// NEEDS WORK
export const getAllTasksByPatient = async (patientId) => {
  console.log(patientId)
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String!) {
        getTasksByPatient(patientId: $patientId) {
          tasks {
            taskId
            taskAssignedBy
            description
            status
            priority
            type
          }
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getTasksByPatient
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

// PROFILE **********************************************************************
export const getProfileId = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getMyProfile {
          patientId
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
}

// PATIENTS **********************************************************************
export const getPatient = async (patientId) => {
  console.log('Patient called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String!) {
        getPatient(patientId: $patientId) {
          accountId
          patientId
          medicalBackground {
            dateOfBirth
            height
            sex
          }
        }
      }
    `,
    variables: {
      patientId: patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getPatient
}

export const getPatients = async () => {
  console.log('Endpoint called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getPatients(limit: 10) {
          patients {
            parentInfo {
              email
              phone
              name
            }
            patientId
            accountId
            patientProfile {
              name
              patientAddress
              patientDOB
              patientAge
              patientEmail
              patientFirstName
              patientHeight
              patientId
              patientLastName
              patientPhoneNumber
              patientSex
              patientWeight
              userRole
              patientMedicalBackgroundSkinSurvey {
                acneCurrentUse
                acneInterestedIn
                acneNonPrescriptionItems
                acnePrescriptionPills
                acnePrescriptionTopicals
                acneProductsTried
                cycleBirthControl
                cycleBreastfeeding
                cycleHistoryPCOS
                cycleMenstruation
                cyclePregnancy
                cycleRegular
                lifeStyleDairyConsumption
                lifeStyleStressLevel
                liftStyleSleepAmount
                otherAllergies
                otherMedications
                skinDryness
                skinHadAcneBefore
                skinSensitivity
              }
              healthInsurance {
                healthInsuranceGroupNumber
                healthInsuranceMemberID
                healthInsuranceName
                healthInsurancePolicyHolderName
              }
            }
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getPatients
}

// PROFILE **********************************************************************
export const getMyProfile = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getMyProfile {
          patientId
          patientFirstName
          patientLastName
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getMyProfile
}
