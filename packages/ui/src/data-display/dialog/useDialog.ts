"use client"

import { useEffect, useState } from "react"

export const useDialog = (toggle?: boolean) => {
  const [dialog, setDialog] = useState<boolean>(false)

  useEffect(() => {
    if (toggle) {
      openDialog()
    }
  }, [toggle])

  const openDialog: () => void = () => setDialog(true)
  const closeDialog: () => void = () => setDialog(false)

  return { dialog, openDialog, closeDialog }
}
