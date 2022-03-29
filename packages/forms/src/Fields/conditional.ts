import type {
  Condition,
  CompareOperator,
  InputOption,
  FieldType,
} from '../types'

type Comparators = {
  [key in CompareOperator]: (a: any, b: any) => boolean
}

export const comparators: Comparators = {
  eq: (a, b) => a === b,
  ne: (a, b) => a !== b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  contains: (a, b) => a.contains(b),
  exists: (a, b) => (a ? true : false),
  notExists: (a, b) => (!a ? true : false),
}

const containsBool = (arr: boolean[], b: boolean) =>
  arr.some((item) => item === b)

type FormatSelectProps = InputOption | InputOption[]
function formatSelect(b: FormatSelectProps) {
  console.log('Select value is', b)
  return b
}

export const evaluateConditions = (
  rules: [[Condition]],
  values: { [key: string]: any },
  type: FieldType
): boolean => {
  let and: boolean[] = []
  let or: boolean[] = []

  rules.forEach((s, index) => {
    if (!s.length) {
      return
    }
    s.forEach(({ field, compare, target }) => {
      if (values[field] === undefined) return
      const formValue =
        type === 'select'
          ? formatSelect(values[field] as FormatSelectProps)
          : values[field]

      const result = comparators[compare](formValue, target)
      if (index === 0) {
        and.push(result)
      } else {
        or.push(result)
      }
    })
  })
  // console.log("And =", and);
  // console.log("Or =", or);

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
