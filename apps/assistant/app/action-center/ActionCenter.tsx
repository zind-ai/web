"use client"

import { useSearchParams } from "next/navigation"
import { v4 as uuid } from "uuid"
import { Box } from "@zind/ui"
import { openai_chat_role } from "@zind/sdk"
import { user_id } from "@/app/global/login/user"
import { useActionCenter } from "../action-center/ActionCenterContext"
import { useChat } from "../chat/ChatContext"
import ChatInput from "../chat/ChatInput"
import { Chats } from "../chat/Chats"
import { Header } from "./action-center/Header"
import { Todos } from "../todo/Todos"
import { useEffect, useState } from "react"

const tabs = [
  { id: "chat", title: "Chat", component: <Chats /> },
  { id: "todo", title: "To do", component: <Todos /> },
]

export const ActionCenter = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const validTabs = tabs.map((t) => t.id)

  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0]

  useEffect(() => {
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab)
    }
  }, [tab])

  const { addChat, addingChat } = useChat()
  const { action } = useActionCenter()

  const sendMessage = async (message: string) => {
    if (!message) return

    const isAction = await action(message)

    if (!isAction) {
      addChat({
        id: uuid(),
        message: message,
        role: openai_chat_role.user,
        user_id: user_id,
        created_at: new Date().toString(),
      })
    }
  }

  return (
    <Box>
      <Header title={activeTabData.title} />

      <Box className="mx-auto mt-15 h-screen w-full p-5 md:w-2xl">
        {activeTabData.component}
        <ChatInput onSendMessage={sendMessage} addingChat={addingChat} />
      </Box>
    </Box>
  )
}
