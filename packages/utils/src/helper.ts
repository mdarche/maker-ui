/**
 * Evaluates a MakerOptions breakpoint and formats the `breakpoints` prop array
 *
 * @param bp - a breakpoint value
 * @param bpArray - the MakerOptions breakpoints array
 *
 */
export const setBreakpoint = (
  bp: string | number,
  bpArray: (string | number)[]
) =>
  typeof bp === 'string' ? [bp] : bp < bpArray.length ? [bpArray[bp]] : [bp]

/**
 * Utility for adding pixel value to numbers for transitions and animations
 */
export const format = (value: any) => (isNaN(value) ? value : `${value}px`)

/**
 * Returns a randomly generated alphanumeric ID.
 *
 * @internal
 *
 */
export function generateId(length: number = 5): string {
  let result = ''
  let chars = 'abcdefghijklmnopqrstuv1234567890'
  let charLength = chars.length

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength))
  }

  return result
}

/**
 * Check to see if value is an object else return an empty object
 *
 * @param obj - any value to be evaluated
 *
 */
export function validate(obj: any) {
  return obj !== undefined && typeof obj === 'object' ? obj : {}
}

/**
 * Returns a formatted selector string for `id` or `className` attributes that
 * merges user generated classNames with MakerUI defaults.
 *
 * @param selectors - an array of classNames or ids supplied by component props.
 * Can be dynamically generated
 *
 */
export function mergeSelectors(
  selectors: (string | undefined)[]
): string | undefined {
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
