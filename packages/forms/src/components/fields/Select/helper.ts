import { InputOption } from '@/types'

type SelectValue = string | string[] | InputOption | InputOption[]

/**
 * Converts the value to the correct type depending on `multi` and `returnType`
 */
export function convertValue(
  multi: boolean,
  returnType: 'object' | 'value',
  value: SelectValue
): SelectValue {
  return multi
    ? returnType === 'value'
      ? (value as InputOption[]).map((option) => option.value)
      : value
    : returnType === 'value'
    ? (value as InputOption).value
    : value
}

export function containsValue(
  options: InputOption[],
  selected: InputOption[]
): boolean {
  for (const option of options) {
    if (selected.some((s) => s.value === option.value)) {
      return true
    }
  }
  return false
}

export function formatOptions(
  options?: InputOption[] | { [key: string]: string }
): InputOption[] {
  if (!options) return []
  if (options && Array.isArray(options) && options.length) {
    return options
  }

  return Object.entries(options).map(([key, value]) => ({
    label: value,
    value: key,
  }))
}
