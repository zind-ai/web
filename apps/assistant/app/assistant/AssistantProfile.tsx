import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Box, Text, Textarea } from "@zind/ui"
import { useAssistant } from "./AssistantContext"

export const AssistantProfile = () => {
  const { assistant, updateAssistant, updatingAssistant } = useAssistant()
  const [fields, setFields] = useState({
    name: "",
    instructions: "",
  })

  const searchParams = useSearchParams()
  const navItem = searchParams.get("on")

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

  return (
    <Box className="flex flex-col gap-5">
      <Box className="flex flex-col gap-2">
        <Text className="text-sm">AI name</Text>
        <Textarea
          className="dark:bg-grayscale-600 bg-grayscale-200 h-12 resize-none"
          placeholder="e.g. Jarvis, Ava, Case"
          name="name"
          value={fields.name}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          maxLength={25}
          onSubmit={() => updateAssistant({ name: fields.name })}
          submitLoading={updatingAssistant.loading}
          submitShow={assistant?.name !== fields.name && Boolean(fields.name)}
        ></Textarea>
      </Box>

      <Box className="flex flex-col gap-2">
        <Text className="text-sm">AI instructions</Text>
        <Textarea
          className="bg-grayscale-200 dark:bg-grayscale-600 h-40 resize-none"
          placeholder="e.g. Occasionally call me 'Boss.' Be concise with your answers. Don't offer assistance at the end of your response unless asked."
          name="instructions"
          value={fields.instructions}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          maxLength={250}
          onSubmit={() =>
            updateAssistant({ instructions: fields.instructions })
          }
          submitLoading={updatingAssistant.loading}
          submitShow={
            assistant?.instructions !== fields.instructions &&
            Boolean(fields.instructions)
          }
        ></Textarea>
      </Box>
    </Box>
  )
}
