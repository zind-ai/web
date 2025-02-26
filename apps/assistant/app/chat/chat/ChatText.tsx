import React from "react"
import { Link, Text } from "@zind/ui"

interface props {
  text: string
}

// regex patterns
const boldRegex = /\*\*.*?\*\*/
const codeRegex = /`.*?`/
const urlRegex = /https?:\/\/[^\s/$.?#][^\s]*[^\s.,!?)]/

const allRegex = new RegExp(
  `(${boldRegex.source}|${codeRegex.source}|${urlRegex.source})`,
  "g"
)

const ChatText = ({ text }: props) => {
  const parts = text.split(allRegex)

  return (
    <Text className="align-middle">
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const title = part.slice(2, -2)
          return (
            <Text key={index} as="span" className="font-medium">
              {title}
            </Text>
          )
        } else if (part.startsWith("`") && part.endsWith("`")) {
          const pill = part.slice(1, -1)
          return (
            <Text key={index} as="span">
              <Text
                as="span"
                className="bg-grayscale-125 dark:bg-grayscale-700 rounded-3xl px-2 py-[1px]"
              >
                {pill}
              </Text>
            </Text>
          )
        } else if (part.match(urlRegex)) {
          return (
            <Link key={index} href={part}>
              {part}
            </Link>
          )
        }
        return (
          <Text key={index} as="span">
            {part}
          </Text>
        )
      })}
    </Text>
  )
}

export default ChatText
