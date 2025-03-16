import { DateTime } from 'luxon'

export const parseDate = (date: string | number) => {
  if (typeof date === 'number')
    return DateTime.fromMillis(date).toLocaleString(DateTime.DATE_SHORT)
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT)
}
export const parseDateTime = (date: string | number) => {
  // Format example: Fri, Oct 31, 12:00 PM
  if (typeof date === 'number')
    return DateTime.fromMillis(date).toFormat('EEEE, LLL d  T')

  return DateTime.fromISO(date).toFormat('EEEE, LLL d  T')
}
export const parseDateRelative = (date: string | number) => {
  // DateTime.now().toRelative()
  if (typeof date === 'number')
    return DateTime.fromMillis(date).toRelative()
  return DateTime.fromISO(date).toRelative()
}
export const parseCurrency = (amount: number) => {
  // returns the currency separating thousands by commas and adding a dot and 2 digits
  // for the cents
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
export const getInitials = (name: string | null | undefined) => {
  if (!name)
    return ''
  const names = name.trim().split(' ')
  return `${names[0][0]}${names[names.length > 1 ? 1 : 0][names.length > 1 ? 0 : 1]}`
}

export const orderOptions = <T extends KeyMap>(arr: T[]) => {
  const options = arr.sort((a, b) => {
    if (a.displayOrder < b.displayOrder)
      return -1

    if (a.displayOrder > b.displayOrder)
      return 1

    return 0
  })
  return options
}
export const getFileNameFromSrc = (src: string) => {
  const regex = /\/([^\/?]+)\?/
  const match = decodeURIComponent(src).match(regex)

  if (match && match[1]) {
    // Decode URL-encoded characters
    const filename = decodeURIComponent(match[1])
    return filename
  }
  else {
    return null
  }
}
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
export const deepEqual = (a: any, b: any): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  } else if (a && typeof a === 'object' && b && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    return keysA.every(key => deepEqual(a[key], b[key]));
  } else {
    return a === b; // Primitive comparison
  }
}
// creates a function that will receive a date string "01 DEZ 2024" and return a number in milliseconds
export const parseDateToMillis = (date: string) => {
  const [day, month, year] = date.split(' ')
  const months: { [key: string]: number } = {
    JAN: 1,
    FEV: 2,
    MAR: 3,
    ABR: 4,
    MAI: 5,
    JUN: 6,
    JUL: 7,
    AGO: 8,
    SET: 9,
    OUT: 10,
    NOV: 11,
    DEZ: 12
  }
  return DateTime.fromObject({ year: parseInt(year), month: months[month as keyof typeof months], day: parseInt(day) }).toMillis()
}
