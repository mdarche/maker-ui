export interface FileValidations {
  size: number
  types: string[]
}

interface Validation {
  status: boolean
  errors: string[]
}

const defaultReqs: FileValidations = {
  size: 4097152, // 4MB
  types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
}

export function validateFile(
  { size, type }: File,
  reqs = defaultReqs
): Validation {
  let validation: Validation = { status: true, errors: [] }

  // Validate Size
  if (size > reqs.size) {
    validation.status = false
    validation.errors.push('Uploads must be no larger than 4MB.')
  }
  // Validate file type
  if (!reqs.types.includes(type)) {
    validation.status = false
    validation.errors.push(`Unsupported file type: ${type}.`)
  }
  return validation
}
