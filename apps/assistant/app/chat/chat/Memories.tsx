import { Box, Dialog, IconButton, Text, useDialog } from "@zind/ui"
import { useChat } from "../ChatContext"
import { Brain } from "lucide-react"

export const Memories = () => {
  const { dialog, openDialog, closeDialog } = useDialog()
  const { memories } = useChat()

  if (!memories) return

  const memory_list = memories.replace("Past memories:\n", "")
  return (
    <Box className="flex w-auto justify-end">
      <IconButton onClick={openDialog} size="sm">
        <Brain className="h-4 w-4" />
      </IconButton>
      <Dialog open={dialog} onClose={closeDialog}>
        <Box className="flex flex-col gap-5 p-5">
          <Text as="h2" className="text-xl font-bold">
            Memories
          </Text>

          <Text className="whitespace-pre-wrap">{memory_list}</Text>
        </Box>
      </Dialog>
    </Box>
  )
}
