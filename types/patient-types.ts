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
