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
  fullName: string
  dateOfBirth: string
  acneCategory: string
  dateOfService: string
  nextFollowUp: string
  provider: string
  careCoordinator: string
}

export interface Patients {
  patients: Patient[]
}
