// Fisher-Yates shuffle

const shuffle = array => {
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

export default shuffle
