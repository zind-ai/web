import type { Metadata } from "next"
import { ChatProvider } from "./chat/ChatContext"
import { TodoProvider } from "./todo/TodoContext"
import { ActionCenterProvider } from "./action-center/ActionCenterContext"
import { ActionCenter } from "./action-center/ActionCenter"

export const metadata: Metadata = {
  title: "story",
}

export default function Apps() {
  return (
    <ChatProvider>
      <TodoProvider>
        <ActionCenterProvider>
          <ActionCenter />
        </ActionCenterProvider>
      </TodoProvider>
    </ChatProvider>
  )
}
