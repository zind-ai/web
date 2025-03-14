import React, { forwardRef, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  size?: "sm" | "base" | "lg"
  variant?: "text" | "contained" | "outlined"
  color?: "base" | "light" | "lighter" | "lightest"
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      size = "base",
      variant = "contained",
      color = "base",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          // shared
          "inline-flex cursor-pointer items-center justify-center rounded-full ease-in-out focus:outline-none disabled:cursor-not-allowed",

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

          color === "base" &&
            "text-grayscale-700 dark:text-grayscale-100 disabled:text-grayscale-400",
          color === "light" &&
            "text-grayscale-500 dark:text-grayscale-300 disabled:text-grayscale-400",
          color === "lighter" &&
            "text-grayscale-400 dark:text-grayscale-400 disabled:text-grayscale-400",
          color === "lightest" &&
            "text-grayscale-300 dark:text-grayscale-500 disabled:text-grayscale-400",

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
