"use client"

import { useEffect, useRef } from "react"
import { openai_chat_role } from "@zind/sdk"
import { Box, Loading } from "@zind/ui"
import { useChat } from "./ChatContext"
import Chat from "./Chat"
import ChatInput from "./ChatInput"

export const Chats = () => {
  const chatEnd = useRef<HTMLDivElement>(null)
  const { chats, gettingChats } = useChat()

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats])

  const lastAssistantChatId = chats
    .filter((chat) => chat.role === openai_chat_role.assistant)
    .pop()?.id

  if (gettingChats) return <Loading />

  return (
    <Box className="mx-auto mt-15 h-screen w-full p-5 md:w-2xl">
      <Box className="animate-fade-in-scale items-stretch space-y-3 pb-30">
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            chat={chat}
            showMemory={chat.id === lastAssistantChatId}
          />
        ))}

        <Box ref={chatEnd} />
      </Box>
      <ChatInput />
    </Box>
  )
}
