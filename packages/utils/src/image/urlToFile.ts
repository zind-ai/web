export const urlToFile = (url: string, fileName: string): File => {
  let arr = url.split(",")
  let mime = arr[0].match(/:(.*?);/)![1]
  let data = arr[1]
  let dataStr = atob(data)
  let n = dataStr.length
  let dataArr = new Uint8Array(n)
  while (n--) {
    dataArr[n] = dataStr.charCodeAt(n)
  }
  return new File([dataArr], fileName, { type: mime })
}
