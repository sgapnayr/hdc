import { defineStore } from 'pinia'
import { getPatients, getPatient, updateInsurance } from '@/lib/endpoints'
import { useRoute } from 'vue-router'

export const usePatientStore = defineStore('patient', () => {
  const allPatients = ref()
  const patientData = ref()
  const currentPatientId = ref()
  const currentPrimaryAccountData = ref()
  const primarySubAccounts = ref([])

  const route = useRoute()

  if (!currentPatientId) {
    currentPatientId.value = route.params.patientId
  }

  watch(currentPatientId, () => {
    getPatientFromGraphQL(currentPatientId.value)
  })

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
            patientProvider: backendPatient.proivder || 'provider',
            patientCoordinator: backendPatient.coordinator || 'coordinator',
            patientREMsNumber: backendPatient?.patientREMsNumber || '123',
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
          patientFirstName: backendPatient.patientFirstName,
          patientLastName: backendPatient.patientLastName,
          patientDOB: backendPatient?.patientDOB?.split('\\').join(''),
          patientEmail: backendPatient.patientEmail,
          patientPhoneNumber: backendPatient.patientPhoneNumber,
          patientHeight: backendPatient.patientHeight,
          userRole: backendPatient.userRole,
          patientWeight: backendPatient.patientWeight,
          patientSex: backendPatient?.patientSex,
          patientAge: backendPatient?.patientAge,
          patientAddress: backendPatient.patientAddress,
          patientREMsNumber: backendPatient?.patientREMsNumber || '123',
          actionItems: actionItems || 'actionItems',
          insurance: insurance || 'insurance',
          patientProvider: backendPatient.proivder || 'provider',
          patientCoordinator: backendPatient.coordinator || 'coordinator',
          subAccounts:
            subAccounts != null
              ? subAccounts.map((subAccount: any) => ({
                  subAccountId: subAccount.subAccountId || 'subAccountId',
                  subAccountName: subAccount.subAccountName || 'subAccountName',
                }))
              : [],
        }

        if (!currentPrimaryAccountData.value) {
          currentPrimaryAccountData.value = frontendPatient
          primarySubAccounts.value = frontendPatient.subAccounts.length > 0 ? frontendPatient.subAccounts : primarySubAccounts.value
        } else {
          primarySubAccounts.value = frontendPatient.subAccounts.length > 0 ? frontendPatient.subAccounts : primarySubAccounts.value
          frontendPatient.subAccounts = primarySubAccounts.value
        }

        patientData.value = frontendPatient
      } else {
        console.error('No patient profile found')
      }
    } catch (error) {
      console.error('Error retrieving patient:', error)
    }
  }

  watch(currentPatientId, () => {
    getPatientFromGraphQL(currentPatientId.toString())
  })

  async function updateInsuranceGraphQL(patientId: string, groupNumber: string, memberId: string, insuranceName: string, policyHolderName: string) {
    try {
      const response = await updateInsurance(patientId, groupNumber, memberId, insuranceName, policyHolderName)
      console.log(response)
    } catch (error) {
      console.error('Error updating insurance:', error)
    }
  }

  return {
    allPatients,
    patientData,
    getPatientFromGraphQL,
    getPatientsFromGraphQL,
    getPatient,
    updateInsuranceGraphQL,
    currentPatientId,
    currentPrimaryAccountData,
    primarySubAccounts,
  }
})
