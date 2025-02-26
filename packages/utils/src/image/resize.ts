import { calculateRatio } from "./calculateRatio"
import { urlToFile } from "./urlToFile"

export const resize = (file: File, maxSize = 400): Promise<File> => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = (event) => {
      const image_url = event.target!.result as string
      let image = document.createElement("img")
      image.src = image_url
      image.onload = (e) => {
        const canvas = calculateRatio(image, maxSize)
        let context = canvas.getContext("2d")

        if (context) {
          context.drawImage(image, 0, 0, canvas.width, canvas.height)
          let new_image_url = canvas.toDataURL(file.type, 98)
          let resizedFile = urlToFile(new_image_url, file.name)
          resolve(resizedFile)
        } else {
          reject(new Error("Could not create canvas context."))
        }
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
