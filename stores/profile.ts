import { defineStore } from 'pinia'
import { getMyProfile, updateProfile } from '@/lib/endpoints'

export const useProfileStore = defineStore('profile', () => {
  const isPregnantModalOpen = ref(false)
  const isBloodSlipFormOpen = ref(false)
  const isPatientDetailsFormOpen = ref(false)

  const profileData = ref()
  const isPatientMember = ref(false)
  const scheduleVisitDataArr = ref<any>([])

  // Sign Up Flow State
  const signUpDescribeYouAnswer = ref<string>()
  const signUpZipCode = ref<string>()
  const signUpName = ref<string>()
  const signUpDOB = ref<string>()
  const signUpAge = ref<string>()
  const signUpHeight = ref<string>()
  const overEighteen = ref<boolean>()
  const signUpWeight = ref<string>()
  const signUpGender = ref<string>()
  const signUpEmail = ref<string>()
  const signUpPhoneNumber = ref<string>()
  const signUpPassword = ref<string>()
  const signUpConfirmationCode = ref<string>()
  const signUpAgreement = ref<boolean>()
  const creditCardNumber = ref<string>()
  const creditCardHolder = ref<string>()
  const creditCardExpiration = ref<string>()
  const creditCardCVV = ref<string>()

  // Schedule Visit Flow
  const howLongHaveYouHadAcne = ref<"I'm new to acne" | "I've had acne for months" | "I've had acne for years">()
  const doYouHaveDrySkin = ref<'Very dry' | 'Often dry' | 'Combination' | 'Often oily' | 'Very oily'>()
  const doYouHaveSensitiveSkin = ref<'Very sensitive' | 'Somewhat sensitive' | 'Not really'>()
  const sexAssignedAtBirth = ref<'Male' | 'Female'>()
  const areYouPregnant = ref<'Yes' | 'No'>()
  const doYouBreakOut = ref<'Yes' | 'No, I break out throughout the month' | "I don't menstruate">()
  const isYourMenstrualCycleRegular = ref<'Yes' | 'No'>()
  const doYouTakeBirthControl = ref<'Yes' | 'No'>()
  const doYouHaveHistoryOfPCOS = ref<'Yes' | 'No'>()
  const whatKindOfProductsHaveYouTried = ref<
    | 'Cleansers or moistruizers'
    | 'Over the counter creams'
    | 'Vitamins for acne'
    | 'Prescription creams'
    | 'Prescription pills'
    | "I haven't tried any products"
  >()
  const whichNonPrescriptionsDoYouUse = ref<string>()
  const areYouTakingOtherMedications = ref<'Yes' | 'No'>()
  const doYouHaveAnyAllergies = ref<'Yes' | 'No'>()
  const describeYourStressLevel = ref<'Never stressed' | 'Almost never stressed' | 'Sometimes stressed' | 'Fairly stressed' | 'Very stressed'>()
  const describeYourSleep = ref<'5 hours or less' | 'Between 6 or 7 hours' | '8+ hours'>()
  const howOftenDoYouConsumeDairy = ref<'Never' | 'A few times a month' | ' A few times a week' | 'A few times a day'>()
  const lastStepLetsSeeYourSkin = ref() // Change to image upload

  // SETTERS ****************************************************************
  async function setMyProfile(userId?: string) {
    try {
      const response = await getMyProfile(userId)
      console.log('set profile in profile store', response)
      profileData.value = response
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }

  async function updateProfile() {
    try {
      const response = await updateProfile()
      console.log('update profile in profile store', response)
    } catch (error) {
      console.error('Error updating profile', error)
    }
  }

  function handlePregnancyModal() {
    isPregnantModalOpen.value = !isPregnantModalOpen.value
  }

  function handleBloodSlipForm() {
    isBloodSlipFormOpen.value = !isBloodSlipFormOpen.value
  }

  function handlePatientDetailsForm() {
    isPatientDetailsFormOpen.value = !isPatientDetailsFormOpen.value
  }

  // Schedule Visit Flow
  const saveScheduleVisitData = () => {
    const scheduleVisitData = [
      {
        medicalTitle: 'Skin Type',
        content: [
          { name: 'Dryness', value: doYouHaveDrySkin.value },
          { name: 'Sensitivity', value: doYouHaveSensitiveSkin.value },
        ],
      },
      {
        medicalTitle: 'Acne History',
        content: [
          { name: 'Had acne for', value: howLongHaveYouHadAcne.value },
          { name: 'Products Tried', value: whatKindOfProductsHaveYouTried.value },
          { name: 'Non-prescriptions used', value: whichNonPrescriptionsDoYouUse.value },
        ],
      },
      {
        medicalTitle: 'Cycle & Menstruation',
        content: [
          { name: 'Sex assigned at birth', value: sexAssignedAtBirth.value },
          { name: 'Pregnant', value: areYouPregnant.value },
          { name: 'Breakouts', value: doYouBreakOut.value },
          { name: 'Menstrual Acne Behavior', value: isYourMenstrualCycleRegular.value },
          { name: 'Birth Control', value: doYouTakeBirthControl.value },
          { name: 'History of PCOS', value: doYouHaveHistoryOfPCOS.value },
        ],
      },
      {
        medicalTitle: 'Other Medical History',
        content: [
          { name: 'Other Medications', value: areYouTakingOtherMedications.value },
          { name: 'Allergies', value: doYouHaveAnyAllergies.value },
        ],
      },
      {
        medicalTitle: 'Lifestyle',
        content: [
          { name: 'Stress Level', value: describeYourStressLevel.value },
          { name: 'Sleep', value: describeYourSleep.value },
          { name: 'Dairy Consumption', value: howOftenDoYouConsumeDairy.value },
        ],
      },
    ]

    scheduleVisitDataArr.value.push(...scheduleVisitData)
  }

  // EXPORTS ****************************************************************
  return {
    isPregnantModalOpen,
    isBloodSlipFormOpen,
    isPatientDetailsFormOpen,
    profileData,
    scheduleVisitDataArr,
    saveScheduleVisitData,
    setMyProfile,
    isPatientMember,
    signUpDescribeYouAnswer,
    signUpZipCode,
    signUpName,
    signUpDOB,
    signUpAge,
    overEighteen,
    signUpEmail,
    signUpGender,
    signUpPassword,
    signUpPhoneNumber,
    signUpAgreement,
    signUpConfirmationCode,
    creditCardNumber,
    creditCardHolder,
    creditCardExpiration,
    creditCardCVV,
    howLongHaveYouHadAcne,
    doYouHaveDrySkin,
    doYouHaveSensitiveSkin,
    sexAssignedAtBirth,
    areYouPregnant,
    doYouBreakOut,
    isYourMenstrualCycleRegular,
    doYouTakeBirthControl,
    doYouHaveHistoryOfPCOS,
    whatKindOfProductsHaveYouTried,
    whichNonPrescriptionsDoYouUse,
    areYouTakingOtherMedications,
    doYouHaveAnyAllergies,
    describeYourStressLevel,
    describeYourSleep,
    howOftenDoYouConsumeDairy,
    lastStepLetsSeeYourSkin,
    signUpHeight,
    signUpWeight,
    handlePregnancyModal,
    handleBloodSlipForm,
    handlePatientDetailsForm,
    updateProfile,
  }
})
