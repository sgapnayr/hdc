import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'

// EMPLOYEES **********************************************************************
// DONE
export const getEmployees = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getEmployees {
          employees {
            firstName
            lastName
            email
            phone
            role
            employeeId
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

// DONE / UNLESS NEED MORE PARAMS
export const createEmployee = async (firstName, lastName, email, phone, role, employeeId) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $role: String!, $employeeId: ID!) {
        createEmployee(employee: { email: $email, firstName: $firstName, lastName: $lastName, phone: $phone, role: $role, employeeId: $employeeId }) {
          firstName
          lastName
          email
          role
          phone
          address
          timezone
          licenseType
          licenseNumber
          licenseExpirationDate
          licenseState
          npi
          isActive
          createdAt
        }
      }
    `,
    variables: {
      firstName,
      lastName,
      email,
      phone,
      role,
      employeeId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

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
export const createTask = async (patientId, type, priority, description) => {
  console.log('Endpoint called!: ', patientId, priority, type)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: ID!, $type: String!, $priority: String!, $description: String!) {
        createTask(newTask: { patientId: $patientId, type: $type, priority: $priority, description: $description }) {
          description
          priority
        }
      }
    `,
    variables: {
      patientId,
      priority,
      description,
      type,
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

// DONE
export const getAllTasksByPatient = async (patientId) => {
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
// DONE
export const getPatient = async (patientId) => {
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

// DONE / ALMOST DONE IF NEED MORE DATA
export const getPatients = async () => {
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

// INSURANCE **********************************************************************
// NEEDS WORK
export const updateInsurance = async (patientId, groupNumber, memberId, insuranceName, policyHolderName) => {
  console.log('RUNNING UPDATE INSURANCE ****')
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($groupNumber: String!, $memberId: String!, $insuranceName: String!, $policyHolderName: String!, $patientId: String!) {
        updateInsuranceInfo(
          patientId: $patientId
          groupNumber: $groupNumber
          memberId: $memberId
          insuranceName: $insuranceName
          policyHolderName: $policyHolderName
        ) {
          insurance {
            healthInsuranceGroupNumber
            healthInsuranceMemberID
            healthInsuranceName
            healthInsurancePolicyHolderName
          }
        }
      }
    `,
    variables: {
      patientId,
      groupNumber,
      memberId,
      insuranceName,
      policyHolderName,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  return result.data.updateInsuranceInfo
}

// PROFILE **********************************************************************
// DONE
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
