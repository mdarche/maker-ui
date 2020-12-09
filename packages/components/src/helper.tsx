/**
 * Utility for checking and converting number values into strings for transitions / animations
 */

export function format(value: any): string {
  return isNaN(value) ? value : `${value}px`
}

/**
 * Utility for parsing transition strings and setting positive or negative value
 */

export const getSign = (type: string): string =>
  type.includes('right') || type.includes('down') ? '-' : ''

/**
 * Fisher-Yates shuffle for generating a random value from an array
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
 */

export function random(options = []) {
  return shuffle(options)[0]
}

/**
 * Return a random style object from a style object where each value is an array
 * of possible options. Can be applied based on position in array or individually for
 * each property.
 *
 * @todo add strong types
 */

export function generateStyles(options = {}, groupByIndex = false) {
  let styles = {}

  if (groupByIndex) {
    //@ts-ignore
    const indices = Object.entries(options)[0][1].length
    const randomIndex = Math.floor(Math.random() * indices)

    for (const [selector, props] of Object.entries(options)) {
      styles[selector] = props[randomIndex]
    }
  } else {
    for (const [s, p] of Object.entries(options)) {
      //@ts-ignore
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
 *
 */

export function generateSrc(options: RandomImage[] = []) {
  const { src, alt }: RandomImage = random(options)

  return { src, alt }
}
