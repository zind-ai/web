import { Text, Textarea, Box } from "@zind/ui"
import { useEffect, useState } from "react"
import { useUser } from "./UserContext"

export const UserName = () => {
  const { user, updateUser, updatingUser } = useUser()
  const [name, setName] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value)
  }
  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-sm">User name</Text>
      <Textarea
        className="dark:bg-grayscale-600 bg-grayscale-200 h-12 resize-none"
        placeholder="My name is ..."
        value={name}
        onChange={onChange}
        maxLength={25}
        onSubmit={() => updateUser({ name })}
        submitLoading={updatingUser.loading}
        submitShow={user?.name !== name && Boolean(name)}
      />
    </Box>
  )
}
