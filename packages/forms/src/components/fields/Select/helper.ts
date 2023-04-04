import { InputOption } from '@/types'

type SelectValue = string | string[] | InputOption | InputOption[]

/**
 * Converts the value to the correct type depending on `multi` and `returnType`
 */
export function formatReturn(
  multi: boolean,
  returnType: 'object' | 'value',
  value: InputOption[]
): SelectValue {
  if (Array.isArray(value)) {
    value = value.map(({ index, ...rest }) => rest)
  }
  return multi
    ? returnType === 'value'
      ? (value as InputOption[]).map((option) => option.value)
      : value
    : returnType === 'value'
    ? value[0].value
    : value[0]
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

export function initValue(
  value: string | string[] | InputOption | InputOption[],
  options: InputOption[]
): InputOption[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.map((val) => {
      if (typeof val === 'string') {
        const match = options.find((option) => option.value === val)
        return match || { label: val, value: val }
      }
      return val
    })
  }
  if (typeof value === 'string') {
    const match = options.find((option) => option.value === value)
    return [match || { label: value, value }]
  }
  return [value]
}
