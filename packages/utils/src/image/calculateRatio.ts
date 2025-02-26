export const calculateRatio = (
  image: HTMLImageElement,
  maxSize: number = 400
): HTMLCanvasElement => {
  let canvas = document.createElement("canvas")
  let imgWidth = image.width
  let imgHeight = image.height

  if (imgWidth > imgHeight) {
    if (imgWidth > maxSize) {
      imgHeight *= maxSize / imgWidth
      imgWidth = maxSize
    }
  } else {
    if (imgHeight > maxSize) {
      imgWidth *= maxSize / imgHeight
      imgHeight = maxSize
    }
  }

  canvas.width = imgWidth
  canvas.height = imgHeight
  return canvas
}
