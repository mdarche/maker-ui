export default (index, arr) => {
  let i = 0

  while (i < index) {
    arr.unshift(null)
    i++
  }

  return arr
}
