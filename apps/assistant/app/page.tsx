import type { Metadata } from "next"
import { ChatProvider } from "./chat/ChatContext"
import { Chats } from "./chat/Chats"

export const metadata: Metadata = {
  title: "Chat",
}

export default function chat() {
  return (
    <ChatProvider>
      <Chats />
    </ChatProvider>
  )
}
