import { defineStore } from 'pinia'
import { getMyProfile } from '@/lib/endpoints'

export const useProfileStore = defineStore('profile', () => {
  const profileData = ref()
  const isPatientMember = ref(false)

  // Sign Up Flow State
  const signUpDescribeYouAnswer = ref<string>()
  const signUpZipCode = ref<string>()
  const signUpName = ref<string>()
  const signUpDOB = ref<string>()
  const signUpMinorFullName = ref<string>()
  const signUpMinorEmailAddress = ref<string>()
  const signUpMinorPhoneNumber = ref<string>()
  const signUpEmail = ref<string>()
  const signUpPassword = ref<string>()
  const signUpAgreement = ref<boolean>()

  // SETTERS ****************************************************************
  async function setMyProfile() {
    try {
      const response = await getMyProfile()
      profileData.value = response
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  // const patientData = [
  //   {
  //     userRole: 'Admin',

  //     patientDiagnosisCodes: 'CODE123',
  //     patientFirstName: 'Chester',
  //     patientLastName: 'Pags',
  //     patientAge: '28',
  //     patientDOB: '04/03/1995',
  //     patientHeightFeet: '6',
  //     patientHeightInches: '3',
  //     patientWeight: '200',
  //     patientPhoneNumber: '1234567890',
  //     patientEmail: 'ryan@yopmail.com',
  //     patientAddress: '123 Main st',
  //     patientSex: 'Male',

  //     healthInsuranceName: 'Blue Cross Blue Shield',
  //     healthInsurancePolicyHolderName: 'Ryan',
  //     healthInsuranceMemberID: '987',
  //     healthInsuranceGroupNumber: 'BC-123',

  //     medicalBackground: [
  //       {
  //         title: 'Acne history',
  //         content: [
  //           { name: 'Duration', value: 'Had acne for months' },
  //           { name: 'Treatment history', value: 'Prescription topicals, Prescriptions pills, Cleansers' },
  //           { name: 'Prescription topicals', value: 'Dapsone' },
  //           { name: 'Prescription pills', value: 'Doxycycline, Duricef ' },
  //           { name: 'Non-prescriptions in use', value: 'CeraVe Hydrating Cleanser' },
  //         ],
  //       },
  //       {
  //         title: 'Skin type',
  //         content: [
  //           { name: 'Sensitivity', value: 'No' },
  //           { name: 'Dryness', value: 'No' },
  //           { name: 'Had Acne Before', value: 'No' },
  //         ],
  //       },
  //       {
  //         title: 'Cycle & menstruation',
  //         content: [
  //           { name: 'Pregnant', value: 'No' },
  //           { name: 'Breakouts', value: 'Throughout the month' },
  //           { name: 'Regular cycle', value: 'No' },
  //           { name: 'History of PCOS', value: 'No' },
  //         ],
  //       },
  //       {
  //         title: 'Other medical background',
  //         content: [
  //           { name: 'Medications', value: 'Lithium Bicarbonate, Yaz' },
  //           { name: 'Allergies', value: 'Benzyl acohol, penicillin' },
  //           { name: 'Conditions', value: 'No other reported conditions' },
  //         ],
  //       },
  //       {
  //         title: 'Lifestyle & sleep',
  //         content: [
  //           { name: 'Sleep', value: '5h or less' },
  //           { name: 'Stress level', value: 'Very stressed' },
  //           { name: 'Dairy consumption', value: 'A few times a week' },
  //         ],
  //       },
  //     ],
  //   },
  // ]

  return {
    profileData,
    setMyProfile,
    isPatientMember,
    signUpDescribeYouAnswer,
    signUpZipCode,
    signUpName,
    signUpDOB,
    signUpMinorFullName,
    signUpMinorEmailAddress,
    signUpMinorPhoneNumber,
    signUpEmail,
    signUpPassword,
    signUpAgreement,
  }
})
