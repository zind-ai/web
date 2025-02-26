export const sentenceCase = (str: string) => {
  const words = str.trim().split(" ")
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")
}
