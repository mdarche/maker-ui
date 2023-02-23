const regex = /^[a-zA-Z0-9]+$/
/**
 * Returns a randomly generated alphanumeric ID.
 *
 * @param length - an integer that determines the length of the random string
 *
 */
export function generateId(length: number = 6): string {
  let result = ''
  // Always add a letter as the first character
  result += String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  for (let i = 1; i < length; i++) {
    let char
    do {
      char = Math.floor(Math.random() * 256)
    } while (!regex.test(String.fromCharCode(char)))
    result += String.fromCharCode(char)
  }
  return result
}

/**
 * Returns a formatted selector string for `id` or `className` attributes that
 * merges user generated classNames with MakerUI defaults.
 *
 * @param selectors - an array of classNames or ids supplied by component props.
 * Can be dynamically generated
 *
 */
export function cn(selectors: (string | undefined)[]): string | undefined {
  let s = selectors
    ? selectors
        .join(' ')
        .replace(/ +(?= )/g, '')
        .trim()
    : undefined

  return s !== '' ? s : undefined
}

/**
 * Utility for merging a local ref with the useMeasure ref
 */
export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
