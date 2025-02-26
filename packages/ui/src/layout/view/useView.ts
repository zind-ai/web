"use client"

import { useEffect, useState } from "react"

export const useView = (toggle?: boolean) => {
  const [view, setView] = useState<boolean>(false)

  useEffect(() => {
    if (toggle) {
      openView()
    }
  }, [toggle])

  const openView: () => void = () => setView(true)
  const closeView: () => void = () => setView(false)

  return { view, openView, closeView }
}
