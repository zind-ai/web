"use client"

import { useRouter } from "next/navigation"
import { Bot } from "lucide-react"
import { Box, IconButton, Text } from "@zind/ui"
import { AssistantProfile } from "../assistant/AssistantProfile"

export enum NavItem {
  ai = "ai",
}

export const Navbar = () => {
  const router = useRouter()

  const openAssistantProfile = () => {
    router.push(`?on=${NavItem.ai}`, { scroll: false })
  }

  return (
    <>
      <Box className="fixed top-0 bg-white/5 px-5 py-1 backdrop-blur-2xl">
        <Box className="mx-auto flex items-center justify-between md:w-2xl md:px-5">
          <Text as="span" className="text-gradient text-xl font-bold">
            Chat
          </Text>

          <IconButton variant="text" onClick={openAssistantProfile} size="sm">
            <Bot className="h-7 w-7" />
          </IconButton>
        </Box>
      </Box>

      <AssistantProfile />
    </>
  )
}
