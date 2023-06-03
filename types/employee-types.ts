export interface Employee {
  employeeId: string
  firstName?: String
  lastName?: String
  email?: String
  role?: String
  phone?: String
  address?: String
  timezone?: String
  licenseType?: String
  licenseNumber?: String
  licenseExpirationDate?: String
  licenseState?: String
  npi?: String
  isActive?: Boolean
}

export interface Employees {
  employees: Employee[]
}
