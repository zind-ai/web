import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Box, Dialog, Text, useDialog } from "@zind/ui"

export const settings = "settings"

export const NavbarSettings = () => {
  const { dialog, openDialog, closeDialog } = useDialog()

  const router = useRouter()
  const searchParams = useSearchParams()
  const navItem = searchParams.get("on")

  useEffect(() => {
    if (navItem && navItem === settings) {
      openDialog()
    }
  }, [navItem])

  const close = () => {
    router.push("/", { scroll: false })
    closeDialog()
  }

  return (
    <Dialog open={dialog} onClose={close} overlay={true}>
      <Box className="flex flex-col gap-5 p-5">
        <Text as="h2" className="text-xl font-medium">
          Settings
        </Text>

        <Text>Items</Text>
      </Box>
    </Dialog>
  )
}
