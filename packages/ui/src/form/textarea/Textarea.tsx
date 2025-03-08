import React, { forwardRef, TextareaHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, props>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          "text-grayscale-700 dark:text-grayscale-200 placeholder-grayscale-400 dark:placeholder-grayscale-400 ring-grayscale-150 dark:ring-grayscale-700 dark:hover:ring-grayscale-650 hover:ring-grayscale-300 focus:ring-grayscale-300 dark:focus:ring-grayscale-650 w-full rounded-2xl px-4 py-2 text-lg ring-1 focus:outline-none",
          className
        )}
        {...props}
      />
    )
  }
)
