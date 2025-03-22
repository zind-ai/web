import React from "react"
import { Text } from "@zind/ui"

interface ChatUserProps {
  message: string
}

const ChatUser = ({ message }: ChatUserProps) => {
  return <Text className="whitespace-pre-wrap">{message}</Text>
}

export default ChatUser
