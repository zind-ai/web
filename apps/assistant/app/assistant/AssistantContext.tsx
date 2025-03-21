"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@zind/ui"
import { callAPI } from "@zind/utils"
import { assistant, get_response } from "../api/assistant/types"
import { useUser } from "../user/UserContext"

type ActionState = { loading: boolean; success: boolean }

interface AssistantContextProps {
  assistant?: assistant
  gettingAssistant: ActionState

  updateAssistant: (name: string, instructions: string) => void
  updatingAssistant: ActionState
}

const AssistantContext = createContext<AssistantContextProps | undefined>(
  undefined
)

export const AssistantProvider = ({ children }: { children: ReactNode }) => {
  const [assistant, setAssistant] = useState<assistant | undefined>(undefined)
  const [gettingAssistant, setGettingAssistant] = useState({
    loading: false,
    success: false,
  })
  const [updatingAssistant, setUpdatingAssistant] = useState({
    loading: false,
    success: false,
  })

  const { user } = useUser()
  const user_id = user?.id

  const searchParams = useSearchParams()
  const { showToast } = useToast()

  useEffect(() => {
    getAssistant()
  }, [user_id])

  useEffect(() => {
    if (assistant?.name) {
      document.title = assistant.name
    }
  }, [assistant, searchParams])

  const getAssistant = () => {
    if (!user_id) return

    setGettingAssistant((prevState) => ({
      ...prevState,
      loading: true,
    }))

    callAPI({
      url: `/api/assistant?user_id=${user_id}`,
      method: "get",
      onSuccess: (data: get_response) => {
        if (data.assistant) {
          setAssistant(data.assistant)
        }

        setGettingAssistant((prevState) => ({
          ...prevState,
          loading: false,
          success: true,
        }))
      },
      onError: (error) => {
        setGettingAssistant((prevState) => ({
          ...prevState,
          loading: false,
        }))
        showToast(error.message)
      },
    })
  }

  const updateAssistant = (name: string, instructions: string) => {
    if (!user_id || !assistant?.id || !name || !instructions) return

    setUpdatingAssistant((prevState) => ({
      ...prevState,
      loading: true,
    }))

    callAPI({
      url: "/api/assistant",
      method: "patch",
      formData: {
        id: assistant.id,
        name: name,
        instructions: instructions,
      },
      onSuccess: () => {
        setAssistant((prevState) => {
          if (prevState === undefined) {
            return undefined
          }

          return {
            ...prevState,
            name: name,
            instructions: instructions,
          }
        })

        setUpdatingAssistant((prevState) => ({
          ...prevState,
          loading: false,
          success: true,
        }))

        showToast("AI profile updated")
      },
      onError: (error) => {
        setUpdatingAssistant((prevState) => ({
          ...prevState,
          loading: false,
        }))
        showToast(error.message)
      },
    })
  }

  return (
    <AssistantContext
      value={{
        assistant,
        gettingAssistant,
        updateAssistant,
        updatingAssistant,
      }}
    >
      {children}
    </AssistantContext>
  )
}

export function useAssistant() {
  const context = useContext(AssistantContext)
  if (!context) {
    throw new Error("useAssistant must be used within AssistantProvider")
  }
  return context
}
