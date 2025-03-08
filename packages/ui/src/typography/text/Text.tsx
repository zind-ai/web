import React, { forwardRef, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type TextTags = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5"

type props<T extends TextTags> = React.HTMLAttributes<HTMLElement> & {
  as?: T
  className?: string
  children: ReactNode
}

export const Text = forwardRef<HTMLElement, props<TextTags>>(
  ({ as = "p", children, className, ...props }, ref) => {
    const Component = as

    return (
      <Component
        // @ts-ignore
        ref={ref}
        className={twMerge(
          "text-grayscale-700 dark:text-grayscale-200 text-lg",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
