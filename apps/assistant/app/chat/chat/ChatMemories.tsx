import { Brain } from "lucide-react"
import { Box, Dialog, IconButton, Text, useDialog } from "@zind/ui"
import { format } from "@zind/time"
import { useChat } from "../ChatContext"

export const ChatMemories = () => {
  const { dialog, openDialog, closeDialog } = useDialog()
  const { memories } = useChat()

  if (!memories) return

  return (
    <Box className="flex w-auto justify-start">
      <IconButton onClick={openDialog} size="sm">
        <Brain className="h-4 w-4" />
      </IconButton>
      <Dialog open={dialog} onClose={closeDialog}>
        <Box className="flex flex-col gap-5 p-5">
          <Text as="h2" className="text-xl font-medium">
            Memories
          </Text>

          {memories.map((memory) => (
            <Box key={memory.id} className="flex flex-col gap-1">
              <Text>{memory.memory}</Text>
              <Text className="text-sm" color="lighter">
                {format(memory.created_at, "MMM ddth, yyyy")}
              </Text>
            </Box>
          ))}
        </Box>
      </Dialog>
    </Box>
  )
}
