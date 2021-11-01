/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @param {number} number The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 *
 * @returns {number} Returns the clamped number.
 *
 * @link https://github.com/lodash/lodash/blob/master/clamp.js
 *
 */
export function clamp(number: number, lower: number, upper: number): number {
  number = +number
  lower = +lower
  upper = +upper
  // eslint-disable-next-line no-self-compare
  lower = lower === lower ? lower : 0
  // eslint-disable-next-line no-self-compare
  upper = upper === upper ? upper : 0
  // eslint-disable-next-line no-self-compare
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
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
