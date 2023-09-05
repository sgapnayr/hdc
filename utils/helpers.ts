export function formatPennies(pennies: number | undefined): string {
  if (typeof pennies === 'undefined') {
    return 'NA'
  }
  const dollars = pennies / 100
  return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function getLastSixMonthsDates() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentDate = new Date()

  const lastSixMonthsDates = []
  for (let i = 5; i >= 0; i--) {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    lastSixMonthsDates.push(`${months[newDate.getMonth()]} ${newDate.getFullYear()}`)
  }

  return lastSixMonthsDates.reverse()
}

export function calculateAge(birthDate: string): number | null {
  const birthDateObj = new Date(birthDate)
  const today = new Date()

  // Check if the birthdate is valid
  if (isNaN(birthDateObj.getTime())) {
    return null // Invalid date
  }

  // Calculate the age
  const age = today.getFullYear() - birthDateObj.getFullYear()

  // Check if the birthday has already occurred this year
  if (today.getMonth() < birthDateObj.getMonth() || (today.getMonth() === birthDateObj.getMonth() && today.getDate() < birthDateObj.getDate())) {
    return age - 1
  }

  return age
}

export function calculateHeightInFeetAndInches(heightInInches: string): string | null {
  const heightInInchesNumber = parseInt(heightInInches, 10)

  // Check if the input is a valid number
  if (isNaN(heightInInchesNumber) || heightInInchesNumber < 0) {
    return null // Invalid input
  }

  const feet = Math.floor(heightInInchesNumber / 12)
  const inches = heightInInchesNumber % 12

  // Construct the height string in the format "X'Y""
  const heightString = `${feet}'${inches}"`

  return heightString
}
