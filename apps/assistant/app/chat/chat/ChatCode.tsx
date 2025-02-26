import React from "react"
import { Box, Code } from "@/library/ui"

interface props {
  codeBlock: string[]
}

const ChatCode = ({ codeBlock }: props) => {
  return (
    <Box className="flex flex-col">
      {codeBlock.map((block, index) => (
        <Code key={index}>{block}</Code>
      ))}
    </Box>
  )
}

export default ChatCode
