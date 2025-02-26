import { twMerge } from "tailwind-merge"
import { Box, Text } from "@zind/ui"
import { format, timeStatus } from "@zind/time"
import { todo } from "../api/todo/types"

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
