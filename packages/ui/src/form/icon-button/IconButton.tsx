import React, { forwardRef, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  size?: "sm" | "base" | "lg"
  variant?: "text" | "contained" | "outlined"
}

export const IconButton = forwardRef<HTMLButtonElement, props>(
  (
    { children, size = "base", variant = "contained", className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          // shared
          "text-grayscale-700 dark:text-grayscale-100 disabled:text-grayscale-400 inline-flex cursor-pointer items-center justify-center rounded-full ease-in-out focus:outline-none disabled:cursor-not-allowed",

          // size
          size === "sm" && "p-2",
          size === "base" && "p-3",
          size === "lg" && "p-4",

          // variant
          variant === "text" &&
            "hover:bg-grayscale-200 dark:hover:bg-grayscale-700 active:bg-grayscale-200 dark:active:bg-grayscale-700 disabled:bg-grayscale-150 dark:disabled:bg-grayscale-600",
          variant === "outlined" &&
            "border-grayscale-150 dark:border-grayscale-600 hover:bg-grayscale-100 dark:hover:bg-grayscale-750 hover:border-grayscale-150 dark:hover:border-grayscale-600 active:bg-grayscale-125 dark:active:bg-grayscale-725 active:border-grayscale-150 dark:active:border-grayscale-600 disabled:border-grayscale-150 dark:disabled:border-grayscale-600 disabled:hover:bg-grayscale-25 dark:disabled:hover:bg-grayscale-800 border-1",
          variant === "contained" &&
            "bg-grayscale-250 dark:bg-grayscale-650 hover:bg-grayscale-200 dark:hover:bg-grayscale-700 active:bg-grayscale-200 dark:active:bg-grayscale-700 disabled:bg-grayscale-150 dark:disabled:bg-grayscale-600",

          // user specified
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
