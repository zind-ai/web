import { useState } from "react"
import { Send } from "lucide-react"
import { Box, IconButton, Textarea } from "@zind/ui"

interface props {
  onSendMessage: (message: string) => void
}

const ChatInput = ({ onSendMessage }: props) => {
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
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
          placeholder="Message story"
          aria-label="Message story"
          className="h-14 resize-none items-center rounded-full pt-3 pr-16"
          autoFocus
        />

        <IconButton
          onClick={sendMessage}
          aria-label="Send message"
          disabled={!message.trim()}
          className="absolute top-1/2 right-1 z-1 -translate-y-[56%]"
        >
          <Send className="h-6 w-6" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatInput
