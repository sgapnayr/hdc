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
            accountId
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
      query MyQuery($patientId: string) {
        getPatient(patientId: $patientId) {
          patientId
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.patientId
}

// PROFILE **********************************************************************
export const getMyProfile = async () => {
  console.log('Profile called!')
  console.log(API)
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

  return result.data.getMyProfile.name
}
