export const catchErrorMessage = (error: unknown): string => {
  let message = "An unexpected error occurred"

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if ((error as any).message) {
    message = (error as any).message
  }

  return message
}
