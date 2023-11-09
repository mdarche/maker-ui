import type {
  FormSchema,
  FileValidation,
  FormValues,
  FormErrors,
  FormCondition,
} from '@/types'
import { evaluateConditions } from './conditional-logic'
import { generateFieldNames, getFieldValue, getSchemaValue } from './repeater'

/**
 * Validates a field's visibility and emptiness based on form values and schema.
 *
 * @param field The name of the field to validate.
 * @param values The current values of the form.
 * @param schema The schema of the form.
 * @returns An object containing visibility and emptiness status of the field.
 */
function basicValidate(field: string, values: FormValues, schema: FormSchema) {
  const evaluateVisibility = (conditions?: Array<FormCondition[]>) =>
    conditions ? evaluateConditions(conditions, values, schema) : true

  const f = getSchemaValue(field)
  const group = schema[f]?.group
  const conditions = schema[f]?.conditions

  // Determine visibility of the group and field
  let isGroupVisible = true
  if (group && schema[group]) {
    isGroupVisible = evaluateVisibility(schema[group]?.conditions)
  }

  // Determine visibility of field
  const isVisible =
    isGroupVisible && (conditions ? evaluateVisibility(conditions) : true)

  const isEmpty = checkIsEmpty(getFieldValue(field, values))
  return { isVisible, isEmpty }
}

function checkIsEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (Array.isArray(value)) return value.length === 0
  if (value instanceof Date) return isNaN(value.getTime())
  if (typeof value === 'object') return Object.values(value).every(checkIsEmpty)
  return !value
}

interface ValidateProps {
  type: 'field' | 'page' | 'form'
  schema: FormSchema
  values: FormValues
  field?: string
  page?: number
}

function validateField(
  fieldName: string,
  schema: FormSchema,
  values: FormValues
): { error: string | null } {
  const { isVisible, isEmpty } = basicValidate(fieldName, values, schema)
  if (!isVisible) {
    return { error: null }
  }

  const schemaField = getSchemaValue(fieldName)
  const fieldValue = getFieldValue(fieldName, values)

  // Handle 'required' validation
  if (schema[schemaField]?.required && isEmpty) {
    // Ensure that required message is a string; otherwise, use a default message.
    const requiredMessage =
      typeof schema[schemaField]?.required === 'string'
        ? schema[schemaField]?.required
        : 'Required'
    return { error: requiredMessage as string }
  }

  // Handle custom Zod validation
  if (schema[schemaField]?.validation) {
    const validationFn = schema[schemaField]?.validation?.safeParse
    if (validationFn) {
      const res = validationFn(fieldValue)
      if (!res?.success && res?.error) {
        return { error: res.error.issues[0]?.message || 'Validation error' }
      }
    }
  }

  return { error: null }
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

  if (type === 'field' && field) {
    const error = validateField(field, schema, values).error
    if (error) {
      errors[field] = error
      isValid = false
    }
  } else if (type === 'form' || type === 'page') {
    Object.keys(schema).forEach((fieldName) => {
      if (type === 'page' && schema[fieldName]?.page !== page) {
        return
      }
      if (fieldName.includes('.')) {
        return
      }

      if (schema[fieldName]?.type === 'repeater') {
        const nestedFields = generateFieldNames(values[fieldName], fieldName)
        nestedFields.forEach((nestedField) => {
          const error = validateField(nestedField, schema, values).error
          if (error) {
            errors[nestedField] = error
            isValid = false
          }
        })
      }

      const error = validateField(fieldName, schema, values).error
      if (error) {
        errors[fieldName] = error
        isValid = false
      }
    })
  }

  console.log('errors', errors)
  console.log('isValid', isValid)

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
