import { Box, Text } from "@/library/ui"
import { todo } from "../api/todo/types"
import { format, timeStatus } from "@/library/time"
import { twMerge } from "tailwind-merge"

interface props {
  item: todo
}

export const Todo = ({ item }: props) => {
  const status = timeStatus(item.start)
  const highlight = status === "future" || status === "now"

  return (
    <Box
      className={twMerge(
        "flex flex-col gap-1 rounded-2xl p-3",
        highlight && "dark:bg-grayscale-600 bg-grayscale-225"
      )}
    >
      <Box className="flex flex-row justify-between">
        <Text className="text-lg font-medium">{item.name}</Text>
        <Text>{format(item.start, "hh:mm")}</Text>
      </Box>

      {item.description && (
        <Box>
          <Text className="text-sm">{item.description}</Text>
        </Box>
      )}
    </Box>
  )
}
