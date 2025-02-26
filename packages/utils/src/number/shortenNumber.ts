export const shortenNumber = (num: number) => {
  const length = num.toString().length
  let number = num.toString()

  if (length == 4) {
    return number.charAt(0) + "k"
  } else if (length == 5) {
    return number.substring(0, 2) + "k"
  } else if (length == 6) {
    return number.substring(0, 3) + "k"
  } else if (length == 7) {
    return number.substring(0, 1) + "m"
  } else if (length == 8) {
    return number.substring(0, 2) + "m"
  } else if (length == 9) {
    return number.substring(0, 3) + "m"
  } else {
    return number
  }
}
