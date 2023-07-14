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
  patientId: string
  patientName: string
  patientDOB: string
  patientDateOfService: string
  patientNextFollowUp: string
  patientProviderAssigned: string
  patientCareCoordinatorAssigned: string
  isPatientNewPatientFollowUpOrNewMessage: 'New Patient' | 'Follow Up' | null
  patientNewMessage: string | null
  patientMedicaBackground: null | string
  isPatientAccutane: boolean
}

export interface Patients {
  patients: Patient[]
}
