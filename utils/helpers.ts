export function formatPennies(pennies: number | undefined): string {
  if (typeof pennies === 'undefined') {
    return 'NA'
  }
  const dollars = pennies / 100
  return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
