"use client"

import { forwardRef, ReactNode } from "react"
import { X } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { IconButton } from "../../form/icon-button/IconButton"
import { Box } from "../../layout/box/Box"

interface DialogProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  overlay?: boolean
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, open, onClose, overlay = true }, ref) => {
    if (!open) return null

    return (
      <Box
        ref={ref}
        className={twMerge(
          "fixed inset-0 z-20 flex items-center justify-center p-5",
          overlay ? "" : "pointer-events-none"
        )}
        aria-label="dialog"
      >
        <Box className="animate-fade-in-scale pointer-events-auto relative w-full max-w-lg rounded-2xl bg-white/5 shadow-lg backdrop-blur-2xl">
          <Box className="absolute top-3 right-3 w-auto">
            <IconButton
              variant="contained"
              size="sm"
              onClick={onClose}
              aria-label="dialog close button"
            >
              <X className="h-5 w-5" />
            </IconButton>
          </Box>

          <Box className="max-h-[50vh] overflow-y-auto">{children}</Box>
        </Box>
      </Box>
    )
  }
)
