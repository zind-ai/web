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
import { user_id } from "@/app/global/login/user"
import { chat, get_response, post_response } from "@/app/api/chats/types"

interface ChatContextProps {
  chats: chat[]
  addChat: (newChat: chat) => void
  addingChat: boolean
  gettingChats: boolean
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<chat[]>([])
  const [addingChat, setAddingChat] = useState<boolean>(false)
  const [gettingChats, setGettingChats] = useState<boolean>(false)

  const { showToast } = useToast()

  const addChat = async (newChat: chat) => {
    if (!newChat) return

    setAddingChat(true)

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
        setAddingChat(false)
      },
      onError(error) {
        showToast(error.message)
        setAddingChat(false)
      },
    })
  }

  const getChats = () => {
    if (!user_id || chats.length) return

    setGettingChats(true)

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

        setGettingChats(false)
      },
      onError: (error) => {
        setGettingChats(false)
        showToast(error.message)
      },
    })
  }

  useEffect(() => {
    getChats()
  }, [])

  return (
    <ChatContext.Provider value={{ chats, addChat, addingChat, gettingChats }}>
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
