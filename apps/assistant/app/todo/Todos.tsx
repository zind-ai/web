"use client"

import { Box, Loading, Text, View } from "@zind/ui"
import { useTodo } from "./TodoContext"
import { Todo } from "./Todo"

export const Todos = () => {
  const { todos, loading, view, closeView } = useTodo()

  return (
    <View view={view} onClose={closeView}>
      {loading && <Loading />}

      <Box className="mb-10 flex">
        <Text className="text-lg">To do</Text>
      </Box>

      <Box className="flex flex-col gap-2">
        {todos.map((todo) => (
          <Todo key={todo.id} item={todo} />
        ))}
      </Box>
    </View>
  )
}
