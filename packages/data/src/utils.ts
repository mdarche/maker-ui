export function getNonEmptyKeys(obj: Record<string, any>): string[] {
  return Object.keys(obj).filter((key) => {
    const value = obj[key]
    if (value === undefined || value === null || value === '') {
      return false
    }
    if (Array.isArray(value) && value.length === 0) {
      return false
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return false
    }
    return true
  })
}

export function formatNumber(value: string | number, template: string): string {
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'number') {
    return template.replace('%', value.toString())
  } else {
    throw new Error(`Invalid type for value: ${typeof value}`)
  }
}
