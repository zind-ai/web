import type { Metadata } from "next"
import { Box, Text } from "@zind/ui"

export const metadata: Metadata = {
  title: "zind",
}

export default function Home() {
  return (
    <Box className="w-xl m-auto">
      <Box className="bg-grayscale-100 dark:bg-grayscale-725 mb-10 rounded-3xl p-5">
        <Text className="mb-5 text-3xl font-bold">
          Remember Jarvis — Ironman’s AI?
        </Text>
        <Text className="text-lg">
          We’re on a mission to create a truly capable and personal AI for
          everyone.
        </Text>
      </Box>
      <Text className="text-md p-5 text-gray-700">
        Our prototype is in the works, and we can’t wait to share it with you
        soon!
      </Text>
    </Box>
  )
}
