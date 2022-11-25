/**
 * Fisher-Yates shuffle for generating a random value from an array
 *
 * @param {any[]} array - An array of anything that will be randomly shuffled
 *
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
 *
 * @param {any[]} options - An array of anything that will be randomly shuffled
 *
 */
export function random(options: any[] = []) {
  return shuffle(options)[0]
}

interface Dictionary<T> {
  [id: string]: T
}

/**
 * Return a random style object where each value is an array of possible options.
 * Can be applied based on position in array or individually for each property.
 *
 * @param {object} options - A style object where each key has an array of possible values
 * @param {boolean} groupByIndex - A boolean that determines if the same index of each
 * options value should be used
 *
 * @todo add strong types
 *
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
