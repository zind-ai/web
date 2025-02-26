"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { useToast, useView } from "@zind/ui"
import { callAPI } from "@zind/utils"
import { user_id } from "@/app/global/login/user"
import { get_response, todo } from "../api/todo/types"

interface TodoContextProps {
  todos: todo[]
  loading: boolean

  view: boolean
  openView: () => void
  closeView: () => void

  addTodo: (newTodo: Omit<todo, "user_id">) => void
  removeTodo: ({ id }: { id: string }) => void
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<todo[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { showToast } = useToast()
  const { openView, closeView, view } = useView()

  const getTodos = async () => {
    if (!user_id) return

    setLoading(true)

    callAPI({
      url: `/api/todo?user_id=${user_id}`,
      method: "get",
      onSuccess: (data: get_response) => {
        setTodos(data.todos)
        setLoading(false)
      },
      onError: (error) => {
        setLoading(false)
        showToast(error.message, 3000)
      },
    })
  }

  useEffect(() => {
    getTodos()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTodo = (newTodo: Omit<todo, "user_id">) => {
    if (!newTodo) return

    setLoading(true)

    callAPI({
      url: "/api/todo",
      method: "post",
      formData: {
        name: newTodo.name,
        description: newTodo.description,
        start: new Date(newTodo.start),
        recurrence: "daily",
        user_id: user_id,
      },
      onSuccess: async () => {
        if (!view) {
          openView()
        }
        await getTodos()
        setLoading(false)
      },
      onError: (error) => {
        setLoading(false)
        showToast(error.message, 3000)
      },
    })
  }

  const removeTodo = async ({ id }: { id: string }) => {
    if (!id) return

    if (!view) {
      open()
    }

    setLoading(true)

    callAPI({
      url: `/api/todo?user_id=${user_id}&id=${id}`,
      method: "delete",
      onSuccess: async () => {
        await getTodos()
        setLoading(false)
      },
      onError: (error) => {
        setLoading(false)
        showToast(error.message, 3000)
      },
    })
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,

        view,
        openView,
        closeView,

        addTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider")
  }
  return context
}
