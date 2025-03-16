import { useRouter } from "next/navigation"
import { UserCircle } from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"
import {
  Button,
  Dropdown,
  IconButton,
  Image,
  Link,
  useDropdown,
} from "@zind/ui"
import { settings } from "./NavbarSettings"
import { ai } from "../assistant/AssistantProfile"
import { useAssistant } from "../assistant/AssistantContext"

export const NavbarDropdown = () => {
  const router = useRouter()
  const { user } = useUser()
  const { assistant } = useAssistant()

  const { dropdown, openDropdown, closeDropdown } = useDropdown()
  const toggleDropdown = () => (dropdown ? closeDropdown() : openDropdown())

  const openSettings = () => {
    router.push(`?on=${settings}`, { scroll: false })
    closeDropdown()
  }

  const openAI = () => {
    router.push(`?on=${ai}`, { scroll: false })
    closeDropdown()
  }

  const items = [
    <Button
      className="bg-gradient text-grayscale-100 w-full justify-start rounded-lg"
      variant="text"
      onClick={openAI}
    >
      {assistant?.name || "AI"}
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
        {user?.picture ? (
          <Image src={user.picture} className="h-8 rounded-full" />
        ) : (
          <UserCircle className="h-8 w-8" />
        )}
      </IconButton>
    </Dropdown>
  )
}
