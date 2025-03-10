"use client"

import { useEffect } from "react"
import { Box, Loading } from "@zind/ui"
import { useTodo } from "./TodoContext"
import { Todo } from "./Todo"

export const Todos = () => {
  const { todos, gettingTodos } = useTodo()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  if (gettingTodos) return <Loading />

  return (
    <Box className="animate-fade-in-scale flex flex-col gap-2">
      {todos.map((todo) => (
        <Todo key={todo.id} item={todo} />
      ))}
    </Box>
  )
}
