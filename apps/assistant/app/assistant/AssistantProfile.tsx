import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Box, Button, Dialog, Text, Textarea, useDialog } from "@zind/ui"
import { useAssistant } from "./AssistantContext"

export const ai = "ai"

export const AssistantProfile = () => {
  const { assistant, updateAssistant, updatingAssistant } = useAssistant()
  const [fields, setFields] = useState({
    name: "",
    instructions: "",
  })

  const { dialog, openDialog, closeDialog } = useDialog()
  const router = useRouter()
  const searchParams = useSearchParams()
  const navItem = searchParams.get("on")

  useEffect(() => {
    if (navItem && navItem === ai) {
      openDialog()
    }
  }, [navItem])

  const close = () => {
    router.push("/", { scroll: false })
    closeDialog()
  }

  useEffect(() => {
    if (assistant) {
      setFields({
        name: assistant.name,
        instructions: assistant.instructions,
      })
    }
  }, [assistant, navItem])

  const onChange = (field: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const save = () => {
    if (fields.name && fields.instructions) {
      updateAssistant(fields.name, fields.instructions)
    }
  }

  return (
    <Dialog open={dialog} onClose={close} overlay={true}>
      <Box className="flex flex-col gap-5 p-5">
        <Text as="h2" className="mb-5 text-xl font-medium">
          AI
        </Text>

        <Box className="flex flex-col gap-2">
          <Text className="text-sm">Name</Text>
          <Textarea
            className="dark:bg-grayscale-600 bg-grayscale-200 h-12 resize-none"
            placeholder="e.g. Jarvis, Ava, Case"
            name="name"
            value={fields.name}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            maxLength={25}
          ></Textarea>
        </Box>

        <Box className="flex flex-col gap-2">
          <Text className="text-sm">Instructions</Text>
          <Textarea
            className="bg-grayscale-200 dark:bg-grayscale-600 h-40 resize-none"
            placeholder="e.g. Occasionally call me 'Boss.' Be concise with your answers. Don't offer assistance at the end of your response unless asked."
            name="instructions"
            value={fields.instructions}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            maxLength={250}
          ></Textarea>
        </Box>

        <Box className="sticky bottom-5 flex justify-end">
          <Button
            onClick={save}
            disabled={
              updatingAssistant.loading ||
              (assistant?.name === fields.name &&
                assistant.instructions === fields.instructions)
            }
            loading={updatingAssistant.loading}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
