import { useRouter } from "next/navigation"
import { UserCircle } from "lucide-react"

import {
  Button,
  Dropdown,
  IconButton,
  Image,
  Link,
  useDropdown,
} from "@zind/ui"
import { useUser } from "../user/UserContext"
import { useAssistant } from "../assistant/AssistantContext"

export enum NavbarDropdownItem {
  ai = "ai",
  user = "user",
  settings = "settings",
}

export const NavbarDropdown = () => {
  const router = useRouter()
  const { user } = useUser()
  const { assistant } = useAssistant()

  const { dropdown, openDropdown, closeDropdown } = useDropdown()
  const toggleDropdown = () => (dropdown ? closeDropdown() : openDropdown())

  const openAIProfile = () => {
    router.push(`?on=${NavbarDropdownItem.ai}`, { scroll: false })
    closeDropdown()
  }

  const openUserProfile = () => {
    router.push(`?on=${NavbarDropdownItem.user}`, { scroll: false })
    closeDropdown()
  }

  const openSettings = () => {
    router.push(`?on=${NavbarDropdownItem.settings}`, { scroll: false })
    closeDropdown()
  }

  const items = [
    <Button
      className="bg-gradient text-grayscale-100 w-full justify-start rounded-lg"
      variant="text"
      onClick={openAIProfile}
    >
      {assistant?.name || "AI"}
    </Button>,
    <Button
      className="w-full justify-start rounded-lg"
      variant="text"
      onClick={openUserProfile}
    >
      {user?.name || "User profile"}
    </Button>,
    <Button
      className="w-full justify-start rounded-lg"
      variant="text"
      onClick={openSettings}
    >
      Settings
    </Button>,
    <Link href="/api/auth/logout" target="_self">
      <Button className="w-full justify-start rounded-lg" variant="text">
        Log out
      </Button>
    </Link>,
  ]

  return (
    <Dropdown open={dropdown} onClose={closeDropdown} items={items}>
      <IconButton
        variant="text"
        onClick={toggleDropdown}
        size="sm"
        color="lighter"
        className="p-1"
      >
        {user?.photo ? (
          <Image src={user.photo} className="h-8 rounded-full" />
        ) : (
          <UserCircle className="h-8 w-8" />
        )}
      </IconButton>
    </Dropdown>
  )
}
