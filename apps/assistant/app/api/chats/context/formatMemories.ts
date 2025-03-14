import { format } from "@zind/time"
import { memory } from "../../memory/types"

export const formatMemories = (memories?: memory[]) => {
  if (!memories || !memories.length) return ""

  const pastMemories = memories
    .map(
      (memory) =>
        `${format(memory.created_at, "MMM ddth, yyyy hh:mm")}: ${memory.memory}`
    )
    .join("\n\n")

  return `Past memories:\n${pastMemories}`
}
