import { forwardRef } from "react"
import { Box } from "../../layout/box/Box"
import { Text } from "../../typography/text/Text"

interface props {
  className?: string
}

export const Loading = forwardRef<HTMLDivElement, props>(
  ({ ...props }, ref) => {
    return (
      <Box ref={ref} className="mb-5 mt-5 text-center" {...props}>
        <Text>Loading ...</Text>
      </Box>
    )
  }
)
