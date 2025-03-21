"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { useToast } from "@zind/ui"
import { callAPI } from "@zind/utils"
import { Chat, get_response, post_response } from "@/app/api/chats/types"
import { useAssistant } from "../assistant/AssistantContext"
import { useUser } from "../user/UserContext"

type ActionState = { loading: boolean; success: boolean }

interface ChatContextProps {
  chats: Chat[]
  memories: post_response["memories"]
  getChats: () => void
  gettingChats: ActionState
  addChat: (newChat: Chat) => void
  addingChat: ActionState
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [memories, setMemories] = useState<post_response["memories"]>(null)
  const [addingChat, setAddingChat] = useState({
    loading: false,
    success: false,
  })
  const [gettingChats, setGettingChats] = useState({
    loading: false,
    success: false,
  })

  const { user } = useUser()
  const user_id = user?.id

  const { assistant } = useAssistant()
  const { showToast } = useToast()

  useEffect(() => {
    getChats()
  }, [user_id])

  const addChat = async (newChat: Chat) => {
    if (!newChat || !user_id) return

    setAddingChat((prevState) => ({
      ...prevState,
      loading: true,
      success: false,
    }))

    setChats((prevChats) => [...prevChats, newChat])

    const assistant_instructions = `You are my (${user?.name}) personal AI, ${assistant?.name}. ${assistant?.instructions}`

    await callAPI({
      url: "/api/chats",
      method: "post",
      formData: {
        message: newChat.message,
        user_id: newChat.user_id,
        chats: chats,
        assistant_instructions: assistant_instructions,
      },
      onSuccess: (data: post_response) => {
        if (data.chat) {
          setChats((prevChats) => [...prevChats, data.chat as Chat])
          setAddingChat((prevState) => ({
            ...prevState,
            success: true,
          }))
        }

        if (data.memories) {
          setMemories(data.memories)
        }

        setAddingChat((prevState) => ({
          ...prevState,
          loading: false,
        }))
      },
      onError(error) {
        showToast(error.message)
        setAddingChat((prevState) => ({
          ...prevState,
          loading: false,
        }))
      },
    })
  }

  const getChats = () => {
    if (!user_id) return

    setGettingChats((prevState) => ({
      ...prevState,
      loading: true,
      success: false,
    }))

    callAPI({
      url: `/api/chats?user_id=${user_id}`,
      method: "get",
      onSuccess: (data: get_response) => {
        if (data.chats) {
          setChats(data.chats)
          setGettingChats((prevState) => ({
            ...prevState,
            success: true,
          }))
        }

        setGettingChats((prevState) => ({
          ...prevState,
          loading: false,
        }))
      },
      onError: (error) => {
        setGettingChats((prevState) => ({
          ...prevState,
          loading: false,
        }))
        showToast(error.message)
      },
    })
  }

  return (
    <ChatContext
      value={{ chats, memories, addChat, getChats, addingChat, gettingChats }}
    >
      {children}
    </ChatContext>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within ChatProvider")
  }
  return context
}
