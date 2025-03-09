import { forwardRef } from "react"
import { X } from "lucide-react"
import { Text } from "../../typography/text/Text"

interface props extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  show: boolean
  onHide: (event: React.MouseEvent) => void
}

export const Toast = forwardRef<HTMLDivElement, props>(
  ({ label, show, onHide }, ref) => {
    return show ? (
      <div ref={ref} className="fixed top-10 right-0 z-10 mx-3 sm:right-10">
        <div
          className="bg-grayscale-125 dark:bg-grayscale-725 flex max-w-sm flex-row items-center justify-between gap-2 rounded-2xl py-4 pr-10 pl-4"
          role="alert"
        >
          <Text as="span">{label}</Text>
          <X
            className="text-grayscale-700 dark:text-grayscale-200 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 cursor-pointer"
            onClick={onHide}
          />
        </div>
      </div>
    ) : null
  }
)
