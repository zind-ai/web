export interface User {
  id: string
  name: string
  created_at?: string
}

export interface get_response {
  assistant: User | null
  error: string | null
}
