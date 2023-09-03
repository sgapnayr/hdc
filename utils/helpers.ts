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
