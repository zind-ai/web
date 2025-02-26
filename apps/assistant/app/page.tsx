import type { Metadata } from "next"
import { ChatProvider } from "./chat/ChatContext"
import { Chats } from "./chat/Chats"
import { TodoProvider } from "./todo/TodoContext"
import { Todos } from "./todo/Todos"
import { ActionCenterProvider } from "./action-center/ActionCenterContext"

export const metadata: Metadata = {
  title: "story",
}

export default function Apps() {
  return (
    <ChatProvider>
      <TodoProvider>
        <ActionCenterProvider>
          <Chats />
          <Todos />
        </ActionCenterProvider>
      </TodoProvider>
    </ChatProvider>
  )
}
