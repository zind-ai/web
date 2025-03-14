"use client"

import { useEffect, useState } from "react"

export const useDropdown = (toggle?: boolean) => {
  const [dropdown, setDropdown] = useState<boolean>(false)

  useEffect(() => {
    if (toggle) {
      openDropdown()
    }
  }, [toggle])

  const openDropdown: () => void = () => setDropdown(true)
  const closeDropdown: () => void = () => setDropdown(false)

  return { dropdown, openDropdown, closeDropdown }
}
