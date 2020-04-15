export function generateId(length = 5) {
  let result = ''
  let chars = 'abcdefghijklmnopqrstuv1234567890'
  let charLength = chars.length

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength))
  }

  return result
}

export function setBreakpoint(index, arr) {
  let i = 0

  while (i < index) {
    arr.unshift(null)
    i++
  }

  return arr
}

export function validate(obj) {
  return obj !== undefined && typeof obj === 'object' ? obj : {}
}
