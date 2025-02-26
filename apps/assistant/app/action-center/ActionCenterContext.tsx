"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { callAPI } from "@/library/utils/api"
import { instructions } from "./actions"
import { useTodo } from "../todo/TodoContext"
import { handleTodoAction } from "../todo/handleTodoAction"

interface ActionCenterContextProps {
  loading: boolean
  error: string

  action: (message: string) => Promise<boolean>
}

const ActionCenterContext = createContext<ActionCenterContextProps | undefined>(
  undefined
)

export const ActionCenterProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const { todos, openView, closeView, addTodo, removeTodo } = useTodo()

  const action = async (message: string) => {
    if (!message) return false

    setLoading(true)

    const context = `${instructions}\n\nTodo list:
      ${JSON.stringify(todos, null, 2)}`

    let json_response = null

    await callAPI({
      url: "/api/gpt",
      method: "post",
      formData: {
        prompt: message,
        context: context,
      },
      onSuccess: (data: { message: string; error: string | null }) => {
        json_response = data.message
        setLoading(false)
      },
      onError: (error) => {
        setError(error.message)
        setLoading(false)
      },
    })

    if (json_response) {
      return handleTodoAction(json_response, {
        openView,
        closeView,
        addTodo,
        removeTodo,
      })
    }

    return false
  }

  return (
    <ActionCenterContext.Provider value={{ action, loading, error }}>
      {children}
    </ActionCenterContext.Provider>
  )
}

export function useActionCenter() {
  const context = useContext(ActionCenterContext)
  if (!context) {
    throw new Error(
      "useActionCenter must be used within an ActionCenterProvider"
    )
  }
  return context
}
