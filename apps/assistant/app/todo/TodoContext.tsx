"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@zind/ui"
import { callAPI } from "@zind/utils"
import { user_id } from "@/app/global/login/user"
import { get_response, todo } from "../api/todo/types"

interface TodoContextProps {
  todos: todo[]
  addingTodo: boolean
  gettingTodos: boolean
  removingTodo: boolean

  openTodos: () => void
  closeTodos: () => void
  addTodo: (newTodo: Omit<todo, "user_id">) => void
  removeTodo: ({ id }: { id: string }) => void
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const [todos, setTodos] = useState<todo[]>([])
  const [addingTodo, setAddingTodo] = useState<boolean>(false)
  const [gettingTodos, setGettingTodos] = useState<boolean>(false)
  const [removingTodo, setRemovingTodo] = useState<boolean>(false)

  const { showToast } = useToast()

  const openTodos = () => {
    router.push(`?tab=todo`, { scroll: false })
  }

  const closeTodos = () => {
    router.push(`?tab=chat`, { scroll: false })
  }

  const getTodos = async () => {
    if (!user_id) return

    setGettingTodos(true)

    callAPI({
      url: `/api/todo?user_id=${user_id}`,
      method: "get",
      onSuccess: (data: get_response) => {
        setTodos(data.todos)
        setGettingTodos(false)
      },
      onError: (error) => {
        setGettingTodos(false)
        showToast(error.message)
      },
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = (newTodo: Omit<todo, "user_id">) => {
    if (!newTodo) return

    setAddingTodo(true)

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
        await getTodos()
        setAddingTodo(false)
      },
      onError: (error) => {
        setAddingTodo(false)
        showToast(error.message)
      },
    })
  }

  const removeTodo = async ({ id }: { id: string }) => {
    if (!id) return

    setRemovingTodo(true)

    callAPI({
      url: `/api/todo?user_id=${user_id}&id=${id}`,
      method: "delete",
      onSuccess: async () => {
        await getTodos()
        setRemovingTodo(false)
      },
      onError: (error) => {
        setRemovingTodo(false)
        showToast(error.message)
      },
    })
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addingTodo,
        removingTodo,
        gettingTodos,
        openTodos,
        closeTodos,
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
