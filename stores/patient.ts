import { defineStore } from 'pinia'
import { getPatients, getPatient, updateInsurance } from '@/lib/endpoints'
import { Patient, Patients } from '@/types/patient-types'
import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'

export const usePatientStore = defineStore('patient', () => {
  const allPatients = ref()
  const patientData = ref()

  // ASK CHESTER FOR THIS OBJECT
  const patientDataForAdminPage: Patient[] = [
    {
      patientId: '068d12b0-226f-11ee-be56-0242ac120002',
      patientName: 'Ryan Pagelion',
      patientDOB: 'Apr 3rd, 1995',
      patientDateOfService: 'Jun 6, 6:36 pm',
      patientNextFollowUp: '',
      patientProviderAssigned: 'Dr. Joel',
      patientCareCoordinatorAssigned: 'Mahor Sr.',
      currentPatientStatus: ['New Patient'],
      patientMedicalBackground: null,
      patientSex: 'Male',
      patientAge: '45',
      patientWeight: '60',
      patientHeight: '170',
      patientPhoneNumber: '555-111-1111',
      patientEmail: 'ryanpagelion@gmail.com',
      patientAddress: '123 Main St.',
      patientCity: 'San Francisco',
      patientState: 'CA',
      patientZipCode: '94107',
      patientHealthInsurance: 'Blue Cross Blue Shield',
      patientInsuranceMemberID: '1234567890',
      patientInsurancePolicyHolderName: 'John Paglione',
      patientInsuranceGroupNumber: '105',
      patientCurrentTasks: ['Schedule Visit'],
    },
    {
      patientId: '9b759d30-6479-4c25-9fb4-0c38b38fd5a5',
      patientName: 'John Doe',
      patientDOB: 'Jan 1st, 1980',
      patientDateOfService: 'Jul 10, 9:00 am',
      patientNextFollowUp: '',
      patientProviderAssigned: 'Dr. Smith',
      patientCareCoordinatorAssigned: 'Jane Johnson',
      currentPatientStatus: ['New Patient'],
      patientMedicalBackground: 'Hypertension',
      patientSex: 'Male',
      patientAge: '41',
      patientWeight: '80',
      patientHeight: '180',
      patientPhoneNumber: '555-222-2222',
      patientEmail: 'john.doe@example.com',
      patientAddress: '456 Elm St.',
      patientCity: 'New York',
      patientState: 'NY',
      patientZipCode: '10001',
      patientHealthInsurance: 'Cigna',
      patientInsuranceMemberID: '9876543210',
      patientInsurancePolicyHolderName: 'Jane Doe',
      patientInsuranceGroupNumber: '202',
      patientCurrentTasks: [],
    },
    {
      patientId: '5712b020-5784-4b46-b22a-af55fd820621',
      patientName: 'Jane Smith',
      patientDOB: 'Mar 15th, 1975',
      patientDateOfService: 'Jul 12, 2:30 pm',
      patientNextFollowUp: 'Jul 20, 10:00 am',
      patientProviderAssigned: 'Dr. Johnson',
      patientCareCoordinatorAssigned: 'Mary Brown',
      currentPatientStatus: ['Follow Up'],
      patientMedicalBackground: null,
      patientSex: 'Female',
      patientAge: '46',
      patientWeight: '65',
      patientHeight: '165',
      patientPhoneNumber: '555-333-3333',
      patientEmail: 'janesmith@gmail.com',
      patientAddress: '789 Oak St.',
      patientCity: 'Los Angeles',
      patientState: 'CA',
      patientZipCode: '90001',
      patientHealthInsurance: 'Aetna',
      patientInsuranceMemberID: '2468135789',
      patientInsurancePolicyHolderName: 'Michael Smith',
      patientInsuranceGroupNumber: '303',
      patientCurrentTasks: ['Follow Up'],
    },
    {
      patientId: 'ae7326f7-642c-4c3b-8c7f-d579b4066c0e',
      patientName: 'Sarah Anderson',
      patientDOB: 'Dec 10th, 1992',
      patientDateOfService: 'Jul 8, 4:45 pm',
      patientNextFollowUp: '',
      patientProviderAssigned: 'Dr. Williams',
      patientCareCoordinatorAssigned: 'Michael Clark',
      currentPatientStatus: ['Cancelled', 'Inactive'],
      patientMedicalBackground: null,
      patientSex: 'Female',
      patientAge: '28',
      patientWeight: '55',
      patientHeight: '160',
      patientPhoneNumber: '555-444-4444',
      patientEmail: 'sarahanderson@gmail.com',
      patientAddress: '321 Pine St.',
      patientCity: 'Chicago',
      patientState: 'IL',
      patientZipCode: '60601',
      patientHealthInsurance: 'UnitedHealthcare',
      patientInsuranceMemberID: '1357924680',
      patientInsurancePolicyHolderName: 'John Anderson',
      patientInsuranceGroupNumber: '404',
      patientCurrentTasks: [],
    },
    {
      patientId: 'd3e7b09e-38d9-42d3-aad6-6ae5e67d82a1',
      patientName: 'David Johnson',
      patientDOB: 'Aug 20th, 1998',
      patientDateOfService: 'Jul 11, 11:15 am',
      patientNextFollowUp: 'Jul 18, 9:30 am',
      patientProviderAssigned: 'Dr. Brown',
      patientCareCoordinatorAssigned: 'Michelle Smith',
      currentPatientStatus: ['Follow Up', 'New Message', 'Accutane'],
      patientMedicalBackground: 'Acne',
      patientSex: 'Male',
      patientAge: '24',
      patientWeight: '70',
      patientHeight: '175',
      patientPhoneNumber: '555-555-5555',
      patientEmail: 'davidjohnson@gmail.com',
      patientAddress: '654 Maple St.',
      patientCity: 'Houston',
      patientState: 'TX',
      patientZipCode: '77001',
      patientHealthInsurance: 'Humana',
      patientInsuranceMemberID: '2468135799',
      patientInsurancePolicyHolderName: 'Michael Johnson',
      patientInsuranceGroupNumber: '505',
      patientCurrentTasks: [],
    },
    {
      patientId: 'f853b859-3e2a-4a33-84ef-ff7d2e214d4e',
      patientName: 'Emily Davis',
      patientDOB: 'Sep 5th, 1985',
      patientDateOfService: 'Jul 9, 1:00 pm',
      patientNextFollowUp: '',
      patientProviderAssigned: 'Dr. Anderson',
      patientCareCoordinatorAssigned: 'Mark Wilson',
      currentPatientStatus: ['New Patient', 'Accutane'],
      patientMedicalBackground: null,
      patientSex: 'Female',
      patientAge: '36',
      patientWeight: '58',
      patientHeight: '165',
      patientPhoneNumber: '555-666-6666',
      patientEmail: 'emilydavis@gmail.com',
      patientAddress: '987 Cedar St.',
      patientCity: 'Seattle',
      patientState: 'WA',
      patientZipCode: '98101',
      patientHealthInsurance: 'Kaiser Permanente',
      patientInsuranceMemberID: '3141592653',
      patientInsurancePolicyHolderName: 'Emily Davis',
      patientInsuranceGroupNumber: '1111',
      patientCurrentTasks: [],
    },
    {
      patientId: '0a9651c2-9611-4c59-94c3-4456b6a3dc48',
      patientName: 'Emma Thompson',
      patientDOB: 'Feb 14th, 1988',
      patientDateOfService: 'Jul 13, 3:30 pm',
      patientNextFollowUp: 'Jul 20, 10:00 am',
      patientProviderAssigned: 'Dr. Johnson',
      patientCareCoordinatorAssigned: 'Michael Clark',
      currentPatientStatus: ['Follow Up'],
      patientMedicalBackground: 'Diabetes',
      patientSex: 'Female',
      patientAge: '33',
      patientWeight: '60',
      patientHeight: '170',
      patientPhoneNumber: '555-777-7777',
      patientEmail: 'emmathompson@gmail.com',
      patientAddress: '246 Oak St.',
      patientCity: 'Los Angeles',
      patientState: 'CA',
      patientZipCode: '90001',
      patientHealthInsurance: 'Aetna',
      patientInsuranceMemberID: '9753102421',
      patientInsurancePolicyHolderName: 'David Thompson',
      patientInsuranceGroupNumber: '707',
      patientCurrentTasks: [],
    },
    {
      patientId: '5b202c0e-0c26-4fb3-9ea3-378ba1664b0f',
      patientName: 'Jessica Adams',
      patientDOB: 'Nov 25th, 1990',
      patientDateOfService: 'Jul 12, 5:15 pm',
      patientNextFollowUp: '',
      patientProviderAssigned: 'Dr. Williams',
      patientCareCoordinatorAssigned: 'Michelle Smith',
      currentPatientStatus: [],
      patientMedicalBackground: 'Asthma',
      patientSex: 'Female',
      patientAge: '31',
      patientWeight: '55',
      patientHeight: '160',
      patientPhoneNumber: '555-888-8888',
      patientEmail: 'jessicaadams@gmail.com',
      patientAddress: '369 Elm St.',
      patientCity: 'New York',
      patientState: 'NY',
      patientZipCode: '10001',
      patientHealthInsurance: 'Cigna',
      patientInsuranceMemberID: '2468135798',
      patientInsurancePolicyHolderName: 'Michael Adams',
      patientInsuranceGroupNumber: '808',
      patientCurrentTasks: [],
    },
    {
      patientId: 'fd29c0f3-4b8d-4a33-9e0b-5827c7816bca',
      patientName: 'Michael Johnson',
      patientDOB: 'Jan 5th, 1978',
      patientDateOfService: 'Jul 11, 9:30 am',
      patientNextFollowUp: 'Jul 18, 10:30 am',
      patientProviderAssigned: 'Dr. Brown',
      patientCareCoordinatorAssigned: 'Mary Brown',
      currentPatientStatus: ['Follow Up'],
      patientMedicalBackground: null,
      patientSex: 'Male',
      patientAge: '43',
      patientWeight: '75',
      patientHeight: '180',
      patientPhoneNumber: '555-999-9999',
      patientEmail: 'michaeljohnson@gmail.com',
      patientAddress: '789 Oak St.',
      patientCity: 'Los Angeles',
      patientState: 'CA',
      patientZipCode: '90001',
      patientHealthInsurance: 'UnitedHealthcare',
      patientInsuranceMemberID: '1357924689',
      patientInsurancePolicyHolderName: 'John Johnson',
      patientInsuranceGroupNumber: '909',
      patientCurrentTasks: [],
    },
    {
      patientId: 'e1e19b71-2968-421e-a124-057822bb1a21',
      patientName: 'Daniel Wilson',
      patientDOB: 'Mar 8th, 1993',
      patientDateOfService: 'Jul 10, 11:45 am',
      patientNextFollowUp: '',
      patientProviderAssigned: 'Dr. Smith',
      patientCareCoordinatorAssigned: 'Jane Johnson',
      currentPatientStatus: ['New Patient'],
      patientMedicalBackground: null,
      patientSex: 'Male',
      patientAge: '28',
      patientWeight: '70',
      patientHeight: '180',
      patientPhoneNumber: '555-101-1010',
      patientEmail: 'danielwilson@gmail.com',
      patientAddress: '654 Maple St.',
      patientCity: 'Houston',
      patientState: 'TX',
      patientZipCode: '77001',
      patientHealthInsurance: 'Humana',
      patientInsuranceMemberID: '3141592654',
      patientInsurancePolicyHolderName: 'Michael Wilson',
      patientInsuranceGroupNumber: '1010',
      patientCurrentTasks: [],
    },
    {
      patientId: 'b86f21ca-b8ad-4ce4-9253-4887ad3d0e8b',
      patientName: 'Sophia Davis',
      patientDOB: 'Oct 17th, 1983',
      patientDateOfService: 'Jul 13, 2:00 pm',
      patientNextFollowUp: '',
      patientProviderAssigned: 'Dr. Anderson',
      patientCareCoordinatorAssigned: 'Mark Wilson',
      currentPatientStatus: ['Inactive', 'Archived'],
      patientMedicalBackground: null,
      patientSex: 'Female',
      patientAge: '37',
      patientWeight: '62',
      patientHeight: '168',
      patientPhoneNumber: '555-121-2121',
      patientEmail: 'sophiadavis@gmail.com',
      patientAddress: '987 Cedar St.',
      patientCity: 'Seattle',
      patientState: 'WA',
      patientZipCode: '98101',
      patientHealthInsurance: 'Kaiser Permanente',
      patientInsuranceMemberID: '2468135797',
      patientInsurancePolicyHolderName: 'Emily Davis',
      patientInsuranceGroupNumber: '1111',
      patientCurrentTasks: [],
    },
  ]

  // GETTERS ****************************************************************
  async function getPatientsFromGraphQL() {
    try {
      const response = await getPatients()
      const mappedData: Patients = {
        patients: response?.patients?.map((backendPatient: any) => {
          const frontendPatient = {
            patientId: backendPatient.patientId,
            patientName: backendPatient.patientProfile.patientFirstName + ' ' + backendPatient.patientProfile.patientLastName,
            patientDOB: backendPatient.patientProfile.patientDOB || 'dobFromBackend',
            patientPhoneNumber: backendPatient.patientProfile.patientPhoneNumber || '',
            patientEmail: backendPatient.email || '',
            currentPatientStatus: ['New Patient'],
          }

          return frontendPatient
        }),
      }
      allPatients.value = mappedData.patients
    } catch (error) {
      console.error('Error retrieving patients:', error)
    }
  }

  async function getPatientFromGraphQL(patientId: string) {
    console.log(patientId)
    try {
      const response = await getPatient(patientId)

      if (response?.patientProfile) {
        const backendPatient = response.patientProfile
        const subAccounts = response.subAccounts
        const actionItems = response.actionItems

        const frontendPatient = {
          patientId: patientId || 'patientId',
          patientName: backendPatient.patientFirstName + ' ' + backendPatient.patientLastName || 'patientName',
          patientDOB: backendPatient.patientDOB || 'patientDOB' + patientId.slice(0, 4),
          patientEmail: backendPatient.patientEmail || 'patientEmail',
          patientPhoneNumber: backendPatient.patientPhoneNumber || 'patientPhoneNumber',
          patientHeight: backendPatient.patientHeight || 'patientHeight',
          userRole: backendPatient.userRole || 'userRole',
          patientWeight: backendPatient.patientWeight || 'patientWeight',
          patientSex: backendPatient.patientSex || 'patientSex',
          patientAge: backendPatient.patientAge || 'patientAge',
          patientAddress: backendPatient.patientAddress || 'patientAddress',
          subAccounts: subAccounts.map((subAccount: any) => ({
            subAccountId: subAccount.subAccountId || 'subAccountId',
            subAccountName: subAccount.subAccountName || 'subAccountName',
          })),
          actionItems: actionItems || 'actionItems',
        }

        patientData.value = frontendPatient
      } else {
        console.error('No patient profile found')
      }
    } catch (error) {
      console.error('Error retrieving patient:', error)
    }
    return patientDataForAdminPage.find((patient) => patient.patientId === patientId)
  }

  async function updateInsuranceGraphQL(patientId: string, groupNumber: string, memberId: string, insuranceName: string, policyHolderName: string) {
    console.log('RUNNING ')
    try {
      const response = await updateInsurance(patientId, groupNumber, memberId, insuranceName, policyHolderName)
      console.log(response)
    } catch (error) {
      console.error('Error updating insurance:', error)
    }
  }

  return { allPatients, patientData, getPatientFromGraphQL, getPatientsFromGraphQL, patientDataForAdminPage, getPatient, updateInsuranceGraphQL }
})
