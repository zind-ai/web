import { formats } from "./consts/formats"
import { formatHandlers } from "./consts/formatHandlers"
import { handleError } from "./utils/handleError"
import { validateDate, ValidDate } from "./utils/validateDate"

type Format = keyof typeof formats

export const format = (date: ValidDate, format: Format) => {
  // validate
  const dateObj = validateDate(date)
  if (!dateObj) {
    return handleError("Invalid Date")
  }

  // correct format?
  if (!formats.hasOwnProperty(format)) {
    return handleError("Invalid Date Format")
  }

  const formatter = formatHandlers[format]
  return formatter(dateObj)
}
