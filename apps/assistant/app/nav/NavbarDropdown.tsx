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

export const NavbarDropdown = () => {
  const router = useRouter()
  const { user } = useUser()

  const { dropdown, openDropdown, closeDropdown } = useDropdown()
  const toggleDropdown = () => (dropdown ? closeDropdown() : openDropdown())

  const openSettings = () => {
    router.push(`?on=${settings}`, { scroll: false })
    closeDropdown()
  }

  const items = [
    <Button
      className="w-full justify-start rounded-lg"
      variant="text"
      onClick={openSettings}
    >
      Settings
    </Button>,
    <Link href="/api/auth/logout" className="no-underline" target="_self">
      <Button className="w-full justify-start rounded-lg" variant="text">
        Log out
      </Button>
    </Link>,
  ]

  if (!user)
    return (
      <Link href="/api/auth/login" target="_self" className="no-underline">
        <Button variant="text">Log in</Button>
      </Link>
    )

  return (
    <Dropdown open={dropdown} onClose={closeDropdown} items={items}>
      <IconButton variant="text" onClick={toggleDropdown} size="sm">
        {user.picture ? (
          <Image src={user.picture} className="h-8 rounded-full" />
        ) : (
          <UserCircle className="h-6 w-6" />
        )}
      </IconButton>
    </Dropdown>
  )
}
