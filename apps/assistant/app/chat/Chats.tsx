"use client"

import { useEffect, useRef } from "react"
import { v4 as uuid } from "uuid"
import { Box, Loading } from "@zind/ui"
import { openai_chat_role } from "@zind/sdk"
import { user_id } from "@/app/global/login/user"
import { useChat } from "./ChatContext"
import ChatInput from "./ChatInput"
import Chat from "./Chat"
import { useActionCenter } from "../action-center/ActionCenterContext"

export const Chats = () => {
  const chatEnd = useRef<HTMLDivElement>(null)
  const { chats, addChat, loading } = useChat()
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

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats])

  return (
    <Box className="md:w-2xl mx-auto h-screen w-full">
      <Box className="pb-30 items-stretch space-y-3">
        {loading && <Loading />}

        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}

        <Box ref={chatEnd} />
      </Box>

      <ChatInput onSendMessage={sendMessage} />
    </Box>
  )
}
