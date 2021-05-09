import { transitionTypes } from '../constants'

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
 * Utility for mobile nav transitions that require a full-width window
 */

export const fullWidth = ['fade', 'fade-up', 'fade-down']

/**
 * Uses the nav's settings to build the appropriate transition and position.
 *
 * @param active - a boolean that determines whether or not the menu is active
 * @param type - the transition style (string)
 * @param width - the mobile menu's width specificed in the options configuration
 */

export const getTransition = (
  active: boolean,
  type: typeof transitionTypes[number],
  width: any
): object => {
  const opacity = type.includes('fade') ? (active ? 1 : 0) : 1
  const visibility = active ? 'visible' : 'hidden'

  const directionX = type.includes('right')
    ? { right: 0, width, transform: active ? null : 'translateX(100%)' }
    : { left: 0, width, transform: active ? null : 'translateX(-100%)' }

  const directionY = () => {
    if (type !== 'fade') {
      const sign = type === 'fade-up' ? '' : '-'
      return { transform: !active ? `translateY(${sign}20px)` : null }
    }
    return null
  }

  const size = fullWidth.includes(type)
    ? { width: '100%', left: 0, ...directionY() }
    : directionX

  return {
    opacity,
    visibility,
    ...size,
  }
}

/**
 * Returns a randomly generated alphanumeric ID.
 *
 * @internal usage only
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
 * @param libSelector - the MakerUI library selector (can be dynamic)
 * @param selector - the className or id supplied by component props
 *
 */

export function mergeSelector(
  libSelector: string,
  selector?: string
): string | undefined {
  if (libSelector.length > 1) {
    return selector
      ? [libSelector, selector]
          .join(' ')
          .replace(/ +(?= )/g, '')
          .trim()
      : libSelector
  }
  return selector ? selector : undefined
}

// TODO - This would change the API for all usage across packages

export function mergeSelectors(selectors: string[]): string | undefined {
  return selectors
    ? selectors
        .join(' ')
        .replace(/ +(?= )/g, '')
        .trim()
    : undefined
}
