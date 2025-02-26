interface memory {
  id?: number
  vector?: number[]
  memory: string
  source: string
  source_id: string
  user_id: string
  created_at: number
  distance: number
}

export interface similar_memories {
  code: number
  cost: number
  data: memory[]
}

export interface post_response {
  memories: memory[] | null
  error: string | null
}
