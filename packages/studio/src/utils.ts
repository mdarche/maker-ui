export function extractValue(input: string): number | string {
  const match = input.match(/^(\d+(?:\.\d+)?)px$/)
  return match ? parseFloat(match[1]) : input
}

export function replaceValue(
  original: string,
  index: number,
  newValue: string
) {
  const values = original.split(' ')
  values[index] = newValue
  return values.join(' ')
}

export function validateCssUnit(value: string): string | false {
  const validUnits = [
    'px',
    'em',
    'rem',
    '%',
    'vh',
    'vw',
    'vmin',
    'vmax',
    'cm',
    'mm',
    'in',
    'pt',
    'pc',
    'ex',
    'ch',
  ]

  // Check if value ends with a valid unit
  if (validUnits.some((unit) => value.endsWith(unit))) {
    return value
  }

  // Check if value is an integer and append 'px'
  if (/^\d+$/.test(value)) {
    return `${value}px`
  }

  return false
}
