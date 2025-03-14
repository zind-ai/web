import { memory } from "../memory/types"

export interface chat {
  id?: string
  user_id: string
  message: string
  role: string
  created_at: string
}

export interface get_response {
  chats: chat[]
  error: string | null
}

export interface post_response {
  chat: chat | null
  error: string | null
  memories: memory[] | null
}
