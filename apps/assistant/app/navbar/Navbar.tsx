"use client"

import { useRouter } from "next/navigation"
import { Bot } from "lucide-react"
import { Box, IconButton, Text } from "@zind/ui"
import { NavbarSettings } from "./NavbarSettings"

export enum NavItem {
  settings = "settings",
}

export const Navbar = () => {
  const router = useRouter()

  const openSettings = () => {
    router.push(`?on=${NavItem.settings}`, { scroll: false })
  }

  return (
    <>
      <Box className="fixed top-0 bg-white/5 px-5 py-1 backdrop-blur-2xl">
        <Box className="mx-auto flex items-center justify-between md:w-2xl md:px-5">
          <Text as="span" className="text-gradient text-xl font-bold">
            Chat
          </Text>

          <IconButton
            variant="text"
            onClick={openSettings}
            size="sm"
            className="p-1.5"
            color="light"
          >
            <Bot className="h-7 w-7" />
          </IconButton>
        </Box>
      </Box>

      <NavbarSettings />
    </>
  )
}
