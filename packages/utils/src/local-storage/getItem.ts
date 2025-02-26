export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key)

    if (typeof item !== "string") return item

    if (item === "undefined") return undefined

    if (item === "null") return null

    if (/^'-?\d{1,}?\.?\d{1,}'$/.test(item)) return Number(item)

    if (/^'-?\d{1}\.\d+e\+\d{2}'$/.test(item)) return Number(item)

    if (item[0] === "{" || item[0] === "[") return JSON.parse(item)

    return item
  }
}
