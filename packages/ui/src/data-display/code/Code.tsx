import { forwardRef, ReactNode } from "react"
import { Text } from "../../typography/text/Text"
import { Box } from "../../layout/box/Box"

interface props {
  children: ReactNode
}

export const Code = forwardRef<HTMLDivElement, props>(
  ({ children, ...props }, ref) => {
    return (
      <Box className="bg-grayscale-125 dark:bg-grayscale-725 mt-3 rounded-2xl p-4">
        <Text
          ref={ref}
          className="font-mono text-base whitespace-pre-wrap"
          {...props}
        >
          {children}
        </Text>
      </Box>
    )
  }
)
