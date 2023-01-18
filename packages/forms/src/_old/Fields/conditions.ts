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
  contains: (a: string | string[], b) => a.includes(b),
  exists: (a, b) => (a ? true : false),
  notExists: (a, b) => (!a ? true : false),
}

const containsBool = (arr: boolean[], b: boolean) =>
  arr.some((item) => item === b)

type FormatSelectProps = InputOption | InputOption[]

const formatSelect = (b: FormatSelectProps) =>
  Array.isArray(b) ? b.map(({ value }) => value) : b.value

export const evaluateConditions = (
  rules: Array<Condition[]>,
  values: { [key: string]: any },
  fields?: { name: string; type: FieldType }[]
): boolean => {
  if (!fields) return false
  let and: boolean[] = []
  let or: boolean[] = []

  rules.forEach((s, index) => {
    if (!s.length) {
      return
    }
    s.forEach(({ field, compare, value }) => {
      if (values[field] === undefined) return
      const targetType = fields.find((p) => p.name === field)
      const formValue =
        targetType?.type === 'select'
          ? formatSelect(values[field] as FormatSelectProps)
          : values[field]

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
