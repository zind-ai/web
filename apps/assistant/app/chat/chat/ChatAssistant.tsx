import React from "react"
import { twMerge } from "tailwind-merge"
import { Box } from "@zind/ui"
import { chatSegments } from "./chatSegments"
import ChatHeading from "./ChatHeading"
import ChatCode from "./ChatCode"
import ChatText from "./ChatText"

interface props {
  chatSegments: chatSegments
}

const ChatAssistant = ({ chatSegments }: props) => {
  return (
    <Box>
      {chatSegments.map((segment, index) => {
        if (segment.type === "code") {
          return <ChatCode key={index} codeBlock={[segment.content]} />
        }

        const line = segment.content
        const isOrderedList = line.match(/^\d+\./)
        const isUnorderedList = line.trim().startsWith("-")
        const isHeading = line.startsWith("#")

        return (
          <Box
            key={index}
            className={twMerge(
              index > 0 && isOrderedList ? "mt-6" : "mt-2",
              isUnorderedList ? "pl-6" : "pl-0"
            )}
          >
            {isHeading ? <ChatHeading text={line} /> : <ChatText text={line} />}
          </Box>
        )
      })}
    </Box>
  )
}

export default ChatAssistant
