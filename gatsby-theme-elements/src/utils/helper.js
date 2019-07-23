export const formatUnit = value => {
  return isNaN(value) ? value : `${value}px`
}
