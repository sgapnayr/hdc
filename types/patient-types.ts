// type Patient {
//   patientId: ID!
//   accountId: ID
//   appointments: AppointmentPage
//   phone: String
//   email: String
//   referralId: String
//   careTeam: [PatientCareTeam]
//   parentInfo: PatientParentInfo
//   medicalBackground: PatientMedicalBackground
//   shippingInfo: ShippingInfo
//   insurance: PatientInsuranceInfo
//   timezone: String
//   membership: PatientMembership
//   scheduleLink: String
//   isAccutane: Boolean! # consider to move to flags
//   status: String
//   actionItems: [String]
//   notes: NotesPage
//   # flags(contains flags for different purposes)
// }

export type patientStatus =
  | 'New Patient'
  | 'Follow Up'
  | 'New Message'
  | 'Active'
  | 'Inactive'
  | 'Accutane'
  | 'No Shows'
  | 'Cancelled'
  | 'Archived'
  | 'Transferred'
  | 'Unscheduled'

export interface Patient {
  patientId: string
  patientName: string
  patientDOB: string
  patientDateOfService: string
  patientNextFollowUp: string
  patientProviderAssigned: string
  patientCareCoordinatorAssigned: string
  currentPatientStatus: patientStatus[]
  patientMedicalBackground: null | string
  patientSex: string
  patientAge: string
  patientWeight: string
  patientHeight: string
  patientPhoneNumber: string
  patientEmail: string
  patientAddress: string
  patientCity: string
  patientState: string
  patientZipCode: string
  patientHealthInsurance: string
  patientInsuranceMemberID: string
  patientInsurancePolicyHolderName: string
  patientInsuranceGroupNumber: string
  patientCurrentTasks: string[]
}

export interface Patients {
  patients: Patient[]
}

export interface SignUpPatientPayload {
  patientSignUpSelfOrOtherAccount: string
  patientZipCode: string
  patientName: string
  patientDOB: string
  patientCreditCardNumber?: string
  patientCreditCardHolder?: string
  patientCreditCardExpiration?: string
  patientCreditCardCVV?: string
}
