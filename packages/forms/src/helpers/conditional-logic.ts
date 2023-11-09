import type {
  Condition,
  CompareOperator,
  InputOption,
  FormSchema,
  FormValues,
} from '@/types'
import { getFieldValue, getSchemaValue } from './repeater'

type Comparators = {
  [key in CompareOperator]: (a: any, b: any) => boolean
}

/**
 * An object containing comparison operators and their associated
 * comparison functions.
 */
export const comparators: Comparators = {
  eq: (a, b) => a === b,
  ne: (a, b) => a !== b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  contains: (a: string | string[], b) => a.includes(b),
  exists: (a, _) => (a ? true : false),
  notExists: (a, _) => (!a ? true : false),
}

/**
 * Checks whether an array of booleans contains a specified boolean value.
 *
 * @param arr The array to check.
 * @param b The boolean value to search for.
 * @returns True if the array contains the specified boolean value, false otherwise.
 */
const containsBool = (arr: boolean[], b: boolean) =>
  arr.some((item) => item === b)

type FormatSelectProps = InputOption | InputOption[] | string | string[]

/**
 * Determines whether an array contains only string values.
 *
 * @param array An array of unknown values to check.
 * @returns `true` if every element in the array is a string, `false` otherwise.
 */
function isArrayOfStrings(array: unknown[]): array is string[] {
  return array.every((item) => typeof item === 'string')
}

/**
 * Formats a select field value to a string or an array of strings.
 *
 * @param b The select field value to format.
 * @returns A string or an array of strings representing the selected options.
 */
const formatSelect = (b: FormatSelectProps) =>
  typeof b === 'string'
    ? b
    : Array.isArray(b)
    ? isArrayOfStrings(b)
      ? b
      : b.map(({ value }) => value)
    : b.value

/**
 * Evaluates a set of conditions against a set of form values and returns
 * whether the conditions are true or false.
 *
 * @param rules An array of conditions to evaluate, where each condition is an object
 * containing a field, a compare operator, and a value to compare against.
 * @param values The current form values to evaluate against the conditions.
 * @param fields The schema for the form fields, used to determine the type of each field.
 * @returns True if all conditions evaluate to true, false otherwise.
 */
export const evaluateConditions = (
  rules?: Array<Condition[]>,
  values?: FormValues,
  schema?: FormSchema
): boolean => {
  if (!schema) return false
  let and: boolean[] = []
  let or: boolean[] = []

  rules?.forEach((s, index) => {
    if (!s.length) {
      return
    }
    s.forEach(({ field, compare, value }) => {
      const v = getFieldValue(field, values)
      const f = getSchemaValue(field)
      if (v === undefined) return
      const targetType = schema[f].type
      const formValue =
        targetType === 'select' ? formatSelect(v as FormatSelectProps) : v

      const result = comparators[compare](formValue, value)
      if (index === 0) {
        and.push(result)
      } else {
        or.push(result)
      }
    })
  })

  if (and.length && !or.length) {
    // Check for false in AND statements
    return !containsBool(and, false)
  }
  if (!and.length && or.length) {
    // Check for true in OR statements
    return containsBool(or, true)
  }
  // Combine previous scenarios with OR statement
  return !containsBool(and, false) || containsBool(or, true)
}
