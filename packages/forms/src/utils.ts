import type { FieldProps } from './types'

export function getRequired(fields?: FieldProps[]) {
  return fields?.reduce((filtered: string[], { name, required }) => {
    if (required) {
      filtered.push(name)
    }
    return filtered
  }, [])
}
