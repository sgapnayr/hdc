import { defineStore } from 'pinia'
import { getPatients, getPatient, updateInsurance } from '@/lib/endpoints'
import { Patient, Patients } from '@/types/patient-types'
import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'

export const usePatientStore = defineStore('patient', () => {
  const allPatients = ref()
  const patientData = ref()
  const currentPatientId = ref()

  // GETTERS ****************************************************************
  async function getPatientsFromGraphQL() {
    try {
      const response = await getPatients()
      const mappedData: any = {
        patients: response?.patients?.map((backendPatient: any) => {
          const frontendPatient = {
            patientId: backendPatient.patientId,
            patientName: backendPatient.patientProfile.patientFirstName + ' ' + backendPatient.patientProfile.patientLastName,
            patientDOB: backendPatient.patientProfile.patientDOB || 'missing',
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
        const insurance = response.patientProfile.healthInsurance

        const frontendPatient = {
          patientId: patientId || 'patientId',
          patientName: backendPatient.patientFirstName + ' ' + backendPatient.patientLastName,
          patientDOB: backendPatient.patientDOB,
          patientEmail: backendPatient.patientEmail,
          patientPhoneNumber: backendPatient.patientPhoneNumber,
          patientHeight: backendPatient.patientHeight,
          userRole: backendPatient.userRole,
          patientWeight: backendPatient.patientWeight,
          patientSex: backendPatient?.patientSex,
          patientAge: backendPatient?.patientAge,
          patientAddress: backendPatient.patientAddress,
          subAccounts:
            subAccounts != null
              ? subAccounts.map((subAccount: any) => ({
                  subAccountId: subAccount.subAccountId || 'subAccountId',
                  subAccountName: subAccount.subAccountName || 'subAccountName',
                }))
              : [],
          actionItems: actionItems || 'actionItems',
          insurance: insurance || 'insurance',
        }

        patientData.value = frontendPatient
      } else {
        console.error('No patient profile found')
      }
    } catch (error) {
      console.error('Error retrieving patient:', error)
    }
  }

  async function updateInsuranceGraphQL(patientId: string, groupNumber: string, memberId: string, insuranceName: string, policyHolderName: string) {
    try {
      const response = await updateInsurance(patientId, groupNumber, memberId, insuranceName, policyHolderName)
      console.log(response)
    } catch (error) {
      console.error('Error updating insurance:', error)
    }
  }

  return { allPatients, patientData, getPatientFromGraphQL, getPatientsFromGraphQL, getPatient, updateInsuranceGraphQL, currentPatientId }
})
