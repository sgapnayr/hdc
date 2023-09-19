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

export const getPresignedUrl = async (fileName, fileType) => {
  console.log('getting presigned url')
  const result = await API.graphql({
    query: gql`
      query MyQuery($fileName: String!, $fileType: String!) {
        getPresignedUrl(fileName: $fileName, fileType: $fileType)
      }
    `,
    variables: {
      fileName,
      fileType,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('presigned url: ', result.data.getPresignedUrl)
  return result.data.getPresignedUrl
}

// MEDICATIONS **********************************************************************
// NEED APPSYNC
export const deleteMedication = async (medicationId) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($medicationId: String) {
        deleteMedication {}
      }
    `,
    variables: {
      medicationId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.deleteMedication
}

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

// WORKING ON
export const updateMedication = async (medicationId, name) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($medicationId: String!, $name: String!) {
        updateMedication(medicationId: $medicationId, name: $name) {
          medicationId
          name
        }
      }
    `,
    variables: {
      medicationId,
      name,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  return result.data.updateMedication
}

// WORKING ON
export const createTreatmentPlan = async (treatmentPlan) => {
  console.log('creating new treatment plan: ', treatmentPlan.groups)
  // console.log('creating new treatment plan: ', payload.proxyObject.treatmentGroup.medArr)
  const result = await API.graphql({
    query: gql`
      mutation CreateTreatmentPlan($TreatmentPlanInput: TreatmentPlanInput!) {
        createTreatmentPlan(treatmentPlan: $TreatmentPlanInput) {
          treatmentId
          treatmentName
        }
      }
    `,
    variables: {
      TreatmentPlanInput: {
        treatmentName: treatmentPlan.treatmentName,
        groups: treatmentPlan.groups.map((group) => ({
          medicationsIds: group.medicationsIds,
        })),
      },
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('create treatment plan result: ', result.data)
  return result.data.createMedication
}

export const getTreatmentPlans = async () => {
  console.log('Getting all treatment plans')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getTreatmentPlans {
          treatmentGroups {
            treatmentMedicines {
              instructions
              name
              refills
              refillsExpirationRate
              size
              specialInstructions
              strength
            }
          }
          treatmentName
          treatmentId
        }
      }
    `,
    variables: {},
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('all treatment plans: ', result.data.getTreatmentPlans)
  return result.data.getTreatmentPlans
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
  console.log('updating employee: ', firstName, lastName, email, phone, role, employeeId)
  let result
  try {
    result = await API.graphql({
      query: gql`
        mutation MyMutation($firstName: String, $lastName: String, $email: String, $phone: String, $role: EmployeeRole, $employeeId: ID!) {
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
  } catch (err) {
    console.log('error updating employee: ', err)
  }

  return result.data.updateEmployee
}

// TASKS **********************************************************************
// DONE JUST NEED TO ADD MORE PARAMS
export const createTask = async (patientId, type, description) => {
  console.log('create Task Endpoint called!: ', patientId, type)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: ID!, $type: String!, $description: String!) {
        createTask(newTask: { patientId: $patientId, type: $type, description: $description }) {
          description
          taskId
        }
      }
    `,
    variables: {
      patientId,
      description,
      type,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.createTask
}

// DONE
export const assignTask = async (taskId) => {
  console.log('Assign task Endpoint called!: ', taskId)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($taskId: String!) {
        assignTask(taskId: $taskId) {
          assigneeId {
            employeeId
          }
          patientId {
            patientId
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

  console.log('result of assigning task', result)
  return result.data.assignTask
}

// DONE
export const assignTaskToEmployee = async (taskId, assigneeId) => {
  console.log('Assign task Endpoint called!: ', taskId, 'ASIGNEE', assigneeId)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($taskId: String!, $assigneeId: String!) {
        assignTask(taskId: $taskId, assigneeId: $assigneeId) {
          assigneeId {
            employeeId
          }
          patientId {
            patientId
            status
          }
        }
      }
    `,
    variables: {
      taskId,
      assigneeId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log('result of assigning task', result)
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
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('get all task response: ', result.data.getAllTasks)
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
// WORKING ON
export const searchPatientByName = async (name) => {
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
      name: name,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.searchPatientsByName
}

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
          name
          patientProfile {
            patientFirstName
            patientLastName
            patientHeight
            userRole
            patientWeight
            patientSex
            patientPhoneNumber
            patientDOB
            patientAddress
            patientEmail
            patientPhoneNumber
            healthInsurance {
              healthInsuranceGroupNumber
              healthInsuranceMemberID
              healthInsuranceName
              healthInsurancePolicyHolderName
            }
          }
          provider {
            firstName
            lastName
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

// DONE UNLESS NEED MORE PARAMS
export const updatePatient = async (
  patientId,
  patientFirstName,
  patientLastName,
  patientWeight,
  patientPhoneNumber,
  patientHeight,
  patientDOB,
  patientSex,
  patientAddress
) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation(
        $patientId: String
        $patientFirstName: String
        $patientLastName: String
        $patientWeight: String
        $patientPhoneNumber: String
        $patientHeight: String
        $patientDOB: String
        $patientSex: String
        $patientAddress: String
      ) {
        updatePatientProfile(
          patient: {
            patientFirstName: $patientFirstName
            patientLastName: $patientLastName
            patientWeight: $patientWeight
            patientPhoneNumber: $patientPhoneNumber
            patientHeight: $patientHeight
            patientDOB: $patientDOB
            patientSex: $patientSex
            patientAddress: $patientAddress
          }
          patientId: $patientId
        ) {
          patientProfile {
            patientFirstName
            patientLastName
            patientWeight
            patientPhoneNumber
            patientHeight
            patientDOB
            patientSex
            patientAddress
          }
        }
      }
    `,
    variables: {
      patientId,
      patientFirstName,
      patientLastName,
      patientWeight,
      patientPhoneNumber,
      patientHeight,
      patientDOB,
      patientSex,
      patientAddress,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.updatePatientProfile
}

// WORKING ON
export const assignPatientProvider = async (patientId, providerId) => {
  console.log(patientId, providerId)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String!, $providerId: String!) {
        assignProvider(patientId: $patientId, providerId: $providerId)
      }
    `,
    variables: {
      patientId,
      providerId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  return result.data.assignProvider
}

// WORKING ON
export const updatePatientAccountFromSignUpFlow = async (patientId, patientFirstName, patientLastName, patientPhoneNumber, patientDOB) => {
  console.log(patientId, patientFirstName, patientLastName, patientPhoneNumber, patientDOB)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String, $patientFirstName: String, $patientLastName: String, $patientPhoneNumber: String, $patientDOB: String) {
        updatePatientProfile(
          patient: { patientFirstName: $patientFirstName, patientLastName: $patientLastName, patientPhoneNumber: $patientPhoneNumber, patientDOB: $patientDOB }
          patientId: $patientId
        ) {
          patientProfile {
            patientFirstName
            patientLastName
            patientPhoneNumber
            patientDOB
          }
        }
      }
    `,
    variables: {
      patientId,
      patientFirstName,
      patientLastName,
      patientPhoneNumber,
      patientDOB,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.updatePatientProfile
}

// WORKING ON
export const getPatients = async () => {
  console.log('getting patients ')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getPatients(limit: 50) {
          patients {
            patientId
            name
            patientProfile {
              patientEmail
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
  console.log('getPatientsResult: ', result)

  return result.data.getPatients
}

// INSURANCE **********************************************************************
export const updateInsurance = async (patientId, groupNumber, memberId, insuranceName, policyHolderName) => {
  console.log('RUNNING UPDATE INSURANCE ****: ', patientId, groupNumber)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($PatientInsuranceInfoInput: PatientInsuranceInfoInput!, $patientId: String!) {
        updateInsuranceInfo(patientId: $patientId, insuranceInfo: $PatientInsuranceInfoInput) {
          healthInsuranceGroupNumber
          healthInsuranceMemberID
          healthInsuranceName
          healthInsurancePolicyHolderName
        }
      }
    `,
    variables: {
      PatientInsuranceInfoInput: {
        healthInsuranceName: insuranceName,
        healthInsurancePolicyHolderName: policyHolderName,
        healthInsuranceGroupNumber: groupNumber,
        healthInsuranceMemberID: memberId,
      },
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('update insurance result: ', result.data)
  return result.data
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
            patientProfile {
              patientEmail
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
    variables: {
      name,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.searchPatientsByName
}

// DONE
export const getMyProfile = async (patientId) => {
  console.log('get my profile: ', patientId)
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String) {
        getMyProfile(patientId: $patientId) {
          patientId
          patientFirstName
          patientLastName
          userRole
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('My Profile: ', result.data.getMyProfile)
  return result.data.getMyProfile
}

//TODO: RYAN WORK ON THIS, JUST MAKE SURE YOU ARE SENDING ALL THE PARAMS, DONT WORRY IF IT ERRORS AFTER YOU SEND
export const updateProfile = async (patientProfileInput) => {
  console.log('updating profile')
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientProfileInput: PatientProfileInput!) {
        updateProfile(patientProfileInput: $patientProfileInput) {
          patientId
          patientProfile {
            patientHeight
            patientFirstName
            patientEmail
            patientLastName
            patientPhoneNumber
            patientSex
            patientWeight
            phoneNumber
            userRole
          }
        }
      }
    `,
    variables: {
      patientProfileInput,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('update profile result: ', result.data.updateProfile)
  return result.data.updateProfile
}

// IMAGES **********************************************************************
export const getMyProfileImages = async (patientId) => {
  console.log('Getting my images: ', patientId)
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String) {
        getMyImages(patientId: $patientId) {
          images {
            fileName
            path
          }
          nextToken
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('my images: ', result.data.getMyImages)
  return result.data.getMyImages.images
}

export const getPatientImages = async (patientId) => {
  console.log('Getting patient images: ', patientId)
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String) {
        getPatientImages(patientId: $patientId) {
          nextToken
          images {
            path
            fileName
          }
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('patient images: ', result.data.getMyImages)
  return result.data.getMyImages.images
}
