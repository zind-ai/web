import React from "react"
import { Text } from "@zind/ui"

interface props {
  text: string
}

const ChatHeading = ({ text }: props) => {
  const headingLevel = text.startsWith("###")
    ? 3
    : text.startsWith("##")
      ? 2
      : text.startsWith("#")
        ? 1
        : 3

  const cleanedText = text.replace(/^#+/, "").trim()

  return (
    <Text as={`h${headingLevel}`} className="mt-4 mb-2">
      {cleanedText}
    </Text>
  )
}

export default ChatHeading
