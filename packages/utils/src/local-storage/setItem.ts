export const setItem = (key: string, value: string) => {
  if (typeof key !== "string") {
    throw new TypeError(
      `localStorage: Key must be a string. (reading '${key}')`
    )
  }

  if (typeof value === "object" || Array.isArray(value)) {
    value = JSON.stringify(value)
  }

  localStorage.setItem(key, value)
}
