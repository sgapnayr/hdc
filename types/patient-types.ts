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

export interface Patient {
  patientName: string
  patientDOB: string
  patientAcneCategory: string
  patientDateOfService: string
  patientNextFollowUp: string
  patientProviderAssigned: string
  patientCareCoordinatorAssinged: string
}

export interface Patients {
  patients: Patient[]
}
