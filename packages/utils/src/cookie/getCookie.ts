export const getCookie = (name: string) => {
  if (typeof window === "object") {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1]
  }

  return null
}
