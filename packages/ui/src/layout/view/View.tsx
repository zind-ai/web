import { forwardRef, ReactNode } from "react"
import { Dialog, DialogPanel } from "@headlessui/react"
import { X } from "lucide-react"
import { IconButton } from "../../form/icon-button/IconButton"
import { Text } from "../../typography/text/Text"

interface ViewProps {
  children: ReactNode
  view: boolean
  onClose: (event: React.MouseEvent) => void
  title: string
}

export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, view, onClose }, ref) => {
    return (
      <Dialog
        as="div"
        ref={ref}
        open={view}
        onClose={() => onClose}
        className="relative z-10 focus:outline-none"
        aria-label="view"
      >
        <div className="fixed inset-0 z-10 h-screen w-screen">
          <DialogPanel
            transition
            className="relative h-full w-full overflow-y-auto bg-white/5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div
              className="sticky top-0 z-10 flex items-center justify-between p-3"
              aria-label="view header"
            >
              <Text className="text-lg" aria-label="view title">
                To do
              </Text>
              <IconButton
                variant="text"
                size="sm"
                onClick={onClose}
                aria-label="view close button"
              >
                <X className="h-6 w-6" />
              </IconButton>
            </div>
            <div>{children}</div>
          </DialogPanel>
        </div>
      </Dialog>
    )
  }
)
