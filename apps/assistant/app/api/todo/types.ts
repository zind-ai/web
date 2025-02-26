export interface todo {
  id?: string
  user_id: string
  name: string
  description: string
  start: string
  end?: string
  recurrence?: string
  active?: boolean
  created_at?: string
}

export interface get_response {
  todos: todo[]
  error: string | null
}
