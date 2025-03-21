import { Memory } from "../memory/types"

export interface Chat {
  id?: string
  user_id: string
  message: string
  role: string
  created_at: string
}

export interface get_response {
  chats: Chat[]
  error: string | null
}

export interface post_response {
  chat: Chat | null
  error: string | null
  memories: Memory[] | null
}
