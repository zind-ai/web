"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Settings } from "lucide-react"
import { Box, IconButton, Text } from "@zind/ui"
import { NavbarSettings, settings } from "./NavbarSettings"

export const Navbar = () => {
  const router = useRouter()
  const openSettings = () => router.push(`?on=${settings}`, { scroll: false })

  return (
    <>
      <Box className="fixed top-0 bg-white/5 px-5 py-2 backdrop-blur-2xl">
        <Box className="mx-auto flex items-center justify-between md:w-2xl md:px-5">
          <Text as="span" className="text-gradient text-xl font-bold">
            Chat
          </Text>
          <IconButton onClick={openSettings} variant="text" size="sm">
            <Settings className="h-5 w-5" />
          </IconButton>
        </Box>
      </Box>

      <Suspense fallback={null}>
        <NavbarSettings />
      </Suspense>
    </>
  )
}
