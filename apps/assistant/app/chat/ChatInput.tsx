import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { v4 as uuid } from "uuid"
import { Send } from "lucide-react"
import { Box, IconButton, Textarea } from "@zind/ui"
import { openai_chat_role } from "@zind/sdk"
import { useChat } from "./ChatContext"
import { useAssistant } from "../assistant/AssistantContext"

const ChatInput = () => {
  const [message, setMessage] = useState("")
  const { addChat, addingChat } = useChat()

  const { user } = useUser()
  const { assistant } = useAssistant()

  const sendMessage = () => {
    if (!message.trim() || !user?.sub) return

    addChat({
      id: uuid(),
      message: message,
      role: openai_chat_role.user,
      user_id: user.sub,
      created_at: new Date().toString(),
    })

    setMessage("")
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <Box className="bg-grayscale dark:bg-grayscale-800 fixed right-0 bottom-0 left-0 z-2 mx-auto w-full px-3 pb-5 md:w-2xl md:px-0">
      <Box className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${assistant?.name ?? "..."}`}
          aria-label="Message input field"
          className="h-14 resize-none items-center rounded-full pt-3 pr-16"
          autoFocus
        />

        <IconButton
          onClick={sendMessage}
          aria-label="Send message"
          disabled={!message.trim() || addingChat.loading}
          className="absolute top-1/2 right-1.5 z-1 -translate-y-[57%]"
        >
          <Send className="h-5 w-5" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatInput
