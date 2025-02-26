export const hostName = () => {
  return !window.location.hostname.includes("localhost")
    ? window.location.hostname
    : `${window.location.hostname}:${window.location.port}`
}
