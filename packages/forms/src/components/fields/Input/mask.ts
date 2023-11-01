function formatDecimalAuto(input: string): string {
  const cleanedInput = input.replace(/[^0-9]/g, '') // Remove anything that's not a number

  if (cleanedInput === '0') {
    return ''
  } else if (cleanedInput.length === 1) {
    return `.0${cleanedInput}`
  } else if (cleanedInput.length === 2) {
    return `.${cleanedInput}`
  } else {
    const wholePart = parseInt(cleanedInput.slice(0, -2)) || 0 // Get all but the last 2 digits
    const decimalPart = cleanedInput.slice(-2) // Get the last 2 digits

    const formattedWholePart = new Intl.NumberFormat('en-US').format(wholePart)
    return `${formattedWholePart}.${decimalPart}`
  }
}

function formatWithTemplate(input: string, template: string): string {
  const cleanedInput = input.replace(/[^0-9]/g, '')
  let currentIndex = 0
  let formatted = ''

  for (let char of template) {
    if (currentIndex >= cleanedInput.length) break

    if (char === 'x') {
      formatted += cleanedInput[currentIndex]
      currentIndex++
    } else {
      formatted += char
    }
  }

  return formatted
}

export function formatNumber(input: string, isText: boolean): string {
  // Convert the input to a number
  const numValue = parseFloat(input)

  // Round to two decimal places
  const roundedValue = Math.round(numValue * 100) / 100

  if (isText) {
    // Format as a string with 2 decimal places and with commas
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(roundedValue)
  } else {
    // Simply return the number rounded to 2 decimal places
    return roundedValue.toFixed(2)
  }
}

export function maskString(
  input: string,
  formatOption:
    | 'currency'
    | 'currency-decimal-auto'
    | 'phone'
    | 'zip'
    | 'ssn'
    | 'credit-card'
): string {
  if (!input || input === '') {
    return ''
  }
  switch (formatOption) {
    case 'currency':
      return input.replace(/[^0-9.,]/g, '') // Remove anything that's not a number or period
    case 'currency-decimal-auto':
      return formatDecimalAuto(input)
    case 'phone':
      return formatWithTemplate(input, '(xxx) xxx-xxxx')
    case 'zip':
      return formatWithTemplate(input, 'xxxxx-xxxx')
    case 'ssn':
      return formatWithTemplate(input, 'xxx-xx-xxxx')
    case 'credit-card':
      return formatWithTemplate(input, 'xxxx xxxx xxxx xxxx')
    default:
      throw new Error('Invalid format option')
  }
}
