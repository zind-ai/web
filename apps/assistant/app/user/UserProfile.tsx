import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Box, Button, Dialog, Image, Text, Textarea, useDialog } from "@zind/ui"
import { NavbarDropdownItem } from "../navbar/NavbarDropdown"
import { useUser } from "./UserContext"

export const UserProfile = () => {
  const { user } = useUser()
  const [fields, setFields] = useState({
    name: "",
    email: "",
    photo: "",
  })

  const { dialog, openDialog, closeDialog } = useDialog()
  const router = useRouter()
  const searchParams = useSearchParams()
  const navItem = searchParams.get("on")

  useEffect(() => {
    if (navItem && navItem === NavbarDropdownItem.user) {
      openDialog()
    }
  }, [navItem])

  const close = () => {
    router.push("/", { scroll: false })
    closeDialog()
  }

  useEffect(() => {
    if (user) {
      setFields({
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || "",
      })
    }
  }, [user, navItem])

  const onChange = (field: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const save = () => {
    /* if (fields.name && fields.instructions) {
      updateAssistant(fields.name, fields.instructions)
    } */
  }

  return (
    <Dialog open={dialog} onClose={close} overlay={true}>
      <Box className="flex flex-col gap-5 p-5">
        <Text as="h2" className="mb-5 text-xl font-medium">
          User profile
        </Text>

        {user?.photo && (
          <Box className="flex flex-col gap-2">
            <Image src={user.photo} className="w-20 rounded-full" />
          </Box>
        )}

        <Box className="flex flex-col gap-2">
          <Text className="text-sm">Name</Text>
          <Textarea
            className="dark:bg-grayscale-600 bg-grayscale-200 h-12 resize-none"
            placeholder="My name is ..."
            name="name"
            value={fields.name}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            maxLength={25}
          ></Textarea>
        </Box>

        <Box className="flex flex-col gap-2">
          <Text className="text-sm">Email address</Text>
          <Textarea
            className="dark:bg-grayscale-600 bg-grayscale-200 h-12 resize-none"
            placeholder=""
            name="email"
            value={fields.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            maxLength={100}
            disabled
          ></Textarea>
        </Box>

        <Box className="sticky bottom-5 flex justify-end">
          <Button onClick={save}>Update</Button>
        </Box>
      </Box>
    </Dialog>
  )
}
