// Formatting

export const formatUnit = value => {
  return isNaN(value) ? value : `${value}px`
}

// Error Checks

export const validate = options => {
  return options !== undefined && typeof options === "object" ? options : {}
}
