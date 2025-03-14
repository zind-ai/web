"use client"

import { Box, Text } from "@zind/ui"
import { NavbarSettings } from "./NavbarSettings"
import { NavbarDropdown } from "./NavbarDropdown"

export const Navbar = () => {
  return (
    <>
      <Box className="fixed top-0 bg-white/5 px-5 py-1 backdrop-blur-2xl">
        <Box className="mx-auto flex items-center justify-between md:w-2xl md:px-5">
          <Text as="span" className={"text-gradient text-xl font-bold"}>
            Chat
          </Text>

          <NavbarDropdown />
        </Box>
      </Box>

      <NavbarSettings />
    </>
  )
}
