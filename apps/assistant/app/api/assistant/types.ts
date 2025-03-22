export interface Assistant {
  id?: string
  user_id: string
  name: string
  instructions: string
  created_at: string
}

export interface get_response {
  assistant: Assistant | null
  error: string | null
}
