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
export const getAllTasks = async () => {
  console.log('Endpoint called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getAllTasks(limit: 3) {
          tasks {
            assigneeId {
              employeeId
            }
            patientId {
              patientId
            }
            type
            taskId
            status
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
export const assignTask = async () => {
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
        getPatients(limit: 10) {
          patients {
            patientId
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

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
