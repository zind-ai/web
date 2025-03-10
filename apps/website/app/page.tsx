import type { Metadata } from "next"
import { Box, Text } from "@zind/ui"

export const metadata: Metadata = {
  title: "zind",
}

export default function Home() {
  return (
    <Box className="m-auto w-xl">
      <Box className="bg-grayscale-100 dark:bg-grayscale-725 mb-10 rounded-3xl p-10">
        <Text className="mb-1 text-lg">We’re building a</Text>
        <Text className="text-gradient mb-5 inline text-3xl font-bold">
          truly capable and personal AI.
        </Text>
      </Box>
      <Text className="text-md p-10 text-gray-700 dark:text-gray-300">
        Coming soon.
      </Text>
    </Box>
  )
}
