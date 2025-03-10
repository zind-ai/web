"use client"

import { useEffect, useRef } from "react"
import { Box, Loading } from "@zind/ui"
import { useChat } from "./ChatContext"
import Chat from "./Chat"

export const Chats = () => {
  const chatEnd = useRef<HTMLDivElement>(null)
  const { chats, gettingChats } = useChat()

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats])

  if (gettingChats) return <Loading />

  return (
    <Box className="animate-fade-in-scale items-stretch space-y-3 pb-30">
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}

      <Box ref={chatEnd} />
    </Box>
  )
}
