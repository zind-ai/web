"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { Toast } from "./Toast"

interface props {
  showToast: (message: string, duration?: number) => void
}

const ToastContext = createContext<props | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = (message: string, duration = 5000) => {
    setMessage(message)

    setTimeout(() => setMessage(null), duration)
  }

  const hideToast = () => setMessage(null)

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast label={message ?? ""} show={!!message} onHide={hideToast} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
