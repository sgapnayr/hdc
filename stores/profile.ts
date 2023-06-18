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
  const overEighteen = ref<boolean>()
  const signUpEmail = ref<string>()
  const signUpPhoneNumber = ref<string>()
  const signUpPassword = ref<string>()
  const signUpConfirmationCode = ref<string>()
  const signUpAgreement = ref<boolean>()
  const creditCardNumber = ref<string>()
  const creditCardHolder = ref<string>()
  const creditCardExpiration = ref<string>()
  const creditCardCVV = ref<string>()

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
  async function setMyProfile() {
    try {
      const response = await getMyProfile()
      profileData.value = response
    } catch (error) {
      console.error('Error retrieving employees:', error)
    }
  }
  return {
    profileData,
    setMyProfile,
    isPatientMember,
    signUpDescribeYouAnswer,
    signUpZipCode,
    signUpName,
    signUpDOB,
    overEighteen,
    signUpEmail,
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
  }
})
