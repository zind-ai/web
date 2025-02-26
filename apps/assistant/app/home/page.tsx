import type { Metadata } from "next"
import { PlayCircle } from "lucide-react"
import { Box, Button, Text } from "@zind/ui"

export const metadata: Metadata = {
  title: "zind",
}

export default function Home() {
  return (
    <Box className="m-auto w-xl">
      <Box className="bg-grayscale-100 dark:bg-grayscale-725 mb-10 rounded-3xl p-5">
        <Box className="flex justify-start">
          <a
            href="https://www.youtube.com/watch?v=EfmVRQjoNcY"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outlined" className="mb-3">
              <PlayCircle className="mr-1" /> Jarvis
            </Button>
          </a>
        </Box>

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
