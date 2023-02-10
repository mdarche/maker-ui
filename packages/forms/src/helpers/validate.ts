import type {
  FormSchema,
  FileValidation,
  FormValues,
  FormErrors,
} from '@/types'

interface ValidateProps {
  type: 'field' | 'page' | 'form'
  schema: FormSchema
  values: FormValues
  field?: string
  page?: number
}

export function validate({
  type,
  schema,
  values,
  page,
  field,
}: ValidateProps): { isValid: boolean; errors: FormErrors } {
  let isValid = true
  let errors: FormErrors = {}
  // const src = type === 'field' ? field : type === 'page' ? page :
  // Validate specific field
  if (field && type === 'field') {
    if (schema[field].required && !values[field]) {
      isValid = false
      errors[field] = `Field is required`
    } else if (schema[field]?.validation) {
      const res = schema[field].validation?.safeParse(values[field])
      if (!res?.success && res?.error) {
        errors[field] = res?.error
        isValid = false
      }
    }
  }

  // Loop over all items in schema

  if (type === 'form' || type === 'page') {
    Object.keys(schema).forEach((name) => {
      if (type === 'page' && schema[name].page !== page) {
        return
      }
      if (schema[name].required && !values[name]) {
        // Check for required
        isValid = false
        errors[name] = `Field is required`
      } else if (schema[name]?.validation) {
        // Check for custom validation
        const res = schema[name].validation?.safeParse(values[name])
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
