import React, { forwardRef, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type TextTags = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5"

type TextProps<T extends TextTags> = React.HTMLAttributes<HTMLElement> & {
  as?: T
  children: ReactNode
  className?: string
  color?: "base" | "light" | "lighter" | "lightest"
}

export const Text = forwardRef<HTMLElement, TextProps<TextTags>>(
  ({ as = "p", children, color = "base", className, ...props }, ref) => {
    const Component = as

    return (
      <Component
        // @ts-ignore
        ref={ref}
        className={twMerge(
          "text-lg",

          // color
          color === "base" && "text-grayscale-700 dark:text-grayscale-200",
          color === "light" && "text-grayscale-500 dark:text-grayscale-300",
          color === "lighter" && "text-grayscale-400 dark:text-grayscale-400",
          color === "lightest" && "text-grayscale-300 dark:text-grayscale-500",

          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
