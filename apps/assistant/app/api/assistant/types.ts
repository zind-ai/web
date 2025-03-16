export interface assistant {
  id?: string
  user_id: string
  name: string
  instructions: string
  created_at: string
}

export interface get_response {
  assistant: assistant | null
  error: string | null
}
