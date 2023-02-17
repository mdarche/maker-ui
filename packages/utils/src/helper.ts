type IDType = 'mixed' | 'letters' | 'numbers'

/**
 * Returns a randomly generated alphanumeric ID.
 *
 * @param length - an integer that determines the length of the random string
 * @param type - 'mixed' | 'letters' | 'numbers'
 *
 */
export function generateId(length: number = 6, type: IDType = 'mixed'): string {
  let result = ''
  const letters = 'abcdefghijklmnopqrstuvwxyz',
    nums = '1234567890',
    chars =
      type === 'mixed' ? letters + nums : type === 'numbers' ? nums : letters
  for (let i = 0; i < length; i++) {
    if (i === 0 && type !== 'numbers') {
      // Ensure first character is a letter to prevent className errors
      result += letters.charAt(Math.floor(Math.random() * letters.length))
    } else {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
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

  return s === '' ? undefined : s
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
