import { Box, Text } from "@zind/ui"

interface props {
  title: string
}

export const Header = ({ title }: props) => {
  return (
    <Box className="fixed top-0 bg-white/5 px-5 py-2 backdrop-blur-2xl">
      <Text as="span" className="text-gradient text-lg font-bold">
        {title}
      </Text>
    </Box>
  )
}
