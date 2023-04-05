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
