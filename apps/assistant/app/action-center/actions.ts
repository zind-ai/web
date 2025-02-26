export const actions = [
  {
    name: "openView",
    description:
      "opens or shows my todo list. eg. What have I got on my todo list today?",
    parameters: [],
  },
  {
    name: "closeView",
    description: "closes or hides my todo list",
    parameters: [],
  },
  {
    name: "addTodo",
    description:
      "adds a new item to my todo list. eg. remind me to read at 1pm",
    parameters: [
      { name: "", required: "yes" },
      { description: "", required: "no (optional)" },
      {
        start: "eg. 2025-02-22 14:00",
        required: "yes",
      },
    ],
  },
  {
    name: "removeTodo",
    description: "remove an item from my todo list",
    parameters: [{ id: "", required: "yes" }],
  },
]

export const instructions = `Understand user intent and reply with a JSON object in this format:
  {
    "name": "actionName", // e.g., "openView", "closeView", "removeTodo", "addTodo"
    "valid": true, // true if action correctly matches intent, otherwise false
    "parameters": { "id": "todo id", "name": "", start: "" } // Include required parameters and optionally populate the other non-required fields.
  }
  If no matching action is found, return:
  { "name": "none", "valid": false, "parameters": [] }
  
  Available actions:
  ${JSON.stringify(actions, null, 2)}`
