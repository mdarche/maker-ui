import type {
  FormSchema,
  FileValidation,
  FormValues,
  FormErrors,
} from '@/types'
import { evaluateConditions } from './conditional-logic'
import { getFieldValue, getSchemaValue } from './repeater'

interface ValidateProps {
  type: 'field' | 'page' | 'form'
  schema: FormSchema
  values: FormValues
  field?: string
  page?: number
}

function basicValidate(field: string, values: FormValues, schema: FormSchema) {
  const f = getSchemaValue(field)
  const conditions = schema[f]?.conditions
  const isVisible = conditions
    ? evaluateConditions(conditions, values, schema) // TODO
    : true
  let isEmpty
  const val = getFieldValue(field, values)

  if (val !== null && val !== undefined) {
    if (typeof val === 'object' && !Array.isArray(val)) {
      if (val instanceof Date) {
        isEmpty = isNaN(val.getTime())
      } else {
        isEmpty = Object.values(val).every((value) => !value)
      }
    } else {
      isEmpty = !val || (Array.isArray(val) && !val.length)
    }
  } else {
    isEmpty = true
  }

  return { isVisible, isEmpty }
}

/**
 * Validates a form or form field based on a given schema and values.
 *
 * @param {ValidateProps} props - The properties for the validation
 * @returns {Object} An object containing the validation result and errors
 */
export function validate({
  type,
  schema,
  values,
  page,
  field,
}: ValidateProps): { isValid: boolean; errors: FormErrors } {
  let isValid = true
  let errors: FormErrors = {}

  if (!schema || !values) {
    return { isValid: false, errors: {} }
  }

  // Validate specific field
  if (field && type === 'field') {
    const { isVisible, isEmpty } = basicValidate(field, values, schema)
    if (!isVisible) return { isValid, errors: {} }
    const f = getSchemaValue(field)

    if (schema[f]?.required && isEmpty) {
      isValid = false
      const r = schema[f]?.required
      errors[field] = typeof r === 'string' ? r : 'Required'
    } else if (schema[f]?.validation) {
      const val = getFieldValue(field, values)
      const res = schema[f]?.validation?.safeParse(val)

      if (!res?.success && res?.error) {
        errors[field] = res?.error
        isValid = false
      }
    }
  }

  // Loop over all items in schema

  if (type === 'form' || type === 'page') {
    Object.keys(schema).forEach((name) => {
      if (type === 'page' && schema[name]?.page !== page) {
        return
      }
      const { isVisible, isEmpty } = basicValidate(name, values, schema)
      if (!isVisible) return
      const f = getSchemaValue(name)

      if (schema[name]?.required && isEmpty) {
        // Check for required

        const r = schema[f]?.required
        isValid = false
        errors[name] = typeof r === 'string' ? r : 'Required'
      } else if (schema[f]?.validation) {
        // Check for custom validation
        const val = getFieldValue(name, values)
        const res = schema[f]?.validation?.safeParse(val)
        if (!res?.success && res?.error) {
          errors[name] = res?.error
          isValid = false
          return
        }
      }
    })
  }

  return { isValid, errors }
}

interface Validation {
  status: boolean
  errors: string[]
}

const defaultReqs: FileValidation = {
  size: 4097152, // 4MB
  types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
}

export function validateFile(
  { size, type }: File,
  reqs = defaultReqs
): Validation {
  let v: Validation = { status: true, errors: [] }

  // Validate Size
  if (size > reqs.size) {
    v.status = false
    v.errors.push('Uploads must be no larger than 4MB.')
  }
  // Validate file type
  if (!reqs.types.includes(type)) {
    v.status = false
    v.errors.push(`Unsupported file type: ${type}.`)
  }
  return v
}
