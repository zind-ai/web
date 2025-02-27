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
      <div ref={ref} className="fixed right-10 top-10 z-10">
        <div
          className="bg-grayscale-125 dark:bg-grayscale-725 flex max-w-sm flex-row items-center justify-between gap-2 rounded-2xl py-4 pl-4 pr-10"
          role="alert"
        >
          <Text as="span">{label}</Text>
          <X
            className="text-grayscale-700 dark:text-grayscale-200 absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer"
            onClick={onHide}
          />
        </div>
      </div>
    ) : null
  }
)
