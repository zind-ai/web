import { todo } from "../api/todo/types"

export const handleTodoAction = (
  action: string,
  actions: {
    openView: () => void
    closeView: () => void
    addTodo: ({ name, description, start }: Omit<todo, "user_id">) => void
    removeTodo: (args: { id: string }) => void
  }
) => {
  if (!action) return false

  // 1. parse
  let parsed_action

  try {
    parsed_action = JSON.parse(action)
  } catch (err) {
    console.error("Error parsing action:", err)
    return false
  }

  // 2. process
  if (parsed_action?.valid && parsed_action?.name) {
    switch (parsed_action.name) {
      case "openView":
        actions.openView()
        return true

      case "closeView":
        actions.closeView()
        return true

      case "addTodo":
        if (parsed_action.parameters?.name && parsed_action.parameters?.start) {
          actions.addTodo({
            name: parsed_action.parameters.name,
            description: parsed_action.parameters.description || "",
            start: parsed_action.parameters.start,
          })
          return true
        } else {
          console.error("Missing props to addTodo")
          return false
        }

      case "removeTodo":
        if (parsed_action.parameters?.id) {
          actions.removeTodo({ id: parsed_action.parameters.id })
          return true
        } else {
          console.error("Missing todo id to removeTodo")
          return false
        }

      default:
        console.error(`No handler for action: ${parsed_action.name}`)
        return false
    }
  }

  return false
}
