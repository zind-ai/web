export const hasItem = (key: PropertyKey) => {
  return localStorage.hasOwnProperty(key)
}
