import React from "react"
import { Text } from "@/library/ui"

interface props {
  message: string
}

const ChatUser = ({ message }: props) => {
  return <Text className="whitespace-pre-wrap">{message}</Text>
}

export default ChatUser
