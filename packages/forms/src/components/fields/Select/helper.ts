import { InputOption } from '@/types'

type SelectValue = string | string[] | InputOption | InputOption[]

/**
 * Converts the value to the correct type depending on `multi` and `returnType`
 */
export function convertValue(
  multi: boolean,
  returnType: 'object' | 'value',
  value: InputOption | InputOption[]
): SelectValue {
  if (Array.isArray(value)) {
    value = value.map(({ index, ...rest }) => rest)
  } else {
    const { index, ...rest } = value as InputOption
    value = rest
  }
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

export const addIndexToOptions = (options: InputOption[]) => {
  let index = 0
  return options.map((option) => {
    if (!option.disabled) {
      option.index = index
      index++
    }
    return option
  })
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
