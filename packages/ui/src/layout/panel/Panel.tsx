import { forwardRef, ReactNode } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react"

interface props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  show: boolean
  onHide: (event: React.MouseEvent) => void
}

export const Panel = forwardRef<HTMLDivElement, props>(
  ({ children, show, onHide }, ref) => {
    return (
      <Dialog
        ref={ref}
        open={show}
        onClose={() => onHide}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="bg-grayscale-725/75 dark:bg-grayscale-725/75 fixed inset-0 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <X
                    className="text-grayscale-700 dark:text-grayscale-200 absolute top-5 right-5 h-5 w-5 cursor-pointer"
                    onClick={onHide}
                  />
                </TransitionChild>
                <div className="bg-grayscale-50 dark:bg-grayscale-700 flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
)
