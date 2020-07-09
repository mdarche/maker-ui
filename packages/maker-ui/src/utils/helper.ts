import { ResponsiveScale } from '../components/types'

/**
 * Returns a randomly generated alphanumeric ID.
 *
 * @param length - The number of characters in the ID. Default = 5
 * @returns A string with the required number of characters
 */

export function generateId(length: number = 5): string {
  let result = ''
  let chars = 'abcdefghijklmnopqrstuv1234567890'
  let charLength = chars.length

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength))
  }

  return result
}

/**
 * Returns a `Theme UI` compatible responsive array for a specific breakpoint index.
 *
 * @remarks
 * This function is used internally for layout and generic components
 *
 * @param index - The theme's `breakpoints` array where the style rule should begin
 * @param array - The original responsive style array
 *
 * @returns An array that adds `null` to all indices before the style rule begins
 */

export function setBreakpoint(index: number, arr: any[]): ResponsiveScale {
  let i = 0

  while (i < index) {
    arr.unshift(null)
    i++
  }

  return arr
}

export function validate(obj) {
  return obj !== undefined && typeof obj === 'object' ? obj : {}
}
