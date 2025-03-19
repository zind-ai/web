import React, { forwardRef, TextareaHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          "text-grayscale-700 dark:text-grayscale-200 placeholder-grayscale-400 dark:placeholder-grayscale-400 border-grayscale-150 dark:border-grayscale-700 dark:hover:border-grayscale-650 hover:border-grayscale-300 focus:border-grayscale-300 dark:focus:border-grayscale-650 w-full rounded-2xl border-1 px-4 py-2 text-lg focus:outline-none",
          className
        )}
        {...props}
      />
    )
  }
)
