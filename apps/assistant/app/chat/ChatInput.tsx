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
    <Box className="bg-grayscale-25 dark:bg-grayscale-800 z-2 md:w-2xl fixed bottom-0 left-0 right-0 mx-auto w-full px-3 pb-5 md:px-0">
      <Box className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message story"
          aria-label="Message story"
          className="h-15 resize-none items-center rounded-full pr-16 pt-4"
          autoFocus
        />

        <IconButton
          onClick={sendMessage}
          aria-label="Send message"
          disabled={!message.trim()}
          className="z-1 absolute right-2 top-1/2 -translate-y-[56%]"
        >
          <Send className="h-6 w-6" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatInput
