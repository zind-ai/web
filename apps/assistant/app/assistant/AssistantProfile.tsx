import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Box, Dialog, Text, Textarea, useDialog } from "@zind/ui"
import { useAssistant } from "./AssistantContext"
import { NavItem } from "../navbar/Navbar"
import { UserName } from "../user/UserName"

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
    if (navItem && navItem === NavItem.ai) {
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

  return (
    <Dialog open={dialog} onClose={close} overlay={true}>
      <Box className="flex flex-col gap-5 p-5">
        <Text as="h2" className="mb-5 text-xl font-medium">
          AI
        </Text>

        <Box className="flex flex-col gap-2">
          <Text className="text-sm">User name</Text>
          <UserName />
        </Box>

        <Box className="flex flex-col gap-2">
          <Text className="text-sm">Name</Text>
          <Textarea
            className="dark:bg-grayscale-600 bg-grayscale-200 h-12 resize-none"
            placeholder="e.g. Jarvis, Ava, Case"
            name="name"
            value={fields.name}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            maxLength={25}
            onSubmit={() => updateAssistant({ name: fields.name })}
            submitLoading={updatingAssistant.loading}
            submitShow={assistant?.name !== fields.name}
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
            onSubmit={() =>
              updateAssistant({ instructions: fields.instructions })
            }
            submitLoading={updatingAssistant.loading}
            submitShow={assistant?.instructions !== fields.instructions}
          ></Textarea>
        </Box>
      </Box>
    </Dialog>
  )
}
