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

export const getPresignedUrl = async (fileName, fileType, appointmentId) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($fileName: String!, $fileType: String!, $appointmentId: String!) {
        getPresignedUrl(fileName: $fileName, fileType: $fileType, appointmentId: $appointmentId)
      }
    `,
    variables: {
      fileName,
      fileType,
      appointmentId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

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
export const getMedications = async (token = null) => {
  const result = await API.graphql({
    query: gql`
      query GetMedications($nextToken: String) {
        getMedications(nextToken: $nextToken) {
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
    variables: {
      nextToken: token,
    },
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

  return result.data.updateMedication
}

// DONE
export const createTreatmentPlan = async (treatmentPlan) => {
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
  return result.data.createMedication
}

export const getTreatmentPlans = async () => {
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

  return result.data.getTreatmentPlans
}

// DONE
export const getPatientTreatmentPlanId = async (patientId) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String) {
        getPatient(patientId: $patientId) {
          treatmentPlan {
            treatmentName
            treatmentId
            treatmentGroups {
              treatmentMedicines {
                instructions
                specialInstructions
                name
                size
                strength
              }
            }
          }
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getPatient
}

// WORKING ON
export const assignTreatmentPlanToPatient = async (patientId, treatmentPlanId) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String!, $treatmentPlanId: String!) {
        assignTreatmentPlan(patientId: $patientId, treatmentPlanId: $treatmentPlanId) {
          name
          referralId
          timezone
          scheduleLink
          createdAt
          treatmentPlan {
            treatmentName
          }
        }
      }
    `,
    variables: {
      patientId,
      treatmentPlanId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.assignTreatmentPlan
}

// DONE
export const getPatientTreatment = async (patientId) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String!) {
        getTreatmentPlans {
          treatmentId
          treatmentName
        }
        getPatient(patientId: $patientId) {
          treatmentPlan {
            treatmentId
            treatmentName
            treatmentGroups {
              treatmentMedicines {
                instructions
                medicationId
                refills
                name
                refillsExpirationRate
                size
                specialInstructions
                strength
              }
            }
          }
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

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
export const getAllTasks = async (nextToken = null) => {
  const result = await API.graphql({
    query: gql`
      query GetTasks($nextToken: String, $limit: Int) {
        getAllTasks(nextToken: $nextToken, limit: $limit) {
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
          nextToken
        }
      }
    `,
    variables: {
      nextToken: nextToken,
      limit: 50,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return {
    tasks: result.data.getAllTasks.tasks,
    nextToken: result.data.getAllTasks.nextToken,
  }
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

// PROVIDER **********************************************************************
// NEEED TO TEST
export const getProviderPay = async (providerId, month) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($providerId: String!, $month: String!) {
        getProviderPay(providerId: $providerId, month: $month)
      }
    `,
    variables: {
      providerId,
      month,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getProviderPay
}

