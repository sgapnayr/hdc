import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { getPatients, getPatient, updateInsurance } from '@/lib/endpoints'
import { useRoute } from 'vue-router'

export const usePatientStore = defineStore('patient', () => {
  const allPatients = ref([])
  const nextToken = ref(null)
  const patientData = ref()
  const currentPatientId = ref()
  const currentPrimaryAccountData = ref()
  const primarySubAccounts = ref([])

  const route = useRoute()

  if (!currentPatientId.value) {
    currentPatientId.value = route.params.patientId
  }

  function mapBackendToFrontendPatient(backendPatient) {
    console.log('BACKENDD PATIENTS', backendPatient)
    return {
      patientId: backendPatient.patientId,
      patientName: backendPatient.patientProfile.patientFirstName + ' ' + backendPatient.patientProfile.patientLastName,
      patientDOB: backendPatient.patientProfile.patientDOB || 'missing',
      patientPhoneNumber: backendPatient.patientProfile.patientPhoneNumber || '',
      patientEmail: backendPatient.patientProfile.email || '',
      currentPatientStatus: ['New Patient'],
      patientProvider: backendPatient.provider || 'provider',
      patientCoordinator: backendPatient.coordinator || 'coordinator',
      patientREMsNumber: backendPatient.patientREMsNumber || '123',
    }
  }

  async function getPatientsFromGraphQL(token = null) {
    console.log('HERE')
    try {
      console.log('HERE')
      const response = await getPatients(token)

      console.log(response)
      if (response?.patients) {
        const newPatients = response.patients.map(mapBackendToFrontendPatient)

        console.log(
          'HERE',
          newPatients.map((patientData) => patientData.email)
        )

        // Create a temporary map for quick look-up
        const patientIdMap = new Map(allPatients.value.map((patient) => [patient.patientId, patient]))

        // Merge new patients
        for (const newPatient of newPatients) {
          if (!patientIdMap.has(newPatient.patientId)) {
            allPatients.value.push(newPatient)
            patientIdMap.set(newPatient.patientId, newPatient)
          }
        }

        nextToken.value = response.nextToken
      } else {
        console.error('No patients found')
      }
    } catch (error) {
      console.error('Error retrieving patients:', error)
    }
  }

  async function getPatientFromGraphQL(patientId) {
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
          patientEmail: backendPatient.email,
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
          primarySubAccounts.value = frontendPatient.subAccounts
        } else {
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

  async function updateInsuranceGraphQL(patientId, groupNumber, memberId, insuranceName, policyHolderName) {
    try {
      const response = await updateInsurance(patientId, groupNumber, memberId, insuranceName, policyHolderName)
      console.log(response)
    } catch (error) {
      console.error('Error updating insurance:', error)
    }
  }

  watch(currentPatientId, (newValue) => {
    if (newValue) {
      getPatientFromGraphQL(newValue.toString())
    }
  })

  return {
    allPatients,
    nextToken,
    patientData,
    getPatientFromGraphQL,
    getPatientsFromGraphQL,
    updateInsuranceGraphQL,
    currentPatientId,
    currentPrimaryAccountData,
    primarySubAccounts,
  }
})
