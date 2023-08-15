import { API } from 'aws-amplify'
import gql from 'graphql-tag'

// EMAIL MARKETING **********************************************************************
// WORKING ON
export const addToEmailMarketing = async (email) => {
  console.log('RUNNING')
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($email: String!) {
        addToEmailMarketingList(email: $email)
      }
    `,
    variables: {
      email,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  return result.data.addToEmailMarketingList
}

// MEDICATIONS **********************************************************************
// DONE
export const getMedications = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getMedications {
          medications {
            medicationId
            name
            strength
            instructions
            specialInstructions
            refills
            refillsExpirationRate
          }
          nextToken
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getMedications
}

// DONE / UNLESS NEED MORE PARAMS
export const createMedication = async (name, strength, instructions, refills, refillsExpirationRate, specialInstructions) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation(
        $name: String!
        $strength: String!
        $instructions: String!
        $refills: String!
        $refillsExpirationRate: String!
        $specialInstructions: String!
      ) {
        createMedication(
          medication: {
            name: $name
            strength: $strength
            instructions: $instructions
            refills: $refills
            refillsExpirationRate: $refillsExpirationRate
            specialInstructions: $specialInstructions
          }
        ) {
          medicationId
          name
          instructions
          specialInstructions
          refills
          refillsExpirationRate
        }
      }
    `,
    variables: {
      name,
      strength,
      instructions,
      refills,
      refillsExpirationRate,
      specialInstructions,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.createMedication
}

export const updateMedication = async (medicationId, name, strength, instructions, refills, refillsExpirationRate, specialInstructions) => {
  console.log(medicationId, name, strength, instructions, refills, refillsExpirationRate, specialInstructions)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation(
        $medicationId: String!
        $name: String!
        $strength: String!
        $instructions: String!
        $refills: String!
        $refillsExpirationRate: String!
        $specialInstructions: String!
      ) {
        updateMedication(
          medication: {
            medicationId: $medicationId
            name: $name
            strength: $strength
            instructions: $instructions
            refills: $refills
            refillsExpirationRate: $refillsExpirationRate
            specialInstructions: $specialInstructions
          }
        ) {
          medicationId
          name
          strength
          instructions
          specialInstructions
          refills
          refillsExpirationRate
        }
      }
    `,
    variables: {
      medicationId,
      name,
      strength,
      instructions,
      refills,
      refillsExpirationRate,
      specialInstructions,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.updateMedication
}

// WORKING ON
export const createTreatmentPlan = async () => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation {
        createTreatmentPlan(
          treatmentPlan: { groups: { medicationsIds: "01H645H88VDNAPAKJHP0QVGNXE, 01H645H88VDNAPAKJHP0QVGNXE" }, { medicationsIds: "01H645H88VDNAPAKJHP0QVGNXE"} treatmentName: "New Plan" }
        ) {
          treatmentName
          groups {
            medications {
              name
              strength
              size
              instructions
              specialInstructions
              refills
              refillsExpirationRate
            }
          }
        }
      }
    `,
    variables: {},
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.createMedication
}

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
            isActive
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getEmployees
}

// WORKING ON
export const getEmployee = async (employeeId) => {
  console.log('Endpoint called!', employeeId)
  const result = await API.graphql({
    query: gql`
      query MyQuery($employeeId: String!) {
        getEmployee(employeeId: $employeeId) {
          firstName
          lastName
          email
          phone
        }
      }
    `,
    variables: {
      employeeId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  return result.data.getEmployee
}

// DONE / UNLESS NEED MORE PARAMS
export const createEmployee = async (firstName, lastName, email, phone, role, employeeId) => {
  console.log('Endpoint called!: ', firstName, lastName, email, phone, role, employeeId)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $role: EmployeeRole!, $employeeId: ID!) {
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

// WORKING ON
export const updateEmployee = async (firstName, lastName, email, phone, role, employeeId) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $role: EmployeeRole!, $employeeId: String!) {
        updateEmployee(employee: { email: $email, firstName: $firstName, lastName: $lastName, phone: $phone, role: $role, employeeId: $employeeId }) {
          firstName
          lastName
          email
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

  return result.data.updateEmployee
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

// PATIENTS **********************************************************************
// DONE / UNLESS NEED MORE PARAMS
export const getPatient = async (patientId) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String!) {
        getPatient(patientId: $patientId) {
          subAccounts {
            subAccountId
            subAccountName
          }
          actionItems
          patientProfile {
            name
            patientFirstName
            patientLastName
            patientHeight
            userRole
            patientWeight
            patientSex
            patientAge
            patientDOB
            patientAddress
            patientEmail
            patientPhoneNumber
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

// WORKING On
export const updatePatient = async (patientId, phone, email) => {
  console.log(patientId, phone, email)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String!, $phone: String!, $email: String!) {
        updateProfile(patient: { phone: $phone, email: $email }, patientId: $patientId)
      }
    `,
    variables: {
      patientId,
      phone,
      email,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.updateProfile
}

// WORKING ON
export const getPatients = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getPatients(limit: 10) {
          patients {
            email
            phone
            patientId
            patientProfile {
              name
              patientDOB
              patientFirstName
              patientLastName
              patientPhoneNumber
              userRole
            }
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

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
export const searchPatient = async (name = 't') => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($name: String!) {
        searchPatientsByName(name: $name) {
          nextToken
          patients {
            patientId
            name
          }
        }
      }
    `,
    variables: {
      name,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.searchPatientsByName
}

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