// PATIENTS **********************************************************************
// WORKING ON
export const searchPatientByName = async (name) => {
  console.log(name, 'HERE***')
  const result = await API.graphql({
    query: gql`
      query MyQuery($name: String!) {
        searchPatientsByName(name: $name) {
          nextToken
          patients {
            name
            patientId
            status
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
      name: name,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result, 'HERE***')
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

// DONE
export const assignPatientProvider = async (patientId, providerId) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String!, $providerId: String!) {
        assignProvider(patientId: $patientId, providerId: $providerId) {
          name
        }
      }
    `,
    variables: {
      patientId,
      providerId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

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
export const getPatients = async (token = null) => {
  const result = await API.graphql({
    query: gql`
      query GetPatients($nextToken: String) {
        getPatients(limit: 50, nextToken: $nextToken) {
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

            provider {
              firstName
              lastName
            }
          }
          nextToken
        }
      }
    `,
    variables: {
      nextToken: token,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getPatients
}

// INSURANCE **********************************************************************
export const updateInsurance = async (patientId, groupNumber, memberId, insuranceName, policyHolderName) => {
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

  return result.data
}

// PROFILE **********************************************************************
export const searchPatient = async (name) => {
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

  return result.data.getMyProfile
}

//TODO: RYAN WORK ON THIS, JUST MAKE SURE YOU ARE SENDING ALL THE PARAMS, DONT WORRY IF IT ERRORS AFTER YOU SEND
export const updateProfile = async (patientProfileInput) => {
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

  return result.data.updateProfile
}

// IMAGES **********************************************************************
export const getMyProfileImages = async (patientId) => {
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

  return result.data.getMyImages.images
}

export const getPatientImages = async (patientId) => {
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
  return result.data.getMyImages.images
}

// MEDICALBACKGROUND **********************************************************************
// DONE
export const updateAcneCurrentUse = async (patientId, acneCurrentUse) => {
  console.log(patientId, acneCurrentUse)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String, $acneCurrentUse: String) {
        updateMedicalBackgroundInfo(patientId: $patientId, medicalInfo: { acneCurrentUse: $acneCurrentUse })
      }
    `,
    variables: {
      patientId,
      acneCurrentUse,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result?.data?.updateMedicalBackgroundInfo
}

// DONE
export const updateAcneSkinDryness = async (patientId, skinDryness) => {
  console.log(patientId, skinDryness)
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String, $skinDryness: String) {
        updateMedicalBackgroundInfo(patientId: $patientId, medicalInfo: { skinDryness: $skinDryness }) {
          medicalBackground {
            skinSurvey {
              skinDryness
            }
          }
        }
      }
    `,
    variables: {
      patientId,
      skinDryness,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.updateMedicalBackgroundInfo
}

export const getPatientAcneHistory = async (patientId) => {
  console.log(patientId)
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String!) {
        getPatient(patientId: $patientId) {
          medicalBackground {
            skinSurvey {
              skinDryness
            }
          }
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result.data.getPatient)

  return result.data.getPatient
}

// DONE
export const updateAcneSkinSensitivity = async (patientId, skinSensitivity) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String, $skinSensitivity: String) {
        updateMedicalBackgroundInfo(patientId: $patientId, medicalInfo: { skinSensitivity: $skinSensitivity })
      }
    `,
    variables: {
      patientId,
      skinSensitivity,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.updateMedicalBackgroundInfo
}

// DONE
export const updatePatientSexAssignedAtBirth = async (patientId, patientSex) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: String, $patientSex: String) {
        updatePatientProfile(patient: { patientSex: $patientSex }, patientId: $patientId)
      }
    `,
    variables: {
      patientId,
      patientSex,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.updatePatientProfile
}

export const createNote = async (patientId, text, type) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($patientId: ID!, $type: String!, $text: String!) {
        createNote(newNote: { patientId: $patientId, text: $text, type: $type }) {
          creatorRole
          type
          text
        }
      }
    `,
    variables: {
      patientId,
      text,
      type,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.createNote
}

export const getNotes = async (patientId) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String!) {
        getNotesByPatient(patientId: $patientId) {
          notes {
            createdAt
            creatorId
            noteId
            patientId
            text
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

  return result.data.getNotesByPatient
}

export const getPatientName = async (patientId) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($patientId: String!) {
        getPatient(patientId: $patientId) {
          name
        }
      }
    `,
    variables: {
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getPatient
}

export const getEmployeeName = async (employeeId) => {
  if (!employeeId) {
    console.error('Employee ID is not provided.')
    return { firstName: 'N/A', lastName: '' }
  }

  try {
    const result = await API.graphql({
      query: gql`
        query MyQuery($employeeId: String!) {
          getEmployee(employeeId: $employeeId) {
            firstName
            lastName
          }
        }
      `,
      variables: {
        employeeId,
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })

    return result.data.getEmployee
  } catch (error) {
    console.error('Error fetching employee', error)
    return { firstName: 'N/A', lastName: '' }
  }
}

// APPOINTMENTS **********************************************************************
export const getMyAppointments = async (nextTokenVar) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($token: String, $limit: Int) {
        getMyAppointments(nextToken: $token, limit: $limit) {
          appointments {
            appointmentId
            createdAt
            startTime
            meetingLink
            note
            patientId
            providerId
            service
          }
          nextToken
        }
      }
    `,
    variables: {
      token: nextTokenVar,
      limit: 5,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getMyAppointments
}

export const getMyAppointmentImages = async (appointmentId, patientId) => {
  console.log(typeof appointmentId, typeof patientId)

  console.log(appointmentId, patientId)
  try {
    const result = await API.graphql({
      query: gql`
        query MyQuery($appointmentId: String!, $patientId: String!) {
          getMyImages(appointmentId: $appointmentId, patientId: $patientId) {
            nextToken
            images {
              imageId
              appointmentId
              fileName
              patientId
            }
          }
        }
      `,
      variables: {
        appointmentId,
        patientId,
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })

    return result.data.getMyImages
  } catch (error) {
    console.log(error, 'Error')
  }
}

export const getAppointmentsByProvider = async (providerId, nextTokenVar, limitVar = 5) => {
  try {
    const result = await API.graphql({
      query: gql`
        query MyQuery($providerId: String!, $token: String, $limit: Int) {
          getAppointmentsByProvider(providerId: $providerId, nextToken: $token, limit: $limit) {
            appointments {
              createdAt
              note
              patientId
              service
              startTime
              status
              providerId
            }
            nextToken
          }
        }
      `,
      variables: {
        providerId,
        token: nextTokenVar,
        limit: limitVar,
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })

    return result.data.getAppointmentsByProvider
  } catch (error) {
    console.log(error, 'Error')
  }
}

export const getAppointmentByPatientId = async (patientId, nextTokenVar) => {
  const result = await API.graphql({
    query: gql`
      query MyQuery($token: String, $limit: Int, $patientId: String!) {
        getPatientAppointments(nextToken: $token, limit: $limit, patientId: $patientId) {
          appointments {
            appointmentId
            createdAt
            startTime
            meetingLink
            note
            patientId
            providerId
            service
          }
          nextToken
        }
      }
    `,
    variables: {
      token: nextTokenVar,
      limit: 5,
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getPatientAppointments
}

export const viewImage = async (imageId, appointmentId, patientId) => {
  console.log(imageId, appointmentId, patientId)
  const result = await API.graphql({
    query: gql`
      query MyQuery($imageId: String!, $appointmentId: String!, $patientId: String!) {
        getViewImageCredentials(imageId: $imageId, appointmentId: $appointmentId, patientId: $patientId)
      }
    `,
    variables: {
      imageId,
      appointmentId,
      patientId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  console.log(result)

  return result.data.getViewImageCredentials
}
