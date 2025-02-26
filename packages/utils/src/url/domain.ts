import { hostName } from "./hostName"
import { protocol } from "./protocol"

export const domain = () => {
  return `${protocol()}//${hostName()}`
}
