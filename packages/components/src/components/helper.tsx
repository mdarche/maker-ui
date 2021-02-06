/**
 * Utility for checking and converting number values into strings for transitions / animations
 * @param {any} value - A value that will be formatted into a string for transforms
 */
export function format(value: any): string {
  return isNaN(value) ? value : `${value}px`
}

/**
 * Utility for parsing transition strings and setting positive or negative value
 * @param {string} type - A transition string ('fade-up', 'slide-right', etc.)
 */
export const getSign = (type: string): string =>
  type.includes('right') || type.includes('down') ? '-' : ''

/**
 * Fisher-Yates shuffle for generating a random value from an array
 * @param {any[]} array - An array of anything that will be randomly shuffled
 */
export const shuffle = (array: any[]) => {
  let m = array.length,
    temp,
    i

  while (m) {
    i = Math.floor(Math.random() * m--)

    temp = array[m]
    array[m] = array[i]
    array[i] = temp
  }

  return array
}

/**
 * Return a random item from an array
 * @param {any[]} options - An array of anything that will be randomly shuffled
 */
export function random(options: any[] = []) {
  return shuffle(options)[0]
}

interface Dictionary<T> {
  [id: string]: T
}

/**
 * Return a random style object from a style object where each value is an array
 * of possible options. Can be applied based on position in array or individually for
 * each property.
 *
 * @param {object} options - A style object where each key has an array of possible values
 * @param {boolean} groupByIndex - A boolean that determines if the same index of each
 * options value should be used
 *
 * @todo add strong types
 */
export function generateStyles(
  options: { [key: string]: (number | string)[] } = {},
  groupByIndex = false
) {
  let styles: Dictionary<any> = {}

  if (groupByIndex) {
    const indices = Object.entries(options)[0][1].length
    const randomIndex = Math.floor(Math.random() * indices)

    for (const [selector, props] of Object.entries(options)) {
      styles[selector] = props[randomIndex]
    }
  } else {
    for (const [s, p] of Object.entries(options)) {
      styles[s] = random(p)
    }
  }

  return styles
}

interface RandomImage {
  alt: HTMLImageElement['alt']
  src: HTMLImageElement['src']
}

/**
 * Return a random image object
 * @param {RandomImage[]} options - An array of objects that include a `src` URL and `alt` text
 */
export function generateSrc(options: RandomImage[] = []) {
  const { src, alt }: RandomImage = random(options)

  return { src, alt }
}

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 * @param {number} number The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 *
 * @returns {number} Returns the clamped number.
 *
 * @link https://github.com/lodash/lodash/blob/master/clamp.js
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
