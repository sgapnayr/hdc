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
  patientMedicaBackground: null | string // need type for medica background
}

export interface Patients {
  patients: Patient[]
}
