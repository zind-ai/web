import { format } from "@zind/time"
import { Chat } from "../types"

export const formatChats = (chats?: Chat[]): string => {
  if (!chats || !chats.length) return ""

  const userMessages = chats
    .reverse()
    .slice(0, 10)
    .map(
      (chat) =>
        `${chat.role} (${format(chat.created_at, "MMM ddth, yyyy hh:mm")}): ${chat.message}`
    )
    .join("\n")

  return `Recent chats:\n${userMessages}`
}
