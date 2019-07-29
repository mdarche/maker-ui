export const formatUnit = value => {
  return isNaN(value) ? value : `${value}px`
}

export const errorCheck = (name, value, provider) => {
  if (value === undefined) {
    throw new Error(`${name} must be used within a ${provider}`)
  }
}
