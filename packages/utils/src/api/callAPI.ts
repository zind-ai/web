import axios, { Method, isAxiosError } from "axios"
import { catchErrorMessage } from "./catchErrorMessage"

interface CallAPIProps<T> {
  url: string
  method: Method
  formData?: Record<string, unknown>
  headers?: Record<string, unknown>
  onSuccess?: (data: T) => void
  onError?: (error: { message: string; status?: number }) => void
}

export const callAPI = async <T>({
  url,
  method,
  formData,
  headers,
  onSuccess,
  onError,
}: CallAPIProps<T>) => {
  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: formData,
    })

    if (response.status >= 200 && response.status < 300) {
      onSuccess?.(response.data)
    } else {
      onError?.({
        message: response.statusText,
        status: response.status,
      })
    }
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.error ||
        error.response?.statusText ||
        error.message

      onError?.({
        message: message,
        status: error.response?.status,
      })
    } else {
      const message = catchErrorMessage(error)
      onError?.({
        message: message,
        status: 500,
      })
    }
  }
}
