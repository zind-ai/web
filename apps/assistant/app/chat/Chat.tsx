import React from "react"
import { twMerge } from "tailwind-merge"
import { Box, Text } from "@zind/ui"
import { openai_chat_role } from "@zind/sdk"
import { chat } from "@/app/api/chats/types"
import { chatSegments } from "./chat/chatSegments"
import ChatAssistant from "./chat/ChatAssistant"
import ChatUser from "./chat/ChatUser"

interface props {
  chat: chat
}

const Chat = ({ chat }: props) => {
  const segments = chatSegments(chat.message)

  return (
    <Box
      className={twMerge(
        "flex rounded-3xl pb-3 pt-3",
        chat.role === openai_chat_role.user
          ? "bg-grayscale-125 dark:bg-grayscale-725 w-auto place-self-end pl-5 pr-5 sm:max-w-[80%]"
          : "w-full place-self-start"
      )}
    >
      {chat.role === openai_chat_role.assistant && (
        <Text as="span" className="mr-2 mt-1 text-2xl">
          🤖
        </Text>
      )}

      {chat.role === openai_chat_role.user && (
        <ChatUser message={chat.message} />
      )}

      {chat.role === openai_chat_role.assistant && (
        <ChatAssistant chatSegments={segments} />
      )}
    </Box>
  )
}

export default Chat
