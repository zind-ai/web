import React from "react"
import { Box, Code } from "@zind/ui"

interface ChatCodeProps {
  codeBlock: string[]
}

const ChatCode = ({ codeBlock }: ChatCodeProps) => {
  return (
    <Box className="flex flex-col">
      {codeBlock.map((block, index) => (
        <Code key={index}>{block}</Code>
      ))}
    </Box>
  )
}

export default ChatCode
