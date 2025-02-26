import { format } from "@zind/time"
import { chat } from "../types"

export const getRecentChats = (chats: chat[]): string => {
  if (!chats.length) return ""

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
