"use client"

import { usePathname } from "next/navigation"

const paths = { chat: "/chat", home: "/" }

export const Nav = () => {
  const currentPath = usePathname()

  return currentPath === paths.chat ? "" : ""
}
