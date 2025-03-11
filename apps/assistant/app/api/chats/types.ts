export interface chat {
  id?: string
  user_id: string
  message: string
  role: string
  created_at: string
}

export type memories = string | null

export interface get_response {
  chats: chat[]
  error: string | null
}

export interface post_response {
  chat: chat | null
  error: string | null
  memories: memories
}
