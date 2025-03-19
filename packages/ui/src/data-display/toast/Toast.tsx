import { forwardRef } from "react"
import { X } from "lucide-react"
import { Text } from "../../typography/text/Text"
import { IconButton } from "../../form/icon-button/IconButton"

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  show: boolean
  onHide: (event: React.MouseEvent) => void
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ label, show, onHide }, ref) => {
    return show ? (
      <div ref={ref} className="fixed top-10 right-0 z-10 mx-3 sm:right-10">
        <div
          className="bg-grayscale-125 dark:bg-grayscale-725 flex max-w-sm flex-row items-center justify-between gap-2 rounded-2xl py-2 pr-2 pl-3"
          role="alert"
        >
          <Text as="span">{label}</Text>

          <IconButton size="sm" variant="text" onClick={onHide}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    ) : null
  }
)
