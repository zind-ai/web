interface memory {
  id?: number
  vector: number[]
  memory: string
  source: string
  source_id: string
  user_id: string
  created_at: number
}

export type post_payload = [memory]
