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
        ref={ref as React.Ref<any>}
        className={twMerge(
          "text-grayscale-700 dark:text-grayscale-200 text-base",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
