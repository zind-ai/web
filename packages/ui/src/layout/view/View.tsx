import { forwardRef, Fragment, ReactNode } from "react"
import { X } from "lucide-react"
import { Transition } from "@headlessui/react"

interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  view: boolean
  onClose: (event: React.MouseEvent) => void
}

export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, view, onClose }, ref) => {
    return (
      <Transition
        as={Fragment}
        show={view}
        enter="transition-transform transition-opacity duration-300 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-transform transition-opacity duration-300 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div ref={ref} className="fixed top-10 right-10 z-10">
          <div
            className="bg-grayscale-150 dark:bg-grayscale-700 w-md rounded-2xl p-5 shadow-xl"
            role="application"
          >
            <div className="absolute top-3 right-3">
              <X
                className="text-grayscale-700 dark:text-grayscale-200 h-5 w-5 cursor-pointer"
                onClick={onClose}
              />
            </div>

            <div>{children}</div>
          </div>
        </div>
      </Transition>
    )
  }
)
