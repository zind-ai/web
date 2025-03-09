"use client"

import { Box, Loading, Text, View } from "@zind/ui"
import { useTodo } from "./TodoContext"
import { Todo } from "./Todo"

export const Todos = () => {
  const { todos, loading, view, closeView } = useTodo()

  return (
    <View view={view} onClose={closeView} title="To do">
      {loading && <Loading />}

      <Box className="mx-auto sm:w-md">
        <Box className="flex flex-col gap-2">
          {todos.map((todo) => (
            <Todo key={todo.id} item={todo} />
          ))}
        </Box>
      </Box>
    </View>
  )
}
