import { forwardRef } from "react"
import { Box } from "../../layout/box/Box"
import { Text } from "../../typography/text/Text"

interface props {
  className?: string
}

export const Loading = forwardRef<HTMLDivElement, props>(
  ({ ...props }, ref) => {
    return (
      <Box ref={ref} className="mt-5 mb-5 text-center" {...props}>
        <Text>Loading ...</Text>
      </Box>
    )
  }
)
