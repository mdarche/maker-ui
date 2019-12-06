// Formatting

export const formatUnit = value => {
  return isNaN(value) ? value : `${value}px`
}

// Error Checks

export const errorCheck = (name, value, provider) => {
  if (value === undefined) {
    throw new Error(`${name} must be used within a ${provider}`)
  }
}

export const validate = options => {
  return options !== undefined && typeof options === "object" ? options : {}
}
