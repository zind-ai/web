"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { callAPI } from "@/library/utils/api"
import { useToast } from "@/library/ui"
import { user_id } from "@/app/global/login/user"
import { chat, get_response, post_response } from "@/app/api/chats/types"

interface ChatContextProps {
  chats: chat[]
  addChat: (newChat: chat) => void
  loading: boolean
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<chat[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { showToast } = useToast()

  const addChat = async (newChat: chat) => {
    if (!newChat) return

    setLoading(true)

    setChats((prevChats) => [...prevChats, newChat])

    await callAPI({
      url: "/api/chats",
      method: "post",
      formData: {
        message: newChat.message,
        user_id: newChat.user_id,
        chats: chats,
      },
      onSuccess: (data: post_response) => {
        if (data.chat) {
          setChats((prevChats) => [...prevChats, data.chat as chat])
        }
        setLoading(false)
      },
      onError(error) {
        showToast(error.message, 3000)
        setLoading(false)
      },
    })
  }

  const getChats = () => {
    if (!user_id || chats.length) return

    setLoading(true)

    callAPI({
      url: `/api/chats?user_id=${user_id}`,
      method: "get",
      onSuccess: (data: get_response) => {
        setChats((prevChats) => {
          if (prevChats.length === 0) {
            return data.chats
          }
          return prevChats
        })

        setLoading(false)
      },
      onError: (error) => {
        setLoading(false)
        showToast(error.message, 3000)
      },
    })
  }

  useEffect(() => {
    getChats()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ChatContext.Provider value={{ chats, addChat, loading }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
