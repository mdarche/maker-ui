import type { FieldProps, FormValues } from '@/types'
import { generateId } from '@maker-ui/utils'
import { setDefault } from './utils'

const pattern = /^(.+)\.(\d+)\.(.+)$/

/**
 *
 * @param str
 * @note this only works for the first level of nesting
 */
export function isFieldArray(str: string): boolean {
  return pattern.test(str)
}

export interface Repeater {
  field: string
  index: number
  subField: string
}

export function extractField(str: string): Repeater | undefined {
  const match = str.match(pattern)

  if (match) {
    return {
      field: match[1],
      index: parseInt(match[2], 10),
      subField: match[3],
    }
  }

  return undefined
}

/**
 * Returns the value of a field in a form, regardless of whether or not it is a repeater
 * field array.
 *
 * @param field
 * @param values
 * @returns
 */
export function getFieldValue(field?: string, values?: FormValues) {
  if (!field || !values) return undefined
  const r = extractField(field)
  return r ? values[r.field][r.index][r.subField] : values[field]
}

export function getSchemaValue(field: string) {
  const extracted = extractField(field)
  if (extracted) {
    return `${extracted.field}.${extracted.subField}`
  }

  return field
}

export function generateFieldNames(value: any[], fieldName: string) {
  return value.reduce((acc: string[], item: any, index: number) => {
    Object.keys(item).forEach((key) => {
      if (key !== '_id') {
        acc.push(`${fieldName}.${index}.${key}`)
      }
    })
    return acc
  }, [])
}

export function initRepeaterValues(fields?: FieldProps[]) {
  if (!fields) return []
  let val = { _id: generateId() }
  fields.forEach((s) => {
    Object.assign(val, { [s.name]: setDefault(s.type) })
  })
  return val
}
