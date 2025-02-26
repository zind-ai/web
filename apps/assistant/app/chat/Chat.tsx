import React from "react"
import { twMerge } from "tailwind-merge"
import { Text, Box } from "@/library/ui"
import { chat } from "@/app/api/chats/types"
import { chat_role } from "@/library/client/openai"
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
        "flex rounded-3xl pt-3 pb-3",
        chat.role === chat_role.user
          ? "bg-grayscale-125 dark:bg-grayscale-725 w-auto place-self-end pr-5 pl-5 sm:max-w-[80%]"
          : "w-full place-self-start"
      )}
    >
      {chat.role === chat_role.assistant && (
        <Text as="span" className="mt-1 mr-2 text-2xl">
          🤖
        </Text>
      )}

      {chat.role === chat_role.user && <ChatUser message={chat.message} />}

      {chat.role === chat_role.assistant && (
        <ChatAssistant chatSegments={segments} />
      )}
    </Box>
  )
}

export default Chat
