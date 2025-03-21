import React from "react"
import { twMerge } from "tailwind-merge"
import { Box } from "@zind/ui"
import { openai_chat_role } from "@zind/sdk"
import { Chat as IChat } from "@/app/api/chats/types"
import { chatSegments } from "./chat/chatSegments"
import ChatAssistant from "./chat/ChatAssistant"
import ChatUser from "./chat/ChatUser"
import { ChatMemories } from "./chat/ChatMemories"

interface ChatProps {
  chat: IChat
  showMemory: boolean
}

const Chat = ({ chat, showMemory }: ChatProps) => {
  const segments = chatSegments(chat.message)

  return (
    <Box
      className={twMerge(
        "flex rounded-3xl pt-3 pb-3",
        chat.role === openai_chat_role.user
          ? "bg-grayscale-125 dark:bg-grayscale-725 ml-auto w-fit place-self-end pr-5 pl-5 sm:ml-0 sm:w-auto sm:max-w-[80%]"
          : "w-full place-self-start"
      )}
    >
      {chat.role === openai_chat_role.user && (
        <ChatUser message={chat.message} />
      )}

      {chat.role === openai_chat_role.assistant && (
        <Box className="flex flex-col gap-1">
          <ChatAssistant chatSegments={segments} />
          {showMemory && <ChatMemories />}
        </Box>
      )}
    </Box>
  )
}

export default Chat
